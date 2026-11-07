import { timingSafeEqual } from 'node:crypto';
import { revalidatePath } from 'next/cache';

/** Sanity sends the shared secret in this header; never include it in the URL. */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const supplied = request.headers.get('x-sanity-revalidate-secret');
  if (!secret || !supplied) return new Response('Unauthorized', { status: 401 });
  const expected = Buffer.from(secret);
  const actual = Buffer.from(supplied);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return new Response('Unauthorized', { status: 401 });
  }

  let payload: { _type?: unknown };
  try {
    payload = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }
  if (!payload || typeof payload._type !== 'string') {
    return new Response('Missing document type', { status: 400 });
  }

  if (payload._type === 'blogPost') {
    // A post is also referenced by the home page, categories and services.
    for (const route of [
      '/[locale]/blog',
      '/[locale]/blog/[slug]',
      '/[locale]/blog/category/[slug]',
      '/[locale]/services/[slug]',
    ]) revalidatePath(route, 'page');
    revalidatePath('/en');
    revalidatePath('/kn');
  } else {
    // Documents can be referenced across sections, including the global layout.
    revalidatePath('/[locale]', 'layout');

  }
  revalidatePath('/en/blog/rss.xml');
  revalidatePath('/kn/blog/rss.xml');
  revalidatePath('/sitemap.xml');
  revalidatePath('/llms.txt');
  return Response.json({ revalidated: true });
}
