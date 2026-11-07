'use client';

import { MapPin, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { MapEmbed } from '@/components/contact/MapEmbed';
import { getGoogleMapsEmbedUrl } from '@/lib/maps';

export function MapPreviewPopover({
  source,
  title,
  label,
  showMapLabel,
  closeLabel,
  directionsUrl,
  directionsLabel,
  tone = 'dark',
}: {
  source?: string;
  title: string;
  label: string;
  showMapLabel: string;
  closeLabel: string;
  directionsUrl?: string;
  directionsLabel: string;
  tone?: 'dark' | 'light';
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const mapUrl = getGoogleMapsEmbedUrl(source);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutsideClick);
    };
  }, [open]);

  if (!mapUrl) return null;

  const triggerTone = tone === 'dark'
    ? 'text-moon hover:text-sage'
    : 'text-night hover:text-saffron-deep';

  return (
    <div ref={root} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${triggerTone}`}
      >
        <MapPin className="size-4" aria-hidden="true" />{label}
      </button>
      {open && (
        <section id={panelId} aria-label={title} className="absolute top-full right-0 z-50 mt-2 w-[min(88vw,23rem)] rounded-2xl border border-line bg-ivory p-3 text-ink shadow-2xl">
          <div className="mb-2 flex items-center justify-between gap-3 px-1">
            <h2 className="font-display text-lg text-ink">{title}</h2>
            <button type="button" onClick={() => setOpen(false)} className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink hover:bg-sand" aria-label={closeLabel}>
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <MapEmbed src={mapUrl} title={title} label={showMapLabel} directionsUrl={directionsUrl} directionsLabel={directionsLabel} loadOnMount />
        </section>
      )}
    </div>
  );
}
