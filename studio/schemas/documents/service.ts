import { defineArrayMember, defineField, defineType } from 'sanity';
import { SparklesIcon } from '@sanity/icons/Sparkles';

/** Keep in sync with `src/components/ui/ServiceIcon.tsx`. */
const ICONS = [
  { title: 'Scroll (horoscope)', value: 'ScrollText' },
  { title: 'Hands (marriage)', value: 'HeartHandshake' },
  { title: 'Briefcase (career)', value: 'Briefcase' },
  { title: 'House (vastu)', value: 'House' },
  { title: 'Flame (puja / dosha)', value: 'Flame' },
  { title: 'Gem (gemstones)', value: 'Gem' },
  { title: 'Sparkles (other)', value: 'Sparkles' },
];

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: SparklesIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'details', title: 'Details' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'localeString', group: 'content', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Web address', group: 'content', options: { source: 'title.en' }, validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number', title: 'Order in lists', description: 'Lower numbers show first.', group: 'content' }),
    defineField({ name: 'icon', type: 'string', group: 'content', options: { list: ICONS }, initialValue: 'Sparkles' }),
    defineField({ name: 'shortDescription', type: 'localeText', title: 'Short description', description: 'One sentence for cards and menus.', group: 'content', validation: (r) => r.required() }),
    defineField({ name: 'heroImage', type: 'imageWithAlt', title: 'Main image', group: 'content' }),
    defineField({ name: 'body', type: 'localeBlockContent', title: 'Page text', group: 'content' }),
    defineField({
      name: 'whySeek',
      type: 'array',
      title: 'People usually come for…',
      description: 'Short reasons, e.g. "Delay in marriage".',
      group: 'details',
      of: [defineArrayMember({ type: 'localeString' })],
    }),
    defineField({
      name: 'process',
      type: 'array',
      title: 'How it works (steps)',
      description: 'Usually 3–4 steps. Leave empty to hide this section.',
      group: 'details',
      of: [
        defineArrayMember({
          name: 'step',
          type: 'object',
          fields: [defineField({ name: 'title', type: 'localeString' }), defineField({ name: 'text', type: 'localeText' })],
          preview: { select: { title: 'title.en' } },
        }),
      ],
    }),
    defineField({ name: 'faqs', type: 'array', title: 'Questions & answers', group: 'details', of: [defineArrayMember({ type: 'faqItem' })] }),
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title.en', subtitle: 'shortDescription.en', media: 'heroImage' } },
});
