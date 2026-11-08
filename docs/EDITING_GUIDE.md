# Editing and maintaining the website

This guide explains where to make common changes. The website uses English and Kannada; check both language fields when editing content.

## Changes in Sanity Studio

Open the site's `/studio` address, sign in, select the item in the sidebar, make your changes and click **Publish**. A draft is not visible on the public site. The configured Sanity webhook refreshes affected pages after publication; allow a little time and refresh the browser. See [the handover guide](WINDOWS_HANDOVER.md) if updates do not appear.

| Change | Where in Studio |
| --- | --- |
| Phone, email, opening hours, address and map | Site settings → Business details |
| Banner above the hero, hero image, shape and size | Home page → Hero and images |
| Homepage introduction, reasons, message and questions | Home page → Homepage sections |
| Verified impact numbers | Home page → Homepage sections → Impact numbers |
| Google review rating, count and link | Site settings → Social & reviews → Google review rating |
| Services and testimonials selected for the homepage | Home page → Featured content |
| Homepage search settings | Home page → Search appearance |
| Text used in section headings | Page headings & text |
| Biography and portrait | About page |
| Individual blog posts, services, testimonials and photos | Their corresponding sidebar sections |

For a new blog post, complete its required fields, publish referenced authors or categories as needed, and publish the post. A future publication date can keep a post from appearing until that date. Upload images using the image field and provide useful descriptions where available.

The Home page tabs organize existing fields; they do not rearrange sections on the site. The optional banner above the hero is separate from the hero artwork beside the heading and the carousel images.

To show a review, add a Testimonial with its actual rating and publish it. Choose Google as its source only if it was published on this centre's Google listing. Select testimonials under Home page → Featured content; if none are selected, the newest published testimonials appear automatically. To show the Google rating and link, enter the centre's actual values under Site settings → Social & reviews. These values and manually entered reviews do not update automatically from Google.

To show the impact numbers, add the centre's verified numbers under Home page → Homepage sections → Impact numbers, give each a label and publish. The band is hidden until at least one labelled number is available.

## Changes in code

Work on a branch and open a pull request. Install dependencies with `npm run setup`; use `npm run dev` for the website and `npm run dev:studio` for Studio. See [README](../README.md) for local content and build instructions.

| Change | Files to start with |
| --- | --- |
| Homepage section order and data fetching | `src/app/[locale]/page.tsx` |
| Homepage services, pujas, articles, testimonials, gallery, FAQ or consultation | `src/components/sections/home/sections/` (one file per section) |
| Homepage hero, carousel, introduction and other existing sections | `src/components/sections/home/` |
| Navigation, footer, mobile menu | `src/components/layout/` |
| Shared cards, buttons, images and headings | `src/components/cards/` and `src/components/ui/` |
| Other page layouts | `src/app/[locale]/` |
| Site-wide styles and colors | `src/app/globals.css` |
| Sanity editing fields | `studio/schemas/`; homepage, about and site settings are in `singletons/` |
| Sanity queries and content fallback | `src/lib/sanity/queries.ts`, `src/lib/content.ts`, `src/content/sample.ts` |
| Section heading fallback text and translations | `src/lib/page-text.ts`, `src/lib/i18n.ts` |
| Page refresh after publishing | `src/app/api/sanity/revalidate/` and the webhook configuration in the handover guide |

When adding a Sanity field, update the relevant content type and query if needed, provide a safe fallback for existing documents, and build both the website and Studio. Publishing code deploys the updated Studio; it does not automatically change existing Sanity content.
