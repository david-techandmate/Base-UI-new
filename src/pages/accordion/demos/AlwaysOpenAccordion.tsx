import { Accordion } from '@base-ui/react/accordion';
import { CaretIcon } from '../../../showcase/icons';
import { FAQS } from '../content';

/**
 * `eventDetails.cancel()` stops Base UI from applying a state change, so the
 * accordion stays uncontrolled while still refusing to close its last panel.
 */
export function AlwaysOpenAccordion() {
  return (
    <Accordion.Root
      className="acc"
      data-variant="soft"
      defaultValue={['what']}
      onValueChange={(next, eventDetails) => {
        if (next.length === 0) {
          eventDetails.cancel();
        }
      }}
    >
      {FAQS.map((faq) => (
        <Accordion.Item className="acc-item" key={faq.value} value={faq.value}>
          <Accordion.Header className="acc-header">
            <Accordion.Trigger className="acc-trigger">
              {faq.question}
              <CaretIcon className="ui-icon" data-indicator="caret" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="ui-panel acc-panel">
            <div className="acc-content">{faq.answer}</div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
