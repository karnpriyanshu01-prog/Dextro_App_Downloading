# Dextro Play — Official Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Frontend is complete and
functional; backend data (Supabase) is stubbed with clearly-marked
placeholders so nothing fake is ever shown to a real visitor.

## What's implemented

- All pages from the brief: home, download, app, features, changelog,
  guides (+ 3 full articles), FAQ, about, contact, and all legal pages
  (privacy, terms, disclaimer, DMCA, cookie policy).
- Reusable components: Header, Footer, DownloadCard, InfoBar, FeatureGrid,
  SportsGrid, GuideCard, FaqAccordion, Breadcrumbs, ContactForm, AdUnit.
- SEO: per-page metadata, canonical URLs, Open Graph/Twitter tags, JSON-LD
  (Organization, WebSite, SoftwareApplication, Article, BreadcrumbList,
  FAQPage), dynamic `sitemap.xml` and `robots.txt`, `/ads.txt` route.
- Security: CSP + standard security headers in `next.config.mjs`, input
  validation + honeypot + rate limiting on `/api/contact`, rate limiting +
  publish-check on `/api/download/latest`.
- AdSense-ready `AdUnit` component: renders nothing until you set
  `ADSENSE_PUBLISHER_ID`, always labeled "Advertisement," never placed next
  to download/nav/player controls.

## Design

The site now matches the approved design preview:

- **Palette**: white-dominant (≈70%), ink-black text/panels (≈20%), red
  accents (≈10%) — no dark theme anymore.
- **Skeuomorphic UI**: glossy pressable buttons, embossed "panel" cards,
  glossy dome badges for feature/sport icons, dark digital-plate readouts
  for the version/size/status info bar.
- **Left ad rail**: a sticky vertical column of 3 ad slots on the left side
  of every major content page (home, download, app, features, changelog,
  guides + articles, FAQ) — hidden on mobile below `lg` breakpoint, where
  ads fall back to horizontal in-content bands instead.
- **In-content ad bands** between every major section, all using the same
  labeled, dashed-tray `AdUnit` component so they never look like site UI.
- **Phone screenshot frames**: the hero and a dedicated "App Screenshots"
  section render real screenshots you add via `/admin/screenshots` (falls
  back to a placeholder frame if none are published yet).
- Legal pages (privacy, terms, disclaimer, DMCA, cookie policy) and admin
  panel intentionally keep a simpler layout — no ad rail on thin/legal
  pages, and the admin UI stays functional-first rather than skeuomorphic,
  since it's an internal tool.

## Admin panel

The site now has a working, Supabase-backed admin panel at `/admin`:

- **Releases** (`/admin/releases`) — create versions, write release notes,
  add multiple download mirrors per release (label + URL + region),
  publish/unpublish, and set which version is "latest."
- **Articles** (`/admin/articles`) — create/publish/unpublish guide content.
- **FAQ** (`/admin/faqs`) — add/hide/delete FAQ entries shown on `/faq` and
  the homepage.
- **Screenshots** (`/admin/screenshots`) — add app screenshots by pasting a
  hosted image URL (upload the image to Supabase Storage, R2, or any CDN
  first, then paste its URL here).

The public download button now opens a **"choose a download link" panel**
listing every mirror you've added for the latest release, matching the
design preview. Each click is logged (release + mirror only, no personal
data) via `/api/download/track`.

### Create your first admin login

There's no public sign-up — admin users are created directly in Supabase:

1. Open your Supabase project → **Authentication → Users → Add user**.
2. Create a user with an email + password (use "Auto Confirm User" so you
   don't need email delivery set up).
3. Go to `/admin/login` on the site and sign in with those credentials.

Anyone signed in can manage all content — the RLS policies in
`supabase/schema.sql` treat "authenticated" as "admin." Only create
Supabase Auth users for people you trust with full admin access.

## What you still need to do

1. **Install dependencies**: `npm install` — this now includes
   `@supabase/supabase-js` and `@supabase/ssr`.
2. **Run the database schema**: open your Supabase project's SQL Editor and
   run `supabase/schema.sql` (includes `app_releases`, `release_mirrors`,
   `articles`, `faqs`, `app_screenshots`, `download_events`,
   `contact_messages`, and their RLS policies).
3. **`.env.local` is already filled in** with the project URL and anon key
   you provided. The anon key is safe to expose client-side — every table
   it can touch is protected by RLS. `SUPABASE_SERVICE_ROLE_KEY` is left
   blank on purpose; nothing in this codebase needs it, and it must never
   be added to a `NEXT_PUBLIC_` variable or committed anywhere public.
4. **Create your admin login** — see above.
5. **Add a release** via `/admin/releases` with at least one mirror, so the
   public download button has something to show.
6. **APK hosting**: host the actual APK file(s) on a CDN (Cloudflare R2,
   Supabase Storage, etc.) and paste those URLs in as mirrors. Compute the
   real SHA-256 of the file and put it in the release form.
7. **AdSense**: set `ADSENSE_PUBLISHER_ID` once your account is approved.
   `/ads.txt` and `AdUnit` both read from this automatically.
8. **Analytics**: set `NEXT_PUBLIC_GA_ID` and wire up your analytics
   provider of choice (not included, to avoid loading tracking scripts
   before you've decided on one).
9. **Deployment**: deploy to Vercel or Cloudflare Pages, put Cloudflare in
   front for WAF/rate limiting/bot protection, and set all env vars
   (including a real `NEXT_PUBLIC_SITE_URL`) in your hosting provider's
   dashboard — never commit `.env.local`.

## Local development

```bash
npm install
npm run dev
```

`.env.local` already has real Supabase values filled in — you shouldn't
need to touch it unless you're adding AdSense/analytics IDs.

## Content notes

Every number shown on the site (version, size, checksum, dates) comes from
`lib/releases.ts` / `lib/faqs.ts` / `lib/features.ts` / `lib/sports.ts` —
nothing is hardcoded into page markup. Update those files (or the Supabase
tables once connected) rather than editing individual pages.
