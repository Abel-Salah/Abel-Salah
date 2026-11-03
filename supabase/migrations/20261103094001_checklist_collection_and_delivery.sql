-- Additive checklist collection only. Does not alter any article/draft table.
-- Apply once after review; historical rows are imported separately without sends.
DO $guard$
BEGIN
 IF to_regclass('public.checklist_leads') IS NOT NULL
 OR to_regclass('public.checklist_request_limits') IS NOT NULL
 OR EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
   WHERE n.nspname='public' AND p.proname IN
   ('checklist_take_quota','claim_checklist_delivery','finish_checklist_delivery')) THEN
  RAISE EXCEPTION 'Checklist destination already exists; reconcile before applying';
 END IF;
END $guard$;

CREATE TABLE public.checklist_leads (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 first_name text NOT NULL CHECK (char_length(btrim(first_name)) BETWEEN 1 AND 80),
 email text NOT NULL UNIQUE CHECK (email=lower(btrim(email)) AND char_length(email)<=320
   AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 consent boolean NOT NULL CHECK (consent IS TRUE),
 source text CHECK (source IS NULL OR char_length(source)<=100),
 created_at timestamptz NOT NULL DEFAULT now(),
 emailed_at timestamptz,
 delivery_status text NOT NULL DEFAULT 'pending' CHECK (delivery_status IN ('pending','sending','sent','failed')),
 email_message_id text CHECK (email_message_id IS NULL OR char_length(email_message_id)<=128),
 delivery_attempt uuid,
 delivery_started_at timestamptz,
 first_delivery_attempt_at timestamptz,
 last_error_code text CHECK (last_error_code IS NULL OR last_error_code ~ '^[a-z0-9_]{1,80}$'),
 CHECK ((delivery_status='sent') = (emailed_at IS NOT NULL))
);
CREATE TABLE public.checklist_request_limits (
 bucket text PRIMARY KEY CHECK (char_length(bucket)<=100),
 window_started_at timestamptz NOT NULL,
 attempts integer NOT NULL CHECK (attempts>=1)
);
ALTER TABLE public.checklist_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_request_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.checklist_leads, public.checklist_request_limits FROM PUBLIC, anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE ON public.checklist_leads, public.checklist_request_limits TO service_role;

CREATE FUNCTION public.checklist_take_quota(p_bucket text, p_window_seconds integer, p_limit integer)
RETURNS boolean LANGUAGE plpgsql SECURITY INVOKER SET search_path=public,pg_temp AS $quota$
DECLARE v_count integer;
BEGIN
 IF p_window_seconds<=0 OR p_limit<=0 OR p_limit>100 THEN
  RAISE EXCEPTION 'Invalid quota' USING ERRCODE='22023';
 END IF;
 INSERT INTO public.checklist_request_limits AS q(bucket,window_started_at,attempts)
 VALUES (p_bucket,clock_timestamp(),1)
 ON CONFLICT (bucket) DO UPDATE SET
  attempts=CASE WHEN q.window_started_at<=clock_timestamp()-make_interval(secs=>p_window_seconds)
    THEN 1 ELSE least(q.attempts+1,p_limit+1) END,
  window_started_at=CASE WHEN q.window_started_at<=clock_timestamp()-make_interval(secs=>p_window_seconds)
    THEN clock_timestamp() ELSE q.window_started_at END
 RETURNING attempts INTO v_count;
 RETURN v_count<=p_limit;
END $quota$;

CREATE FUNCTION public.claim_checklist_delivery(
 p_first_name text,p_email text,p_consent boolean,p_source text,p_client_key text,p_attempt uuid
) RETURNS jsonb LANGUAGE plpgsql SECURITY INVOKER SET search_path=public,pg_temp AS $claim$
DECLARE v_lead public.checklist_leads%ROWTYPE;
BEGIN
 IF p_consent IS DISTINCT FROM true OR p_email IS NULL OR p_email<>lower(btrim(p_email))
 OR char_length(p_email)>320 OR p_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
 OR p_first_name IS NULL OR char_length(btrim(p_first_name)) NOT BETWEEN 1 AND 80
 OR char_length(coalesce(p_source,''))>100 OR p_client_key IS NULL
 OR p_client_key !~ '^[a-f0-9]{64}$' OR p_attempt IS NULL THEN
  RAISE EXCEPTION 'Invalid checklist request' USING ERRCODE='22023';
 END IF;
 -- One fixed lock order for both existing and initially absent leads.
 -- finish_checklist_delivery only locks its lead, never this advisory lock.
 PERFORM pg_advisory_xact_lock(196,305);
 SELECT * INTO v_lead FROM public.checklist_leads WHERE email=p_email FOR UPDATE;
 IF FOUND THEN
  IF v_lead.emailed_at IS NOT NULL THEN RETURN jsonb_build_object('state','sent'); END IF;
  -- Never retry after the provider's 24h idempotency window could have elapsed.
  IF v_lead.first_delivery_attempt_at<clock_timestamp()-interval '23 hours' THEN
   RETURN jsonb_build_object('state','held');
  END IF;
  IF v_lead.delivery_status='sending' AND v_lead.delivery_started_at>clock_timestamp()-interval '2 minutes' THEN
   RETURN jsonb_build_object('state','busy');
  END IF;
 END IF;
 -- Serialize quota admission; denied clients must not consume the global budget.
 -- Check the fixed global bucket before creating a client bucket to bound growth.
 -- No raw IP is stored. The fixed admission lock is already held.
 IF EXISTS (SELECT 1 FROM public.checklist_request_limits WHERE bucket='global'
   AND window_started_at>clock_timestamp()-interval '24 hours' AND attempts>=100) THEN
  RETURN jsonb_build_object('state','rate_limited');
 END IF;
 IF NOT public.checklist_take_quota('client:'||p_client_key,3600,5) THEN
  RETURN jsonb_build_object('state','rate_limited');
 END IF;
 IF NOT public.checklist_take_quota('global',86400,100) THEN
  RETURN jsonb_build_object('state','rate_limited');
 END IF;
 INSERT INTO public.checklist_leads(first_name,email,consent,source)
 VALUES (btrim(p_first_name),p_email,true,coalesce(nullif(p_source,''),'site'))
 ON CONFLICT (email) DO NOTHING;
 SELECT * INTO STRICT v_lead FROM public.checklist_leads WHERE email=p_email FOR UPDATE;
 -- A competing first request may have committed while this request waited.
 IF v_lead.emailed_at IS NOT NULL THEN RETURN jsonb_build_object('state','sent'); END IF;
 IF v_lead.first_delivery_attempt_at<clock_timestamp()-interval '23 hours' THEN
  RETURN jsonb_build_object('state','held');
 END IF;
 IF v_lead.delivery_status='sending' AND v_lead.delivery_started_at>clock_timestamp()-interval '2 minutes' THEN
  RETURN jsonb_build_object('state','busy');
 END IF;
 UPDATE public.checklist_leads SET delivery_status='sending',delivery_attempt=p_attempt,
  delivery_started_at=clock_timestamp(),
  first_delivery_attempt_at=coalesce(first_delivery_attempt_at,clock_timestamp()),last_error_code=NULL
 WHERE id=v_lead.id;
 -- Persisted name keeps the provider payload identical on retries.
 RETURN jsonb_build_object('state','send','id',v_lead.id,'attempt',p_attempt,
   'first_name',v_lead.first_name,'email',v_lead.email);
END $claim$;

CREATE FUNCTION public.finish_checklist_delivery(
 p_id uuid,p_attempt uuid,p_message_id text DEFAULT NULL,p_error_code text DEFAULT NULL
) RETURNS boolean LANGUAGE plpgsql SECURITY INVOKER SET search_path=public,pg_temp AS $finish$
DECLARE v_count integer;
BEGIN
 IF p_message_id IS NOT NULL THEN
  IF char_length(btrim(p_message_id)) NOT BETWEEN 1 AND 128 THEN
   RAISE EXCEPTION 'Invalid provider reference' USING ERRCODE='22023';
  END IF;
  UPDATE public.checklist_leads SET delivery_status='sent',emailed_at=clock_timestamp(),
   email_message_id=p_message_id,delivery_attempt=NULL,delivery_started_at=NULL,last_error_code=NULL
  WHERE id=p_id AND delivery_attempt=p_attempt AND delivery_status='sending';
 ELSE
  UPDATE public.checklist_leads SET delivery_status='failed',last_error_code=coalesce(p_error_code,'delivery_unconfirmed'),
   delivery_attempt=NULL,delivery_started_at=NULL
  WHERE id=p_id AND delivery_attempt=p_attempt AND delivery_status='sending';
 END IF;
 GET DIAGNOSTICS v_count=ROW_COUNT;
 RETURN v_count=1;
END $finish$;

REVOKE ALL ON FUNCTION public.checklist_take_quota(text,integer,integer) FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION public.claim_checklist_delivery(text,text,boolean,text,text,uuid) FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION public.finish_checklist_delivery(uuid,uuid,text,text) FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.checklist_take_quota(text,integer,integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.claim_checklist_delivery(text,text,boolean,text,text,uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.finish_checklist_delivery(uuid,uuid,text,text) TO service_role;
