import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { pageHead } from "@/lib/site-utils";
import { photos } from "@/config/photos";
import { Card, ImageSlot, PageHero, Section, WhatsAppButton } from "@/components/site/ui";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead(
      "/services",
      "Services | Civil construction Durban, events, cleaning & supply | KASBHA",
      "Civil construction in Durban, building and renovations, events and catering, cleaning and security, and school and office supplies (LTSM).",
    ),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="What we deliver.">
        Four divisions, one team, from Durban across South Africa.
      </PageHero>
      <Section className="pt-0">
        <div className="space-y-3">
          {site.services.map((s, i) => (
            <Card key={s.id} className="grid gap-6 p-6 sm:p-10 md:grid-cols-[1fr_1.3fr]">
              <div>
                <span className="font-display text-sm font-bold text-primary">0{i + 1}</span>
                <h2 className="mt-3 text-3xl sm:text-4xl">{s.full}</h2>
                {i === 0 && <ImageSlot label="KASBHA crew excavating a trench" ratio="16/9" className="mt-6" photo={photos.trenchCrew} eager />}
              </div>
              <ul className="divide-y divide-border text-sm">
                {s.items.map((it) => (
                  <li key={it} className="py-3 first:pt-0">
                    {it}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <WhatsAppButton waKey="/services" label="Get a quote" className="mt-10" />
      </Section>
    </>
  );
}
