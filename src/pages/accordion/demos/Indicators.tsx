import { Accordion } from '@base-ui/react/accordion';
import { CaretIcon, ChevronIcon, PlusIcon } from '../../../showcase/icons';
import { FAQS } from '../content';

type Indicator = 'plus' | 'caret' | 'chevron';

const ICONS = { plus: PlusIcon, caret: CaretIcon, chevron: ChevronIcon };

/**
 * The trigger is a plain button, so the indicator is ordinary markup. CSS keys
 * the rotation off Base UI's `[data-panel-open]` attribute on the trigger.
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
    <Accordion.Root className="acc" data-variant="minimal">
      {FAQS.map((faq) => (
        <Accordion.Item className="acc-item" key={faq.value} value={faq.value}>
          <Accordion.Header className="acc-header">
            <Accordion.Trigger className="acc-trigger" data-indicator-side={side}>
              {side === 'start' && <Icon className="ui-icon" data-indicator={indicator} />}
              {faq.question}
              {side === 'end' && <Icon className="ui-icon" data-indicator={indicator} />}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="ui-panel acc-panel">
            <div className="acc-content">{faq.answer}</div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
