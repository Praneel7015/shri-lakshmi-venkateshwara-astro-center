/**
 * One-of-a-kind documents: there is exactly one of each, opened straight
 * from the sidebar (see structure.ts). Their IDs are fixed so the website can
 * find them: "siteSettings", "homePage", "aboutPage".
 */
import { defineArrayMember, defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';
import { HomeIcon } from '@sanity/icons/Home';
import { UserIcon } from '@sanity/icons/User';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'business', title: 'Business details', default: true },
    { name: 'social', title: 'Social & reviews' },
    { name: 'seo', title: 'SEO' },
    { name: 'tracking', title: 'Tracking & ads' },
  ],
  fields: [
    defineField({ name: 'name', type: 'localeString', title: 'Business name', group: 'business', validation: (r) => r.required() }),
    defineField({ name: 'astrologerName', type: 'localeString', title: 'Astrologer’s name', group: 'business', validation: (r) => r.required() }),
    defineField({ name: 'tagline', type: 'localeString', group: 'business' }),
    defineField({ name: 'logo', type: 'imageWithAlt', group: 'business' }),
    defineField({ name: 'phone', type: 'string', title: 'Phone (as shown)', description: 'e.g. +91 98450 12345', group: 'business', validation: (r) => r.required() }),
    defineField({
      name: 'whatsapp',
      type: 'string',
      title: 'WhatsApp number',
      description: 'Digits only with country code, e.g. 919845012345',
      group: 'business',
      validation: (r) => r.required().regex(/^\d{10,15}$/, { name: 'digits only' }),
    }),
    defineField({ name: 'email', type: 'string', group: 'business' }),
    defineField({
      name: 'address',
      type: 'object',
      group: 'business',
      description: 'Must match Google Business Profile exactly.',
      fields: [
        defineField({ name: 'street', type: 'localeString', title: 'Door no. & street' }),
        defineField({ name: 'locality', type: 'string', title: 'Area', initialValue: 'Basavanagudi' }),
        defineField({ name: 'city', type: 'string', initialValue: 'Bengaluru' }),
        defineField({ name: 'region', type: 'string', title: 'State', initialValue: 'Karnataka' }),
        defineField({ name: 'postalCode', type: 'string', title: 'PIN code' }),
        defineField({ name: 'country', type: 'string', initialValue: 'IN', readOnly: true }),
      ],
    }),
    defineField({
      name: 'geo',
      type: 'object',
      title: 'Map coordinates',
      description: 'Right-click the centre on Google Maps → copy the two numbers.',
      group: 'business',
      options: { columns: 2 },
      fields: [defineField({ name: 'lat', type: 'number', title: 'Latitude' }), defineField({ name: 'lng', type: 'number', title: 'Longitude' })],
    }),
    defineField({ name: 'hours', type: 'localeString', title: 'Opening hours', group: 'business' }),
    defineField({ name: 'established', type: 'number', title: 'Practising since (year)', group: 'business' }),
    defineField({ name: 'mapEmbedUrl', type: 'text', rows: 3, title: 'Google Maps embed URL or iframe code', description: 'Paste the Google Maps Embed a map URL, or the complete <iframe> snippet. The site safely reads only its HTTPS Google Maps src.', group: 'business' }),
    defineField({ name: 'mapDirectionsUrl', type: 'url', title: 'Google Maps directions link', group: 'business' }),
    defineField({
      name: 'socials',
      type: 'object',
      group: 'social',
      fields: ['instagram', 'facebook', 'youtube', 'x'].map((name) => defineField({ name, type: 'url' })),
    }),
    defineField({
      name: 'rating',
      type: 'object',
      title: 'Google review rating',
      description: 'Copy the real numbers from Google. Leave empty if unsure: fake ratings can get the site penalised.',
      group: 'social',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'value', type: 'number', title: 'Stars (e.g. 4.8)', validation: (r) => r.min(1).max(5) }),
        defineField({ name: 'count', type: 'number', title: 'Number of reviews' }),
        defineField({ name: 'sourceUrl', type: 'url', title: 'Google reviews link' }),
      ],
    }),
    defineField({ name: 'defaultSeo', type: 'seo', title: 'Default SEO (home page & fallback)', group: 'seo' }),
    defineField({ name: 'keywords', type: 'array', of: [defineArrayMember({ type: 'string' })], options: { layout: 'tags' }, group: 'seo' }),
    defineField({
      name: 'verification',
      type: 'object',
      title: 'Search Console verification',
      group: 'seo',
      fields: [defineField({ name: 'google', type: 'string', title: 'Google code' }), defineField({ name: 'bing', type: 'string', title: 'Bing code' })],
    }),
    defineField({
      name: 'tracking',
      type: 'object',
      title: 'Tracking & ads',
      description:
        'For your marketing team. Paste IDs only, never full code. Changes go live with the next publish (about 3 minutes).',
      group: 'tracking',
      fields: [
        defineField({
          name: 'gtmId',
          type: 'string',
          title: 'Google Tag Manager ID',
          description:
            'Recommended. From tagmanager.google.com, looks like GTM-ABC1234. Once this is set, add or remove any other tag (Google Ads, Analytics, Meta Pixel…) inside Tag Manager. No website change needed.',
          validation: (r) => r.regex(/^GTM-[A-Z0-9]+$/, { name: 'Tag Manager ID (GTM-XXXXXXX)' }),
        }),
        defineField({
          name: 'googleTagIds',
          type: 'array',
          title: 'Google tag IDs (only if you are not using Tag Manager)',
          description: 'Google Analytics (G-XXXXXXX) or Google Ads (AW-123456789). One per line.',
          of: [
            defineArrayMember({
              type: 'string',
              validation: (r) => r.regex(/^(G|AW|GT|DC)-[A-Z0-9]+$/, { name: 'Google tag ID (G-… or AW-…)' }),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'imageAboveHero',
      type: 'imageWithAlt',
      title: 'Image above hero',
      description: 'Optional full-width image shown before the homepage hero. Use a wide image and add its description; leave empty to hide this banner.',
    }),
    defineField({
      name: 'heroArtwork',
      type: 'imageWithAlt',
      title: 'Main hero artwork',
      description: 'Image beside the main homepage heading. Upload or replace it here; it is separate from the carousel slide images.',
    }),
    defineField({
      name: 'heroArtworkShape', title: 'Hero artwork shape', type: 'string',
      description: 'Choose the shape of the image beside the homepage heading.',
      options: { list: [{title: 'Square', value: 'square'}, {title: 'Circle', value: 'circle'}, {title: 'Wide rectangle', value: 'landscape'}, {title: 'Tall rectangle', value: 'portrait'}], layout: 'radio' },
      initialValue: 'square',
    }),
    defineField({
      name: 'heroArtworkSize', title: 'Hero artwork size', type: 'string',
      description: 'Choose how large the artwork appears beside the heading.',
      options: { list: [{title: 'Small', value: 'small'}, {title: 'Medium', value: 'medium'}, {title: 'Large', value: 'large'}], layout: 'radio' },
      initialValue: 'large',
    }),
    defineField({
      name: 'hero',
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
      name: 'intro',
      type: 'object',
      title: 'About section',
      fields: [defineField({ name: 'heading', type: 'localeString' }), defineField({ name: 'text', type: 'localeText' }), defineField({ name: 'image', type: 'imageWithAlt' })],
    }),
    defineField({
      name: 'featuredServices',
      type: 'array',
      title: 'Services to show',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })],
    }),
    defineField({
      name: 'stats',
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
      name: 'reasons',
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
      name: 'message',
      type: 'object',
      title: 'Message from Guruji',
      fields: [defineField({ name: 'heading', type: 'localeString' }), defineField({ name: 'quote', type: 'localeText' })],
    }),
    defineField({ name: 'featuredTestimonials', type: 'array', title: 'Testimonials to show', of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })], validation: (r) => r.max(8) }),
    defineField({ name: 'faqs', type: 'array', title: 'Home page questions', of: [defineArrayMember({ type: 'faqItem' })] }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
});

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
