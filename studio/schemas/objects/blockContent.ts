import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * The rich-text editor used for blog posts, service pages and legal pages.
 * Each custom block here (callout, shloka, CTA, YouTube) has a matching
 * renderer in `src/components/blog/RichText.tsx` on the website.
 */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Heading', value: 'h2' },
        { title: 'Sub-heading', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullets', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'Link',
                description: 'For a page on this site, start with / (e.g. /services/vastu-shastra/).',
                validation: (r) => r.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'localeString', title: 'Describe the image', description: 'For Google and visually impaired visitors.' }),
        defineField({ name: 'caption', type: 'string', title: 'Caption (optional)' }),
      ],
    }),
    defineArrayMember({
      name: 'callout',
      type: 'object',
      title: 'Highlighted tip',
      fields: [defineField({ name: 'text', type: 'text', rows: 2, validation: (r) => r.required() })],
      preview: { select: { title: 'text' }, prepare: ({ title }) => ({ title: `💡 ${title}` }) },
    }),
    defineArrayMember({
      name: 'shloka',
      type: 'object',
      title: 'Shloka / mantra',
      fields: [
        defineField({ name: 'sanskrit', type: 'text', rows: 3, title: 'Verse', validation: (r) => r.required() }),
        defineField({ name: 'meaning', type: 'text', rows: 2, title: 'Meaning (optional)' }),
      ],
      preview: { select: { title: 'sanskrit' }, prepare: ({ title }) => ({ title: `🕉 ${title}` }) },
    }),
    defineArrayMember({
      name: 'ctaBlock',
      type: 'object',
      title: 'Booking button',
      description: 'A dark band with a WhatsApp "book" button. Use once near the end of a post.',
      fields: [defineField({ name: 'heading', type: 'string', title: 'Heading', placeholder: 'Want Guruji to read your chart?' })],
      preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `📞 ${title || 'Booking button'}` }) },
    }),
    defineArrayMember({
      name: 'youtube',
      type: 'object',
      title: 'YouTube video',
      fields: [defineField({ name: 'url', type: 'url', title: 'YouTube link', validation: (r) => r.required() })],
      preview: { select: { title: 'url' }, prepare: ({ title }) => ({ title: `▶ ${title}` }) },
    }),
  ],
});
