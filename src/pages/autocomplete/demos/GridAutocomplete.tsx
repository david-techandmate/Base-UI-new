import * as React from 'react';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { EMOJI_GROUPS, type EmojiGroup } from './emoji';

const COLUMNS = 6;

/**
 * `grid` changes what the arrow keys mean: instead of running down a single
 * list, they move across rows and columns inferred from the DOM. That requires
 * real rows, which is what `Autocomplete.Row` is for — chunk the items and wrap
 * each chunk.
 *
 * This is also the case for `Autocomplete.Trigger`: an emoji picker has no
 * sensible resting text, so a button opens it and the search input lives inside
 * the popup rather than outside it.
 *
 * `onValueChange` ignores the `item-press` reason so that choosing an emoji
 * doesn't dump its name into the search box on the way out.
 */
export function GridAutocomplete() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [picked, setPicked] = React.useState<string[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <Autocomplete.Root
        grid
        items={EMOJI_GROUPS}
        open={open}
        onOpenChange={setOpen}
        onOpenChangeComplete={() => setQuery('')}
        value={query}
        onValueChange={(next, details) => {
          if (details.reason !== 'item-press') {
            setQuery(next);
          }
        }}
      >
        <Autocomplete.Trigger className="ac-trigger" aria-label="Choose an emoji">
          🙂
        </Autocomplete.Trigger>

        <Autocomplete.Portal>
          <Autocomplete.Positioner className="ac-positioner" sideOffset={6} align="start">
            <Autocomplete.Popup className="ac-popup" style={{ width: '17rem' }}>
              <Autocomplete.InputGroup className="ac-input-group">
                <Autocomplete.Input
                  className="ui-input ac-input"
                  placeholder="Search emoji…"
                  aria-label="Search emoji"
                />
              </Autocomplete.InputGroup>

              <Autocomplete.Empty>
                <div className="ac-empty">No emoji match that name.</div>
              </Autocomplete.Empty>

              <Autocomplete.List
                className="ac-list"
                aria-label="Emoji"
                style={{ '--ac-columns': COLUMNS } as React.CSSProperties}
              >
                {(group: EmojiGroup) => (
                  <Autocomplete.Group key={group.value} className="ac-group" items={group.items}>
                    <Autocomplete.GroupLabel className="ac-group-label">
                      {group.value}
                    </Autocomplete.GroupLabel>
                    <div className="ac-grid" role="presentation">
                      {chunk(group.items, COLUMNS).map((row, index) => (
                        <Autocomplete.Row key={index} className="ac-row">
                          {row.map((item) => (
                            <Autocomplete.Item
                              key={item.emoji}
                              className="ac-item"
                              value={item}
                              aria-label={item.name}
                              onClick={() => {
                                setPicked((current) => [...current, item.emoji].slice(-8));
                                setOpen(false);
                              }}
                            >
                              {item.emoji}
                            </Autocomplete.Item>
                          ))}
                        </Autocomplete.Row>
                      ))}
                    </div>
                  </Autocomplete.Group>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>

      <p className="state-readout">picked: {picked.join(' ') || '—'}</p>
    </div>
  );
}

/**
 * The rows have to exist in the DOM for grid navigation to infer the columns,
 * so the chunking happens here rather than in CSS.
 */
function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
}
