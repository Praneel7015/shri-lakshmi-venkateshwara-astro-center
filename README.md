> **Vercel hosting:** The current deployment uses the Next.js server and on-demand page refresh. Older Apache and `deploy` branch instructions below describe the previous static export and are not applicable to this version. See [Windows handover](docs/WINDOWS_HANDOVER.md) for the current setup.

# Shri Lakshmi Venkateshwara Astro Center

**Taking over the site? Start with the [step-by-step Windows handover guide](docs/WINDOWS_HANDOVER.md).** It covers forking, Vercel, a new Sanity project, importing starter content, changing contact details and enabling automatic page refreshes.

For everyday content changes and code locations, see the [editing and maintenance guide](docs/EDITING_GUIDE.md).

Bilingual (English + ಕನ್ನಡ) astrologer site. **Next.js 16** on Vercel with **Sanity** for content. Content updates can refresh cached pages on Vercel without a full deployment.

Studio saves published content to Sanity. A protected webhook marks affected Vercel pages for refresh; it does not deploy the site again. See the [handover guide](docs/WINDOWS_HANDOVER.md) to configure it.

| What | Where |
|---|---|
| Website and Studio source | The GitHub repository |
| Published content and media | The Sanity project |
| Website hosting | The Vercel project |
| Optional content backup | The `content-backup` branch, if its GitHub Actions workflow and credentials are configured |

## Vercel deployment

Import the repository root using the Next.js framework preset. The install command in `vercel.json` installs both packages. `npm run build` builds the Studio into `public/studio` and builds the Next.js application. Follow the [Windows handover guide](docs/WINDOWS_HANDOVER.md) for environment variables and the Sanity webhook. Both lockfiles must be committed. Vercel caches npm downloads and skips install-time audits; the dependency audit workflow runs separately each week and can be started manually. Review [the preview notes](docs/PREVIEW_REVIEW.md) for remaining launch considerations.

## Quick start (development)

```bash
git clone <repo-url> astro-site && cd astro-site
npm run setup        # installs the website and the Studio
npm run dev          # http://localhost:3000, works with no Sanity project (sample content)
npm run dev:studio   # the editor on http://localhost:3333
npm run build        # builds the Studio and Next.js application
npm start            # runs the production Next.js server at http://localhost:3000
```

During development, set `CONTENT_SOURCE=local` in `.env.local` or the build environment to use the built-in content in `src/content/sample.ts`, even when Sanity is configured. Remove the variable (or set it to anything other than `local`) and rebuild to use published Sanity content again. Local changes are not automatically written to Sanity; copy approved content into Studio before handover.

Work on a branch, open a pull request, merge to `main`: the site rebuilds and deploys by itself.

## How the code is organised

| Where | What |
|---|---|
| `src/app/[locale]/…` | One folder per page. English and Kannada pages use Vercel's Next.js server and cached rendering. |
| `src/lib/content.ts` | **The only place pages get data.** Reads Sanity, or `src/content/sample.ts` if no project is set. |
| `src/lib/page-text.ts` | Section headings & intros: Studio value if filled in, otherwise the built-in wording. |
| `src/lib/sanity/queries.ts` | Every GROQ query. |
| `src/types/content.ts` | Shapes of the content. Mirrors `studio/schemas/`. |
| `src/lib/i18n.ts` | `t()` picks a language, `href()` builds links, `ui()` holds button/label text. |
| `src/lib/metadata.ts` / `seo.ts` | `<head>` tags + JSON-LD structured data. |
| `src/components/sections/…` | Page sections (no data fetching; they receive props). |
| `src/components/ui/…` | Small building blocks: buttons, ornaments, accordion. |
| `src/app/globals.css` | Design tokens (colours, fonts). Change a colour once here. |
| `studio/schemas/…` | What the client can edit. |
| `scripts/` | `build-studio` (editor → `public/studio`) and `seed` (starter content for a new, empty dataset). |

### Look & feel

An elegant celestial design in forest green `#182D25`, vivid orange `#EB6C05`, muted gold `#E8BE52` and warm cream `#FFF5E8`. Tiro and Anek fonts are retained for English and Kannada.

| Piece | Where |
|---|---|
| Star field behind every light section | `body::before` in `globals.css` (tile: `public/ornaments/stars-light.svg`) |
| `stars` / `stars-night` | Star tile on a band (light / dark). The element must be positioned (`relative`). |
| `bg-sky` | Dark band: lamp glow + night star tile with zodiac signs and a constellation |
| `<ZodiacWatermark />` | Faint zodiac wheel centred behind a dark band (footer, testimonials, why-us, CTA) |
| `frame-offset` | Photo in an offset gold frame; crop the image in a child `div` |
| Hero artwork | Replaceable under **Home page → Main hero artwork** in Sanity; a Vedic zodiac chart image is used until one is uploaded |
| Image above the hero | Optional full-width banner under **Home page → Image above hero** in Sanity |
| Wordmark | Full business name, wrapping naturally in a responsive header |
| `<Sparkle />`, `SectionHeading` | Four-point star; the star rule above every section title |
| Placeholders | `Picture` shows a patch of night sky until a photo is uploaded |
| Floating controls | Call and WhatsApp shortcuts use the current Site settings; back-to-top stays available |

Ornament tiles are generated by `scripts/ornaments/make_tiles.py` (see `scripts/ornaments/CREDITS.md`). They're single-colour masks, so a palette change in `@theme` recolours them automatically.

**Adding a field:** add it in `studio/schemas/…` → `src/types/content.ts` → the GROQ query (if it is a reference) → use it in the page.

### What the client can change without a developer
The existing CMS schemas and content fetch flow are retained. The branded preview intentionally suppresses biographies, reviews and business structured data. Contact and consultation actions show availability information until real details are supplied. Before launch, review these preview overrides alongside the CMS content.

Editable content includes: blog posts, services, pujas, testimonials, gallery, FAQs, areas, legal pages, home and about page content, **section headings and intros** ("Page headings & text"), phone/WhatsApp/address/hours, SEO titles and descriptions. Only button labels and navigation names live in code (`src/lib/i18n.ts`).

## URLs and languages

- English: `/about/` · Kannada: `/kn/about/`. Vercel serves the Next.js application; `next.config.ts` maps unprefixed English URLs into the internal `/en/` route tree.
- The editor is at `/studio/` (a single-page app served from `public/studio`). It is excluded from search engines.
- A blog post with no Kannada body still gets a `/kn/` page. It shows the English text with a notice, carries `noindex`, and its canonical points to English.

## Setup and backups

Follow the [Windows handover guide](docs/WINDOWS_HANDOVER.md) to create the Sanity project, configure Vercel, import starter content and connect automatic page refreshes. The editor is at `/studio/`. Publishing Sanity content invalidates affected Vercel page caches; it does not start a new deployment or rebuild the site.

The optional `backup-content.yml` workflow exports Sanity documents and media to the `content-backup` branch. Configure its credentials in your own GitHub repository and check the workflow before relying on it. Starter content is not a backup of edits made in another Sanity project.

This deployment uses the Vercel Next.js runtime. The previous Apache static-export deployment workflow has been removed; hosting elsewhere would require new configuration.

## Launch SEO checklist
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
- **Windows:** Use `npm.cmd` in PowerShell if the npm PowerShell shim is blocked.
- **npm on this machine:** if `npm` prints nothing, run `node "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" …` instead.
- Content rules (Google + consumer law): no guaranteed results or "solved in N days" claims. Keep the disclaimer page.
