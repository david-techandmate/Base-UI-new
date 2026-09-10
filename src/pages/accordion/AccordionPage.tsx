import { Callout, Demo, DemoGrid, PageHeader, Section, SizeMatrix, ThemeMatrix } from '../../showcase/ui';
import { BasicAccordion } from './demos/BasicAccordion';
import { OpenBehaviour } from './demos/OpenBehaviour';
import { Indicators } from './demos/Indicators';
import { StatesAccordion } from './demos/StatesAccordion';
import { ControlledAccordion } from './demos/ControlledAccordion';
import { AlwaysOpenAccordion } from './demos/AlwaysOpenAccordion';
import { RichPanels } from './demos/RichPanels';
import { NestedAccordion } from './demos/NestedAccordion';
import { HiddenUntilFound } from './demos/HiddenUntilFound';

import basicSource from './demos/BasicAccordion.tsx?raw';
import openSource from './demos/OpenBehaviour.tsx?raw';
import indicatorSource from './demos/Indicators.tsx?raw';
import statesSource from './demos/StatesAccordion.tsx?raw';
import controlledSource from './demos/ControlledAccordion.tsx?raw';
import cancelSource from './demos/AlwaysOpenAccordion.tsx?raw';
import richSource from './demos/RichPanels.tsx?raw';
import nestedSource from './demos/NestedAccordion.tsx?raw';
import hiddenSource from './demos/HiddenUntilFound.tsx?raw';

const VARIANTS = ['solid', 'outline', 'soft', 'elevated', 'minimal'] as const;

const TOC = [
  { id: 'variants', title: 'Variants' },
  { id: 'sizes', title: 'Size scale' },
  { id: 'themes', title: 'Themes' },
  { id: 'open-behaviour', title: 'Open behaviour' },
  { id: 'indicators', title: 'Indicators' },
  { id: 'states', title: 'States' },
  { id: 'controlled', title: 'Controlled' },
  { id: 'rich', title: 'Rich panels' },
  { id: 'nested', title: 'Nested' },
  { id: 'find-in-page', title: 'Find in page' },
];

function variantSnippet(variant: string) {
  return `<Accordion.Root className="acc" data-variant="${variant}">
  <Accordion.Item className="acc-item" value="item-1">
    <Accordion.Header className="acc-header">
      <Accordion.Trigger className="acc-trigger">
        Question
        <PlusIcon className="acc-icon" data-indicator="plus" />
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel className="acc-panel">
      <div className="acc-content">Answer</div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>`;
}

export function AccordionPage() {
  return (
    <>
      <PageHeader
        title="Accordion"
        lede="A set of collapsible panels with headings. Panels animate their height from Base UI's --accordion-panel-height variable, and every state is exposed as a data attribute for styling."
        docs="https://base-ui.com/react/components/accordion"
        toc={TOC}
      />

      <Section
        id="variants"
        index={1}
        title="Variants"
        description="Five surface treatments driven entirely by a data-variant attribute on the root. The Base UI markup is identical in each; only CSS changes."
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
              <BasicAccordion variant={variant} />
            </Demo>
          ))}
        </DemoGrid>
      </Section>

      <Section
        id="sizes"
        index={2}
        title="Size scale"
        description="Padding, type scale, icon size, and corner radius all read from --step-* tokens, so a single data-size attribute rescales the component. Each pane below sets its own scale independently of the toolbar."
      >
        <SizeMatrix>{() => <BasicAccordion variant="solid" />}</SizeMatrix>
      </Section>

      <Section
        id="themes"
        index={3}
        title="Themes side by side"
        description="Theme tokens are declared on [data-theme] selectors rather than :root alone, so any subtree can render in a different theme. Useful for reviewing contrast without flipping the whole page."
      >
        <ThemeMatrix>{() => <BasicAccordion variant="solid" />}</ThemeMatrix>
      </Section>

      <Section
        id="open-behaviour"
        index={4}
        title="Open behaviour"
        description="By default one panel is open at a time. multiple allows several, and defaultValue seeds the uncontrolled open state with an array of item values."
        source={openSource}
      >
        <DemoGrid columns={3}>
          <Demo label="single (default)" align="stretch">
            <OpenBehaviour />
          </Demo>
          <Demo label="multiple" align="stretch">
            <OpenBehaviour multiple />
          </Demo>
          <Demo label='defaultValue={["start"]}' align="stretch">
            <OpenBehaviour defaultValue={['start']} />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="indicators"
        index={5}
        title="Trigger indicators"
        description="The trigger renders a plain button, so indicators are ordinary markup. Rotation is keyed off Base UI's [data-panel-open] attribute rather than React state."
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
        id="states"
        index={6}
        title="Disabled states"
        description="disabled on the root disables every trigger; on a single item it disables just that one. Both expose [data-disabled] for styling."
        source={statesSource}
      >
        <DemoGrid columns={2}>
          <Demo label="disabled (root)" align="stretch">
            <StatesAccordion disabledRoot />
          </Demo>
          <Demo
            label='disabled (item "start")'
            note="Focus still moves through the disabled trigger, matching the APG."
            align="stretch"
          >
            <StatesAccordion disabledItems={['start']} />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="controlled"
        index={7}
        title="Controlled and cancelable"
        description="onValueChange receives the new value and an eventDetails object. Read eventDetails.reason to run side effects conditionally, or call eventDetails.cancel() to refuse a change while keeping the component uncontrolled."
        source={`${controlledSource}\n\n/* ------------------------------------------------------------------ */\n\n${cancelSource}`}
      >
        <DemoGrid columns={2}>
          <Demo label="value / onValueChange" align="stretch">
            <ControlledAccordion />
          </Demo>
          <Demo
            label="eventDetails.cancel()"
            note="Refuses to close the last open panel — no external state needed."
            align="stretch"
          >
            <AlwaysOpenAccordion />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="rich"
        index={8}
        title="Rich panel content"
        description="Triggers can carry two-line labels, avatars, and badges; panels can hold any layout. This composition keeps multiple open at once so records can be compared."
        source={richSource}
      >
        <DemoGrid columns={1}>
          <Demo label="multiple + composed trigger and panel" align="stretch" pad="tight">
            <RichPanels />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="nested"
        index={9}
        title="Nested accordions"
        description="Each Root owns its own value, so accordions nest with no extra wiring. Both levels animate height, so the outer panel resizes as the inner one opens."
        source={nestedSource}
      >
        <DemoGrid columns={1}>
          <Demo label="Accordion.Root inside Accordion.Panel" align="stretch" pad="tight">
            <NestedAccordion />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="find-in-page"
        index={10}
        title="Find in page"
        description={`hiddenUntilFound keeps closed panels mounted with hidden="until-found", so browser search and search engines reach their contents.`}
        source={hiddenSource}
      >
        <Callout>
          Press Ctrl+F (Cmd+F on macOS) and search for “restocking” — the browser opens the closed
          panel containing the match.
        </Callout>
        <DemoGrid columns={1}>
          <Demo label="hiddenUntilFound" align="stretch" pad="tight">
            <HiddenUntilFound />
          </Demo>
        </DemoGrid>
      </Section>
    </>
  );
}
