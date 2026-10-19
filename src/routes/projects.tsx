import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { site, type ProjectCategory } from "@/config/site";
import { filterProjects, pageHead } from "@/lib/site-utils";
import { cn } from "@/lib/utils";
import { ImageSlot, PageHero, Section, WhatsAppButton } from "@/components/site/ui";
import { ProjectCard } from "@/components/site/blocks";

export const Route = createFileRoute("/projects")({
  head: () =>
    pageHead(
      "/projects",
      "Projects | School renovations KwaZulu-Natal & civil works | KASBHA",
      "Completed building, civil engineering, specialist and supply projects for universities, schools, municipalities and private clients.",
    ),
  component: Projects,
});

function Projects() {
  const [cat, setCat] = useState<ProjectCategory | "ALL">("ALL");
  const list = filterProjects(site.projects, cat);

  return (
    <>
      <PageHero eyebrow="Projects" title="Track record.">
        {site.projects.length} completed projects across building, civil, specialist works and supply.
      </PageHero>
      <Section className="pt-0">
        <div className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
          {site.projectCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              aria-pressed={cat === c.id}
              className={cn(
                "press hairline shrink-0 rounded-full px-4 py-2 text-sm",
                cat === c.id ? "bg-paper text-background" : "bg-surface text-muted-foreground",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="mb-4 text-sm text-muted-foreground tabular-nums">
          {list.length} {list.length === 1 ? "project" : "projects"}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProjectCard key={p.client + p.work + p.year} p={p} />
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3">
          {photos.gallery.map(({ label, ...photo }) => (
            <ImageSlot key={label} label={label} ratio="1/1" photo={photo} />
          ))}
        </div>

        <div className="hairline mt-12 flex flex-col gap-4 rounded-3xl bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl font-bold tracking-[-0.03em]">Client references available on request.</p>
          <WhatsAppButton waKey="references" label="Request references" />
        </div>
      </Section>
    </>
  );
}
