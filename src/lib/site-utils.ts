import { site, type Project, type ProjectCategory } from "@/config/site";

export function waLink(message: string) {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function waFor(key: string) {
  return waLink(site.whatsapp[key] ?? site.whatsapp["/"]);
}

export function formatZAR(value: number) {
  return "R" + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function sortNewest(projects: readonly Project[]) {
  return [...projects].sort((a, b) => b.year - a.year || b.value - a.value);
}

export function filterProjects(projects: readonly Project[], cat: ProjectCategory | "ALL") {
  return sortNewest(cat === "ALL" ? projects : projects.filter((p) => p.category === cat));
}

export function buildContactMessage(name: string, service: string, message: string) {
  return `Hi KASBHA, my name is ${name.trim()}.\nService: ${service}\n\n${message.trim()}`;
}

export function pageHead(path: string, title: string, description: string) {
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: path },
    { name: "twitter:card", content: "summary_large_image" },
  ];
  if (site.ogImage) {
    meta.push({ property: "og:image", content: site.ogImage }, { name: "twitter:image", content: site.ogImage });
  }
  return { meta, links: [{ rel: "canonical", href: path }] };
}
