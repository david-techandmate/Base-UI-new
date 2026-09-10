import { Accordion } from '@base-ui/react/accordion';
import { PlusIcon } from '../../../showcase/icons';
import { FAQS } from '../content';

/** The reference composition: one panel open at a time, plus/close indicator. */
export function BasicAccordion({ variant = 'solid' }: { variant?: string }) {
  return (
    <Accordion.Root className="acc" data-variant={variant}>
      {FAQS.map((faq) => (
        <Accordion.Item className="acc-item" key={faq.value} value={faq.value}>
          <Accordion.Header className="acc-header">
            <Accordion.Trigger className="acc-trigger">
              {faq.question}
              <PlusIcon className="acc-icon" data-indicator="plus" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="acc-panel">
            <div className="acc-content">{faq.answer}</div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
