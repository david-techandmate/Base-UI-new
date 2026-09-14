import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { OTPField } from '@base-ui/react/otp-field';

/**
 * `normalizeValue` runs after `validationType` filtering, and its result is
 * filtered again and clamped to `length`. The usual use is case: a recovery
 * code is easier to read in uppercase than as whatever the user typed.
 *
 * It must be idempotent. Base UI may normalize the same value more than once
 * while handling an edit, storing state and rendering, so a normalizer that
 * changes its output on a second pass — appending, incrementing, trimming one
 * character at a time — compounds. `toUpperCase()` is safe because running it
 * twice does nothing.
 *
 * `onValueInvalid` fires when typed or pasted text contains characters that
 * were rejected, and hands you the attempted string before normalization. That
 * is not a validation failure — nothing was committed — so the right feedback
 * is momentary, plus a live region so it is not purely visual.
 */
export function NormalizeOTPField() {
  const [rejected, setRejected] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    [],
  );

  function flagRejected(attempted: string) {
    setRejected(true);
    setMessage(`Unsupported characters in “${attempted}” were ignored.`);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setRejected(false), 400);
  }

  return (
    <Field.Root className="fld">
      <Field.Label className="fld-label">Recovery code</Field.Label>
      <OTPField.Root
        className="otp"
        length={6}
        validationType="alphanumeric"
        // Idempotent: running it twice gives the same result.
        normalizeValue={(value) => value.toUpperCase()}
        onValueInvalid={flagRejected}
        onValueChange={() => setMessage('')}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <OTPField.Input
            key={index}
            className="ui-input otp-input"
            data-rejected={rejected || undefined}
            aria-label={index === 0 ? undefined : `Character ${index + 1} of 6`}
          />
        ))}
      </OTPField.Root>
      <Field.Description className="fld-description">
        Type lowercase — it is uppercased. Type a symbol — it is refused, with a shake.
      </Field.Description>
      {/* The shake is visual only, so the same news goes to a live region. */}
      <span aria-live="polite" className="ui-visually-hidden">
        {message}
      </span>
    </Field.Root>
  );
}
