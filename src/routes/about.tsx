import { photos } from "@/config/photos";
import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { pageHead } from "@/lib/site-utils";
import { Card, ImageSlot, PageHero, Section, SectionHead, WhatsAppButton } from "@/components/site/ui";
import { CredentialsBlock } from "@/components/site/blocks";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "/about",
      "About | 100% Black, female & youth-owned building contractor Durban | KASBHA",
      "Founded 2018, registered 2020. KASBHA is a CIDB-graded building and civil construction company in Durban led by a young female entrepreneur.",
    ),
  component: About,
});

function About() {
  const a = site.about;
  return (
    <>
      <PageHero eyebrow="About" title="Durban-built since 2018.">
        {a.story}
      </PageHero>

      <Section className="pt-0">
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="p-8">
            <p className="eyebrow mb-4">Vision</p>
            <p className="text-[15px] leading-relaxed">{a.vision}</p>
          </Card>
          <Card className="p-8">
            <p className="eyebrow mb-4">Mission</p>
            <p className="text-[15px] leading-relaxed">{a.mission}</p>
          </Card>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <ImageSlot label="KASBHA branded bakkies" ratio="4/3" photo={photos.bakkiesCampus} />
          <ImageSlot label="KASBHA branded bakkie" ratio="4/3" photo={photos.bakkieStreet} />
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHead eyebrow="Objectives" title="What we hold ourselves to." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {a.objectives.map((o, i) => (
            <Card key={o}>
              <span className="font-display text-sm font-bold text-primary">0{i + 1}</span>
              <p className="mt-6 font-display text-xl font-bold leading-tight tracking-[-0.02em]">{o}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHead eyebrow="Why KASBHA" title="Why clients choose us." />
        <ul className="hairline divide-y divide-border rounded-3xl bg-card">
          {a.why.map((w) => (
            <li key={w} className="px-6 py-4 text-[15px]">
              {w}
            </li>
          ))}
        </ul>
        <ImageSlot label="School building completed by KASBHA" ratio="16/9" className="mt-3" photo={photos.school} />
      </Section>

      <Section className="pt-0">
        <SectionHead eyebrow="Team" title="Leadership." />
        <div className="flex flex-col items-center">
          {[a.team.director, a.team.md].map((m) => (
            <div key={m.name} className="flex flex-col items-center">
              <Card className="w-72 text-center">
                <p className="eyebrow">{m.role}</p>
                <p className="mt-2 font-display text-xl font-bold tracking-[-0.02em]">{m.name}</p>
              </Card>
              <span className="h-6 w-px bg-border" />
            </div>
          ))}
          <div className="grid w-full gap-3 border-t pt-6 md:grid-cols-3">
            {a.team.units.map((u) => (
              <Card key={u.name} className="text-center">
                <p className="text-sm text-muted-foreground">{u.name}</p>
                <p className="mt-2 font-display text-lg font-bold tracking-[-0.02em]">{u.lead}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHead eyebrow="Credentials" title="Verified and compliant." />
        <CredentialsBlock />
        <WhatsAppButton waKey="/about" label="Work with us" className="mt-10" />
      </Section>
    </>
  );
}
