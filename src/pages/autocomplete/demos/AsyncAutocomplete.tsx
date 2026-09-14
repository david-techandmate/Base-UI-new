import * as React from 'react';
import { Autocomplete } from '@base-ui/react/autocomplete';

interface Repo {
  id: string;
  name: string;
  owner: string;
}

/**
 * For results that arrive from a server, Base UI must not filter again —
 * `filter={null}` turns the built-in filtering off, because the server already
 * decided what matches. Leaving it on would filter the results a second time
 * and quietly drop rows the server meant to return.
 *
 * The rest is ordinary async work with two things worth getting right:
 *
 *   AbortController  a slow response from an earlier keystroke must not
 *                    overwrite a fast one from a later keystroke.
 *   Status           a live region, so a screen reader hears "searching",
 *                    "4 results" or the error, rather than silence.
 *
 * `aria-busy` on the popup while in flight tells assistive technology the
 * contents are still settling.
 */
export function AsyncAutocomplete() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<Repo[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);

  const abortRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => () => abortRef.current?.abort(), []);

  function handleValueChange(next: string) {
    setQuery(next);

    abortRef.current?.abort();

    if (next.trim() === '') {
      abortRef.current = null;
      setResults([]);
      setError(null);
      setPending(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setPending(true);
    setError(null);

    search(next, controller.signal).then(
      (found) => {
        if (controller.signal.aborted) {
          return;
        }
        setResults(found);
        setPending(false);
      },
      (reason: unknown) => {
        if (controller.signal.aborted) {
          return;
        }
        setError(reason instanceof Error ? reason.message : 'Search failed.');
        setResults([]);
        setPending(false);
      },
    );
  }

  const status = getStatus({ pending, error, query, count: results.length });

  return (
    <Autocomplete.Root
      items={results}
      value={query}
      onValueChange={handleValueChange}
      itemToStringValue={(repo) => repo.name}
      filter={null}
    >
      <label className="ui-field">
        <span className="ui-label">Search repositories</span>
        <Autocomplete.Input className="ui-input ac-input" placeholder="e.g. ui" />
      </label>

      {/* Nothing to say and nothing to show: keep the popup out of the DOM
          rather than opening an empty box. */}
      <Autocomplete.Portal hidden={!status}>
        <Autocomplete.Positioner className="ac-positioner" sideOffset={6}>
          <Autocomplete.Popup className="ac-popup" aria-busy={pending || undefined}>
            <Autocomplete.Status>
              {status && (
                <div className="ac-status" data-placement="top">
                  {pending && <span className="ac-spinner" aria-hidden />}
                  {status}
                </div>
              )}
            </Autocomplete.Status>
            <Autocomplete.List className="ac-list">
              {(repo: Repo) => (
                <Autocomplete.Item key={repo.id} className="ac-item" value={repo}>
                  <span className="ac-item-text">
                    <span className="ac-item-title">{repo.name}</span>
                    <span className="ac-item-meta">{repo.owner}</span>
                  </span>
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}

function getStatus({
  pending,
  error,
  query,
  count,
}: {
  pending: boolean;
  error: string | null;
  query: string;
  count: number;
}) {
  if (pending) {
    return 'Searching…';
  }
  if (error) {
    return error;
  }
  if (query.trim() === '') {
    return null;
  }
  if (count === 0) {
    return `No repositories match "${query.trim()}"`;
  }
  return `${count} ${count === 1 ? 'repository' : 'repositories'} found`;
}

/** Stands in for a network call. Type "fail" to see the error path. */
function search(query: string, signal: AbortSignal): Promise<Repo[]> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (query.trim().toLowerCase() === 'fail') {
        reject(new Error('Could not reach the search service. Try again.'));
        return;
      }
      const needle = query.trim().toLowerCase();
      resolve(REPOS.filter((repo) => `${repo.owner}/${repo.name}`.toLowerCase().includes(needle)));
    }, 450);

    signal.addEventListener('abort', () => clearTimeout(timer), { once: true });
  });
}

const REPOS: Repo[] = [
  { id: 'r1', name: 'base-ui', owner: 'mui' },
  { id: 'r2', name: 'material-ui', owner: 'mui' },
  { id: 'r3', name: 'floating-ui', owner: 'floating-ui' },
  { id: 'r4', name: 'react', owner: 'facebook' },
  { id: 'r5', name: 'vite', owner: 'vitejs' },
  { id: 'r6', name: 'typescript', owner: 'microsoft' },
  { id: 'r7', name: 'playwright', owner: 'microsoft' },
  { id: 'r8', name: 'react-virtual', owner: 'tanstack' },
  { id: 'r9', name: 'router', owner: 'remix-run' },
];
