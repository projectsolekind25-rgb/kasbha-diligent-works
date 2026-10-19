import { site, type Project } from "@/config/site";
import { formatZAR } from "@/lib/site-utils";
import { Card, WhatsAppButton } from "./ui";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="eyebrow">{p.category === "SUPPLY" ? "Supply" : p.category}</span>
        <span className="text-xs tabular-nums text-muted-foreground">{p.year}</span>
      </div>
      <h3 className="mt-5 text-xl leading-tight">{p.client}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.work}</p>
      <p className="mt-6 font-display text-2xl font-bold tabular-nums tracking-[-0.03em]">{formatZAR(p.value)}</p>
    </Card>
  );
}

export function ServiceCard({ index, title, short }: { index: number; title: string; short: string }) {
  return (
    <Card className="flex min-h-48 flex-col justify-between">
      <span className="font-display text-sm font-bold text-primary">0{index + 1}</span>
      <div>
        <h3 className="text-2xl leading-tight">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{short}</p>
      </div>
    </Card>
  );
}

export function CredentialsBlock() {
  const c = site.credentials;
  const rows = [
    ["Registration", c.registration],
    ["CIDB CRS number", c.cidbCrs],
    ["CIDB grading", c.cidbGrading],
    ["CSD number", c.csd],
    ["NHBRC", c.nhbrc],
    ["B-BBEE", c.bbbee],
  ];
  return (
    <div className="hairline overflow-hidden rounded-3xl bg-card">
      <dl className="divide-y divide-border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:justify-between">
            <dt className="text-sm text-muted-foreground">{k}</dt>
            <dd className="text-sm font-semibold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-3 border-t p-6 sm:flex-row sm:items-center sm:justify-between">
        <a href={c.cidbVerifyUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline underline-offset-4">
          Verify on the CIDB register
        </a>
        <WhatsAppButton waKey="compliance" label="Request our compliance pack" variant="glass" />
      </div>
    </div>
  );
}
