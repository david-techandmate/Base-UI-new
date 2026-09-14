import { Field } from '@base-ui/react/field';
import { NumberField } from '@base-ui/react/number-field';
import { MinusIcon, PlusIcon } from '../../../showcase/icons';

/**
 * Three step sizes, reachable without leaving the keyboard:
 *
 *   ArrowUp / ArrowDown          step        (default 1)
 *   Alt + Arrow                  smallStep   (default 0.1)
 *   Shift + Arrow                largeStep   (default 10)
 *
 * The same modifiers apply to the buttons and to scrubbing, so a single
 * control covers coarse and fine adjustment without a second input.
 *
 * `snapOnStep` changes what stepping means: instead of adding the step to the
 * current value, it rounds to the nearest multiple of it. From 7 with step 5,
 * incrementing gives 10 rather than 12.
 */
export function StepsNumberField({
  step,
  smallStep,
  largeStep,
  snapOnStep,
  defaultValue = 0,
  hint,
}: {
  step?: number | 'any';
  smallStep?: number;
  largeStep?: number;
  snapOnStep?: boolean;
  defaultValue?: number;
  hint: string;
}) {
  return (
    <Field.Root className="fld">
      <Field.Label className="fld-label">Amount</Field.Label>
      <NumberField.Root
        defaultValue={defaultValue}
        step={step}
        smallStep={smallStep}
        largeStep={largeStep}
        snapOnStep={snapOnStep}
      >
        <NumberField.Group className="nf-group">
          <NumberField.Decrement className="nf-step" aria-label="Decrease">
            <MinusIcon className="ui-icon" />
          </NumberField.Decrement>
          <NumberField.Input className="ui-input nf-input" data-width="wide" />
          <NumberField.Increment className="nf-step" aria-label="Increase">
            <PlusIcon className="ui-icon" />
          </NumberField.Increment>
        </NumberField.Group>
      </NumberField.Root>
      <Field.Description className="fld-description">{hint}</Field.Description>
    </Field.Root>
  );
}
