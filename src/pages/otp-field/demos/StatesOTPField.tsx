import { Field } from '@base-ui/react/field';
import { OTPField } from '@base-ui/react/otp-field';

/**
 * OTP Field adds four state attributes to Field's seven: `data-readonly`,
 * `data-required`, `data-complete` and `data-filled`.
 *
 * `data-filled` means two different things depending on where it sits — a slot
 * is filled when it holds a character, the root when any slot does. Worth
 * knowing before writing a selector that assumes one of them.
 *
 * `data-complete` is the useful one for styling: every slot filled, so the
 * whole row can settle and signal that the code is ready.
 *
 * `mask` obscures the characters for a code typed on a shared screen. It sets
 * the slot type, so pass `type` on individual Inputs only if you need
 * something else.
 */
export function StatesOTPField({
  variant,
}: {
  variant: 'default' | 'placeholder' | 'mask' | 'readOnly' | 'disabled' | 'required';
}) {
  const hints = {
    default: 'Fill every slot to see the row settle.',
    placeholder: 'Hints stay until the slot is focused.',
    mask: 'For a code typed on a shared screen.',
    readOnly: 'Focusable and submitted, but not editable.',
    disabled: 'Neither focusable nor submitted.',
    required: 'Clear it and tab away to see the error.',
  };

  return (
    <Field.Root className="fld" validationMode="onBlur">
      <Field.Label className="fld-label">Verification code</Field.Label>
      <OTPField.Root
        className="otp"
        length={6}
        mask={variant === 'mask'}
        readOnly={variant === 'readOnly'}
        disabled={variant === 'disabled'}
        required={variant === 'required'}
        defaultValue={['readOnly', 'disabled', 'required'].includes(variant) ? '482913' : undefined}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <OTPField.Input
            key={index}
            className="ui-input otp-input"
            placeholder={variant === 'placeholder' ? '•' : undefined}
            aria-label={index === 0 ? undefined : `Character ${index + 1} of 6`}
          />
        ))}
      </OTPField.Root>
      <Field.Error className="fld-error" match="valueMissing">
        The verification code is required.
      </Field.Error>
      <Field.Description className="fld-description">{hints[variant]}</Field.Description>
    </Field.Root>
  );
}
