import { Field } from '@base-ui/react/field';
import { NumberField } from '@base-ui/react/number-field';
import { MinusIcon, PlusIcon } from '../../../showcase/icons';

/**
 * `format` takes `Intl.NumberFormatOptions` verbatim, so currency, percent and
 * unit display come from the platform rather than from string concatenation —
 * which means they follow the user's locale for separators and symbol
 * placement without any work.
 *
 * Two things this buys that hand-formatting does not: the underlying value
 * stays a plain number (0.15, not "15%"), and typing "1,234" or "£1,234" is
 * parsed rather than rejected.
 *
 * `locale` pins the formatting when it should not follow the user's runtime —
 * a price always shown in one market's convention, for instance.
 */
const PRESETS = {
  currency: {
    label: 'Price',
    defaultValue: 1250,
    step: 50,
    format: { style: 'currency', currency: 'GBP' } as Intl.NumberFormatOptions,
    hint: 'style: "currency", currency: "GBP"',
  },
  percent: {
    label: 'Discount',
    defaultValue: 0.15,
    step: 0.01,
    format: { style: 'percent', maximumFractionDigits: 1 } as Intl.NumberFormatOptions,
    hint: 'The value is 0.15, not 15 — percent is display only.',
  },
  unit: {
    label: 'Distance',
    defaultValue: 42,
    step: 1,
    format: {
      style: 'unit',
      unit: 'kilometer',
      unitDisplay: 'short',
    } as Intl.NumberFormatOptions,
    hint: 'style: "unit", unit: "kilometer"',
  },
  grouped: {
    label: 'Population',
    defaultValue: 8982000,
    step: 1000,
    format: { useGrouping: true } as Intl.NumberFormatOptions,
    hint: 'Typing "8,982,000" parses; so does "8982000".',
  },
} as const;

export function FormatNumberField({ preset }: { preset: keyof typeof PRESETS }) {
  const { label, defaultValue, step, format, hint } = PRESETS[preset];

  return (
    <Field.Root className="fld">
      <Field.Label className="fld-label">{label}</Field.Label>
      <NumberField.Root defaultValue={defaultValue} step={step} format={format}>
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
