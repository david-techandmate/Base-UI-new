import { Link } from 'react-router-dom';
import { ALL_COMPONENTS, GROUPS, READY_COUNT } from '../registry';
import { PageHeader, Section, DemoGrid, Demo } from '../showcase/ui';

export function HomePage() {
  return (
    <>
      <PageHeader
        title="Base UI Showroom"
        lede="Every Base UI component, styled with our own CSS, rendered across themes, sizes, and structural variations. Pick a component from the sidebar to see its patterns side by side."
      />

      <Section
        id="status"
        index={1}
        title="Coverage"
        description={`${READY_COUNT} of ${ALL_COMPONENTS.length} components have a showcase page. The rest are registered and routed, waiting on their demos.`}
      >
        <DemoGrid columns={3}>
          {GROUPS.map((group) => (
            <Demo key={group.label} label={group.label} align="stretch">
              <ul style={{ margin: 0, paddingInlineStart: '1.125rem', width: '100%' }}>
                {group.items.map((item) => (
                  <li key={item.slug} style={{ marginBlockEnd: '0.25rem' }}>
                    {item.status === 'ready' ? (
                      <Link to={`/c/${item.slug}`}>{item.name}</Link>
                    ) : (
                      <span style={{ color: 'var(--text-subtle)' }}>{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Demo>
          ))}
        </DemoGrid>
      </Section>
    </>
  );
}
