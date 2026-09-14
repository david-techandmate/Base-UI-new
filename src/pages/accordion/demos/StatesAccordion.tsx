import { Accordion } from '@base-ui/react/accordion';
import { PlusIcon } from '../../../showcase/icons';
import { FAQS } from '../content';

/**
 * `disabled` on the Root disables every trigger; on an Item it disables just
 * that one. Both surface a `[data-disabled]` attribute for styling.
 */
export function StatesAccordion({
  disabledRoot = false,
  disabledItems = [],
}: {
  disabledRoot?: boolean;
  disabledItems?: string[];
}) {
  return (
    <Accordion.Root className="acc" data-variant="solid" disabled={disabledRoot}>
      {FAQS.map((faq) => (
        <Accordion.Item
          className="acc-item"
          key={faq.value}
          value={faq.value}
          disabled={disabledItems.includes(faq.value)}
        >
          <Accordion.Header className="acc-header">
            <Accordion.Trigger className="acc-trigger">
              {faq.question}
              <PlusIcon className="ui-icon" data-indicator="plus" />
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
