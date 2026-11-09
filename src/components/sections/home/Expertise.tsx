import type { Locale } from '@/types/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Sparkle } from '@/components/ui/Ornaments';

const cards = [
  { en: 'Vastu Consultant', kn: 'ವಾಸ್ತು ಸಲಹೆ', description: 'Explore classical Vastu principles for homes, offices, and commercial spaces.', descriptionKn: 'ಮನೆ, ಕಚೇರಿ ಮತ್ತು ವ್ಯಾಪಾರ ಸ್ಥಳಗಳಿಗೆ ಪಾರಂಪರಿಕ ವಾಸ್ತು ತತ್ವಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.' },
  { en: 'Horoscope Specialist', kn: 'ಜಾತಕ ತಜ್ಞರು', description: 'Explore your birth chart and questions about career, relationships, and life changes.', descriptionKn: 'ನಿಮ್ಮ ಜನ್ಮ ಜಾತಕ ಮತ್ತು ವೃತ್ತಿ, ಸಂಬಂಧಗಳು ಹಾಗೂ ಜೀವನ ಬದಲಾವಣೆಗಳ ಕುರಿತು ತಿಳಿಯಿರಿ.' },
  { en: 'Vashikaran Specialist', kn: 'ವಶೀಕರಣ ತಜ್ಞರು', description: 'Discuss traditional practices and guidance for relationships and harmony.', descriptionKn: 'ಸಂಬಂಧಗಳು ಮತ್ತು ಸಾಮರಸ್ಯಕ್ಕಾಗಿ ಪಾರಂಪರಿಕ ಆಚರಣೆಗಳು ಮತ್ತು ಮಾರ್ಗದರ್ಶನದ ಕುರಿತು ಚರ್ಚಿಸಿ.' },
];

export function Expertise({ locale }: { locale: Locale }) {
  return <section className="bg-sand stars relative pt-8 pb-16 md:pt-12 md:pb-24">
    <div className="container-site relative">
      <SectionHeading eyebrow={locale === 'kn' ? 'ನಮ್ಮ ಪರಿಣತಿ' : 'Areas of mastery'} title={locale === 'kn' ? 'ನಂಬಬಹುದಾದ ಪರಿಣತಿ' : 'Expertise You Can Trust'} intro={locale === 'kn' ? 'ಜ್ಯೋತಿಷ್ಯ ಮತ್ತು ಪಾರಂಪರಿಕ ಆಚರಣೆಗಳ ಕುರಿತು ಮಾರ್ಗದರ್ಶನ.' : 'Guidance in the traditions seekers ask about most.'} />
      <ul className="grid gap-5 md:grid-cols-3">
        {cards.map((card) => <li key={card.en} className="rounded-card border border-line bg-white p-6 shadow-sm">
          <Sparkle className="mb-4 size-5 text-saffron-deep" />
          <h3 className="text-2xl text-night">{card[locale]}</h3>
          <p className="mt-3 leading-relaxed text-muted">{locale === 'kn' ? card.descriptionKn : card.description}</p>
        </li>)}
      </ul>
    </div>
  </section>;
}
