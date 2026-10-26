import { defineField, defineType } from 'sanity';

/**
 * Bilingual fields. Every piece of text the visitor reads has an English box
 * (required) and a Kannada box (optional). If Kannada is left empty, the
 * Kannada site shows the English text instead.
 */

export const localeString = defineType({
  name: 'localeString',
  title: 'Text (English + Kannada)',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'kn', title: 'ಕನ್ನಡ (Kannada)', type: 'string' }),
  ],
  options: { columns: 2 },
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Paragraph (English + Kannada)',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({ name: 'kn', title: 'ಕನ್ನಡ (Kannada)', type: 'text', rows: 3 }),
  ],
});

export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Article (English + Kannada)',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'blockContent', validation: (r) => r.required() }),
    defineField({
      name: 'kn',
      title: 'ಕನ್ನಡ (Kannada)',
      type: 'blockContent',
      description: 'Optional. Leave empty and the Kannada site will show the English version with a short note.',
    }),
  ],
});
