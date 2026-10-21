import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { Logo } from "@/components/site/ui";
import { Btn, Field, Panel, Skel, TextInput } from "@/components/admin/kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "KASBHA Admin" },
      { name: "description", content: "KASBHA staff area." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "KASBHA Admin" },
      { property: "og:description", content: "KASBHA staff area." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLayout,
});

type Gate = { state: "loading" } | { state: "out" } | { state: "denied"; session: Session } | { state: "in"; session: Session };

async function resolveGate(session: Session | null): Promise<Gate> {
  if (!session) return { state: "out" };
  const { data } = await supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" });
  return data === true ? { state: "in", session } : { state: "denied", session };
}

function AdminLayout() {
  const { pathname } = useLocation();
  const [gate, setGate] = useState<Gate>({ state: "loading" });
  const qc = useQueryClient();

  useEffect(() => {
    let alive = true;
    supabase.auth.getSession().then(async ({ data }) => {
      const g = await resolveGate(data.session);
      if (alive) setGate(g);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      if (event === "SIGNED_OUT") qc.clear();
      resolveGate(session).then((g) => alive && setGate(g));
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [qc]);

  const bare = pathname.startsWith("/admin/reset-password");

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      {bare ? (
        <Outlet />
      ) : gate.state === "loading" ? (
        <div className="mx-auto max-w-md space-y-4 px-5 pt-24">
          <Skel className="h-10 w-40" />
          <Skel className="h-48" />
        </div>
      ) : gate.state === "out" ? (
        <Login />
      ) : gate.state === "denied" ? (
        <Denied email={gate.session.user.email ?? ""} />
      ) : (
        <Shell email={gate.session.user.email ?? ""} />
      )}
    </div>
  );
}

const tabs = [
  { to: "/admin", label: "Overview", icon: "M3 12l9-8 9 8M5 10v10h14V10" },
  { to: "/admin/settings", label: "Settings", icon: "M4 6h16M4 12h16M4 18h10" },
  { to: "/admin/users", label: "Users", icon: "M16 19v-1a4 4 0 0 0-8 0v1M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6" },
] as const;

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

async function signOut(qc: ReturnType<typeof useQueryClient>) {
  await qc.cancelQueries();
  qc.clear();
  await supabase.auth.signOut();
}

function Shell({ email }: { email: string }) {
  const { pathname } = useLocation();
  const qc = useQueryClient();
  const active = (to: string) => (to === "/admin" ? pathname === "/admin" || pathname === "/admin/" : pathname.startsWith(to));
  return (
    <div className="md:flex">
      <aside className="hairline sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r bg-surface p-5 md:flex">
        <Logo />
        <nav className="mt-8 space-y-1">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "press flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium",
                active(t.to) ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon d={t.icon} /> {t.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-3 text-xs text-muted-foreground">
          <p className="truncate">{email}</p>
          <Btn variant="glass" className="w-full" onClick={() => signOut(qc)}>Sign out</Btn>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="glass sticky top-0 z-30 flex h-14 items-center justify-between border-b px-5 md:hidden">
          <Logo />
          <button className="press text-sm font-medium text-muted-foreground" onClick={() => signOut(qc)}>Sign out</button>
        </header>
        <main className="mx-auto max-w-3xl px-5 pb-32 pt-8 sm:px-8 md:pb-16 md:pt-12">
          <Outlet />
        </main>
      </div>

      <nav
        className="glass fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className={cn("press flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium", active(t.to) ? "text-primary" : "text-muted-foreground")}
          >
            <Icon d={t.icon} />
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(72),
});

function Login() {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (mode === "forgot") {
      const r = loginSchema.shape.email.safeParse(email);
      if (!r.success) return setErrors({ email: r.error.issues[0]?.message ?? "Invalid" });
      setBusy(true);
      const { error } = await supabase.auth.resetPasswordForEmail(r.data, { redirectTo: `${window.location.origin}/admin/reset-password` });
      setBusy(false);
      if (error) return toast.error("Could not send the reset email. Try again.");
      toast.success("Check your email for a reset link.");
      return setMode("login");
    }
    const r = loginSchema.safeParse({ email, password });
    if (!r.success) {
      return setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
    }
    setErrors({});
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(r.data);
    setBusy(false);
    if (error) toast.error("Email or password is incorrect.");
  }

  return (
    <div className="mx-auto max-w-sm px-5 pt-20 sm:pt-28">
      <Logo />
      <h1 className="mt-8 text-4xl">{mode === "login" ? "Staff sign in" : "Reset password"}</h1>
      <Panel className="mt-6">
        <form onSubmit={submit} className="space-y-4" noValidate>
          <Field label="Email" error={errors["email"]}>
            <TextInput type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          {mode === "login" && (
            <Field label="Password" error={errors["password"]}>
              <TextInput type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field>
          )}
          <Btn type="submit" disabled={busy} className="w-full">
            {busy ? "Please wait…" : mode === "login" ? "Sign in" : "Send reset link"}
          </Btn>
        </form>
      </Panel>
      <button
        className="press mt-4 text-sm text-muted-foreground hover:text-foreground"
        onClick={() => {
          setErrors({});
          setMode(mode === "login" ? "forgot" : "login");
        }}
      >
        {mode === "login" ? "Forgot password?" : "Back to sign in"}
      </button>
    </div>
  );
}

function Denied({ email }: { email: string }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-sm px-5 pt-28">
      <h1 className="text-4xl">No access</h1>
      <p className="mt-3 text-sm text-muted-foreground">{email} is not an admin. Ask an existing admin to invite you.</p>
      <Btn
        variant="glass"
        className="mt-6"
        onClick={async () => {
          await signOut(qc);
          navigate({ to: "/admin", replace: true });
        }}
      >
        Sign out
      </Btn>
    </div>
  );
}
