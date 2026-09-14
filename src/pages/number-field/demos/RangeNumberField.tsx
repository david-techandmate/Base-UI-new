import { Field } from '@base-ui/react/field';
import { NumberField } from '@base-ui/react/number-field';
import { MinusIcon, PlusIcon } from '../../../showcase/icons';

/**
 * `min` and `max` bound the value, and the steppers pick up `data-disabled` at
 * each end automatically — a button at the limit dims without any React state
 * tracking it.
 *
 * `allowOutOfRange` splits typing from stepping. By default a typed value is
 * clamped back into range on blur, which is safe but hides the mistake. With
 * the prop on, typing may go out of range so the browser's own
 * `rangeUnderflow` / `rangeOverflow` validation fires and the field can say
 * what was wrong. Stepping still clamps either way.
 */
export function RangeNumberField({ allowOutOfRange = false }: { allowOutOfRange?: boolean }) {
  return (
    <Field.Root className="fld" validationMode="onBlur">
      <Field.Label className="fld-label">Seats (1–10)</Field.Label>
      <NumberField.Root defaultValue={5} min={1} max={10} allowOutOfRange={allowOutOfRange}>
        <NumberField.Group className="nf-group">
          <NumberField.Decrement className="nf-step" aria-label="Decrease">
            <MinusIcon className="ui-icon" />
          </NumberField.Decrement>
          <NumberField.Input className="ui-input nf-input" />
          <NumberField.Increment className="nf-step" aria-label="Increase">
            <PlusIcon className="ui-icon" />
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
      <Field.Error className="fld-error" match="rangeOverflow">
        At most 10 seats.
      </Field.Error>
      <Field.Error className="fld-error" match="rangeUnderflow">
        At least 1 seat.
      </Field.Error>
      <Field.Description className="fld-description">
        {allowOutOfRange
          ? 'Type 50 and tab away — it stays, and the error explains why.'
          : 'Type 50 and tab away — it is clamped back to 10 silently.'}
      </Field.Description>
    </Field.Root>
  );
}
