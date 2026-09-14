import { Field } from '@base-ui/react/field';
import { Fieldset } from '@base-ui/react/fieldset';

/**
 * Fieldset.Root renders a real `<fieldset>`, so the grouping is in the markup
 * and assistive technology announces the legend along with each control inside.
 *
 * The reason to use it over a plain div: `<fieldset disabled>` disables every
 * control inside it natively — no prop-drilling a `disabled` flag into each
 * field.
 *
 * Fieldset.Legend renders a `<div>`, not a `<legend>`, and is associated by
 * aria instead. That is deliberate: a real `<legend>` is notoriously hard to
 * position — it sits inside the border and ignores most layout — so Base UI
 * trades the element for one that styles like anything else.
 */
export function FieldsetDemo({ disabled = false }: { disabled?: boolean }) {
  return (
    <Fieldset.Root className="fset" disabled={disabled}>
      <Fieldset.Legend className="fset-legend">Billing details</Fieldset.Legend>

      <Field.Root className="fld">
        <Field.Label className="fld-label">Company</Field.Label>
        <Field.Control placeholder="Acme Ltd" className="ui-input fld-control" />
      </Field.Root>

      <Field.Root className="fld">
        <Field.Label className="fld-label">VAT number</Field.Label>
        <Field.Control placeholder="GB123456789" className="ui-input fld-control" />
        <Field.Description className="fld-description">
          {disabled
            ? 'The fieldset is disabled, so every control inside it is too.'
            : 'Leave blank if you are not VAT registered.'}
        </Field.Description>
      </Field.Root>
    </Fieldset.Root>
  );
}
