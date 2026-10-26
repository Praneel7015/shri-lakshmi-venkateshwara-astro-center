import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // `npm run deploy` publishes the Studio to https://<studioHost>.sanity.studio
  studioHost: process.env.SANITY_STUDIO_HOST || 'nakshatra-jyotishalaya',
});
