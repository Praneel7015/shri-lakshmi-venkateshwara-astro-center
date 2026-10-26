'use client';

import { useState, type FormEvent } from 'react';
import { CircleCheck, Send } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import { waLink } from '@/lib/contact';

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

/**
 * Enquiry form. Static hosting has no server, so submissions go to
 * Web3Forms (free), which emails them to the client. If no Web3Forms key is
 * configured, the form opens WhatsApp with the details typed in instead.
 */
export function ContactForm({ labels, whatsapp, siteName }: { labels: Dictionary['contact'] & { send: string }; whatsapp: string; siteName: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.botcheck) return; // honeypot field filled = spam bot

    const summary = [
      `${labels.name}: ${data.name}`,
      `${labels.phone}: ${data.phone}`,
      data.email && `${labels.email}: ${data.email}`,
      data.dob && `${labels.dob}: ${data.dob} ${data.tob ?? ''}`,
      data.pob && `${labels.pob}: ${data.pob}`,
      data.message,
    ].filter(Boolean).join('\n');

    if (!ACCESS_KEY) {
      window.open(waLink(whatsapp, summary), '_blank', 'noopener');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: ACCESS_KEY, subject: `New enquiry · ${siteName}`, from_name: siteName, ...data }),
      });
      const json = await res.json();
      setStatus(json.success ? 'sent' : 'error');
      if (json.success) form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center rounded-card border border-line bg-white/80 p-10 text-center" role="status">
        <CircleCheck className="size-12 text-[#1f8a4c]" aria-hidden="true" />
        <p className="mt-4 font-display text-2xl text-night">{labels.sent}</p>
      </div>
    );
  }

  const input = 'mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/30';
  const label = 'block text-sm font-medium text-night';

  return (
    <form onSubmit={onSubmit} className="space-y-5 self-start rounded-card border border-line bg-white/80 p-6 shadow-card md:p-8">
      <h2 className="text-2xl text-night md:text-3xl">{labels.formTitle}</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>{labels.name}<input name="name" required autoComplete="name" className={input} /></label>
        <label className={label}>{labels.phone}<input name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9+\s-]{8,}" className={input} /></label>
      </div>
      <label className={label}>{labels.email}<input name="email" type="email" autoComplete="email" className={input} /></label>
      <fieldset>
        <legend className="text-sm text-muted">{labels.birthNote}</legend>
        <div className="mt-3 grid gap-5 sm:grid-cols-3">
          <label className={label}>{labels.dob}<input name="dob" type="date" className={input} /></label>
          <label className={label}>{labels.tob}<input name="tob" type="time" className={input} /></label>
          <label className={label}>{labels.pob}<input name="pob" className={input} /></label>
        </div>
      </fieldset>
      <label className={label}>{labels.message}<textarea name="message" rows={4} required className={input} /></label>
      {/* Honeypot: hidden from people, bots fill it in */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      {status === 'error' && <p className="text-kumkum" role="alert">{labels.error}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-saffron px-7 py-3.5 font-semibold text-night transition-colors hover:bg-marigold disabled:opacity-60 sm:w-auto"
      >
        <Send className="size-4" aria-hidden="true" />
        {labels.send}
      </button>
    </form>
  );
}
