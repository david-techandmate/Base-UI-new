import { Field } from '@base-ui/react/field';

/**
 * `validate` is for rules the browser has no attribute for. Return a string to
 * fail with that message, an array of strings to fail with several, or nothing
 * / null / '' / [] to pass.
 *
 * The second argument is the whole form's values, which is how a field
 * validates against another field — a confirmation that has to match, a date
 * that has to come after another date. Without it you would have to lift the
 * value into React state just to compare two inputs.
 *
 * Returning an array is worth knowing about: a password rule reads far better
 * as a checklist of what is still missing than as one sentence trying to say
 * all of it.
 */
export function CustomValidateField({ kind }: { kind: 'rules' | 'cross-field' }) {
  if (kind === 'rules') {
    return (
      <Field.Root
        className="fld"
        name="password"
        validationMode="onChange"
        validationDebounceTime={300}
        validate={(value) => {
          const text = String(value ?? '');
          if (text === '') {
            return null;
          }
          const missing: string[] = [];
          if (text.length < 10) {
            missing.push('at least 10 characters');
          }
          if (!/[a-z]/.test(text) || !/[A-Z]/.test(text)) {
            missing.push('upper and lower case');
          }
          if (!/\d/.test(text)) {
            missing.push('a number');
          }
          return missing.length ? missing : null;
        }}
      >
        <Field.Label className="fld-label">New password</Field.Label>
        <Field.Control type="password" placeholder="Try “secret”" className="ui-input fld-control" />
        {/* Several messages from one validate(): render the array rather than
            joining it, so each rule is its own line. */}
        <Field.Validity>
          {(validity) =>
            validity.errors.length > 1 ? (
              <div className="fld-error">
                <ul className="fld-error-list">
                  {validity.errors.map((message) => (
                    <li key={message}>Needs {message}.</li>
                  ))}
                </ul>
              </div>
            ) : null
          }
        </Field.Validity>
        {/* A single failure still uses the ordinary Error. */}
        <Field.Validity>
          {(validity) =>
            validity.errors.length === 1 ? (
              <div className="fld-error">Needs {validity.errors[0]}.</div>
            ) : null
          }
        </Field.Validity>
        <Field.Description className="fld-description">
          Checked as you type, debounced by 300ms.
        </Field.Description>
      </Field.Root>
    );
  }

  return (
    <Field.Root
      className="fld"
      name="confirmPassword"
      validationMode="onBlur"
      // The second argument is every named field in the owning Form, which is
      // how this compares itself against another field without lifting state.
      validate={(value, formValues) =>
        value !== formValues.password ? 'The two passwords do not match.' : null
      }
    >
      <Field.Label className="fld-label">Confirm password</Field.Label>
      <Field.Control type="password" placeholder="Repeat it" className="ui-input fld-control" />
      <Field.Error className="fld-error" />
      <Field.Description className="fld-description">
        Compares against the password field above via formValues.
      </Field.Description>
    </Field.Root>
  );
}
