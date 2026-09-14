import { Field } from '@base-ui/react/field';
import { NumberField } from '@base-ui/react/number-field';
import { MinusIcon, PlusIcon } from '../../../showcase/icons';

/**
 * Number Field adds two state attributes of its own to Field's seven:
 * `data-readonly` and `data-required`. Both land on Root, Group, Input and
 * both steppers, so the whole control can respond without descendant
 * selectors.
 *
 * `readOnly` and `disabled` are not the same thing. A read-only field is still
 * focusable and its value is still submitted; a disabled one is neither. Reach
 * for readOnly when the value matters but cannot be edited here.
 *
 * `allowWheelScrub` lets the wheel change the value while the input is focused
 * and hovered. It is off by default for a good reason: a page that scrolls
 * under the pointer would otherwise change values by accident.
 */
export function StatesNumberField({
  variant,
}: {
  variant: 'default' | 'disabled' | 'readOnly' | 'required' | 'wheel';
}) {
  const hints = {
    default: 'Ordinary, editable.',
    disabled: 'Not focusable, not submitted.',
    readOnly: 'Focusable and submitted, but not editable.',
    required: 'Clear it and submit to see the error.',
    wheel: 'Focus it, then scroll the wheel over the input.',
  };

  return (
    <Field.Root className="fld" validationMode="onBlur">
      <Field.Label className="fld-label">Licences</Field.Label>
      <NumberField.Root
        defaultValue={variant === 'required' ? 3 : 12}
        disabled={variant === 'disabled'}
        readOnly={variant === 'readOnly'}
        required={variant === 'required'}
        allowWheelScrub={variant === 'wheel'}
      >
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
      <Field.Error className="fld-error" match="valueMissing">
        A number of licences is required.
      </Field.Error>
      <Field.Description className="fld-description">{hints[variant]}</Field.Description>
    </Field.Root>
  );
}
