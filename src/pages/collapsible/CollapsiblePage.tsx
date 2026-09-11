import { Callout, Demo, DemoGrid, PageHeader, Section, SizeMatrix, ThemeMatrix } from '../../showcase/ui';
import { BasicCollapsible } from './demos/BasicCollapsible';
import { Indicators } from './demos/Indicators';
import { ControlledCollapsible } from './demos/ControlledCollapsible';
import { StatesCollapsible } from './demos/StatesCollapsible';
import { RichCollapsible } from './demos/RichCollapsible';
import { MountingCollapsible } from './demos/MountingCollapsible';

import basicSource from './demos/BasicCollapsible.tsx?raw';
import indicatorSource from './demos/Indicators.tsx?raw';
import controlledSource from './demos/ControlledCollapsible.tsx?raw';
import statesSource from './demos/StatesCollapsible.tsx?raw';
import richSource from './demos/RichCollapsible.tsx?raw';
import mountingSource from './demos/MountingCollapsible.tsx?raw';

const VARIANTS = ['solid', 'outline', 'soft', 'elevated', 'minimal'] as const;

const TOC = [
  { id: 'variants', title: 'Variants' },
  { id: 'sizes', title: 'Size scale' },
  { id: 'themes', title: 'Themes' },
  { id: 'states', title: 'States' },
  { id: 'indicators', title: 'Indicators' },
  { id: 'controlled', title: 'Controlled' },
  { id: 'rich', title: 'Rich content' },
  { id: 'mounting', title: 'Mounting' },
];

function variantSnippet(variant: string) {
  return `<Collapsible.Root className="col" data-variant="${variant}">
  <Collapsible.Trigger className="col-trigger">
    Trigger
    <ChevronIcon className="ui-icon" data-indicator="chevron" />
  </Collapsible.Trigger>
  <Collapsible.Panel className="ui-panel col-panel">
    <div className="col-content">Panel</div>
  </Collapsible.Panel>
</Collapsible.Root>`;
}

export function CollapsiblePage() {
  return (
    <>
      <PageHeader
        title="Collapsible"
        lede="A single panel controlled by a button — the primitive Accordion is built from. The open state is a boolean rather than a list of values, and hiddenUntilFound is a Panel prop."
        docs="https://base-ui.com/react/components/collapsible"
        toc={TOC}
      />

      <Callout>
        The height transition, indicator rotation, actions, and badges on this page come from{' '}
        <code>base/primitives.css</code> — shared with Accordion. Only the surface treatments in{' '}
        <code>components/collapsible.css</code> are specific to this component.
      </Callout>

      <Section
        id="variants"
        index={1}
        title="Variants"
        description="The same five surface treatments Accordion uses, so the two components sit together without looking unrelated. Because Collapsible is a single panel, the variant styles land on the root rather than on repeated items."
        source={basicSource}
      >
        <DemoGrid columns={3}>
          {VARIANTS.map((variant) => (
            <Demo
              key={variant}
              label={`data-variant="${variant}"`}
              copy={variantSnippet(variant)}
              align="stretch"
            >
              <BasicCollapsible variant={variant} />
            </Demo>
          ))}
        </DemoGrid>
      </Section>

      <Section
        id="sizes"
        index={2}
        title="Size scale"
        description="Identical --step-* tokens to Accordion, so a Collapsible and an Accordion at the same size line up."
      >
        <SizeMatrix>{() => <BasicCollapsible variant="solid" />}</SizeMatrix>
      </Section>

      <Section
        id="themes"
        index={3}
        title="Themes side by side"
        description="Each pane sets its own data-theme scope, independent of the toolbar."
      >
        <ThemeMatrix>{() => <BasicCollapsible variant="solid" />}</ThemeMatrix>
      </Section>

      <Section
        id="states"
        index={4}
        title="Default and disabled states"
        description="defaultOpen takes a boolean here, not an array. disabled blocks interaction and exposes [data-disabled] on the trigger."
        source={statesSource}
      >
        <DemoGrid columns={3}>
          <Demo label="closed (default)" align="stretch">
            <StatesCollapsible />
          </Demo>
          <Demo label="defaultOpen" align="stretch">
            <StatesCollapsible defaultOpen />
          </Demo>
          <Demo label="disabled" align="stretch">
            <StatesCollapsible disabled />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="indicators"
        index={5}
        title="Trigger indicators"
        description="Shared with Accordion via .ui-icon — rotation keys off [data-panel-open] on the trigger, so no React state is involved."
        source={indicatorSource}
      >
        <DemoGrid columns={2}>
          <Demo label='data-indicator="plus"' align="stretch">
            <Indicators indicator="plus" />
          </Demo>
          <Demo label='data-indicator="caret"' align="stretch">
            <Indicators indicator="caret" />
          </Demo>
          <Demo label='data-indicator="chevron"' align="stretch">
            <Indicators indicator="chevron" />
          </Demo>
          <Demo
            label='data-indicator-side="start"'
            note="Leading indicator, label pushed after it."
            align="stretch"
          >
            <Indicators indicator="chevron" side="start" />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="controlled"
        index={6}
        title="Controlled"
        description="open / onOpenChange with a boolean. The eventDetails second argument carries the reason and the DOM event, and supports cancel() exactly as Accordion does."
        source={controlledSource}
      >
        <DemoGrid columns={1}>
          <Demo label="open / onOpenChange" align="stretch">
            <ControlledCollapsible />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="rich"
        index={7}
        title="Rich content"
        description="The trigger is a button and the panel is a div, so both take arbitrary layout. This is the shape most 'advanced options' disclosures end up wanting."
        source={richSource}
      >
        <DemoGrid columns={1}>
          <Demo label="composed trigger and panel" align="stretch" pad="tight">
            <RichCollapsible />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="mounting"
        index={8}
        title="Panel mounting"
        description={`Three modes, all Panel props on Collapsible. Open devtools with each panel closed to see the difference: removed from the DOM, present but hidden, or present with hidden="until-found".`}
        source={mountingSource}
      >
        <Callout>
          Search the page for “Accidental damage” — the browser finds it inside the closed
          hiddenUntilFound panel and opens it.
        </Callout>
        <DemoGrid columns={3}>
          <Demo label="default" note="Unmounted when closed." align="stretch">
            <MountingCollapsible />
          </Demo>
          <Demo label="keepMounted" note="Stays in the DOM, hidden." align="stretch">
            <MountingCollapsible mode="keepMounted" />
          </Demo>
          <Demo label="hiddenUntilFound" note="Reachable by find-in-page." align="stretch">
            <MountingCollapsible mode="hiddenUntilFound" />
          </Demo>
        </DemoGrid>
      </Section>
    </>
  );
}
