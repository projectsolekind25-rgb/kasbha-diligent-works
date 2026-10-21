import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Ctx = { supabase: { rpc: (fn: string, args: Record<string, unknown>) => PromiseLike<{ data: unknown }> }; userId: string };

async function assertAdmin(ctx: Ctx) {
  const { data } = await ctx.supabase.rpc("has_role", { _user_id: ctx.userId, _role: "admin" });
  if (data !== true) throw new Error("Forbidden");
}

export interface AdminUser {
  id: string;
  email: string;
  pending: boolean;
  lastSignIn: string | null;
  isYou: boolean;
}

export const listAdmins = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminUser[]> => {
    await assertAdmin(context as unknown as Ctx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles, error } = await supabaseAdmin.from("user_roles").select("user_id").eq("role", "admin");
    if (error) throw new Error("Could not load admins");
    const users = await Promise.all(
      (roles ?? []).map(async (r) => {
        const { data } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
        const u = data.user;
        return {
          id: r.user_id,
          email: u?.email ?? "(unknown)",
          pending: !u?.last_sign_in_at,
          lastSignIn: u?.last_sign_in_at ?? null,
          isYou: r.user_id === context.userId,
        };
      }),
    );
    return users.sort((a, b) => a.email.localeCompare(b.email));
  });

export const inviteAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ email: z.string().trim().toLowerCase().email().max(255) }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as unknown as Ctx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const origin = getRequest().headers.get("origin") ?? new URL(getRequest().url).origin;
    const { data: inv, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(data.email, {
      redirectTo: `${origin}/admin/reset-password`,
    });
    if (error || !inv.user) {
      console.error("invite failed", error?.message);
      return { ok: false as const, message: /already/i.test(error?.message ?? "") ? "That email already has an account." : "Invite could not be sent." };
    }
    const { error: roleErr } = await supabaseAdmin.from("user_roles").upsert({ user_id: inv.user.id, role: "admin" }, { onConflict: "user_id,role" });
    if (roleErr) return { ok: false as const, message: "Invite sent, but admin access could not be granted." };
    return { ok: true as const };
  });

export const removeAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ userId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as unknown as Ctx);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin");
    if ((count ?? 0) <= 1) return { ok: false as const, message: "You can't remove the last admin." };
    const { error } = await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId).eq("role", "admin");
    if (error) return { ok: false as const, message: "Could not remove admin." };
    return { ok: true as const };
  });
