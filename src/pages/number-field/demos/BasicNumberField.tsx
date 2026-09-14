import { Field } from '@base-ui/react/field';
import { NumberField } from '@base-ui/react/number-field';
import { MinusIcon, PlusIcon } from '../../../showcase/icons';

/**
 * Number Field sits inside Field, which is what gives it the label association
 * and the validation state — Number Field itself only owns the number.
 *
 * Group is what makes the three parts read as one control: it takes the border
 * and the focus ring, and the input and steppers give up their own edges.
 *
 * The input is a text input with `inputMode` set, not `<input type="number">`.
 * That is deliberate — type="number" brings spinners you cannot style, silently
 * accepts `1e5`, and on some browsers loses the value entirely when it is
 * invalid. Base UI parses and formats the text itself instead.
 */
export function BasicNumberField({
  label = 'Quantity',
  ...props
}: { label?: string } & NumberField.Root.Props) {
  return (
    <Field.Root className="fld">
      <Field.Label className="fld-label">{label}</Field.Label>
      <NumberField.Root defaultValue={4} {...props}>
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
    </Field.Root>
  );
}
