import { Collapsible } from '@base-ui/react/collapsible';
import { ChevronIcon } from '../../../showcase/icons';
import { SUMMARY } from '../content';

/** The reference composition: trigger, panel, chevron indicator. */
export function BasicCollapsible({ variant = 'solid' }: { variant?: string }) {
  return (
    <Collapsible.Root className="col" data-variant={variant}>
      <Collapsible.Trigger className="col-trigger">
        What is Collapsible?
        <ChevronIcon className="ui-icon" data-indicator="chevron" />
      </Collapsible.Trigger>
      <Collapsible.Panel className="ui-panel col-panel">
        <div className="col-content">{SUMMARY}</div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
