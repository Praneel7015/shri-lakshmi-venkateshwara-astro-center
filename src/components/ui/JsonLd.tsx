import { IS_BRANDED_PREVIEW } from '@/lib/preview';

/** Suppress search claims while the site contains provisional business content. */
export function JsonLd({ data }: { data: object | object[] }) {
  if (IS_BRANDED_PREVIEW) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
