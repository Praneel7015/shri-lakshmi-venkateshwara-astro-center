/**
 * Builds the Sanity Studio (the content editor) into public/studio, so the
 * client can write blog posts at  https://<their-domain>/studio
 *
 * Runs before `next build`. Uses the same project ID as the website
 * (NEXT_PUBLIC_SANITY_PROJECT_ID). The build fails if the Studio's packages
 * aren't installed (`npm ci --prefix studio`).
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const studio = join(root, 'studio');
const cli = join(studio, 'node_modules', 'sanity', 'bin', 'sanity');

try {
  process.loadEnvFile(join(root, '.env.local'));
} catch {
  /* no .env.local: fine in CI, values come from the environment */
}

if (!existsSync(cli)) {
  console.error('build-studio: missing dependencies (run `npm ci --prefix studio`)');
  process.exit(1);
}

execFileSync(process.execPath, [cli, 'build', join(root, 'public', 'studio'), '--yes'], {
  cwd: studio,
  stdio: 'inherit',
  env: {
    ...process.env,
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    SANITY_STUDIO_SITE_URL: process.env.SANITY_STUDIO_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || '',
  },
});
console.log('build-studio: editor built → public/studio (open /studio on the site)');
