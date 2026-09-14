import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Form } from '@base-ui/react/form';

/**
 * `onFormSubmit` hands you the values as an object keyed by field name, instead
 * of a FormData you have to unpack. Useful when the payload needs reshaping
 * before it goes anywhere — which it usually does.
 *
 * It calls `preventDefault()` on the native event for you, so there is no
 * native submission to suppress.
 *
 * `actionsRef.validate()` runs validation without submitting — the hook for a
 * "check before you continue" step, or for validating one field by name.
 */
export function ValuesForm() {
  const [payload, setPayload] = React.useState<string | null>(null);
  const actionsRef = React.useRef<Form.Actions | null>(null);

  return (
    <Form
      className="frm"
      actionsRef={actionsRef}
      validationMode="onBlur"
      onFormSubmit={(values) => {
        // Reshape on the way out rather than posting the form's own shape.
        setPayload(
          JSON.stringify(
            { product_id: values.sku, order_quantity: Number(values.quantity) },
            null,
            2,
          ),
        );
      }}
    >
      <Field.Root name="sku" className="fld" validate={(v) => (String(v) ? null : 'Required.')}>
        <Field.Label className="fld-label">SKU</Field.Label>
        <Field.Control placeholder="BUI-0042" className="ui-input fld-control" />
        <Field.Error className="fld-error" />
      </Field.Root>

      <Field.Root
        name="quantity"
        className="fld"
        validate={(v) => (Number(v) > 0 ? null : 'Must be more than zero.')}
      >
        <Field.Label className="fld-label">Quantity</Field.Label>
        <Field.Control
          type="number"
          min={1}
          defaultValue={1}
          className="ui-input fld-control"
        />
        <Field.Error className="fld-error" />
      </Field.Root>

      <div className="frm-actions">
        <button type="submit" className="ui-action" data-tone="accent">
          Submit
        </button>
        <button
          type="button"
          className="ui-action"
          onClick={() => actionsRef.current?.validate()}
        >
          Validate without submitting
        </button>
      </div>

      {payload && (
        <pre className="frm-note">
          <code>{payload}</code>
        </pre>
      )}
    </Form>
  );
}
