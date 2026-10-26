import { defineArrayMember, defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons/DocumentText';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'links', title: 'Links' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'localeString', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Web address',
      description: 'Click "Generate". This becomes /blog/your-title/. Avoid changing it after publishing.',
      group: 'content',
      options: { source: 'title.en', maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Publish date',
      description: 'Pick a future date to schedule the post. It goes live the night that date arrives.',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'localeText',
      title: 'Summary',
      description: 'One or two sentences shown on the blog list.',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'coverImage', type: 'imageWithAlt', title: 'Cover image', group: 'content' }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'category' }], group: 'content' }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }], group: 'content' }),
    defineField({ name: 'body', type: 'localeBlockContent', title: 'Article', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'Questions & answers (optional)',
      description: 'Shown at the end of the post and can appear directly in Google results.',
      group: 'content',
      of: [defineArrayMember({ type: 'faqItem' })],
    }),
    defineField({
      name: 'relatedServices',
      type: 'array',
      title: 'Related services',
      description: 'Pick 1–2 services this post is about. They are linked from the post, and the post appears on those service pages.',
      group: 'links',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
      validation: (r) => r.max(3),
    }),
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
  ],
  orderings: [{ title: 'Newest first', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title.en', date: 'publishedAt', media: 'coverImage', kn: 'body.kn' },
    prepare: ({ title, date, media, kn }) => ({
      title,
      media,
      subtitle: `${date ? new Date(date).toLocaleDateString('en-IN') : 'No date'}${kn?.length ? ' · EN + ಕನ್ನಡ' : ' · EN only'}`,
    }),
  },
});
