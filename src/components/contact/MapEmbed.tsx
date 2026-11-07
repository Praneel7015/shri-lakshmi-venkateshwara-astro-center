'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { buttonClasses } from '@/components/ui/ButtonLink';
import { getGoogleMapsEmbedUrl } from '@/lib/maps';

/**
 * Google Maps loads ~1 MB of scripts, so the map only loads when the visitor
 * asks for it. Until then a light placeholder with a button stands in.
 */
export function MapEmbed({ src, title, label, directionsUrl, directionsLabel, loadOnMount = false, className = '' }: { src: string; title: string; label: string; directionsUrl?: string; directionsLabel: string; loadOnMount?: boolean; className?: string }) {
  const safeSrc = getGoogleMapsEmbedUrl(src);
  const [show, setShow] = useState(loadOnMount);

  if (!safeSrc) return null;

  if (show) {
    return (
      <div className={`aspect-[16/10] overflow-hidden rounded-card border border-line ${className}`}>
        <iframe src={safeSrc} title={title} referrerPolicy="strict-origin-when-cross-origin" loading="lazy" allowFullScreen className="size-full" />
      </div>
    );
  }

  return (
    <div className={`flex aspect-[16/10] flex-col items-center justify-center gap-4 rounded-card border border-line bg-sand p-6 text-center ${className}`}>
      <MapPin className="size-8 text-lapis" aria-hidden="true" />
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setShow(true)}
          className={buttonClasses('outline')}
        >
          <span className="btn-label">{label}</span>
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
