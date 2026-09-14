import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { FieldFlags } from './FieldFlags';

/**
 * Every state Base UI tracks appears as a data attribute on Field.Root — and
 * on Label, Control, Description and Error too, so any part can respond to
 * field state without a descendant selector.
 *
 * Worth knowing: `data-valid` is absent until the field has actually been
 * validated. Before that it is neither valid nor invalid, which is why a green
 * "valid" treatment on first paint would be a lie. `data-touched` appears
 * after focus and blur; `data-dirty` compares against the initial value, so
 * typing and then undoing clears it again.
 */
export function StatesField({ disabled = false }: { disabled?: boolean }) {
  const rootRef = React.useRef<HTMLDivElement>(null);

  return (
    <Field.Root
      ref={rootRef}
      className="fld"
      disabled={disabled}
      validationMode="onBlur"
      validate={(value) => (String(value).length < 3 ? 'At least 3 characters.' : null)}
    >
      <Field.Label className="fld-label">Handle</Field.Label>
      <Field.Control
        placeholder={disabled ? 'Disabled' : 'Type, then tab away'}
        className="ui-input fld-control"
      />
      <Field.Error className="fld-error" />
      <Field.Description className="fld-description">
        Validates on blur, so the states settle when focus leaves.
      </Field.Description>
      <FieldFlags rootRef={rootRef} />
    </Field.Root>
  );
}
