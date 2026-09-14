import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { CITIES } from './data';

/**
 * The default filter is `contains`, case- and accent-sensitive to the user's
 * locale. `useFilter` returns `contains`, `startsWith` and `endsWith` built on
 * `Intl.Collator`, and its options are Collator options — so
 * `sensitivity: 'base'` makes "München" match "munchen" and "Bogotá" match
 * "bogota", which plain `toLowerCase().includes()` never would.
 *
 * That matters for any list with real place or person names in it. Try
 * "munchen" or "sao" across the three, and "rd" to separate `contains` from
 * `startsWith` — Bordeaux and Córdoba contain it, neither begins with it.
 */
export function FilterAutocomplete({
  match = 'contains',
  sensitivity,
}: {
  match?: 'contains' | 'startsWith';
  sensitivity?: 'base' | 'variant';
}) {
  const id = React.useId();
  const filter = Autocomplete.useFilter({ sensitivity });

  // The filter identity changes when the options change, so memoise on it
  // rather than rebuilding the function on every keystroke.
  const matches = React.useCallback(
    (item: string, query: string) =>
      match === 'startsWith' ? filter.startsWith(item, query) : filter.contains(item, query),
    [filter, match],
  );

  return (
    <Autocomplete.Root items={CITIES} filter={matches}>
      {/* Three of these sit side by side, so a visible label on each would just
          repeat the demo caption. The label is still a real <label> — hidden
          visually, not replaced by an aria-label: it associates by `for`, it is
          clickable, and the field state attributes come with it. */}
      <Field.Root className="fld">
        <Field.Label className="ui-visually-hidden" htmlFor={id}>
          {`Search cities, ${match}, sensitivity ${sensitivity ?? 'default'}`}
        </Field.Label>
        <Autocomplete.Input id={id} className="ui-input ac-input" placeholder="e.g. munchen, rd" />
      </Field.Root>

      <Autocomplete.Portal>
        <Autocomplete.Positioner className="ac-positioner" sideOffset={6}>
          <Autocomplete.Popup className="ac-popup">
            <Autocomplete.Empty>
              <div className="ac-empty">No cities match that query.</div>
            </Autocomplete.Empty>
            <Autocomplete.List className="ac-list">
              {(city: string) => (
                <Autocomplete.Item key={city} className="ac-item" value={city}>
                  {city}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}
