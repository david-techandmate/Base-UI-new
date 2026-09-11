import { Collapsible } from '@base-ui/react/collapsible';
import { CaretIcon, ChevronIcon, PlusIcon } from '../../../showcase/icons';
import { SUMMARY } from '../content';

type Indicator = 'plus' | 'caret' | 'chevron';

const ICONS = { plus: PlusIcon, caret: CaretIcon, chevron: ChevronIcon };

/**
 * The indicator is ordinary markup inside a plain button. CSS rotates it from
 * the [data-panel-open] attribute Base UI puts on the trigger.
 */
export function Indicators({
  indicator = 'plus',
  side = 'end',
}: {
  indicator?: Indicator;
  side?: 'start' | 'end';
}) {
  const Icon = ICONS[indicator];

  return (
    <Collapsible.Root className="col" data-variant="minimal">
      <Collapsible.Trigger className="col-trigger" data-indicator-side={side}>
        {side === 'start' && <Icon className="ui-icon" data-indicator={indicator} />}
        Show details
        {side === 'end' && <Icon className="ui-icon" data-indicator={indicator} />}
      </Collapsible.Trigger>
      <Collapsible.Panel className="ui-panel col-panel">
        <div className="col-content">{SUMMARY}</div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
