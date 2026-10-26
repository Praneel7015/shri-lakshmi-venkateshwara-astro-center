/** Links for the two ways visitors get in touch: WhatsApp and phone. */

/** `waLink('919000000000', 'Hello')` → a WhatsApp chat with the message pre-filled. */
export const waLink = (number: string, text?: string) =>
  `https://wa.me/${number.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const telLink = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
