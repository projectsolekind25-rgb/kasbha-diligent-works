import { site } from "@/config/site";

export interface Office {
  label: string;
  street: string;
  city: string;
  postalCode: string;
  region: string;
}
export interface SocialLink {
  label: string;
  url: string;
}
export interface PublicSettings {
  phone_display: string;
  phone_tel: string;
  cell_display: string;
  whatsapp_number: string;
  email: string;
  offices: Office[];
  tagline: string;
  social_links: SocialLink[];
  footer_text: string;
}

/** Extra footer content that only exists once admins set it. Empty = public site unchanged. */
export const liveExtras: { socials: SocialLink[]; footerText: string } = { socials: [], footerText: "" };

const mapsUrl = (o: Office) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`${o.street} ${o.city} ${o.postalCode}`).replace(/%20/g, "+");

/** Overlay admin-edited settings onto the static site config. Idempotent. */
export function applySettings(s: PublicSettings | null | undefined) {
  if (!s) return;
  const m = site as unknown as {
    tagline: string;
    contact: { offices: unknown[]; phoneDisplay: string; phoneTel: string; cellDisplay: string; cellTel: string; whatsappNumber: string; email: string };
  };
  m.tagline = s.tagline;
  m.contact.phoneDisplay = s.phone_display;
  m.contact.phoneTel = s.phone_tel;
  m.contact.cellDisplay = s.cell_display;
  m.contact.cellTel = "+" + s.whatsapp_number;
  m.contact.whatsappNumber = s.whatsapp_number;
  m.contact.email = s.email;
  if (Array.isArray(s.offices) && s.offices.length) {
    m.contact.offices = s.offices.map((o) => ({ ...o, mapsUrl: mapsUrl(o) }));
  }
  liveExtras.socials = Array.isArray(s.social_links) ? s.social_links.filter((l) => l.url) : [];
  liveExtras.footerText = s.footer_text ?? "";
}
