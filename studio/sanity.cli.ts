import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // The Studio is served from the website at yoursite.com/studio.
  // (Set here only: also setting basePath in sanity.config.ts would make it /studio/studio.)
  project: { basePath: '/studio' },
  // Optional: `npm run deploy` also publishes a copy to https://<studioHost>.sanity.studio
  studioHost: process.env.SANITY_STUDIO_HOST || 'nakshatra-jyotishalaya',
});
