# VS Medico — Go-Live Checklist

Everything needed to take the website live and keep it working, in order.
The code is production-ready; the items below are **business details, accounts and settings that only
you can provide**.

Legend: 🔴 must do before launch · 🟡 do in the first week · 🟢 ongoing

---

## 1. 🔴 Domain name

The site is currently configured for **`vsmedico.in`, which is not registered** (it doesn't exist yet).
Search engines, social previews and the email addresses all depend on the real domain.

- [ ] Register your domain (e.g. `vsmedico.in`) at a registrar such as GoDaddy, Hostinger, BigRock or Cloudflare (≈ ₹700–1,000 / year for `.in`).
- [ ] If you use a different domain, update it in **three places**:
  1. Hosting environment variable `NEXT_PUBLIC_SITE_URL` (see step 5), e.g. `https://www.yourdomain.in`
  2. `public/admin/config.yml` → `site_url` and `display_url`
  3. Admin → Company Settings → email addresses (if they use the domain)

## 2. 🔴 Real business details

The site still contains **demo values**. Every build prints a warning listing them
(`npm run build` → "Content check").

Replace them in **Sanity Studio → Company Settings** (set up with `SANITY-SETUP.txt`; before Sanity is set up, use `content/settings/company.json`):

| Field | Current demo value |
| --- | --- |
| GSTIN | `27AAAAA0000A1Z5` |
| PAN | `AAAAA0000A` |
| FSSAI No. | `11521000000123` |
| Drug Licence Form 20B | `MH-MUM-20B-184920` |
| Drug Licence Form 21B | `MH-MUM-21B-184921` |
| Sales phone & WhatsApp | `+91 98200 12345` |
| Office landline | `+91 022 2595 6789` |
| Emails | `sales@vsmedico.in`, `contact@vsmedico.in` |
| Map coordinates | check the pin lands on your warehouse |

Also check these in `src/data/companyData.ts` and `src/app/about/page.tsx`:

- [ ] **Leadership names, roles and photo.** The About page shows "V. S. Sharma", "Rohan Sharma",
      "Anita Deshmukh", "Imran Shaikh" and `public/images/founder.webp`. Git history says the photo was
      **AI-generated**. Replace it with a real photo, or remove it, before launch.
- [ ] **Business claims** must be true (consumer-protection and trademark risk): "Since 1998 / 25+ years",
      "5,000+ SKUs", "1,200+ clients", "50+ brands", "authorised stockist" for each listed brand,
      "WHO-GDP certified", "10,000 sq. ft." cold storage, "same-day delivery before 2 PM".
- [ ] **Brand list** (`PHARMA_BRANDS`): keep only companies you are actually authorised to distribute.
- [ ] **Products:** review the 12 sample products in Admin → Medicines & Products (MRPs, packs, HSN codes) and add your real catalogue.

When everything is real, set the hosting variable `STRICT_CONTENT=1` so a build **fails** if demo
values ever come back.

## 3. 🔴 Business email

- [ ] Create mailboxes on your domain: `sales@…` and `contact@…`.
      Options: **Zoho Mail** (free plan for small teams) or **Google Workspace** (paid).
- [ ] Add the DNS records your email provider gives you (MX, SPF, DKIM, DMARC) so emails don't land in spam.

## 4. 🔴 Form email delivery (Web3Forms, free)

Without this, all forms still work but hand the inquiry over to WhatsApp instead of emailing it.

- [ ] Go to <https://web3forms.com>, enter **your sales inbox** and get the free **Access Key**
      (free plan: 250 submissions / month).
- [ ] Add it to the hosting environment as `NEXT_PUBLIC_WEB3FORMS_KEY` (step 5).
- [ ] After launch, submit each form once (Contact, Quote Basket, Open Account) and confirm the email
      arrives. Check the spam folder the first time and mark it "Not spam".

## 5. 🔴 Hosting (recommended: Cloudflare Pages, free)

Cloudflare Pages is free (commercial use allowed), fast in India, gives free HTTPS, and supports the
security headers in `public/_headers`. (Netlify also works. On Vercel, the free *Hobby* plan is for
non-commercial use only, so a business site needs the Pro plan.)

- [ ] Push this project to GitHub: `prashantjagtap2002/VS-Medico`, branch `main`.
- [ ] Cloudflare dashboard → Workers & Pages → Create → Pages → **Connect to Git** → select the repo.
- [ ] Build settings:
  - Framework preset: **None** (or Next.js (Static HTML Export))
  - Build command: `npm run build`
  - Build output directory: `out`
- [ ] Environment variables (Settings → Variables), for **Production**:

  | Name | Value |
  | --- | --- |
  | `NODE_VERSION` | `22` |
  | `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.in` |
  | `NEXT_PUBLIC_WEB3FORMS_KEY` | your Web3Forms key |
  | `STRICT_CONTENT` | `1` (only after step 2 is complete) |
  | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | from step 8 (optional) |

- [ ] Custom domains → add your domain (and `www`) and follow the DNS instructions. HTTPS is automatic.
- [ ] Every push to `main`, including edits from the admin panel, now rebuilds the site automatically (about 1–2 minutes).

## 6. 🔴 Admin panel access (`https://yourdomain.in/admin/`)

- [ ] Turn on **two-factor authentication** on the GitHub account(s) that own the repo
      (GitHub → Settings → Password and authentication). This is the single most important security step,
      because whoever controls the GitHub repo controls the website.
- [ ] Create a **fine-grained personal access token**: GitHub → Settings → Developer settings →
      Fine-grained tokens → Generate new token
  - Repository access: **Only select repositories** → `VS-Medico`
  - Permissions → Repository → **Contents: Read and write**
  - Expiration: 90 days (renew when it expires)
- [ ] Open `/admin/` → **Sign In Using Access Token** → paste the token.
- [ ] Give each staff member who edits the site their own GitHub account and token. Never share one.
- [ ] Optional: "Sign In with GitHub" (no token copy/paste) needs the free
      [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) on Cloudflare Workers. Then add its URL as
      `base_url` under `backend` in `public/admin/config.yml`.

## 7. 🔴 Final pre-launch check

- [ ] Open the live site on a phone and a computer. Click through every page, add products to the basket, and submit every form.
- [ ] Click the WhatsApp button and the phone/email links to confirm they reach the right number and inbox.
- [ ] Check the map pin on the Contact page.
- [ ] Run <https://pagespeed.web.dev> on the home page (target: 90+ on mobile).
- [ ] Run <https://securityheaders.com> on your domain (target: grade A).

---

## 8. 🟡 First week: search engines & listings

- [ ] **Google Search Console** (<https://search.google.com/search-console>): add your domain, verify
      (DNS record, or the HTML-tag code in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`), then **submit
      `https://yourdomain.in/sitemap.xml`**.
- [ ] **Bing Webmaster Tools** (<https://www.bing.com/webmasters>): import from Search Console. This also covers
      Microsoft Copilot and ChatGPT search.
- [ ] **Google Business Profile** (<https://business.google.com>): create or claim "VS Medico LLP" at the
      Bhandup West address, category "Pharmaceutical products wholesaler", and add the website, hours, phone and photos.
      This matters most for local searches like "pharma distributor Bhandup".
- [ ] B2B directories: **IndiaMART**, **TradeIndia**, **JustDial**. Use the same name, address and phone
      everywhere (consistency helps Google trust the listing).
- [ ] Ask a few long-standing chemist/hospital clients for Google reviews.

## 9. 🟡 Legal

- [ ] Have a lawyer or CA review `/privacy` and `/terms` (drafts aligned with the DPDP Act, 2023 and the
      DPDP Rules, 2025). Most DPDP duties (notices, grievance handling, breach reporting, retention)
      apply from **around May 2027**, and the policy is already written to that standard.
- [ ] Decide who handles privacy requests sent to the contact email, and how quickly.
- [ ] Keep website inquiries no longer than the retention period stated in the Privacy Policy (24 months).

---

## 10. 🟢 Ongoing maintenance

| When | Task |
| --- | --- |
| Any time | Add/edit products, photos, prices and contact details in `/admin/`. The site updates in 1–2 minutes. |
| Weekly | Review GitHub **Dependabot** pull requests (automatic security updates) and merge them if the build passes. |
| Every 90 days | Renew the admin GitHub token. |
| Monthly | Check Search Console for errors and see which searches bring visitors. |
| Yearly | Trigger a rebuild at least once a year. `security.txt` expires 1 year after each build, and the footer © year updates on rebuild. |
| When upgrading the admin panel | Change the version in `public/admin/index.html` **and** regenerate the `integrity` hash (command is in the file's comment). |
| If Web3Forms usage grows | The free plan allows 250 submissions/month; upgrade if you exceed it. |

## Running costs (approx.)

| Item | Cost |
| --- | --- |
| Domain (`.in`) | ₹700–1,000 / year |
| Hosting (Cloudflare Pages) | Free |
| Form delivery (Web3Forms) | Free up to 250/month |
| Business email (Zoho Mail free / Google Workspace) | Free / ≈ ₹150+ per user per month |
| Admin panel (Sveltia CMS + GitHub) | Free |

## Quick reference

| What | Where |
| --- | --- |
| Run locally | `npm install` then `npm run dev` → <http://localhost:3000> |
| Production build | `npm run build` → static site in `out/` |
| Preview the build | `npm start` |
| Products | `content/products/*.json` (or `/admin`) |
| Contact details & licences | `content/settings/company.json` (or `/admin`) |
| Brands, FAQs, stats, page text | `src/data/companyData.ts` |
| Environment variables | `.env.example` |
| Security headers | `public/_headers` (Cloudflare/Netlify), `vercel.json` (Vercel) |
| More technical detail | `README.md` |
