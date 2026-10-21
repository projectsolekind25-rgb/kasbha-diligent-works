import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/config/site";
import { daysUntil, expiryLevel } from "@/lib/cidb";
import { PageTitle, Panel, Skel } from "@/components/admin/kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

function Overview() {
  const cidb = useQuery({
    queryKey: ["admin_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("admin_settings").select("cidb_expiry").eq("id", 1).single();
      if (error) throw error;
      return data;
    },
  });

  const days = cidb.data ? daysUntil(cidb.data.cidb_expiry) : null;
  const level = days === null ? "ok" : expiryLevel(days);
  const tone = {
    ok: "text-foreground",
    amber: "text-warning",
    red: "text-primary",
    critical: "text-primary",
    expired: "text-primary",
  }[level];

  return (
    <>
      <PageTitle title="Overview" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Panel>
          <p className="eyebrow">Projects</p>
          <p className="mt-3 font-display text-5xl font-bold tracking-[-0.03em]">{site.projects.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Listed on the site</p>
        </Panel>
        <Panel>
          <p className="eyebrow">New enquiries</p>
          <p className="mt-3 font-display text-5xl font-bold tracking-[-0.03em]">0</p>
          <p className="mt-1 text-sm text-muted-foreground">Enquiries currently arrive on WhatsApp.</p>
        </Panel>
        <Panel className={cn("sm:col-span-2", level === "critical" || level === "expired" ? "ring-1 ring-primary" : "")}>
          <p className="eyebrow">CIDB registration</p>
          {cidb.isLoading ? (
            <Skel className="mt-3 h-12 w-48" />
          ) : cidb.isError || days === null ? (
            <p className="mt-3 text-sm text-muted-foreground">Could not load the expiry date.</p>
          ) : (
            <>
              <p className={cn("mt-3 font-display text-5xl font-bold tracking-[-0.03em]", tone)}>
                {days < 0 ? "Expired" : `${days} day${days === 1 ? "" : "s"}`}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {days < 0 ? "Renew now." : "until expiry"} · {new Date(cidb.data!.cidb_expiry).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
                {level !== "ok" && days >= 0 && " · Start renewal"}
              </p>
            </>
          )}
        </Panel>
      </div>

      <h2 className="mb-3 mt-10 text-2xl">Quick actions</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { to: "/admin/settings", label: "Edit site details" },
          { to: "/admin/users", label: "Invite an admin" },
        ].map((a) => (
          <Link key={a.to} to={a.to} className="press hairline rounded-2xl bg-card px-4 py-4 text-sm font-semibold">
            {a.label} →
          </Link>
        ))}
        <a href="/" target="_blank" rel="noopener" className="press hairline rounded-2xl bg-card px-4 py-4 text-sm font-semibold">
          View website ↗
        </a>
      </div>
    </>
  );
}
