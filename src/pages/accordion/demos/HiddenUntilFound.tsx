import { Accordion } from '@base-ui/react/accordion';
import { PlusIcon } from '../../../showcase/icons';
import { SHIPPING_FAQS } from '../content';

/**
 * `hiddenUntilFound` keeps closed panels mounted with `hidden="until-found"`,
 * so find-in-page and search engines can reach their contents. Try searching
 * the page for "restocking".
 */
export function HiddenUntilFound() {
  return (
    <Accordion.Root className="acc" data-variant="solid" data-full hiddenUntilFound>
      {SHIPPING_FAQS.map((faq) => (
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
