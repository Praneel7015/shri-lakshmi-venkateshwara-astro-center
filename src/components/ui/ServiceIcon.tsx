import { Briefcase, Flame, Gem, HeartHandshake, House, ScrollText, Sparkles, type LucideIcon } from 'lucide-react';

/** Icons the editor can pick for a service in the Studio (keep in sync with studio/schemas/documents/service.ts). */
const icons: Record<string, LucideIcon> = { ScrollText, HeartHandshake, Briefcase, House, Flame, Gem, Sparkles };

export function ServiceIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && icons[name]) || Sparkles;
  return <Icon className={className} strokeWidth={1.5} aria-hidden="true" />;
}
