import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { TAGS, type Tag } from './data';

/**
 * Three props govern which row is marked `data-highlighted`:
 *
 *   autoHighlight        false | true | 'always'
 *     false    nothing is highlighted until the user navigates.
 *     true     the first match highlights once the user types.
 *     'always' the first item is highlighted from the moment the list opens —
 *              right for a list rendered inline, where there is no moment of
 *              "opening" to wait for.
 *
 *   keepHighlight        keep the highlight when the pointer leaves the list,
 *                        instead of dropping it and leaving the user nowhere.
 *
 *   highlightItemOnHover default true. Turning it off separates CSS :hover from
 *                        the keyboard highlight, so the two can look different.
 *
 * With autoHighlight on, Enter picks the highlighted item without arrowing to
 * it first — so make sure the first match is the one you would want chosen.
 */
export function HighlightAutocomplete({
  autoHighlight,
  keepHighlight,
  highlightItemOnHover,
  label,
}: {
  autoHighlight?: boolean | 'always';
  keepHighlight?: boolean;
  highlightItemOnHover?: boolean;
  label: string;
}) {
  const id = React.useId();
  return (
    <Autocomplete.Root
      items={TAGS}
      autoHighlight={autoHighlight}
      keepHighlight={keepHighlight}
      highlightItemOnHover={highlightItemOnHover}
    >
      <Field.Root className="fld">
        <Field.Label className="ui-visually-hidden" htmlFor={id}>{label}</Field.Label>
        <Autocomplete.Input id={id} className="ui-input ac-input" placeholder="e.g. co" />
      </Field.Root>

      <Autocomplete.Portal>
        <Autocomplete.Positioner className="ac-positioner" sideOffset={6}>
          <Autocomplete.Popup className="ac-popup">
            <Autocomplete.Empty>
              <div className="ac-empty">No tags match that query.</div>
            </Autocomplete.Empty>
            <Autocomplete.List className="ac-list">
              {(tag: Tag) => (
                <Autocomplete.Item key={tag.id} className="ac-item" value={tag}>
                  {tag.value}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}
