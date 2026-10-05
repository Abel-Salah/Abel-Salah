# Security Policy

## Supported Scope

This repository powers the Abel SALAH website and its Supabase Edge Functions.

Security-sensitive areas include:

- Supabase migrations, RLS policies and Edge Functions.
- Environment variable handling.
- Blog generation and Markdown rendering.
- Opportunity Agent functions and admin dashboard.
- SEO files that influence crawler access, such as `robots.txt`, `sitemap.xml`, `llms.txt` and `ai.txt`.

## Reporting A Vulnerability

Do not open a public GitHub issue for a vulnerability or leaked secret.

Report privately to Abel SALAH through a trusted direct channel. Include:

- affected route, file, function or endpoint;
- reproduction steps;
- expected and actual behavior;
- potential impact;
- whether any secret, token, private data or admin function may be exposed.

## Secret Handling

Never commit:

- `.env` files;
- Supabase service role keys;
- Google API keys;
- `OPPORTUNITY_ADMIN_TOKEN`;
- OAuth tokens;
- browser exports, cookies or local CLI temp files.

Use `.env.example` only for variable names. Store production secrets in the hosting provider and Supabase dashboard.

## Baseline Checks

Before merging security-sensitive changes:

```sh
npm run verify
```

For Supabase changes, also review:

- RLS remains enabled for private tables.
- Edge Functions that write data keep `verify_jwt = true`.
- Admin-only functions require `OPPORTUNITY_ADMIN_TOKEN` or a stronger auth layer.
- No function sends job applications or outreach messages automatically.
- The Opportunity Agent dashboard must not persist the admin token in `localStorage`; session-only browser storage is the current baseline.
