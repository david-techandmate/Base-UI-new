import { Field } from '@base-ui/react/field';
import { OTPField } from '@base-ui/react/otp-field';

/**
 * A six-character code is easier to read and to dictate as two groups of
 * three. Wrapping subsets of slots in plain divs is all it takes — Base UI
 * tracks the slots by order, not by being direct children.
 *
 * `OTPField.Separator` is the divider, and it renders with a separator role so
 * it is announced as structure rather than read as a character.
 */
export function GroupedOTPField() {
  const slot = (index: number) => (
    <OTPField.Input
      key={index}
      className="ui-input otp-input"
      aria-label={index === 0 ? undefined : `Character ${index + 1} of 6`}
    />
  );

  return (
    <Field.Root className="fld">
      <Field.Label className="fld-label">Verification code</Field.Label>
      <OTPField.Root className="otp" length={6}>
        <div className="otp-group">{[0, 1, 2].map(slot)}</div>
        <OTPField.Separator className="otp-separator" />
        <div className="otp-group">{[3, 4, 5].map(slot)}</div>
      </OTPField.Root>
      <Field.Description className="fld-description">
        Two groups of three, which is how people read a code aloud.
      </Field.Description>
    </Field.Root>
  );
}
