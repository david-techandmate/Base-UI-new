import * as React from 'react';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { DOCS, type DocEntry } from './data';

/**
 * `Autocomplete.Value` takes a render function and hands it the current input
 * value, which is how an item can mark the part of its own text that matched
 * without the parent threading state down to it.
 *
 * Items here are two-line — a title and a summary — and both get marked, so a
 * match found in the summary is visible rather than looking like a stray result.
 */
export function MatchHighlightAutocomplete() {
  return (
    <Autocomplete.Root items={DOCS} itemToStringValue={(doc) => doc.title}>
      <label className="ui-field">
        <span className="ui-label">Search the handbook</span>
        <Autocomplete.Input className="ui-input ac-input" placeholder="e.g. style" />
      </label>

      <Autocomplete.Portal>
        <Autocomplete.Positioner className="ac-positioner" sideOffset={6}>
          <Autocomplete.Popup className="ac-popup">
            <Autocomplete.Empty>
              <div className="ac-empty">
                Nothing matches &quot;
                <Autocomplete.Value />
                &quot;.
              </div>
            </Autocomplete.Empty>
            <Autocomplete.List className="ac-list">
              {(doc: DocEntry) => (
                <Autocomplete.Item key={doc.id} className="ac-item" value={doc}>
                  <Autocomplete.Value>
                    {(query) => (
                      <span className="ac-item-text">
                        <span className="ac-item-title">{mark(doc.title, query)}</span>
                        <span className="ac-item-meta">{mark(doc.summary, query)}</span>
                      </span>
                    )}
                  </Autocomplete.Value>
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

/**
 * Splitting on a capturing group returns [text, match, text, match, …], so the
 * matched pieces are exactly the odd indices.
 *
 * Testing each piece against the regex instead — as is often written — is a
 * bug: a global regex carries `lastIndex` between `.test()` calls, so every
 * other match silently fails to highlight.
 */
function mark(text: string, query: string): React.ReactNode {
  const trimmed = query.trim().slice(0, 100);
  if (!trimmed) {
    return text;
  }

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));

  return parts.map((part, index) =>
    index % 2 === 1 ? <mark key={index}>{part}</mark> : part,
  );
}
