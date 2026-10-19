import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { waFor } from "@/lib/site-utils";
import { cn } from "@/lib/utils";
import { Logo, WhatsAppIcon } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="glass fixed inset-x-0 top-0 z-40 border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="press" aria-label="KASBHA home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {site.nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={waFor(pathname)}
              target="_blank"
              rel="noopener noreferrer"
              className="press ml-2 inline-flex h-9 items-center gap-2 rounded-full bg-primary px-4 text-[13px] font-semibold text-primary-foreground"
            >
              <WhatsAppIcon /> Get a quote
            </a>
          </nav>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="press -mr-2 flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="h-px w-5 bg-foreground" />
            <span className="h-px w-5 bg-foreground" />
          </button>
        </div>
      </header>

      {/* iOS-style bottom sheet */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/60 transition-opacity duration-300 ease-spring md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "glass hairline fixed inset-x-2 bottom-2 z-50 rounded-[2rem] p-3 pb-4 transition-transform duration-500 ease-spring md:hidden",
          open ? "translate-y-0" : "translate-y-[110%]",
        )}
      >
        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-muted-foreground/40" />
        <nav className="flex flex-col">
          {site.nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="press rounded-2xl px-4 py-3 font-display text-[28px] font-bold tracking-[-0.03em] text-muted-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen(false)} className="press mt-2 h-12 w-full rounded-full bg-secondary text-[15px] font-semibold">
          Close
        </button>
      </div>
    </>
  );
}

export function WhatsAppPill() {
  const { pathname } = useLocation();
  return (
    <a
      href={waFor(pathname)}
      target="_blank"
      rel="noopener noreferrer"
      className="press glass hairline fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-30 inline-flex h-12 -translate-x-1/2 items-center gap-2 rounded-full px-5 text-[14px] font-semibold md:hidden"
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <WhatsAppIcon className="size-3.5" />
      </span>
      WhatsApp us
    </a>
  );
}
