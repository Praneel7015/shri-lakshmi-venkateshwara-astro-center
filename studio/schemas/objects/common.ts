import { defineField, defineType } from 'sanity';

/** An image with a required description (alt text). */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      type: 'localeString',
      title: 'Describe the image',
      description: 'What is in the photo? Helps Google and visually impaired visitors.',
      validation: (r) => r.required(),
    }),
  ],
});

/** One question and answer. */
export const faqItem = defineType({
  name: 'faqItem',
  title: 'Question',
  type: 'object',
  fields: [
    defineField({ name: 'question', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'answer', type: 'localeText', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'question.en' } },
});

/** Search-engine settings, shown in an "SEO" tab on most documents. All optional. */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'metaTitle',
      type: 'localeString',
      title: 'Google title',
      description: 'The blue link in Google results. Aim for under 60 characters. Leave empty to use the page title.',
      validation: (r) => r.custom((v?: { en?: string; kn?: string }) => (v?.en && v.en.length > 60 ? 'Longer than 60 characters: Google may cut it off.' : true)).warning(),
    }),
    defineField({
      name: 'metaDescription',
      type: 'localeText',
      title: 'Google description',
      description: 'The grey text under the link. Aim for 120–160 characters.',
      validation: (r) => r.custom((v?: { en?: string }) => (v?.en && v.en.length > 160 ? 'Longer than 160 characters: Google may cut it off.' : true)).warning(),
    }),
    defineField({ name: 'ogImage', type: 'image', title: 'Share image', description: 'Shown when the page is shared on WhatsApp/Facebook. 1200 × 630 works best.' }),
    defineField({ name: 'noIndex', type: 'boolean', title: 'Hide from Google', initialValue: false }),
  ],
});
