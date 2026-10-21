import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/ui";
import { Btn, Field, Panel, TextInput } from "@/components/admin/kit";

export const Route = createFileRoute("/admin/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Set password · KASBHA Admin" },
      { name: "description", content: "Set your KASBHA staff password." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Set password · KASBHA Admin" },
      { property: "og:description", content: "Set your KASBHA staff password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPassword,
});

const schema = z
  .object({ password: z.string().min(8, "At least 8 characters").max(72), confirm: z.string() })
  .refine((v) => v.password === v.confirm, { message: "Passwords don't match", path: ["confirm"] });

function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Invite and recovery links both arrive with a session in the URL.
    const { data } = supabase.auth.onAuthStateChange((_e, s) => s && setReady(true));
    supabase.auth.getSession().then(({ data: d }) => d.session && setReady(true));
    return () => data.subscription.unsubscribe();
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const r = schema.safeParse({ password, confirm });
    if (!r.success) return setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
    setErrors({});
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: r.data.password });
    setBusy(false);
    if (error) return toast.error("Could not set the password. Request a new link.");
    toast.success("Password set.");
    navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="mx-auto max-w-sm px-5 pt-20 sm:pt-28">
      <Logo />
      <h1 className="mt-8 text-4xl">Set your password</h1>
      <Panel className="mt-6">
        {!ready ? (
          <p className="text-sm text-muted-foreground">Open this page from the link in your email. Links expire after a while; request a new one if needed.</p>
        ) : (
          <form onSubmit={submit} className="space-y-4" noValidate>
            <Field label="New password" error={errors["password"]}>
              <TextInput type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
            <Field label="Confirm password" error={errors["confirm"]}>
              <TextInput type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </Field>
            <Btn type="submit" disabled={busy} className="w-full">{busy ? "Saving…" : "Save password"}</Btn>
          </form>
        )}
      </Panel>
    </div>
  );
}
