import type { StructureResolver } from 'sanity/structure';
import { CogIcon } from '@sanity/icons/Cog';
import { HomeIcon } from '@sanity/icons/Home';
import { UserIcon } from '@sanity/icons/User';

/**
 * The Studio sidebar, ordered by how often the client will use it:
 * blog first, then pages, then everything else.
 */
const singleton = (S: Parameters<StructureResolver>[0], id: string, title: string, icon: React.ComponentType) =>
  S.listItem().title(title).icon(icon).id(id).child(S.document().schemaType(id).documentId(id).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blogPost').title('Blog posts'),
      S.documentTypeListItem('category').title('Blog categories'),
      S.divider(),
      singleton(S, 'homePage', 'Home page', HomeIcon),
      singleton(S, 'aboutPage', 'About page', UserIcon),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('puja').title('Pujas'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('galleryItem').title('Gallery'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.divider(),
      S.documentTypeListItem('area').title('Areas (local pages)'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('legalPage').title('Legal pages'),
      S.divider(),
      singleton(S, 'siteSettings', 'Site settings', CogIcon),
    ]);
