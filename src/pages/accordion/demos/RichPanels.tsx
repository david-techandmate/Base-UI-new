import { Accordion } from '@base-ui/react/accordion';
import { ChevronIcon } from '../../../showcase/icons';

interface Environment {
  value: string;
  name: string;
  region: string;
  status: string;
  instances: number;
  lastDeploy: string;
  image: string;
  initials: string;
}

const ENVIRONMENTS: Environment[] = [
  {
    value: 'prod',
    name: 'Production',
    region: 'eu-central-1',
    status: 'Healthy',
    instances: 12,
    lastDeploy: '2h ago',
    image: 'docker.io/library/node:22-slim',
    initials: 'PR',
  },
  {
    value: 'staging',
    name: 'Staging',
    region: 'us-east-1',
    status: 'Degraded',
    instances: 3,
    lastDeploy: '18m ago',
    image: 'docker.io/library/node:22-slim',
    initials: 'ST',
  },
  {
    value: 'preview',
    name: 'Preview',
    region: 'ap-west-2',
    status: 'Idle',
    instances: 0,
    lastDeploy: '6d ago',
    image: 'docker.io/library/nginx:1.29-alpine',
    initials: 'PV',
  },
];

/**
 * A trigger is an ordinary button, so it can hold a two-line label, avatars,
 * and badges. Panels can hold any layout at all — here a definition list and
 * a row of actions.
 */
export function RichPanels() {
  return (
    <Accordion.Root className="acc" data-variant="elevated" data-full multiple>
      {ENVIRONMENTS.map((env) => (
        <Accordion.Item className="acc-item" key={env.value} value={env.value}>
          <Accordion.Header className="acc-header">
            <Accordion.Trigger className="acc-trigger">
              <span className="acc-trigger-side">
                <span className="acc-avatar" aria-hidden="true">
                  {env.initials}
                </span>
                <span className="acc-trigger-main">
                  <span>{env.name}</span>
                  <span className="acc-trigger-meta">
                    {env.region} · deployed {env.lastDeploy}
                  </span>
                </span>
              </span>
              <span className="acc-trigger-side">
                <span className="acc-badge" data-tone={env.instances ? undefined : 'neutral'}>
                  {env.instances} live
                </span>
                <ChevronIcon className="acc-icon" data-indicator="chevron" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="acc-panel">
            <div className="acc-content">
              <dl className="acc-kv">
                <dt>Status</dt>
                <dd>{env.status}</dd>
                <dt>Region</dt>
                <dd>{env.region}</dd>
                <dt>Instances</dt>
                <dd>{env.instances}</dd>
                <dt>Image</dt>
                <dd>{env.image}</dd>
              </dl>
              <div className="acc-actions">
                <button type="button" className="acc-action" data-tone="accent">
                  Redeploy
                </button>
                <button type="button" className="acc-action">
                  View logs
                </button>
                <button type="button" className="acc-action">
                  Roll back
                </button>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
