# KASHYA Storefront

A responsive editorial storefront for KASHYA Aromatics and KASHYA Rituals, built with React, TypeScript, TanStack Start, and Tailwind CSS v4.

## Local development

Requires Node.js 20+ and Bun (recommended).

```sh
bun install
bun run dev
```

The development server runs at the URL shown by Vite.

## Build and test

```sh
bun run build
bun run test
```

Add `NITRO_PRESET=vercel` to the build command to target Vercel instead of the default deploy target — see `DEPLOYMENT.md`.

The generated production output is suitable for the hosting target configured by TanStack Start. Deploy through Lovable, or connect the repository to a compatible static/edge host and use `bun run build` as the build command.

## Store behavior

- Search, cart, quantity controls, and subtotal are client-side demonstrations.
- Checkout is intentionally marked as a demo and never collects payment details.
- Newsletter validation is local only; no email is submitted until an integration is added.
- Product facts live in `src/lib/catalog.ts`. Add a real price only after confirming it.

## Customization

- Brand colors, type, motion, and semantic design tokens: `src/styles.css`
- Product catalogue and configured prices: `src/lib/catalog.ts`
- Storefront content and sections: `src/routes/index.tsx`
- Original editorial imagery: `src/assets/`

Replace generated campaign imagery with approved brand photography when available, preserving descriptive alt text and image dimensions. Never add reviews, certifications, policies, or commerce claims without approved source material.

## Stack

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Deploying to Vercel

`vercel.json` in the project root configures the Vercel build automatically (install with Bun, build with `NITRO_PRESET=vercel`, output `.vercel/output`). Import the repo in Vercel or run `npx vercel --prod` from the project folder — full walkthrough including custom-domain DNS setup is in `DEPLOYMENT.md`.
