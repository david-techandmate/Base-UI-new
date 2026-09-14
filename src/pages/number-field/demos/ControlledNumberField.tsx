import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { NumberField } from '@base-ui/react/number-field';
import { MinusIcon, PlusIcon } from '../../../showcase/icons';

/**
 * Two callbacks, and the difference matters.
 *
 * `onValueChange` fires on every change, and its `eventDetails.reason` says
 * where the change came from: input-change, input-clear, input-blur,
 * input-paste, keyboard, increment-press, decrement-press, wheel, scrub.
 *
 * `onValueCommitted` fires when the value settles — on blur after typing, and
 * on pointer release after a drag or a button hold. It runs at the same time
 * as onValueChange for keyboard and wheel, where there is nothing to settle.
 *
 * That distinction is the difference between a request per pixel of a drag and
 * one request when the user lets go. Persist on commit; preview on change.
 *
 * The value is `number | null` — null, not 0, when the input is empty. `0` is
 * a real value a user may want, so the two cannot be conflated.
 */
export function ControlledNumberField() {
  const [value, setValue] = React.useState<number | null>(20);
  const [reason, setReason] = React.useState('—');
  const [changes, setChanges] = React.useState(0);
  const [commits, setCommits] = React.useState(0);

  return (
    <Field.Root className="fld">
      <Field.Label className="fld-label">Budget</Field.Label>
      <NumberField.Root
        value={value}
        step={5}
        allowWheelScrub
        format={{ style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }}
        onValueChange={(next, eventDetails) => {
          setValue(next);
          setReason(eventDetails.reason);
          setChanges((count) => count + 1);
        }}
        onValueCommitted={() => setCommits((count) => count + 1)}
      >
        <NumberField.Group className="nf-group">
          <NumberField.Decrement className="nf-step" aria-label="Decrease">
            <MinusIcon className="ui-icon" />
          </NumberField.Decrement>
          <NumberField.Input className="ui-input nf-input" data-width="wide" />
          <NumberField.Increment className="nf-step" aria-label="Increase">
            <PlusIcon className="ui-icon" />
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>

      <div className="nf-readout">
        <span>
          <strong>value</strong> {value === null ? 'null' : value}
        </span>
        <span>
          <strong>reason</strong> {reason}
        </span>
        <span>
          <strong>changes</strong> {changes}
        </span>
        <span>
          <strong>commits</strong> {commits}
        </span>
      </div>

      <Field.Description className="fld-description">
        Clear the input to see null. Hold a stepper, or scroll over it, and watch changes climb
        while commits does not.
      </Field.Description>
    </Field.Root>
  );
}
