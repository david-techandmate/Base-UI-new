import { Accordion } from '@base-ui/react/accordion';
import { CaretIcon, ChevronIcon } from '../../../showcase/icons';

const SECTIONS = [
  {
    value: 'account',
    title: 'Account',
    children: [
      { value: 'profile', title: 'Profile', body: 'Name, avatar, and public handle.' },
      { value: 'security', title: 'Security', body: 'Password, passkeys, and active sessions.' },
    ],
  },
  {
    value: 'billing',
    title: 'Billing',
    children: [
      { value: 'plan', title: 'Plan', body: 'Team plan, renewing on the 1st of each month.' },
      { value: 'invoices', title: 'Invoices', body: 'Download past invoices as PDF.' },
    ],
  },
];

/**
 * Accordions nest without extra wiring — each Root manages its own value. The
 * inner panel animates inside the outer one because both animate `height`.
 */
export function NestedAccordion() {
  return (
    <Accordion.Root className="acc" data-variant="solid" data-full defaultValue={['account']}>
      {SECTIONS.map((section) => (
        <Accordion.Item className="acc-item" key={section.value} value={section.value}>
          <Accordion.Header className="acc-header">
            <Accordion.Trigger className="acc-trigger">
              {section.title}
              <ChevronIcon className="ui-icon" data-indicator="chevron" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="ui-panel acc-panel">
            <div className="acc-content">
              <Accordion.Root className="acc" data-variant="minimal" data-full multiple>
                {section.children.map((child) => (
                  <Accordion.Item className="acc-item" key={child.value} value={child.value}>
                    <Accordion.Header className="acc-header">
                      <Accordion.Trigger className="acc-trigger">
                        {child.title}
                        <CaretIcon className="ui-icon" data-indicator="caret" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel className="ui-panel acc-panel">
                      <div className="acc-content">{child.body}</div>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
