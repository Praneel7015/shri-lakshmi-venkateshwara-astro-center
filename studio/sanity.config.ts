import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes, SINGLETONS } from './schemas';
import { structure } from './structure';

// Filled in at build time (see scripts/build-studio.mjs and studio/.env).
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const siteUrl = process.env.SANITY_STUDIO_SITE_URL || 'https://example.com';

export default defineConfig({
  name: 'default',
  title: 'Shri Lakshmi Venkateshwara Astro Center',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    // "Vision" tab: test the website's GROQ queries (src/lib/sanity/queries.ts).
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "+" menu…
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    // …and can't be deleted or duplicated.
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType) ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action)) : actions,
    // "Open on website" link in the document menu.
    productionUrl: async (prev, { document }) => {
      const slug = (document.slug as { current?: string } | undefined)?.current;
      if (document._type === 'blogPost' && slug) return `${siteUrl}/blog/${slug}/`;
      if (document._type === 'service' && slug) return `${siteUrl}/services/${slug}/`;
      return prev;
    },
  },
});
