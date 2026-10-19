import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { contactServiceOptions, site } from "@/config/site";
import { buildContactMessage, pageHead, waLink } from "@/lib/site-utils";
import { Card, PageHero, Section, WhatsAppButton, WhatsAppIcon } from "@/components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "/contact",
      "Contact KASBHA | Building contractor Durban & Midrand",
      "WhatsApp 063 888 6489, call 031 201 0081 or email kasbhapty@gmail.com. Offices in Berea, Durban and Midrand, Gauteng.",
    ),
  component: Contact,
});

const field = "hairline w-full rounded-2xl bg-surface px-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-ring";

function Contact() {
  const k = site.contact;
  const [name, setName] = useState("");
  const [service, setService] = useState(contactServiceOptions[0]);
  const [message, setMessage] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    window.open(waLink(buildContactMessage(name, service, message)), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's get to work.">
        WhatsApp is fastest.
      </PageHero>
      <Section className="pt-0">
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="space-y-5 p-8">
            <WhatsAppButton waKey="/contact" label={`WhatsApp ${k.cellDisplay}`} />
            <dl className="space-y-4 text-[15px]">
              <div>
                <dt className="eyebrow">Telephone</dt>
                <dd><a className="underline-offset-4 hover:underline" href={`tel:${k.phoneTel}`}>{k.phoneDisplay}</a></dd>
              </div>
              <div>
                <dt className="eyebrow">Cell / WhatsApp</dt>
                <dd><a className="underline-offset-4 hover:underline" href={`tel:${k.cellTel}`}>{k.cellDisplay}</a></dd>
              </div>
              <div>
                <dt className="eyebrow">Email</dt>
                <dd><a className="underline-offset-4 hover:underline" href={`mailto:${k.email}`}>{k.email}</a></dd>
              </div>
              <div>
                <dt className="eyebrow">Website</dt>
                <dd>{site.websiteLabel}</dd>
              </div>
              {k.offices.map((o) => (
                <div key={o.label}>
                  <dt className="eyebrow">{o.label}</dt>
                  <dd>
                    {o.street}, {o.city}, {o.postalCode}
                    <br />
                    <a href={o.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline underline-offset-4">
                      Open in Google Maps
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="p-8">
            <h2 className="text-3xl">Send a message.</h2>
            <form onSubmit={submit} className="mt-6 space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-sm text-muted-foreground">Name</span>
                <input required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} className={field} autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-muted-foreground">Service</span>
                <select value={service} onChange={(e) => setService(e.target.value)} className={field}>
                  {contactServiceOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm text-muted-foreground">Message</span>
                <textarea required maxLength={1000} rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className={field} />
              </label>
              <button type="submit" className="press inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-semibold text-primary-foreground">
                <WhatsAppIcon /> Send via WhatsApp
              </button>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
}
