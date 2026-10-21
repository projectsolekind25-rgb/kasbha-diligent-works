export type ExpiryLevel = "ok" | "amber" | "red" | "critical" | "expired";

/** Whole days from today (Africa/Johannesburg) until the expiry date (YYYY-MM-DD). */
export function daysUntil(expiry: string, now = new Date()): number {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Johannesburg" }).format(now);
  const a = Date.UTC(+today.slice(0, 4), +today.slice(5, 7) - 1, +today.slice(8, 10));
  const b = Date.UTC(+expiry.slice(0, 4), +expiry.slice(5, 7) - 1, +expiry.slice(8, 10));
  return Math.round((b - a) / 86_400_000);
}

/** Amber at 60 days, red at 30, urgent red at 7. */
export function expiryLevel(days: number): ExpiryLevel {
  if (days < 0) return "expired";
  if (days <= 7) return "critical";
  if (days <= 30) return "red";
  if (days <= 60) return "amber";
  return "ok";
}
