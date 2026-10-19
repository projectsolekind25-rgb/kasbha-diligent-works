import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { waFor } from "@/lib/site-utils";
import logo from "@/assets/kasbha-logo.webp.asset.json";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4", className)} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.4 9.4 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.44 9.43M20.08 3.9A11.3 11.3 0 0 0 12.05.58C5.79.58.7 5.67.7 11.93c0 2 .52 3.95 1.52 5.67L.6 23.5l6.04-1.58a11.3 11.3 0 0 0 5.41 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
    </svg>
  );
}

type BtnVariant = "primary" | "glass" | "light";
const btn: Record<BtnVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  glass: "hairline bg-secondary/60 text-foreground hover:bg-secondary",
  light: "bg-paper text-background hover:opacity-90",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "press inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold tracking-[-0.01em]",
        btn[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}

export function WhatsAppButton({ waKey, label, variant = "primary", className }: { waKey: string; label: string; variant?: BtnVariant; className?: string }) {
  return (
    <ButtonLink href={waFor(waKey)} external variant={variant} className={className}>
      <WhatsAppIcon /> {label}
    </ButtonLink>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHead({ eyebrow, title, children }: { eyebrow?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-[2.5rem] sm:text-6xl">{title}</h2>
      {children && <p className="mt-5 text-muted-foreground">{children}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Container className="pt-32 pb-12 sm:pt-44 sm:pb-16">
      <p className="eyebrow fade-up mb-5">{eyebrow}</p>
      <h1 className="fade-up text-[3.25rem] sm:text-8xl">{title}</h1>
      {children && <div className="fade-up mt-6 max-w-xl text-muted-foreground">{children}</div>}
    </Container>
  );
}

/** Dark placeholder with a fixed aspect ratio, until real photos are supplied. */
export function ImageSlot({ label, ratio = "4/3", className }: { label: string; ratio?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} (photo coming soon)`}
      style={{ aspectRatio: ratio }}
      className={cn("hairline relative overflow-hidden rounded-3xl bg-surface", className)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--color-accent),transparent_60%)] opacity-60" />
      <span className="eyebrow absolute bottom-4 left-4">{label}</span>
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-xl bg-paper px-2 py-1", className)}>
      <img src={logo.url} alt="KASBHA (Pty) Ltd" width={640} height={387} className="h-7 w-auto" decoding="async" />
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("hairline rounded-3xl bg-card p-6", className)}>{children}</div>;
}
