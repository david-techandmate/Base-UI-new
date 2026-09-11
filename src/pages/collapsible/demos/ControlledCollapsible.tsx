import * as React from 'react';
import { Collapsible } from '@base-ui/react/collapsible';
import { CaretIcon } from '../../../showcase/icons';
import { PARAGRAPHS } from '../content';

/**
 * Controlled with external state. Unlike Accordion the open state is a plain
 * boolean, and `onOpenChange` still receives the `eventDetails` object with
 * the reason and originating DOM event.
 */
export function ControlledCollapsible() {
  const [open, setOpen] = React.useState(true);
  const [reason, setReason] = React.useState('none');

  return (
    <div style={{ width: '100%' }}>
      <Collapsible.Root
        className="col"
        data-variant="outline"
        open={open}
        onOpenChange={(next, eventDetails) => {
          setOpen(next);
          setReason(eventDetails.reason);
        }}
      >
        <Collapsible.Trigger className="col-trigger">
          Panel is {open ? 'open' : 'closed'}
          <CaretIcon className="ui-icon" data-indicator="caret" />
        </Collapsible.Trigger>
        <Collapsible.Panel className="ui-panel col-panel">
          <div className="col-content">{PARAGRAPHS[0]}</div>
        </Collapsible.Panel>
      </Collapsible.Root>

      <div className="ui-actions">
        <button type="button" className="ui-action" onClick={() => setOpen(false)}>
          Close
        </button>
        <button
          type="button"
          className="ui-action"
          data-tone="accent"
          onClick={() => setOpen((value) => !value)}
        >
          Toggle
        </button>
      </div>

      <p className="state-readout">
        open={String(open)} · reason=&quot;{reason}&quot;
      </p>
    </div>
  );
}
