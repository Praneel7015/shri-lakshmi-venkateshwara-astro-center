/**
 * Smaller document types: each one is a list in the Studio sidebar.
 */
import { defineArrayMember, defineField, defineType } from 'sanity';
import { CommentIcon } from '@sanity/icons/Comment';
import { DocumentIcon } from '@sanity/icons/Document';
import { HelpCircleIcon } from '@sanity/icons/HelpCircle';
import { ImageIcon } from '@sanity/icons/Image';
import { PinIcon } from '@sanity/icons/Pin';
import { StarIcon } from '@sanity/icons/Star';
import { TagIcon } from '@sanity/icons/Tag';
import { UserIcon } from '@sanity/icons/User';

const slugFrom = (source: string) =>
  defineField({ name: 'slug', type: 'slug', title: 'Web address', options: { source }, validation: (r) => r.required() });

export const puja = defineType({
  name: 'puja',
  title: 'Puja',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({ name: 'title', type: 'localeString', validation: (r) => r.required() }),
    slugFrom('title.en'),
    defineField({ name: 'order', type: 'number', title: 'Order in lists' }),
    defineField({ name: 'deity', type: 'localeString', title: 'Deity' }),
    defineField({ name: 'description', type: 'localeText', validation: (r) => r.required() }),
    defineField({ name: 'benefits', type: 'array', of: [defineArrayMember({ type: 'localeString' })] }),
    defineField({ name: 'duration', type: 'localeString', description: 'e.g. "3 hours"' }),
    defineField({ name: 'image', type: 'imageWithAlt' }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'deity.en', media: 'image' } },
});

export const category = defineType({
  name: 'category',
  title: 'Blog category',
  type: 'document',
  icon: TagIcon,
  fields: [defineField({ name: 'title', type: 'localeString', validation: (r) => r.required() }), slugFrom('title.en')],
  preview: { select: { title: 'title.en' } },
});

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'name', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'role', type: 'localeString', description: 'e.g. "Vedic astrologer · 25 years of practice"' }),
    defineField({ name: 'bio', type: 'localeText', description: 'Shown under every post. Helps Google trust the article.' }),
    defineField({ name: 'image', type: 'imageWithAlt' }),
  ],
  preview: { select: { title: 'name.en', subtitle: 'role.en', media: 'image' } },
});

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  description: 'Only add real reviews, with the person’s permission.',
  fields: [
    defineField({ name: 'name', type: 'string', description: 'First name and initial is enough, e.g. "Priya R."', validation: (r) => r.required() }),
    defineField({ name: 'city', type: 'string', title: 'Area / city' }),
    defineField({ name: 'text', type: 'localeText', title: 'What they said', validation: (r) => r.required() }),
    defineField({ name: 'rating', type: 'number', options: { list: [5, 4, 3, 2, 1] }, initialValue: 5, validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: 'source', type: 'string', title: 'Review source', description: 'Choose Google only for a review actually published on this centre’s Google listing.', options: { list: [{ title: 'Google', value: 'google' }, { title: 'Other', value: 'other' }], layout: 'radio' } }),
    defineField({ name: 'service', type: 'localeString', title: 'Service they came for' }),
    defineField({ name: 'youtubeUrl', type: 'url', title: 'Video testimonial (YouTube link, optional)' }),
    defineField({ name: 'date', type: 'date' }),
  ],
  preview: { select: { title: 'name', subtitle: 'text.en' } },
});

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery photo / video',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({ name: 'image', type: 'imageWithAlt' }),
    defineField({ name: 'youtubeUrl', type: 'url', title: 'Or a YouTube video link' }),
    defineField({ name: 'caption', type: 'localeString' }),
    defineField({ name: 'order', type: 'number', title: 'Order' }),
  ],
  preview: { select: { title: 'caption.en', media: 'image', url: 'youtubeUrl' }, prepare: ({ title, media, url }) => ({ title: title || url || 'Photo', media }) },
});

export const area = defineType({
  name: 'area',
  title: 'Area (local page)',
  type: 'document',
  icon: PinIcon,
  description: 'Creates a page like /best-astrologer-in/jayanagar/. Only add areas you really serve.',
  fields: [
    defineField({ name: 'name', type: 'localeString', validation: (r) => r.required() }),
    slugFrom('name.en'),
    defineField({
      name: 'intro',
      type: 'localeText',
      title: 'Intro paragraph',
      description: 'Write something specific to this area (distance, route, landmarks). Every area must be different, or Google ignores these pages.',
      validation: (r) => r.required().custom((v?: { en?: string }) => ((v?.en?.length ?? 0) < 120 ? 'Write at least 2–3 sentences.' : true)).warning(),
    }),
    defineField({ name: 'landmarks', type: 'localeString', title: 'How to reach us from here' }),
    defineField({ name: 'nearby', type: 'array', title: 'Nearby areas', of: [defineArrayMember({ type: 'reference', to: [{ type: 'area' }] })] }),
    defineField({ name: 'faqs', type: 'array', of: [defineArrayMember({ type: 'faqItem' })] }),
  ],
  preview: { select: { title: 'name.en' } },
});

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: 'question', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'answer', type: 'localeText', validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number' }),
  ],
  preview: { select: { title: 'question.en' } },
});

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal page',
  type: 'document',
  icon: DocumentIcon,
  description: 'Privacy policy, terms and disclaimer. Keep the web addresses privacy-policy, terms and disclaimer.',
  fields: [
    defineField({ name: 'title', type: 'localeString', validation: (r) => r.required() }),
    slugFrom('title.en'),
    defineField({ name: 'body', type: 'localeBlockContent', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title.en' } },
});

