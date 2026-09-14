import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Form } from '@base-ui/react/form';

/**
 * `validationMode` decides *when* the field is checked. The difference is
 * entirely about how it feels to type:
 *
 *   onSubmit (default)  nothing until submit — then re-validates on every
 *                       change, so the error clears as the user fixes it.
 *   onBlur              checked when focus leaves. The usual choice: no
 *                       shouting at a half-typed value.
 *   onChange            checked on every keystroke. Honest but noisy; pair it
 *                       with validationDebounceTime for anything expensive.
 *
 * Set on Field.Root it wins over the Form's; set on Form it applies to every
 * field inside.
 */
export function ValidationModeField({
  mode,
  debounce,
}: {
  mode: 'onSubmit' | 'onBlur' | 'onChange';
  debounce?: number;
}) {
  const [checks, setChecks] = React.useState(0);

  return (
    <Form className="frm" onSubmit={(event) => event.preventDefault()}>
      <Field.Root
        className="fld"
        validationMode={mode}
        validationDebounceTime={debounce}
        validate={(value) => {
          setChecks((count) => count + 1);
          return String(value).includes('@') ? null : 'Must contain an @.';
        }}
      >
        <Field.Label className="fld-label">Contact</Field.Label>
        <Field.Control placeholder="you@company.com" className="ui-input fld-control" />
        <Field.Error className="fld-error" />
        <Field.Description className="fld-description">
          validate() has run {checks} {checks === 1 ? 'time' : 'times'}
          {debounce ? `, debounced by ${debounce}ms` : ''}.
        </Field.Description>
      </Field.Root>
      <div className="frm-actions">
        <button type="submit" className="ui-action">
          Submit
        </button>
      </div>
    </Form>
  );
}
