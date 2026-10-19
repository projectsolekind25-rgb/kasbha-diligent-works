import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { pageHead, waLink } from "@/lib/site-utils";
import { ImageSlot, PageHero, Section, WhatsAppButton } from "@/components/site/ui";

export const Route = createFileRoute("/plant-hire")({
  head: () =>
    pageHead(
      "/plant-hire",
      "Tipper truck hire Durban | Hino 700 | KASBHA",
      "Hire our Hino 700 tipper truck in Durban for sand, stone, G5–G7 material, rubble, asphalt and bulk construction materials.",
    ),
  component: PlantHire,
});

function PlantHire() {
  const p = site.plant;
  return (
    <>
      <PageHero eyebrow="Plant hire" title="Hino 700 tipper truck. Available for hire.">
        <p>{p.description}</p>
        <p className="mt-3">Truck signage reads “{p.signage}”.</p>
      </PageHero>
      <Section className="pt-0">
        <div className="grid gap-3 md:grid-cols-2">
          <ImageSlot label="Hino 700 · side" ratio="4/3" />
          <ImageSlot label="Hino 700 · rear" ratio="4/3" />
        </div>
        <h2 className="mt-16 mb-6 text-4xl">What we move.</h2>
        <div className="flex flex-wrap gap-2">
          {p.materials.map((m) => (
            <a
              key={m}
              href={waLink(`Hi KASBHA, I'd like to hire the Hino 700 to transport ${m.toLowerCase()}. Site and date:`)}
              target="_blank"
              rel="noopener noreferrer"
              className="press hairline rounded-full bg-surface px-4 py-2 text-sm hover:bg-secondary"
            >
              {m}
            </a>
          ))}
        </div>
        <WhatsAppButton waKey="hino" label="Hire the Hino 700" className="mt-10" />
      </Section>
    </>
  );
}
