export const WEBINAR_BOOKING_URL = "https://tidycal.com/skill-lms/webinaire-ia?utm_source=abelsalah&utm_medium=website&utm_campaign=webinaire_ia&utm_content=card";

// Keep these dates aligned with the dedicated TidyCal booking type.
// Registration closes 15 minutes before the session, as configured in TidyCal.
export const WEBINAR_SESSIONS = [
  "2026-11-26T12:30:00+01:00",
  "2026-12-17T12:30:00+01:00",
  "2027-01-21T12:30:00+01:00",
] as const;

export function getUpcomingWebinars(now = Date.now()) {
  return WEBINAR_SESSIONS.filter((date) => Date.parse(date) - 15 * 60_000 > now);
}

export function formatWebinarDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date(date));
}
