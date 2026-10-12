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

## Project architecture
- Keep KASHYA catalogue facts in `src/lib/catalog.ts` so pricing and product content have one typed source of truth.
- Keep the storefront as a static client-side commerce demonstration; integrations must be added explicitly before claiming orders or subscriptions are processed.
- Builds target Lovable's Cloudflare preset by default; set `NITRO_PRESET=<preset>` (e.g. `vercel`) to retarget the same codebase for another host without forking the config.
