import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { CrossIcon, SearchIcon } from '../../../showcase/icons';
import { TAGS, type Tag } from './data';

/**
 * InputGroup makes a search icon, the input and a clear button read as one
 * control: the border and focus ring move to the group, and the input inside
 * it gives up its own box.
 *
 * Clear is unmounted when there is nothing to clear — it does not sit there
 * greyed out — and exposes `data-starting-style` / `data-ending-style` so its
 * appearance can be animated rather than popping in.
 *
 * `openOnInputClick` decides whether clicking the input opens the list or the
 * user has to type first. Clicking is right for a short, browsable set;
 * typing-first is right when the list is long enough that opening it uninvited
 * is noise.
 */
export function InputGroupAutocomplete({ openOnClick = false }: { openOnClick?: boolean }) {
  const id = React.useId();
  return (
    <Autocomplete.Root items={TAGS} openOnInputClick={openOnClick}>
      {/* Field.Root wraps the group, not just the input: the group is the
          control as far as the user is concerned, so the label association and
          the field state attributes belong on the whole thing. */}
      <Field.Root className="fld">
        <Field.Label className="ui-visually-hidden" htmlFor={id}>Search tags</Field.Label>
        <Autocomplete.InputGroup className="ac-input-group">
          <SearchIcon className="ac-search-icon" />
          <Autocomplete.Input
            id={id}
            className="ui-input ac-input"
            placeholder={openOnClick ? 'Click to open' : 'Type to open'}
          />
          <Autocomplete.Clear className="ac-clear" aria-label="Clear search">
            <CrossIcon width={12} height={12} />
          </Autocomplete.Clear>
        </Autocomplete.InputGroup>
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
