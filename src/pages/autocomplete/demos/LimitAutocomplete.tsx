import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { TAGS, type Tag } from './data';

const LIMIT = 5;

/**
 * `limit` caps how many items render. On its own that is a silent truncation —
 * the user has no way to know there is more — so it wants a Status saying how
 * much was hidden and what to do about it.
 *
 * Counting the full set of matches means filtering a second time with the same
 * `useFilter` that Base UI uses internally, so the two agree.
 *
 * Status announces politely, so its root element must stay mounted; render its
 * children conditionally instead of the component itself.
 */
export function LimitAutocomplete() {
  const id = React.useId();
  const [value, setValue] = React.useState('');
  const { contains } = Autocomplete.useFilter({ sensitivity: 'base' });

  const hidden = React.useMemo(() => {
    const query = value.trim();
    const total = query ? TAGS.filter((tag) => contains(tag.value, query)).length : TAGS.length;
    return Math.max(0, total - LIMIT);
  }, [value, contains]);

  return (
    <Autocomplete.Root
      items={TAGS}
      value={value}
      onValueChange={setValue}
      limit={LIMIT}
      openOnInputClick
    >
      <Field.Root className="fld">
        <Field.Label className="fld-label" htmlFor={id}>At most {LIMIT} results</Field.Label>
        <Autocomplete.Input id={id} className="ui-input ac-input" placeholder="e.g. component" />
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
            <Autocomplete.Status>
              {hidden > 0 ? (
                <div className="ac-status">
                  {hidden} more {hidden === 1 ? 'match' : 'matches'} — keep typing to narrow it
                </div>
              ) : null}
            </Autocomplete.Status>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}
