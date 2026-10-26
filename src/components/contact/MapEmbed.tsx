'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';

/**
 * Google Maps loads ~1 MB of scripts, so the map only loads when the visitor
 * asks for it. Until then a light placeholder with a button stands in.
 */
export function MapEmbed({ src, title, label, directionsUrl, directionsLabel }: { src: string; title: string; label: string; directionsUrl?: string; directionsLabel: string }) {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <div className="aspect-[16/10] overflow-hidden rounded-card border border-line">
        <iframe src={src} title={title} referrerPolicy="no-referrer-when-downgrade" className="size-full" />
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/10] flex-col items-center justify-center gap-4 rounded-card border border-line bg-sand p-6 text-center">
      <MapPin className="size-8 text-lapis" aria-hidden="true" />
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setShow(true)}
          className="min-h-11 rounded-full border border-night/25 px-5 py-2 font-semibold text-night hover:border-night hover:bg-night/5"
        >
          {label}
        </button>
        {directionsUrl && (
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full px-4 py-2 font-semibold text-lapis underline-offset-4 hover:underline">
            {directionsLabel}
          </a>
        )}
      </div>
    </div>
  );
}
