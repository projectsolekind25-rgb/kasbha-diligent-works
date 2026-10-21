<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All business data (contact, credentials, services, projects, plant) lives in src/config/site.ts; components read it, never hardcode. Why: one place to update.
- Public conversion goes through WhatsApp links built by src/lib/site-utils.ts. Why: no enquiry backend requested.
- Backend is the user's external Supabase (never Lovable Cloud). Editable contact/brand data lives in site_settings; the root loader fetches it and applySettings() overlays it on src/config/site.ts defaults. Why: staff edits go live without redeploy, public components stay unchanged.
- /admin is client-only (ssr:false), noindex, unlinked; it alone imports the Supabase browser client (start.ts attaches the bearer lazily, only on /admin). Why: zero weight on the public bundle.
- Admin checks use has_role() + user_roles; privileged user ops run in server fns after that check. Admin-only data (CIDB expiry) lives in admin_settings. Why: never trust client checks.
- Netlify deploys use netlify.toml (NITRO_PRESET=netlify, publish dist); vite.config stays untouched so Lovable builds keep their default target. Why: one codebase, two hosts.
