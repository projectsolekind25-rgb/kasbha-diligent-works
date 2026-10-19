import { describe, expect, it } from "vitest";
import { site } from "@/config/site";
import { buildContactMessage, filterProjects, formatZAR, waLink } from "@/lib/site-utils";

describe("site rules", () => {
  it("formats rand values as R6,856,974.77", () => {
    expect(formatZAR(6856974.77)).toBe("R6,856,974.77");
  });
  it("lists projects newest first", () => {
    const list = filterProjects(site.projects, "ALL");
    expect(list[0]!.year).toBe(2026);
    expect(list.at(-1)!.year).toBe(2021);
  });
  it("has 19 projects with 6 in General Building", () => {
    expect(site.projects.length).toBe(19);
    expect(filterProjects(site.projects, "GB").length).toBe(6);
  });
  it("WhatsApp links go to +27 63 888 6489", () => {
    expect(waLink("hi")).toBe("https://wa.me/27638886489?text=hi");
  });
  it("contact form message includes name and service", () => {
    expect(buildContactMessage("Thandi", "Plant hire", "Need sand")).toContain("Service: Plant hire");
  });
});
