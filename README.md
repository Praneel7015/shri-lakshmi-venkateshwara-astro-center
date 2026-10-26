# Astrologer website (Nakshatra Jyotishalaya, placeholder brand)

Bilingual (English + ಕನ್ನಡ) astrologer site. **Next.js 16** static export, **Sanity** for content, hosted on **GoDaddy cPanel**.

```
Client edits in Sanity Studio ──publish──▶ webhook ──▶ GitHub Action builds ──FTP──▶ cPanel (live in ~3 min)
```

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000, works with no Sanity project (uses sample content)
npm run build        # static site → out/
npm start            # preview out/ exactly as Apache serves it (http://localhost:4000)
```

Studio (the client's editor):

```bash
cd studio
npm install
npm run dev          # http://localhost:3333
```

## How the code is organised

| Where | What |
|---|---|
| `src/app/[locale]/…` | One folder per page. Every page is built twice: `en` and `kn`. |
| `src/lib/content.ts` | **The only place pages get data.** Reads Sanity, or `src/content/sample.ts` if no project is set. |
| `src/lib/sanity/queries.ts` | Every GROQ query. |
| `src/types/content.ts` | Shapes of the content. Mirrors `studio/schemas/`. |
| `src/lib/i18n.ts` | `t()` picks a language, `href()` builds links, `ui()` holds button/label text. |
| `src/lib/metadata.ts` / `seo.ts` | `<head>` tags + JSON-LD structured data. |
| `src/components/sections/…` | Page sections (no data fetching; they receive props). |
| `src/components/ui/…` | Small building blocks: buttons, ornaments, accordion. |
| `src/app/globals.css` | Design tokens (colours, fonts). Change a colour once here. |
| `studio/schemas/…` | What the client can edit. |

**Adding a field:** add it in `studio/schemas/…` → `src/types/content.ts` → the GROQ query (if it is a reference) → use it in the page.

## URLs and languages

- English: `/about/` · Kannada: `/kn/about/`. Everything is built under `out/en/` and `out/kn/`. `public/.htaccess` serves `/about/` from `out/en/about/` (in dev, `next.config.ts` does the same).
- A blog post with no Kannada body still gets a `/kn/` page. It shows the English text with a notice, carries `noindex`, and its canonical points to English, so Google never sees thin duplicates.

## One-time setup for launch

### 1. Sanity
1. `cd studio && npx sanity init --env` (or create a project at sanity.io/manage). Put the ID in `studio/.env` and `/.env.local` (see the `.env.example` files).
2. Sanity → API → **CORS origins**: add `http://localhost:3000`, `http://localhost:3333` and the live site URL.
3. Load the starter content: create an *Editor* token (API → Tokens), put it in `.env.local` as `SANITY_WRITE_TOKEN`, then run `npm run seed`.
4. `cd studio && npm run deploy` → the Studio goes live at `https://nakshatra-jyotishalaya.sanity.studio`. Invite the client (Members → Editor role).

### 2. GitHub repository secrets (Settings → Secrets and variables → Actions)
| Name | Value |
|---|---|
| `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` | cPanel → FTP Accounts |
| `SANITY_PROJECT_ID` | from Sanity |
| `WEB3FORMS_KEY` | free key from web3forms.com (contact form → client's email) |
| Variable `SITE_URL` | e.g. `https://clientdomain.com` (no www, matches `.htaccess`) |

### 3. Publish → rebuild webhook
1. GitHub → Settings → Developer settings → **Fine-grained token**: this repo only, permission *Contents: Read and write*.
2. Sanity → API → **Webhooks** → Create:
   - URL: `https://api.github.com/repos/<owner>/<repo>/dispatches`, method **POST**
   - Dataset `production`, trigger on *Create, Update, Delete*
   - Filter: leave empty (drafts are ignored by default)
   - Projection: `{"event_type": "sanity-publish"}`
   - HTTP headers: `Authorization: Bearer <token>` and `Accept: application/vnd.github+json`
3. Publish anything in the Studio. *Actions* on GitHub should start a "Build & deploy" run.

Scheduled posts: a post with a future **Publish date** is hidden until that date. The nightly build (00:30 IST) makes it appear.

### 4. Launch SEO checklist
- [ ] Real details in **Site settings** (NAP must match Google Business Profile word for word)
- [ ] Replace placeholder testimonials with real, consented ones; add the real Google rating (or leave it empty)
- [ ] Upload photos (portrait, services, pujas) with alt text
- [ ] Search Console + Bing Webmaster: verify (codes go in Site settings → SEO), submit `/sitemap.xml`
- [ ] Google Business Profile: website link, categories, photos, ask happy clients for reviews
- [ ] Citations with identical NAP: JustDial, Sulekha, Bing Places
- [ ] Rich Results Test on home, a service and a post
- [ ] Lighthouse (mobile) ≥ 95 on home and a post
- [ ] Have a native speaker review the Kannada UI strings in `src/lib/i18n.ts`

## Notes
- **Windows builds:** `scripts/postbuild.mjs` fixes a Next.js bug where prefetch files are written as folders on Windows. Linux (CI) is unaffected.
- **npm on this machine:** if `npm` prints nothing, run `node "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" …` instead.
- Content rules (Google + consumer law): no guaranteed results or "solved in N days" claims. Keep the disclaimer page.
