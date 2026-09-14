import { Accordion } from '@base-ui/react/accordion';
import { CaretIcon } from '../../../showcase/icons';
import { FAQS } from '../content';

/**
 * `multiple` lets several panels stay open at once; `defaultValue` seeds the
 * uncontrolled open state. Both accept the item `value`s as an array.
 */
export function OpenBehaviour({
  multiple = false,
  defaultValue,
}: {
  multiple?: boolean;
  defaultValue?: string[];
}) {
  return (
    <Accordion.Root
      className="acc"
      data-variant="outline"
      multiple={multiple}
      defaultValue={defaultValue}
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
