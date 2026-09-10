import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { usePrefs, THEMES, SIZES, type Theme, type Size } from './prefs';

/**
 * The showroom chrome is itself built with Base UI, so the toolbar doubles as
 * a live ToggleGroup example.
 */
function Segmented<T extends string>(props: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="toolbar-field">
      <span className="toolbar-label" id={`${props.label}-label`}>
        {props.label}
      </span>
      <ToggleGroup
        className="segmented"
        aria-labelledby={`${props.label}-label`}
        value={[props.value]}
        onValueChange={(value) => {
          // A ToggleGroup allows deselecting the pressed item, which would
          // leave the showroom with no theme or size. Ignore that case.
          const next = value[0] as T | undefined;
          if (next) {
            props.onChange(next);
          }
        }}
      >
        {props.options.map((option) => (
          <Toggle key={option} className="segmented-option" value={option}>
            {option}
          </Toggle>
        ))}
      </ToggleGroup>
    </div>
  );
}

export function Toolbar() {
  const { theme, size, setTheme, setSize } = usePrefs();

  return (
    <div className="toolbar">
      <Segmented<Theme> label="Theme" options={THEMES} value={theme} onChange={setTheme} />
      <Segmented<Size> label="Size" options={SIZES} value={size} onChange={setSize} />
    </div>
  );
}
