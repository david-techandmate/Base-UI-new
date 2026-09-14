import { Field } from '@base-ui/react/field';

/**
 * `match` maps an Error to one key of the browser's own
 * [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState),
 * so the constraint lives on the input — `required`, `type`, `pattern`,
 * `minLength`, `min`/`max` — and Base UI only decides which message to show.
 *
 * Several Errors can sit in one Field, each matched to a different failure.
 * Only the matching one mounts, so the user sees the reason rather than a
 * generic "invalid".
 *
 * `match` also takes `true`, which always shows the message — that is the hook
 * for an external validation library driving visibility itself.
 *
 * Two things measured in a browser rather than assumed:
 *
 * `onBlur` does not validate a field the user never edited. Tabbing through an
 * untouched empty required field reports nothing, even though its
 * `validity.valueMissing` is already true. That is the right call — no shouting
 * at someone for passing through — but it means submit is what actually catches
 * a never-filled required field.
 *
 * The hyphen in the slug pattern is escaped for a real reason. Browsers compile
 * the `pattern` attribute with the regex `v` flag, under which a bare `-` at the
 * edge of a character class is a syntax error — and an uncompilable pattern is
 * ignored outright, so `[a-z0-9-]+` validates nothing at all and fails silently.
 * `[a-z0-9\-]+` compiles and works.
 */
export function NativeValidationField({ kind }: { kind: 'email' | 'pattern' | 'length' }) {
  if (kind === 'email') {
    return (
      <Field.Root className="fld" validationMode="onBlur">
        <Field.Label className="fld-label">Work email</Field.Label>
        <Field.Control
          type="email"
          required
          placeholder="you@company.com"
          className="ui-input fld-control"
        />
        <Field.Error className="fld-error" match="valueMissing">
          An email address is required.
        </Field.Error>
        <Field.Error className="fld-error" match="typeMismatch">
          That is not a valid email address.
        </Field.Error>
        <Field.Description className="fld-description">
          Two errors, one field. Type something, clear it, then try “nope”.
        </Field.Description>
      </Field.Root>
    );
  }

  if (kind === 'pattern') {
    return (
      <Field.Root className="fld" validationMode="onBlur">
        <Field.Label className="fld-label">Project slug</Field.Label>
        <Field.Control
          required
          pattern="[a-z0-9\-]+"
          placeholder="my-project"
          className="ui-input fld-control"
        />
        <Field.Error className="fld-error" match="patternMismatch">
          Lowercase letters, numbers and hyphens only.
        </Field.Error>
        <Field.Description className="fld-description">
          The hyphen is escaped on purpose — see the note below.
        </Field.Description>
      </Field.Root>
    );
  }

  return (
    <Field.Root className="fld" validationMode="onBlur">
      <Field.Label className="fld-label">Invite code</Field.Label>
      <Field.Control
        required
        minLength={8}
        maxLength={12}
        placeholder="8–12 characters"
        className="ui-input fld-control"
      />
      <Field.Error className="fld-error" match="tooShort">
        Codes are at least 8 characters.
      </Field.Error>
      <Field.Description className="fld-description">
        maxLength stops typing, so tooLong needs a paste to trigger.
      </Field.Description>
    </Field.Root>
  );
}
