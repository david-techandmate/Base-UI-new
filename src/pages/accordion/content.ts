/** Sample copy shared by the Accordion demos. */

export interface Faq {
  value: string;
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    value: 'what',
    question: 'What is Base UI?',
    answer:
      'Base UI is a library of high-quality unstyled React components for design systems and web apps.',
  },
  {
    value: 'start',
    question: 'How do I get started?',
    answer:
      'Head to the Quick start guide in the docs. If you have used unstyled libraries before, you will feel at home.',
  },
  {
    value: 'use',
    question: 'Can I use it for my project?',
    answer: 'Of course. Base UI is free and open source.',
  },
];

export const SHIPPING_FAQS: Faq[] = [
  {
    value: 'shipping',
    question: 'How long does shipping take?',
    answer:
      'Standard shipping takes 3–5 business days. Express delivery arrives in 1–2 business days.',
  },
  {
    value: 'returns',
    question: 'What is your return policy?',
    answer:
      'You can return any item within 30 days of delivery. Opened items may be subject to a 10% restocking fee.',
  },
  {
    value: 'international',
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to over 40 countries. International orders typically arrive within 7–14 business days.',
  },
  {
    value: 'tracking',
    question: 'How can I track my order?',
    answer:
      'Once your order ships you will receive a tracking link by email. Updates can take up to 24 hours to appear.',
  },
];
