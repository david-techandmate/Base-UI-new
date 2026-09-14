import { Autocomplete } from '@base-ui/react/autocomplete';
import { TAG_GROUPS, type Tag, type TagGroup } from './data';

/**
 * Grouped data is an array of objects each carrying an `items` array. Base UI
 * recognises that shape and filters inside each group, dropping groups that
 * end up empty — so no lone heading is left behind over nothing.
 *
 * The nesting mirrors the data: List's function child receives a group,
 * `Autocomplete.Group items={...}` scopes it, and `Autocomplete.Collection`
 * renders that group's surviving items. GroupLabel is associated with its
 * group automatically, so it needs no aria-label of its own.
 *
 * `openOnInputClick` is on here because the groups are the thing worth seeing:
 * a reader should not have to guess a query before the structure appears.
 */
export function GroupedAutocomplete() {
  return (
    <Autocomplete.Root items={TAG_GROUPS} openOnInputClick>
      <label className="ui-field">
        <span className="ui-label">Select a tag</span>
        <Autocomplete.Input className="ui-input ac-input" placeholder="e.g. component" />
      </label>

      <Autocomplete.Portal>
        <Autocomplete.Positioner className="ac-positioner" sideOffset={6}>
          <Autocomplete.Popup className="ac-popup">
            <Autocomplete.Empty>
              <div className="ac-empty">No tags match that query.</div>
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
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}
