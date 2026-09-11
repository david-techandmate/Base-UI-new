import { Collapsible } from '@base-ui/react/collapsible';
import { ChevronIcon } from '../../../showcase/icons';
import { SUMMARY } from '../content';

/**
 * `disabled` on the Root blocks interaction and surfaces [data-disabled] on
 * the trigger. `defaultOpen` seeds the uncontrolled state.
 */
export function StatesCollapsible({
  disabled = false,
  defaultOpen = false,
}: {
  disabled?: boolean;
  defaultOpen?: boolean;
}) {
  return (
    <Collapsible.Root
      className="col"
      data-variant="solid"
      disabled={disabled}
      defaultOpen={defaultOpen}
    >
      <Collapsible.Trigger className="col-trigger">
        {disabled ? 'Disabled' : defaultOpen ? 'Open by default' : 'Closed by default'}
        <ChevronIcon className="ui-icon" data-indicator="chevron" />
      </Collapsible.Trigger>
      <Collapsible.Panel className="ui-panel col-panel">
        <div className="col-content">{SUMMARY}</div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
