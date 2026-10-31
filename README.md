# VS Medico LLP — Website

B2B website for VS Medico LLP, a pharmaceutical wholesale distributor in Bhandup West, Mumbai.
Built with Next.js 16 as a **fully static site** (`output: 'export'`): every page is pre-rendered
HTML, so it is fast, cheap to host, and has no server to maintain.

> **Launching?** Follow [`GO-LIVE-CHECKLIST.md`](GO-LIVE-CHECKLIST.md): domain, real business details,
> email, hosting, admin access, search engines.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site written to ./out
npm start        # preview ./out at http://localhost:3000
```

## Environment variables

Copy `.env.example` to `.env.local` locally, and add the same values in your hosting provider's settings.
All are optional.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Live domain, e.g. `https://vsmedico.in`. Used for canonical URLs, sitemap, structured data and social cards. |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Emails form submissions (contact, quote basket, account registration) to the sales inbox. Get a free key at [web3forms.com](https://web3forms.com). **Without it, every form falls back to sending the inquiry via WhatsApp.** |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag verification code. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification code. |
| `STRICT_CONTENT` | Set to `1` in production once real business details are entered. The build then fails if demo values (dummy GSTIN, test phone numbers, …) are still present. |

## Content management (Sanity)

Products, company details and gallery photos are edited in **Sanity Studio**, a hosted editor at
`https://<your-name>.sanity.studio`. Step-by-step setup is in **`SANITY-SETUP.txt`**.

| Command | What it does |
| --- | --- |
| `npm run studio` | Runs the Studio locally at http://localhost:3333 |
| `npm run studio:deploy` | Publishes the Studio to `*.sanity.studio` |
| `npm run sanity:import` | One-time copy of the checked-in `content/` JSON (and images) into Sanity |

How it reaches the website: every `npm run build` first runs `scripts/sync-sanity-content.mjs`, which
downloads the **published** Sanity content into `content/`, and then the static site is generated from it.
The live site never queries Sanity, so after publishing in the Studio you need a new deployment (add a
Sanity webhook that calls your host's deploy hook to make this automatic). Without Sanity variables, or if
Sanity is unreachable, the checked-in JSON is used, unless `STRICT_CONTENT=1`, which fails the build instead.

Sanity variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, optional
`SANITY_API_READ_TOKEN` (hosting + `.env.local`), and `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`
(`.env.local`, for the Studio commands).

## Legacy Git-based admin panel (`/admin`)

> Once Sanity is configured, **don't use `/admin`**: each build overwrites `content/` with Sanity's
> content, so edits made here would be lost.

Products (medicines) and company details are edited at **`https://your-domain/admin/`** using
[Sveltia CMS](https://sveltiacms.app), a Git-based CMS:

- **No database, no server.** Each save is a commit to this GitHub repo; your host rebuilds the site (1–2 minutes).
- **Zero impact on site speed.** The CMS script loads only on `/admin`; public pages stay pure static HTML.
- **Images are optimised automatically**: resized to max 1200 px and converted to WebP in the browser before upload.

**Signing in:** click **Sign In Using Access Token** and paste a GitHub
[fine-grained personal access token](https://github.com/settings/personal-access-tokens/new) limited to this
repository with **Contents: Read and write**. (The "Sign In with GitHub" button needs an OAuth helper such as
[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) on Cloudflare Workers. Optional, and
useful if several staff members will edit.) On localhost you can also choose **Work with Local Repository**
in Chrome or Edge.

What you can manage:

| Section | Stored in | Notes |
| --- | --- | --- |
| Medicines & Products | `content/products/*.json` (one file per product) | Add, edit, delete, upload photos, set stock status, mark as Featured (home page). Each product gets its own SEO page at `/products/<name>`. |
| Company Settings | `content/settings/company.json` | Phone numbers, WhatsApp, emails, address, map coordinates, drug licence numbers, GSTIN. |
| Uploaded images | `public/images/uploads/` | Served at `/images/uploads/...`. |

Brands, FAQs, stats and page copy are still edited in `src/data/companyData.ts`.

## Deploying

Any static host works. Connect the GitHub repo so every push (including admin-panel edits) redeploys:

| Host | Build command | Output directory |
| --- | --- | --- |
| Vercel | `npm run build` | `out` |
| Netlify | `npm run build` | `out` (cache headers come from `public/_headers`) |
| Cloudflare Pages | `npm run build` | `out` (cache headers come from `public/_headers`) |

`SITE_URL` in `src/data/companyData.ts` must match the live domain (it is used for canonical URLs, the
sitemap and structured data).

## SEO & AI search

- Per-page titles, descriptions, canonical URLs and Open Graph/Twitter cards (`src/lib/seo.ts`).
- Structured data: Organization, WholesaleStore/LocalBusiness (address, geo, hours, brands), WebSite,
  FAQPage (home), Drug/Product + BreadcrumbList (each product page).
- `sitemap.xml` (includes every product page), `robots.txt` (search and AI-answer crawlers allowed;
  training-only crawlers and `/admin` blocked), and `llms.txt`, a plain-text summary for AI assistants.
- Social share image: `public/og-image.png` (1200×630).

## Security

The public site is static HTML (no server, database or login), which removes most attack surface. On top of that:

- **Content Security Policy** (`src/lib/security.ts`, production builds): the browser only runs scripts from this
  site and only connects to Web3Forms and Google Maps. Injected third-party scripts and data exfiltration are blocked.
- **HTTP security headers** (`public/_headers` for Cloudflare Pages/Netlify, `vercel.json` for Vercel): HSTS,
  clickjacking protection (`frame-ancestors 'none'`, `X-Frame-Options`), `nosniff`, Referrer-Policy, Permissions-Policy.
- **Admin panel:** protected by GitHub authentication. Its script is pinned with a Subresource Integrity hash, and
  `/admin` is excluded from search engines.
- **Forms:** honeypot spam trap, input validation and length limits. Structured data is serialised safely
  (`jsonLd()` escapes `<`), and data restored from localStorage is validated.
- **Dependencies:** `npm audit` is clean, and Dependabot (`.github/dependabot.yml`) opens weekly update PRs.
- `/.well-known/security.txt` tells researchers how to report issues.

## Build scripts

| Script | When | What |
| --- | --- | --- |
| `scripts/check-content.mjs` | before every build (`prebuild`) | Warns about demo business details and validates product files (bad JSON, duplicate SKUs, missing images). |
| `scripts/fix-export-segments.mjs` | after every build (`postbuild`) | See note below. |

## Project structure

```
content/                  CMS-managed data (products, company settings)
public/admin/             Admin panel (Sveltia CMS) + config.yml
src/app/                  Pages (incl. /privacy, /terms), sitemap, robots, llms.txt, manifest, icons
src/components/           UI components (forms in components/forms + *Form.tsx)
src/data/companyData.ts   Company info, brands, FAQs (reads content/settings)
src/data/products.ts      Build-time product loader (reads content/products)
src/lib/forms.ts          Form submission (Web3Forms), validation, WhatsApp links
src/lib/seo.ts            Per-page metadata helper
src/lib/security.ts       Content Security Policy, safe JSON-LD
scripts/                  Post-build fixes
```

### Note on `scripts/fix-export-segments.mjs`

Runs automatically after `npm run build`. It works around a Windows-only bug in the Next 16 static export (still present in 16.4),
where route-prefetch files are written into nested folders instead of the flat filenames the client router
requests. The bug makes every prefetch 404. On Linux/macOS (where most hosts build) the script is a no-op.
