import * as React from 'react';
import { Accordion } from '@base-ui/react/accordion';
import { CaretIcon } from '../../../showcase/icons';
import { FAQS } from '../content';

/**
 * Controlled with external state. `onValueChange` receives the new value plus
 * an `eventDetails` object carrying the `reason` and the originating DOM event.
 */
export function ControlledAccordion() {
  const [value, setValue] = React.useState<string[]>(['what']);
  const [reason, setReason] = React.useState<string>('none');

  return (
    <div style={{ width: '100%' }}>
      <Accordion.Root
        className="acc"
        data-variant="outline"
        value={value}
        onValueChange={(next, eventDetails) => {
          setValue(next as string[]);
          setReason(eventDetails.reason);
        }}
      >
        {FAQS.map((faq) => (
          <Accordion.Item className="acc-item" key={faq.value} value={faq.value}>
            <Accordion.Header className="acc-header">
              <Accordion.Trigger className="acc-trigger">
                {faq.question}
                <CaretIcon className="acc-icon" data-indicator="caret" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="acc-panel">
              <div className="acc-content">{faq.answer}</div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      <div className="acc-actions">
        <button type="button" className="acc-action" onClick={() => setValue([])}>
          Collapse all
        </button>
        <button
          type="button"
          className="acc-action"
          data-tone="accent"
          onClick={() => setValue(['use'])}
        >
          Open the last panel
        </button>
      </div>

      <p className="state-readout">
        value={JSON.stringify(value)} · reason=&quot;{reason}&quot;
      </p>
    </div>
  );
}
