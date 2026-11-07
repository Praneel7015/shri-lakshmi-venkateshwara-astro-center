import { defineArrayMember, defineField, defineType } from 'sanity';
import { UserIcon } from '@sanity/icons/User';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'heading', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'intro', type: 'localeText' }),
    defineField({ name: 'portrait', type: 'imageWithAlt' }),
    defineField({ name: 'biography', type: 'localeBlockContent' }),
    defineField({
      name: 'credentials',
      type: 'array',
      title: 'Titles & training',
      of: [
        defineArrayMember({
          name: 'credential',
          type: 'object',
          fields: [defineField({ name: 'title', type: 'localeString' }), defineField({ name: 'text', type: 'localeText' })],
          preview: { select: { title: 'title.en' } },
        }),
      ],
    }),
    defineField({ name: 'mission', type: 'localeText', title: 'Mission statement' }),
    defineField({ name: 'gallery', type: 'array', title: 'Photos', of: [defineArrayMember({ type: 'imageWithAlt' })], options: { layout: 'grid' } }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
});
