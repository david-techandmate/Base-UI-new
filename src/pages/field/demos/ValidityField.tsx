import { Field } from '@base-ui/react/field';

/**
 * `Field.Validity` renders nothing itself — it takes a render function and
 * hands over the raw validity data, so you can build something Error cannot:
 * a live checklist, a strength meter, a message that depends on two failures
 * at once.
 *
 * What it gives you: `validity` (every ValidityState key), `errors` (the array
 * from a custom validate), `error` (the first of them), `value` and
 * `initialValue`.
 *
 * Note `validity.valid` is `null` before the field has been validated, not
 * `false` — so a bare `!validity.valid` would wrongly report an untouched
 * field as broken. Check for `=== false` when you mean "has failed".
 */
export function ValidityField() {
  return (
    <Field.Root className="fld" validationMode="onChange">
      <Field.Label className="fld-label">URL</Field.Label>
      <Field.Control
        type="url"
        required
        pattern="https://.*"
        placeholder="https://example.com"
        className="ui-input fld-control"
      />

      <Field.Validity>
        {(validity) => (
          <div className="fld-flags">
            <span className="fld-flag" data-on={validity.value ? '' : undefined}>
              has a value
            </span>
            <span className="fld-flag" data-on={!validity.validity.typeMismatch || undefined}>
              is a URL
            </span>
            <span className="fld-flag" data-on={!validity.validity.patternMismatch || undefined}>
              starts with https
            </span>
            <span
              className="fld-flag"
              data-flag={validity.validity.valid === false ? 'invalid' : undefined}
              data-on={validity.validity.valid === true ? '' : undefined}
            >
              {validity.validity.valid === null
                ? 'not yet validated'
                : validity.validity.valid
                  ? 'valid'
                  : 'invalid'}
            </span>
          </div>
        )}
      </Field.Validity>

      <Field.Description className="fld-description">
        Built from the raw ValidityState rather than from a single message.
      </Field.Description>
    </Field.Root>
  );
}
