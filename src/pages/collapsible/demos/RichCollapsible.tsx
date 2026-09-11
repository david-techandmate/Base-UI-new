import { Collapsible } from '@base-ui/react/collapsible';
import { ChevronIcon } from '../../../showcase/icons';

const FILTERS = [
  { label: 'Region', value: 'eu-central-1' },
  { label: 'Status', value: 'Healthy' },
  { label: 'Instances', value: '12' },
];

/**
 * A common real-world shape: an "advanced options" disclosure whose trigger
 * carries a two-line label and a count, and whose panel holds a summary and a
 * row of actions.
 */
export function RichCollapsible() {
  return (
    <Collapsible.Root className="col" data-variant="elevated" data-full defaultOpen>
      <Collapsible.Trigger className="col-trigger">
        <span className="col-trigger-side">
          <span className="ui-avatar" aria-hidden="true">
            AF
          </span>
          <span className="col-trigger-main">
            <span>Advanced filters</span>
            <span className="col-trigger-meta">Narrow the result set before querying</span>
          </span>
        </span>
        <span className="col-trigger-side">
          <span className="ui-badge">{FILTERS.length} active</span>
          <ChevronIcon className="ui-icon" data-indicator="chevron" />
        </span>
      </Collapsible.Trigger>
      <Collapsible.Panel className="ui-panel col-panel">
        <div className="col-content">
          <dl className="ui-kv">
            {FILTERS.map((filter) => (
              <div key={filter.label} style={{ display: 'contents' }}>
                <dt>{filter.label}</dt>
                <dd>{filter.value}</dd>
              </div>
            ))}
          </dl>
          <div className="ui-actions">
            <button type="button" className="ui-action" data-tone="accent">
              Apply filters
            </button>
            <button type="button" className="ui-action">
              Reset
            </button>
          </div>
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
