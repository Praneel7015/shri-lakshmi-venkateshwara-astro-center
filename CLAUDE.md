# CLAUDE.md

Bilingual astrologer site: Next.js 16 static export + Sanity, deployed to GoDaddy cPanel. Start with README.md.

## Rules
- Next.js 16 has breaking changes. Read `node_modules/next/dist/docs/` before using an unfamiliar API.
- `output: 'export'`: no server features (no route handlers that read the request, middleware/proxy, rewrites, ISR, server actions, cookies). Every dynamic route needs `generateStaticParams` + `dynamicParams = false`.
- Pages get data **only** through `src/lib/content.ts`. Section components never fetch.
- Every visible string is either a `Localized` content field (use `t()`/`ts()`) or lives in `ui()` in `src/lib/i18n.ts`, in **both** `en` and `kn`.
- Internal links always use `href(locale, '/path/')` (trailing slash).
- A schema change touches three places: `studio/schemas/`, `src/types/content.ts`, `src/lib/sanity/queries.ts` (+ `src/content/sample.ts` if the sample should show it).
- Colours and fonts are tokens in `src/app/globals.css` (`bg-night`, `text-saffron`…). No raw hex in components.
- Decoration uses the existing pieces (README → Look & feel): `stars`/`stars-night`/`bg-sky` bands, `<ZodiacWatermark />`, `frame-offset` photos, `<Sparkle />`. Keep ornaments faint and behind text. Keep the footer credit "Made by Praneel S".
- Section headings/intros go through `getPageText()` (src/lib/page-text.ts) so the client can override them in "Page headings & text".
- Git flow: work on branches, merge to `main`. CI builds and commits the site to the `deploy` branch; servers only `git pull` that branch. Never commit `out/` to `main`.
- Keep the copy honest: no guaranteed outcomes.

## Commands
- `npm run setup` (installs site + studio) · `npm run dev` · `npm run dev:studio` · `npm run build` (site + editor; then `npm start` to preview out/ like Apache) · `npm run lint` · `npm run typecheck`
- Studio: `cd studio && npm run dev` · `npx sanity schema validate`
- `npm run seed -- --dry` writes `studio/seed/sample.ndjson`; without `--dry` it uploads (needs a token).
