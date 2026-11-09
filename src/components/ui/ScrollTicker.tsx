import type { Locale } from '@/types/content';

// Fixed labels inspired by the Vishwanath Guruji website. Edit these here when needed.
const specialties = [
  { en: 'Black Magic Remedies', kn: 'ದುಷ್ಟ ಶಕ್ತಿ ಪರಿಹಾರಗಳು' },
  { en: 'Vashikaran Specialist', kn: 'ವಶೀಕರಣ ತಜ್ಞರು' },
  { en: 'Vastu Shastra Astrologer', kn: 'ವಾಸ್ತು ಶಾಸ್ತ್ರ ಜ್ಯೋತಿಷ್ಯ' },
  { en: 'Love Marriage Problem Solution', kn: 'ಪ್ರೇಮ ವಿವಾಹ ಸಮಸ್ಯೆ ಪರಿಹಾರ' },
  { en: 'Childless Problem Solution', kn: 'ಸಂತಾನ ಸಮಸ್ಯೆ ಪರಿಹಾರ' },
  { en: 'Husband & Wife Problem Solution', kn: 'ದಂಪತಿ ಸಮಸ್ಯೆ ಪರಿಹಾರ' },
  { en: 'Family Problem Solution', kn: 'ಕೌಟುಂಬಿಕ ಸಮಸ್ಯೆ ಪರಿಹಾರ' },
  { en: 'Health Problem Solution', kn: 'ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ಪರಿಹಾರ' },
  { en: 'Career Problems & Solutions', kn: 'ವೃತ್ತಿ ಸಮಸ್ಯೆ ಮತ್ತು ಪರಿಹಾರ' },
  { en: 'Divorce Problem Solution', kn: 'ವಿಚ್ಛೇದನ ಸಮಸ್ಯೆ ಪರಿಹಾರ' },
  { en: 'Court Case Problem Solution', kn: 'ನ್ಯಾಯಾಲಯದ ಪ್ರಕರಣಗಳ ಪರಿಹಾರ' },
  { en: 'Financial Problem Solution', kn: 'ಆರ್ಥಿಕ ಸಮಸ್ಯೆ ಪರಿಹಾರ' },
  { en: 'Political Problem Solution', kn: 'ರಾಜಕೀಯ ಸಮಸ್ಯೆ ಪರಿಹಾರ' },
];

/** The second copy creates a seamless loop and is hidden from screen readers. */
export function ScrollTicker({ locale }: { locale: Locale }) {
  const copy = (duplicate: boolean) => (
    <ul className={`ticker-list flex shrink-0 items-center gap-6 px-6 ${duplicate ? 'ticker-duplicate' : ''}`} aria-hidden={duplicate || undefined}>
      {specialties.map((item) => (
        <li key={item.en} className="flex items-center gap-6 whitespace-nowrap">
          <span className="text-xs font-medium tracking-[0.12em] text-night uppercase">{item[locale]}</span>
          <span className="text-lg leading-none text-night/75" aria-hidden="true">· ॐ ·</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="specialties-ticker relative overflow-hidden border-y border-night/20 bg-[#FFC72C] py-3.5" role="region" aria-label={locale === 'kn' ? 'ಸೇವೆಗಳು' : 'Specialties'}>
      <div className="ticker-track animate-marquee flex w-max hover:[animation-play-state:paused]">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}
