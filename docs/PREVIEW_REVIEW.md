# Branded preview review

This is a historical review from the earlier static-export setup. The current site runs on Vercel's Next.js runtime, and Sanity publishes refresh cached pages through the protected webhook without deploying the site. The checklist and browser results below describe that earlier implementation; use the Vercel deployment checks and the current [Windows handover guide](WINDOWS_HANDOVER.md) for today's setup.

## Implemented

- Full English business name in both language wordmarks, sample content, metadata, Studio title, social preview and manifest. Kannada name remains the exact English spelling pending confirmation.
- Midnight blue, royal blue, gold and ivory tokens; retained Tiro and Anek fonts; celestial hero, circular introduction artwork, shared cards and gold consultation actions.
- Removed fictional practitioner identity, statistics, qualifications, quotation, reviews and local service areas. Sample articles use an explicit preview editorial attribution. Service and puja content is marked provisional.
- Missing phone, WhatsApp, email, address and maps are hidden. Consultation links lead to the correct language’s Contact page, which states that bookings are not open yet. No new backend or booking API.
- Preview `noindex` metadata, robots exclusion and suppression of JSON-LD. `src/lib/preview.ts` controls structured-data suppression and page-level noindex. Layout metadata and robots also deliberately block indexing; review all three before launch.
- Mobile menu Escape handling, focus trap and focus restoration; menu remains available through the tablet breakpoint. Existing reduced-motion CSS and back-to-top behavior retained.
- English and Kannada routes, Sanity schemas/fetch flow, static export and hosting scripts retained. Footer credit is “Made by Praneel S”. No deployment or external CMS edits performed.

## Check results

| Check | Result |
| --- | --- |
| Website and Studio lockfile installations | Passed using local npm cache |
| Installed Next.js guides | Read layouts/pages, server/client components, CSS and output guidance |
| ESLint | Passed |
| Typecheck (`next typegen && tsc --noEmit`) | Passed |
| Studio build | Passed (`XDG_CONFIG_HOME=/tmp/astro-config npm run build` inside `studio/`) |
| Review script syntax | Passed (`node --check scripts/review.mjs`) |
| Primary palette contrast calculation | Body 13.98:1; muted 5.88:1; royal blue 8.02:1; dark gold on ivory 5.43:1; primary button 8.49:1 |
| Website production export | Passed with `next build --webpack` and the configured Google Fonts; postbuild completed. Default Turbopack build was not revalidated. |
| Playwright and Chromium | Installed in temporary tooling outside the repo; package manifests and lockfiles unchanged. |
| Local exported preview | Passed using `scripts/serve.mjs` on a dedicated port. |
| Responsive and interaction checks | Passed: 30 page/viewport combinations, both languages at 390, 768 and 1440 pixels; screenshots captured locally. |
| Exported-site browser checks | Passed: no horizontal overflow or broken images on checked pages; preview noindex, no unavailable contact links or structured data; menu Escape/navigation/focus restoration, language switch, FAQ, skip link and reduced motion. |

The export now handles an empty list of approved service areas: a build-only sentinel resolves to the existing not-found behavior, without inventing an area or adding it to the sitemap.

Contrast figures cover the main opaque token pairs, not a complete rendered accessibility audit. Kannada typography and final client content still need native-speaker and client review. No before/after baseline comparison was performed.

## Complete the browser review

On a machine with npm/Google Fonts access and permission to run a local server:

```bash
npm install --save-dev @playwright/test
npx playwright install chromium
npm run lint
npm run typecheck
npm run dev
```

In a second terminal:

```bash
REVIEW_URL=http://localhost:3000 REVIEW_PHASE=after node scripts/review.mjs
```

The script captures both languages at 390, 768 and 1440 pixels, including full homepage screenshots and About, Services, a service detail, Pujas, Blog and Contact at mobile/desktop widths. It checks horizontal overflow, image loading, browser errors, noindex, absence of unavailable contact actions, FAQ toggling, mobile menu navigation/Escape/focus restoration, language switching, keyboard skip-link focus and reduced motion. Inspect every screenshot and refine wrapping, spacing, density and button placement; automated checks alone do not establish visual acceptance.

For baseline screenshots, use the original revision `13d420c` in an isolated checkout, install dependencies there, copy the review script into that checkout, run its dev server on a separate port and use `REVIEW_PHASE=before`. This baseline was not captured during this session.

Then run the normal `npm run build`, start `npm start`, and repeat:

```bash
REVIEW_URL=http://localhost:4000 REVIEW_PHASE=exported node scripts/review.mjs
```

The validation run used temporary Playwright tooling, so package manifests and lockfiles are unchanged. The review script requires installing `@playwright/test` before use. It saves screenshots and a results JSON under `docs/review/<phase>/`.

## Client details needed before launch

- Approved Kannada business-name spelling and final logo, if available.
- Practitioner name, verified biography, qualifications and approved photographs.
- Telephone, WhatsApp number, email, full address, opening hours and real map destinations.
- Approved services and pujas, descriptions, fees, duration, consultation formats and booking process. Existing offerings and articles remain provisional.
- Consented reviews, if desired; no sample reviews are displayed.
- Final domain, approved legal copy and confirmation that all public facts are ready for indexing.

The source is ready to push on a review branch; merging to main triggers the existing deployment workflow. Restore genuine contact destinations and the approved CMS-backed contact presentation as part of launch preparation, then remove the preview notice and enable search metadata/structured data only after verification.
