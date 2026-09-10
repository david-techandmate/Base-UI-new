import { useParams } from 'react-router-dom';
import { findComponent } from '../registry';
import { PageHeader } from '../showcase/ui';
import { PAGES } from './index';

export function ComponentRoute() {
  const { slug } = useParams();
  const entry = findComponent(slug);

  if (!entry) {
    return (
      <>
        <PageHeader title="Not found" lede={`No component is registered for “${slug}”.`} />
      </>
    );
  }

  const Page = PAGES[entry.slug];

  if (!Page) {
    return (
      <>
        <PageHeader title={entry.name} lede={entry.summary} docs={entry.docs} />
        <p className="empty-state">
          This showcase page has not been built yet. Add it under{' '}
          <code>src/pages/{entry.slug}/</code>, register it in <code>src/pages/index.ts</code>, and
          flip its status to <code>'ready'</code> in <code>src/registry.ts</code>.
        </p>
      </>
    );
  }

  return <Page />;
}
