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
  return (
    <Autocomplete.Root items={TAGS}>
      <label className="ui-field">
        <span className="ui-label">Search tags</span>
        <Autocomplete.Input className="ui-input ac-input" placeholder="e.g. feature" />
      </label>

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
