import { describe, expect, it } from "vitest";
import { daysUntil, expiryLevel } from "@/lib/cidb";

describe("CIDB expiry countdown", () => {
  it("counts days in Johannesburg time", () => {
    expect(daysUntil("2026-11-26", new Date("2026-10-21T08:00:00Z"))).toBe(36);
  });
  it("is amber at 60 days", () => expect(expiryLevel(60)).toBe("amber"));
  it("is not flagged at 61 days", () => expect(expiryLevel(61)).toBe("ok"));
  it("is red at 30 days", () => expect(expiryLevel(30)).toBe("red"));
  it("is urgent at 7 days", () => expect(expiryLevel(7)).toBe("critical"));
});
