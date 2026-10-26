import { blockContent } from './objects/blockContent';
import { faqItem, imageWithAlt, seo } from './objects/common';
import { localeBlockContent, localeString, localeText } from './objects/locale';
import { blogPost } from './documents/blogPost';
import { service } from './documents/service';
import { area, author, category, faq, galleryItem, legalPage, puja, testimonial } from './documents/simple';
import { aboutPage, homePage, siteSettings } from './singletons';

export const SINGLETONS = ['siteSettings', 'homePage', 'aboutPage'];

export const schemaTypes = [
  // building blocks
  localeString, localeText, localeBlockContent, blockContent, imageWithAlt, faqItem, seo,
  // one-of-a-kind pages
  siteSettings, homePage, aboutPage,
  // lists
  blogPost, category, author, service, puja, testimonial, galleryItem, area, faq, legalPage,
];
