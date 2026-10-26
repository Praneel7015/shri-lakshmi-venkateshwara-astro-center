/**
 * Preview the exported site (out/) exactly as GoDaddy will serve it.
 * Mirrors the rewrite rules in public/.htaccess, so if a URL works here it
 * will work live. Run with `npm start` after `npm run build`.
 */
import { createServer } from 'node:http';
import { gzipSync } from 'node:zlib';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';

const ROOT = join(import.meta.dirname, '..', 'out');
const PORT = Number(process.env.PORT ?? 4000);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.js': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.xml': 'application/xml', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon', '.mjs': 'text/javascript', '.map': 'application/json',
};

const isFile = async (path) => (await stat(path).catch(() => null))?.isFile() ?? false;

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  let path = decodeURIComponent(url.pathname);

  // Rule 2b: the Studio is a single-page app; unknown /studio/... paths load its index.html
  if (path === '/studio') {
    res.writeHead(301, { Location: '/studio/' }).end();
    return;
  }
  if (path.startsWith('/studio/') && !(await isFile(join(ROOT, path)))) path = '/studio/index.html';

  // Rule 2: /en/... → /...
  if (/^\/en(\/|$)/.test(path)) {
    res.writeHead(301, { Location: path.replace(/^\/en/, '') || '/' }).end();
    return;
  }
  // Rule 3: add trailing slash to page URLs
  if (!path.endsWith('/') && !extname(path) && !(await isFile(join(ROOT, path)))) {
    res.writeHead(301, { Location: `${path}/${url.search}` }).end();
    return;
  }
  // Rules 4–6: real files as-is, /kn/ as-is, everything else under /en/
  let file = normalize(join(ROOT, path));
  if (!(await isFile(file)) && !/^\/kn(\/|$)/.test(path)) file = join(ROOT, 'en', path);
  if (file.endsWith('\\') || file.endsWith('/') || !extname(file)) file = join(file, 'index.html');

  try {
    const type = TYPES[extname(file)] ?? 'application/octet-stream';
    // Same compression and caching as public/.htaccess, so local Lighthouse runs are realistic.
    const cache = file.includes(`_next${sep}static`) ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate';
    let body = await readFile(file);
    const headers = { 'Content-Type': type, 'Cache-Control': cache };
    if (/text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers['accept-encoding'] ?? '')) {
      body = gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
    }
    res.writeHead(200, headers).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] }).end(await readFile(join(ROOT, '404.html')).catch(() => 'Not found'));
  }
}).listen(PORT, () => console.log(`Serving out/ like Apache at http://localhost:${PORT}`));
