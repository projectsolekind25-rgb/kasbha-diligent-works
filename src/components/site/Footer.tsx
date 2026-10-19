import { Link, useLocation } from "@tanstack/react-router";
import { site } from "@/config/site";
import { Container, Logo, WhatsAppButton } from "./ui";

export function Footer() {
  const { pathname } = useLocation();
  const c = site.credentials;
  return (
    <footer className="border-t bg-surface pb-24 pt-14 md:pb-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs font-display text-2xl font-bold tracking-[-0.03em]">{site.tagline}</p>
            <WhatsAppButton waKey={pathname} label="WhatsApp us" className="mt-6" />
          </div>
          <nav className="grid grid-cols-2 gap-2 text-sm md:grid-cols-1">
            {site.nav.map((n) => (
              <Link key={n.to} to={n.to} className="text-muted-foreground hover:text-foreground">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <a className="hover:text-foreground" href={`tel:${site.contact.cellTel}`}>Cell/WhatsApp {site.contact.cellDisplay}</a>
            </p>
            <p>
              <a className="hover:text-foreground" href={`tel:${site.contact.phoneTel}`}>Tel {site.contact.phoneDisplay}</a>
            </p>
            <p>
              <a className="hover:text-foreground" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </p>
            {site.contact.offices.map((o) => (
              <p key={o.label}>
                {o.street}, {o.city}, {o.postalCode}
              </p>
            ))}
          </div>
        </div>
        <p className="mt-12 border-t pt-6 text-xs leading-relaxed text-muted-foreground">
          Reg {c.registration} · CIDB CRS {c.cidbCrs} ({c.cidbGrading}) · CSD {c.csd} · NHBRC {c.nhbrc}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">© {new Date().getFullYear()} {site.name}</p>
      </Container>
    </footer>
  );
}
