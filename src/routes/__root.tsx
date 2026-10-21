import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import displayFont from "@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url";
import textFont from "@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { site } from "@/config/site";
import { Header, WhatsAppPill } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getPublicSettings } from "@/lib/settings.functions";
import { applySettings } from "@/lib/live-settings";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">This page doesn't exist.</p>
        <Link to="/" className="press mt-6 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl text-foreground">This page didn't load</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="press mt-6 inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": site.contact.offices.map((o, i) => ({
    "@type": "GeneralContractor",
    "@id": `${site.url}/#office-${i}`,
    name: site.name,
    slogan: site.tagline,
    url: site.url,
    telephone: i === 0 ? site.contact.phoneTel : site.contact.cellTel,
    email: site.contact.email,
    foundingDate: String(site.credentials.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      addressLocality: o.city,
      postalCode: o.postalCode,
      addressRegion: o.region,
      addressCountry: "ZA",
    },
    areaServed: ["Durban", "KwaZulu-Natal", "Gauteng", "South Africa"],
    currenciesAccepted: "ZAR",
  })),
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0b1020" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
    ],
    links: [
      { rel: "preload", href: displayFont, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: textFont, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  loader: async () => ({ settings: await getPublicSettings() }),
  staleTime: Infinity,
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-ZA">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { settings } = Route.useLoaderData();
  applySettings(settings);
  const { pathname } = useLocation();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppPill />
    </QueryClientProvider>
  );
}
