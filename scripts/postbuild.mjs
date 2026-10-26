/**
 * Runs after `next build`.
 *
 * Windows-only fix: Next.js writes nested prefetch files as folders
 * (`__next.$d$locale/about/__PAGE__.txt`) because it joins Windows
 * backslash paths, while the browser asks for the flat name
 * (`__next.$d$locale.about.__PAGE__.txt`). Linux builds (GitHub Actions,
 * which deploys the live site) are already correct, so this does nothing there.
 */
import { readdir, rename, rm, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const OUT = join(import.meta.dirname, '..', 'out');

async function filesUnder(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((e) => (e.isDirectory() ? filesUnder(join(dir, e.name)) : [join(dir, e.name)])));
  return nested.flat();
}

async function flatten(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(dir, entry.name);
    if (entry.name.startsWith('__next.')) {
      for (const file of await filesUnder(path)) {
        const flatName = `${entry.name}.${relative(path, file).split(sep).join('.')}`;
        await rename(file, join(dir, flatName));
      }
      await rm(path, { recursive: true });
    } else {
      await flatten(path);
    }
  }
}

if (process.platform === 'win32' && (await stat(OUT).catch(() => null))) {
  await flatten(OUT);
  console.log('postbuild: flattened Next.js prefetch files (Windows fix)');
}
