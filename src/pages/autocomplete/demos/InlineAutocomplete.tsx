import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { SearchIcon } from '../../../showcase/icons';
import { TAG_GROUPS, type Tag, type TagGroup } from './data';

/**
 * `inline` renders the list without the component's own popup — no Portal, no
 * Positioner, no Popup. Use it when the surface already exists: a command
 * palette inside a dialog, a search panel, a sidebar filter.
 *
 * Two things come with it:
 *
 *   open           must be set unconditionally, or the list is not considered
 *                  visible and keyboard navigation does not engage.
 *   autoHighlight  should be 'always' — there is no moment of opening to wait
 *                  for, so a list with nothing highlighted just looks inert.
 *
 * `keepHighlight` stops the highlight vanishing when the pointer wanders off
 * the list, which would otherwise leave Enter with nothing to act on.
 */
export function InlineAutocomplete() {
  const id = React.useId();
  return (
    <Autocomplete.Root inline open items={TAG_GROUPS} autoHighlight="always" keepHighlight>
      <div className="ac-inline">
        <Field.Root className="fld">
          <Field.Label className="ui-visually-hidden" htmlFor={id}>Search tags and commands</Field.Label>
          <Autocomplete.InputGroup className="ac-input-group">
            <SearchIcon className="ac-search-icon" />
            <Autocomplete.Input
            id={id}
              className="ui-input ac-input"
              placeholder="Search tags and commands…"
            />
          </Autocomplete.InputGroup>
        </Field.Root>

        <Autocomplete.Empty>
          <div className="ac-empty">No results.</div>
        </Autocomplete.Empty>

        <Autocomplete.List className="ac-list">
          {(group: TagGroup) => (
            <Autocomplete.Group key={group.value} className="ac-group" items={group.items}>
              <Autocomplete.GroupLabel className="ac-group-label">
                {group.value}
              </Autocomplete.GroupLabel>
              <Autocomplete.Collection>
                {(tag: Tag) => (
                  <Autocomplete.Item key={tag.id} className="ac-item" value={tag}>
                    {tag.value}
                  </Autocomplete.Item>
                )}
              </Autocomplete.Collection>
            </Autocomplete.Group>
          )}
        </Autocomplete.List>
      </div>
    </Autocomplete.Root>
  );
}
