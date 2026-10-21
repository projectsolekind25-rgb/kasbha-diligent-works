import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { PublicSettings } from "./live-settings";

// Public read of the published site settings. Returns null on any failure so the site falls back to config.
export const getPublicSettings = createServerFn({ method: "GET" }).handler(async (): Promise<PublicSettings | null> => {
  try {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"];
    if (!url || !key) return null;
    const client = createClient(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const { data, error } = await client
      .from("site_settings")
      .select("phone_display, phone_tel, cell_display, whatsapp_number, email, offices, tagline, social_links, footer_text")
      .eq("id", 1)
      .eq("published", true)
      .maybeSingle();
    if (error) {
      console.error("site_settings read failed", error.message);
      return null;
    }
    return (data as PublicSettings | null) ?? null;
  } catch (e) {
    console.error(e);
    return null;
  }
});
