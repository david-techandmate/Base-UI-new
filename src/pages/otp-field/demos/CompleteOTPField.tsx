import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { OTPField } from '@base-ui/react/otp-field';
import { Form } from '@base-ui/react/form';

/**
 * Three callbacks, and the ordering matters.
 *
 * `onValueChange` fires on every change, with a `reason` of input-change,
 * input-clear, input-paste or keyboard.
 *
 * `onValueComplete` fires once every slot is filled — after the internal value
 * update, so it is later than onValueChange. It also fires when a complete
 * value is pasted over an already-complete one, in which case onValueChange
 * does *not* fire because the value did not change.
 *
 * `autoSubmit` submits the owning form the moment the code completes, which is
 * what a verification screen wants: no Submit button to reach for after typing
 * the last digit. onValueComplete still runs first.
 *
 * Paste the whole code rather than typing it to see input-paste, and to see
 * that a six-character paste fills every slot rather than only the first.
 */
export function CompleteOTPField() {
  const [value, setValue] = React.useState('');
  const [reason, setReason] = React.useState('—');
  const [completes, setCompletes] = React.useState(0);
  const [submits, setSubmits] = React.useState(0);

  return (
    <Form
      className="frm"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmits((count) => count + 1);
      }}
    >
      <Field.Root className="fld" name="code">
        <Field.Label className="fld-label">Verification code</Field.Label>
        <OTPField.Root
          className="otp"
          length={6}
          autoSubmit
          value={value}
          onValueChange={(next, eventDetails) => {
            setValue(next);
            setReason(eventDetails.reason);
          }}
          onValueComplete={() => setCompletes((count) => count + 1)}
        >
          {Array.from({ length: 6 }, (_, index) => (
            <OTPField.Input
              key={index}
              className="ui-input otp-input"
              aria-label={index === 0 ? undefined : `Character ${index + 1} of 6`}
            />
          ))}
        </OTPField.Root>

        <div className="otp-readout">
          <span>
            <strong>value</strong> {value || '(empty)'}
          </span>
          <span>
            <strong>reason</strong> {reason}
          </span>
          <span>
            <strong>completes</strong> {completes}
          </span>
          <span>
            <strong>submits</strong> {submits}
          </span>
        </div>

        <Field.Description className="fld-description">
          autoSubmit is on, so filling the last slot submits — no button to reach for.
        </Field.Description>
      </Field.Root>
    </Form>
  );
}
