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
- No backend: conversion goes through WhatsApp links built by src/lib/site-utils.ts. Why: user requested no server/database.
