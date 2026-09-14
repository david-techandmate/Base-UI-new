import * as React from 'react';
import { Field } from '@base-ui/react/field';

/**
 * `validate` may be async, which is how a field checks something only the
 * server knows — is this handle taken, is this coupon still valid.
 *
 * Two things to be deliberate about:
 *
 * `validationDebounceTime` matters much more here than for a sync rule. Without
 * it, `onChange` fires a request per keystroke.
 *
 * An async validate does NOT hold up submission when validationMode is
 * 'onSubmit' — the form submits while the check is still in flight. So a rule
 * that must gate submission needs the server to reject it too; treat this as
 * fast feedback, not as the enforcement point.
 */
const TAKEN = ['admin', 'root', 'support', 'david', 'claude'];

export function AsyncValidateField() {
  const [checking, setChecking] = React.useState(false);

  return (
    <Field.Root
      className="fld"
      validationMode="onChange"
      validationDebounceTime={400}
      validate={async (value) => {
        const handle = String(value ?? '').trim().toLowerCase();
        if (handle === '') {
          return null;
        }

        setChecking(true);
        await new Promise((resolve) => {
          setTimeout(resolve, 500);
        });
        setChecking(false);

        return TAKEN.includes(handle) ? `“${handle}” is already taken.` : null;
      }}
    >
      <Field.Label className="fld-label">Handle</Field.Label>
      <Field.Control placeholder="Try “admin”" className="ui-input fld-control" />
      <Field.Error className="fld-error" />
      <Field.Description className="fld-description">
        {checking ? (
          <>
            <span className="ui-spinner" aria-hidden /> Checking availability…
          </>
        ) : (
          'Debounced by 400ms, so it is one request per pause, not per keystroke.'
        )}
      </Field.Description>
    </Field.Root>
  );
}
