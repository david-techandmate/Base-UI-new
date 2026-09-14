import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { OTPField } from '@base-ui/react/otp-field';

/**
 * `length` is required, not optional — the root needs it to clamp values,
 * detect completion, and render consistent validation markup before the slots
 * hydrate. Render exactly that many Inputs.
 *
 * Only the first slot takes the field label. The rest need their own
 * `aria-label` saying which position they are, otherwise a screen reader
 * announces six identically-named inputs and the user cannot tell where they
 * are in the code.
 *
 * `autoComplete` defaults to `one-time-code`, which is what lets iOS and
 * Android offer the SMS code above the keyboard. It is applied to the first
 * slot, and that is enough — do not put it on every one.
 */
export function BasicOTPField({
  length = 6,
  label = 'Verification code',
  description = 'Enter the 6-digit code we sent to your device.',
  ...rootProps
}: {
  length?: number;
  label?: string;
  description?: React.ReactNode;
} & Omit<OTPField.Root.Props, 'length'>) {
  return (
    <Field.Root className="fld">
      <Field.Label className="fld-label">{label}</Field.Label>
      <OTPField.Root className="otp" length={length} {...rootProps}>
        {Array.from({ length }, (_, index) => (
          <OTPField.Input
            key={index}
            className="ui-input otp-input"
            aria-label={index === 0 ? undefined : `Character ${index + 1} of ${length}`}
          />
        ))}
      </OTPField.Root>
      {description && <Field.Description className="fld-description">{description}</Field.Description>}
    </Field.Root>
  );
}
