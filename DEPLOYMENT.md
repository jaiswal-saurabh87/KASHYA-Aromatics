# KASHYA Storefront — Deploying to Vercel

This guide deploys the KASHYA storefront to Vercel as a server-rendered (SSR) site and connects your custom domain.

> The storefront is a client-side demonstration: checkout is a labelled demo, and the newsletter form only validates locally. Deploying to Vercel does not change that — no payment, email, or order backend is claimed or created.

## What you need

- The KASHYA Storefront source zip (this folder), unzipped
- A Vercel account (free Hobby plan works)
- Your custom domain and access to its DNS settings (at your registrar, e.g. GoDaddy, Namecheap, Cloudflare)

## Step 1 — Get the code into Vercel

Pick one of the two options:

### Option A — GitHub (recommended, auto-deploys future changes)

1. Create an empty repository on GitHub and push the unzipped folder to it:

   ```sh
   git init
   git add .
   git commit -m "KASHYA storefront"
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. In Vercel: **Add New… → Project**, import the repository.
3. Vercel reads `vercel.json` in the repo and configures itself:
   - Install command: `bun install`
   - Build command: `NITRO_PRESET=vercel bun run build`
   - Output directory: `.vercel/output`
4. Click **Deploy**. The first deployment takes a few minutes.

### Option B — Vercel CLI from your computer

1. Install the Vercel CLI and Bun, then from the unzipped folder:

   ```sh
   bun install        # or: npm install
   npx vercel login
   npx vercel         # preview deploy; follow the prompts
   npx vercel --prod  # production deploy
   ```

2. The CLI uses the same `vercel.json` settings, so no extra configuration is needed.

> If you prefer npm, replace `bun install` with `npm install` in the install command (Vercel → Project → Settings → General → Build & Output Settings).

## Step 2 — Verify the deployment

1. Open the deployment URL Vercel gives you (e.g. `kashya.vercel.app` or a `*.vercel.app` preview URL).
2. Check: the hero loads, the cart drawer opens, search returns the Samrani Cup, and the footer shows the "Storefront demonstration" notice.
3. Refreshing any URL directly should not return a 404 — SSR handles all routes.

## Step 3 — Connect your custom domain

1. In Vercel, open your project → **Settings → Domains → Add**, enter your domain (e.g. `kashya.in`), and confirm.
2. Vercel shows the DNS records to create. At your registrar's DNS page, add:
   - **Apex/root domain** (`kashya.in`): an `A` record → `76.76.21.21`
   - **Subdomains** (`www.kashya.in`): a `CNAME` record → `cname.vercel-dns.com`
3. At the registrar, delete any conflicting A/CNAME records on those same names (for example old parking records), and leave nameserver settings as they are unless your registrar requires otherwise.
4. DNS can take from a few minutes up to 48 hours to propagate; Vercel shows "Valid Configuration" once it verifies the records.
5. In Vercel → **Settings → Domains**, set your custom domain as the **Primary domain** so `www` redirects to it (or vice versa, as you prefer). HTTPS certificates are issued automatically.

## Updating the site

- **GitHub flow:** every push to the main branch triggers a new deployment automatically.
- **CLI flow:** run `npx vercel --prod` again after changes.
- Product facts and prices live in `src/lib/catalog.ts`; see `README.md` for customization pointers.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Build fails on Vercel with a preset error | Confirm `vercel.json` is present and the build command includes `NITRO_PRESET=vercel`. |
| 404 on refresh of a deep link | Make sure the deployment used the `.vercel/output` directory (check Settings → Build & Output Settings); SSR routes are handled by the `__server` function Vercel generates from it. |
| Domain still shows "Invalid Configuration" after 48 h | Re-check the DNS records for typos and that no conflicting record remains, then use **Refresh** next to the domain in Vercel. |
| Old site still visible | Purge your registrar's CDN/cache if it proxies DNS (e.g. orange-cloud proxy on Cloudflare); or switch the record to "DNS only". |
| Changes not appearing | Confirm the latest deployment is listed as **Ready** in Vercel, then hard-refresh with cache disabled. |

## Local check before deploying (optional)

```sh
bun install
bun run build           # default build (Lovable/Cloudflare target)
NITRO_PRESET=vercel bun run build   # Vercel target; output lands in .vercel/output
bun run test            # runs the catalogue facts tests
```
