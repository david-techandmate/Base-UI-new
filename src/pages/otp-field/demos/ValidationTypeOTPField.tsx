import { Field } from '@base-ui/react/field';
import { OTPField } from '@base-ui/react/otp-field';

/**
 * `validationType` filters what a slot will accept, and sets a sensible
 * `inputMode` with it — numeric brings up the number pad on a phone, the
 * others the ordinary keyboard.
 *
 *   numeric (default)  digits only
 *   alpha              letters only
 *   alphanumeric       both — what recovery and invite codes usually are
 *   none               accept anything; do the filtering yourself
 *
 * Rejected characters are not a validation error: nothing was committed, so
 * there is no invalid state to report. They surface through `onValueInvalid`
 * instead, which is the hook for momentary feedback.
 */
const PRESETS = {
  numeric: { label: 'Verification code', hint: 'Digits only. Letters are ignored as you type.' },
  alpha: { label: 'Letter code', hint: 'Letters only. Digits are ignored.' },
  alphanumeric: { label: 'Recovery code', hint: 'Letters and digits, e.g. A7C9XZ.' },
  none: { label: 'Anything', hint: 'No filtering — punctuation and symbols are accepted.' },
} as const;

export function ValidationTypeOTPField({ type }: { type: keyof typeof PRESETS }) {
  const { label, hint } = PRESETS[type];

  return (
    <Field.Root className="fld">
      <Field.Label className="fld-label">{label}</Field.Label>
      <OTPField.Root className="otp" length={6} validationType={type}>
        {Array.from({ length: 6 }, (_, index) => (
          <OTPField.Input
            key={index}
            className="ui-input otp-input"
            aria-label={index === 0 ? undefined : `Character ${index + 1} of 6`}
          />
        ))}
      </OTPField.Root>
      <Field.Description className="fld-description">{hint}</Field.Description>
    </Field.Root>
  );
}
