import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/config/site";
import { pageHead, waFor } from "@/lib/site-utils";
import { Container, ImageSlot, Section, SectionHead, WhatsAppButton, WhatsAppIcon, ButtonLink } from "@/components/site/ui";
import { ProjectCard, ServiceCard } from "@/components/site/blocks";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "/",
      "KASBHA (Pty) Ltd | Building contractor & civil construction Durban",
      "CIDB-graded building contractor in Durban. Civil construction, school renovations in KwaZulu-Natal, events, cleaning, supply and tipper truck hire.",
    ),
  component: Home,
});

function Home() {
  const c = site.credentials;
  const featured = site.featuredProjects
    .map((f) => site.projects.find((p) => p.client === f.client && p.work === f.work))
    .filter((p) => p !== undefined);

  return (
    <>
      <Container className="pt-28 sm:pt-40">
        <p className="eyebrow fade-up mb-5">Durban · Midrand</p>
        <h1 className="fade-up text-[3.6rem] sm:text-[7.5rem]">
          Built with utmost <span className="text-primary">diligence.</span>
        </h1>
        <p className="fade-up mt-6 max-w-md text-muted-foreground">
          Building, civil works, events, cleaning and supply. Delivered from Durban.
        </p>
        <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={waFor("/")} external>
            <WhatsAppIcon /> Get a quote
          </ButtonLink>
          <Link to="/projects" className="press hairline inline-flex h-12 items-center justify-center rounded-full bg-secondary/60 px-6 text-[15px] font-semibold">
            See our projects
          </Link>
        </div>
        <ImageSlot label="Site work" ratio="16/10" className="mt-12" />
      </Container>

      <Container className="mt-10">
        <div className="hairline grid divide-y divide-border rounded-3xl bg-surface text-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <p className="p-5">CIDB graded: {c.cidbGradingShort}</p>
          <p className="p-5">100% Black-owned · 100% female-owned · 100% youth-owned</p>
          <p className="p-5">Founded {c.founded}. Registered {c.registered}.</p>
        </div>
      </Container>

      <Section>
        <SectionHead eyebrow="Services" title="Four divisions. One standard." />
        <div className="grid gap-3 sm:grid-cols-2">
          {site.services.map((s, i) => (
            <ServiceCard key={s.id} index={i} title={s.title} short={s.short} />
          ))}
        </div>
        <Link to="/services" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">
          All services
        </Link>
      </Section>

      <Section className="pt-0">
        <SectionHead eyebrow="Featured work" title="Recent projects." />
        <div className="grid gap-3 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.client + p.work} p={p} />
          ))}
        </div>
        <Link to="/projects" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">
          All projects
        </Link>
      </Section>

      <Section className="pt-0">
        <div className="hairline grid items-center gap-8 overflow-hidden rounded-3xl bg-card p-6 sm:p-10 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Plant hire</p>
            <h2 className="text-4xl sm:text-5xl">Hino 700 tipper truck.</h2>
            <p className="mt-4 text-sm text-muted-foreground">Tipper truck hire in Durban for sand, stone, rubble and bulk materials.</p>
            <Link to="/plant-hire" className="press mt-6 inline-flex h-12 items-center rounded-full bg-paper px-6 text-[15px] font-semibold text-background">
              View plant hire
            </Link>
          </div>
          <ImageSlot label="Hino 700" ratio="4/3" />
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHead eyebrow="Who we serve" title="Public and private." />
        <div className="flex flex-wrap gap-2">
          {site.audiences.map((a) => (
            <span key={a} className="hairline rounded-full bg-surface px-4 py-2 text-sm">
              {a}
            </span>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-14">
          <h2 className="text-[2.75rem] sm:text-7xl">Got a project? Let's talk.</h2>
          <WhatsAppButton waKey="/" label="Chat on WhatsApp" variant="light" className="mt-8" />
        </div>
      </Section>
    </>
  );
}
