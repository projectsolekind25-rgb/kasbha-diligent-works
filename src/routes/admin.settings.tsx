import { createFileRoute, useBlocker } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Office, PublicSettings, SocialLink } from "@/lib/live-settings";
import { Btn, Field, PageTitle, Panel, Skel, TextArea, TextInput } from "@/components/admin/kit";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

const office = z.object({
  label: z.string().trim().min(1, "Required").max(60),
  street: z.string().trim().min(1, "Required").max(120),
  city: z.string().trim().min(1, "Required").max(60),
  postalCode: z.string().trim().regex(/^\d{4}$/, "4 digits"),
  region: z.string().trim().min(1, "Required").max(60),
});
export const settingsSchema = z.object({
  phone_display: z.string().trim().min(6, "Required").max(30),
  phone_tel: z.string().trim().regex(/^\+\d{9,15}$/, "Format: +27312010081"),
  cell_display: z.string().trim().min(6, "Required").max(30),
  whatsapp_number: z.string().trim().regex(/^\d{9,15}$/, "Digits only, with country code: 27638886489"),
  email: z.string().trim().email("Enter a valid email").max(255),
  offices: z.array(office).length(2),
  tagline: z.string().trim().min(3, "Required").max(120),
  social_links: z
    .array(z.object({ label: z.string().trim().max(40), url: z.union([z.literal(""), z.string().trim().url("Full link, starting https://").max(300)]) }))
    .max(6),
  footer_text: z.string().trim().max(300),
});

const KEY = ["site_settings"];
const COLS = "phone_display, phone_tel, cell_display, whatsapp_number, email, offices, tagline, social_links, footer_text";
const SOCIALS = ["Facebook", "Instagram", "LinkedIn"];

function withSocials(links: SocialLink[]): SocialLink[] {
  return SOCIALS.map((label) => links.find((l) => l.label === label) ?? { label, url: "" });
}

function SettingsPage() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select(COLS).eq("id", 1).single();
      if (error) throw error;
      return data as unknown as PublicSettings;
    },
  });

  const [form, setForm] = useState<PublicSettings | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (q.data && !form) setForm({ ...q.data, social_links: withSocials(q.data.social_links ?? []) });
  }, [q.data, form]);

  const base = q.data ? { ...q.data, social_links: withSocials(q.data.social_links ?? []) } : null;
  const dirty = !!form && !!base && JSON.stringify(form) !== JSON.stringify(base);

  useBlocker({
    shouldBlockFn: () => !window.confirm("You have unsaved changes. Leave anyway?"),
    disabled: !dirty,
    enableBeforeUnload: dirty,
  });

  const save = useMutation({
    mutationFn: async (v: PublicSettings) => {
      const { error } = await supabase.from("site_settings").update(v as never).eq("id", 1);
      if (error) throw error;
    },
    onMutate: async (v) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<PublicSettings>(KEY);
      qc.setQueryData(KEY, v);
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev);
      toast.error("Could not save. Your changes are still here.");
    },
    onSuccess: () => toast.success("Saved. The website is updated."),
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  });

  if (q.isLoading || !form) {
    return (
      <>
        <PageTitle title="Site settings" />
        {q.isError ? <p className="text-sm text-muted-foreground">Could not load settings.</p> : <div className="space-y-4"><Skel className="h-64" /><Skel className="h-48" /></div>}
      </>
    );
  }

  const set = <K extends keyof PublicSettings>(k: K, v: PublicSettings[K]) => setForm({ ...form, [k]: v });
  const setOffice = (i: number, k: keyof Office, v: string) =>
    set("offices", form.offices.map((o, j) => (j === i ? { ...o, [k]: v } : o)));
  const setSocial = (i: number, v: string) => set("social_links", form.social_links.map((l, j) => (j === i ? { ...l, url: v } : l)));

  function submit(e: FormEvent) {
    e.preventDefault();
    const r = settingsSchema.safeParse(form);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path.join("."), i.message])));
      toast.error("Check the highlighted fields.");
      return;
    }
    setErrors({});
    const clean = { ...r.data, social_links: r.data.social_links.filter((l) => l.url) };
    setForm({ ...clean, social_links: withSocials(clean.social_links) });
    save.mutate(clean);
  }

  return (
    <>
      <PageTitle title="Site settings" sub="Changes go live on the website as soon as you save." />
      <form onSubmit={submit} className="space-y-5" noValidate>
        <Panel className="space-y-4">
          <h2 className="text-xl">Contact</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="WhatsApp / cell number" hint="Country code, digits only. Used by every WhatsApp button." error={errors["whatsapp_number"]}>
              <TextInput inputMode="numeric" value={form.whatsapp_number} onChange={(e) => set("whatsapp_number", e.target.value)} />
            </Field>
            <Field label="Cell number as shown" error={errors["cell_display"]}>
              <TextInput value={form.cell_display} onChange={(e) => set("cell_display", e.target.value)} />
            </Field>
            <Field label="Telephone as shown" error={errors["phone_display"]}>
              <TextInput value={form.phone_display} onChange={(e) => set("phone_display", e.target.value)} />
            </Field>
            <Field label="Telephone for dialling" hint="e.g. +27312010081" error={errors["phone_tel"]}>
              <TextInput inputMode="tel" value={form.phone_tel} onChange={(e) => set("phone_tel", e.target.value)} />
            </Field>
            <Field label="Email" error={errors["email"]}>
              <TextInput type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
          </div>
        </Panel>

        {form.offices.map((o, i) => (
          <Panel key={i} className="space-y-4">
            <h2 className="text-xl">{i === 0 ? "Head office" : "Second office"}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {(["label", "street", "city", "postalCode", "region"] as const).map((k) => (
                <Field key={k} label={{ label: "Name", street: "Street", city: "City", postalCode: "Postal code", region: "Province" }[k]} error={errors[`offices.${i}.${k}`]}>
                  <TextInput value={o[k]} onChange={(e) => setOffice(i, k, e.target.value)} />
                </Field>
              ))}
            </div>
          </Panel>
        ))}

        <Panel className="space-y-4">
          <h2 className="text-xl">Brand and footer</h2>
          <Field label="Tagline" error={errors["tagline"]}>
            <TextInput value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <Field label="Footer text" hint="Optional. Shown above the copyright line." error={errors["footer_text"]}>
            <TextArea value={form.footer_text} onChange={(e) => set("footer_text", e.target.value)} />
          </Field>
          {form.social_links.map((l, i) => (
            <Field key={l.label} label={l.label} hint="Optional. Leave empty to hide." error={errors[`social_links.${i}.url`]}>
              <TextInput type="url" placeholder="https://" value={l.url} onChange={(e) => setSocial(i, e.target.value)} />
            </Field>
          ))}
        </Panel>

        <div className="glass sticky bottom-20 z-20 flex items-center justify-between gap-3 rounded-full border p-2 pl-5 md:bottom-4">
          <span className="text-sm text-muted-foreground">{dirty ? "Unsaved changes" : "All saved"}</span>
          <div className="flex gap-2">
            {dirty && base && (
              <Btn type="button" variant="glass" onClick={() => { setForm(base); setErrors({}); }}>Discard</Btn>
            )}
            <Btn type="submit" disabled={!dirty || save.isPending}>{save.isPending ? "Saving…" : "Save"}</Btn>
          </div>
        </div>
      </form>
    </>
  );
}
