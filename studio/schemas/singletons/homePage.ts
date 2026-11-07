import { defineArrayMember, defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero and images', default: true },
    { name: 'content', title: 'Homepage sections' },
    { name: 'featured', title: 'Featured content' },
    { name: 'seo', title: 'Search appearance' },
  ],
  fields: [
    defineField({
      name: 'imageAboveHero', group: 'hero',
      type: 'imageWithAlt',
      title: 'Image above hero',
      description: 'Optional full-width image shown before the homepage hero. Use a wide image and add its description; leave empty to hide this banner.',
    }),
    defineField({
      name: 'heroArtwork', group: 'hero',
      type: 'imageWithAlt',
      title: 'Main hero artwork',
      description: 'Image beside the main homepage heading. Upload or replace it here; it is separate from the carousel slide images.',
    }),
    defineField({
      name: 'heroArtworkShape', group: 'hero', title: 'Hero artwork shape', type: 'string',
      description: 'Choose the shape of the image beside the homepage heading.',
      options: { list: [{title: 'Square', value: 'square'}, {title: 'Circle', value: 'circle'}, {title: 'Wide rectangle', value: 'landscape'}, {title: 'Tall rectangle', value: 'portrait'}], layout: 'radio' },
      initialValue: 'square',
    }),
    defineField({
      name: 'heroArtworkSize', group: 'hero', title: 'Hero artwork size', type: 'string',
      description: 'Choose how large the artwork appears beside the heading.',
      options: { list: [{title: 'Small', value: 'small'}, {title: 'Medium', value: 'medium'}, {title: 'Large', value: 'large'}], layout: 'radio' },
      initialValue: 'large',
    }),
    defineField({
      name: 'hero', group: 'hero',
      type: 'array',
      title: 'Hero slides',
      description: 'The big rotating message at the top. 2–3 slides. The first slide’s heading is the page’s main heading for Google.',
      of: [
        defineArrayMember({
          name: 'heroSlide',
          type: 'object',
          fields: [
            defineField({ name: 'eyebrow', type: 'localeString', title: 'Small label above' }),
            defineField({ name: 'heading', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'text', type: 'localeText' }),
            defineField({ name: 'image', type: 'imageWithAlt', description: 'Image shown in the homepage carousel.' }),
          ],
          preview: { select: { title: 'heading.en', subtitle: 'eyebrow.en', media: 'image' } },
        }),
      ],
      validation: (r) => r.min(1).max(4),
    }),
    defineField({
      name: 'intro', group: 'content',
      type: 'object',
      title: 'About section',
      fields: [defineField({ name: 'heading', type: 'localeString' }), defineField({ name: 'text', type: 'localeText' }), defineField({ name: 'image', type: 'imageWithAlt' })],
    }),
    defineField({
      name: 'featuredServices', group: 'featured',
      type: 'array',
      title: 'Services to show',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
    }),
    defineField({
      name: 'stats', group: 'content',
      type: 'array',
      title: 'Numbers band',
      of: [
        defineArrayMember({
          name: 'stat',
          type: 'object',
          fields: [defineField({ name: 'value', type: 'number' }), defineField({ name: 'suffix', type: 'string', description: 'e.g. +' }), defineField({ name: 'label', type: 'localeString' })],
          preview: { select: { title: 'value', subtitle: 'label.en' } },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: 'reasons', group: 'content',
      type: 'array',
      title: 'Why choose us',
      of: [
        defineArrayMember({
          name: 'reason',
          type: 'object',
          fields: [defineField({ name: 'title', type: 'localeString' }), defineField({ name: 'text', type: 'localeText' })],
          preview: { select: { title: 'title.en' } },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: 'message', group: 'content',
      type: 'object',
      title: 'Message from Guruji',
      fields: [defineField({ name: 'heading', type: 'localeString' }), defineField({ name: 'quote', type: 'localeText' })],
    }),
    defineField({ name: 'featuredTestimonials', group: 'featured', type: 'array', title: 'Testimonials to show', of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })], validation: (r) => r.max(8) }),
    defineField({ name: 'faqs', group: 'content', type: 'array', title: 'Home page questions', of: [defineArrayMember({ type: 'faqItem' })] }),
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
});
