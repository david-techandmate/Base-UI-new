import * as React from 'react';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { TAGS, type Tag } from './data';

/**
 * `mode` is the prop that decides what kind of control this is. It sets two
 * independent behaviours at once:
 *
 *   filtering  — does the list narrow as you type?
 *   inline     — does the input text change to the highlighted item?
 *
 *   list (default)  filter, no inline    the ordinary search box
 *   both            filter + inline      completes as you arrow through matches
 *   inline          no filter + inline   a fixed list, arrow keys fill the input
 *   none            neither              a plain menu attached to an input
 *
 * The readout shows the input value so the inline completion is visible rather
 * than something you have to take on trust: arrow through the list in `both`
 * or `inline` and it changes.
 */
export function ModesAutocomplete({ mode }: { mode: 'list' | 'both' | 'inline' | 'none' }) {
  const [value, setValue] = React.useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Autocomplete.Root items={TAGS} mode={mode} value={value} onValueChange={setValue}>
        <Autocomplete.Input
          className="ui-input ac-input"
          placeholder="e.g. co"
          aria-label={`Search tags, mode ${mode}`}
        />

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

      <p className="state-readout">input value: &quot;{value}&quot;</p>
    </div>
  );
}
