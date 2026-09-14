import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { TAGS, type Tag } from './data';

/**
 * The reference composition. Root renders no element; the first thing carrying
 * a class is the Input.
 *
 * `items` is what makes filtering work — Base UI filters that array against the
 * input value and hands the survivors to List's function child. Without it you
 * would be rendering and filtering the list yourself.
 *
 * Item's `value` should be the item object, not a string: that is what
 * `itemToStringValue` and the filter receive. Here the objects are
 * `{ id, value }`, and Base UI reads `value` without being told to.
 */
export function BasicAutocomplete() {
  const id = React.useId();

  return (
    <Autocomplete.Root items={TAGS}>
      <Field.Root className="fld">
        <Field.Label className="fld-label" htmlFor={id}>
          Search tags
        </Field.Label>
        <Autocomplete.Input id={id} className="ui-input ac-input" placeholder="e.g. feature" />
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
