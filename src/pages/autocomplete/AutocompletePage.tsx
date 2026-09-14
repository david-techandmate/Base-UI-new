import {
  Callout,
  Demo,
  DemoGrid,
  PageHeader,
  Section,
  SourceBlock,
  TokenReadout,
} from '../../showcase/ui';
import { BasicAutocomplete } from './demos/BasicAutocomplete';
import { InputGroupAutocomplete } from './demos/InputGroupAutocomplete';
import { ModesAutocomplete } from './demos/ModesAutocomplete';
import { HighlightAutocomplete } from './demos/HighlightAutocomplete';
import { GroupedAutocomplete } from './demos/GroupedAutocomplete';
import { FilterAutocomplete } from './demos/FilterAutocomplete';
import { MatchHighlightAutocomplete } from './demos/MatchHighlightAutocomplete';
import { LimitAutocomplete } from './demos/LimitAutocomplete';
import { AsyncAutocomplete } from './demos/AsyncAutocomplete';
import { InlineAutocomplete } from './demos/InlineAutocomplete';
import { GridAutocomplete } from './demos/GridAutocomplete';

import basicSource from './demos/BasicAutocomplete.tsx?raw';
import inputGroupSource from './demos/InputGroupAutocomplete.tsx?raw';
import modesSource from './demos/ModesAutocomplete.tsx?raw';
import highlightSource from './demos/HighlightAutocomplete.tsx?raw';
import groupedSource from './demos/GroupedAutocomplete.tsx?raw';
import filterSource from './demos/FilterAutocomplete.tsx?raw';
import matchSource from './demos/MatchHighlightAutocomplete.tsx?raw';
import limitSource from './demos/LimitAutocomplete.tsx?raw';
import asyncSource from './demos/AsyncAutocomplete.tsx?raw';
import inlineSource from './demos/InlineAutocomplete.tsx?raw';
import gridSource from './demos/GridAutocomplete.tsx?raw';

const TOC = [
  { id: 'anatomy', title: 'Anatomy' },
  { id: 'input-group', title: 'Input group' },
  { id: 'tokens', title: 'Size and theme' },
  { id: 'modes', title: 'Modes' },
  { id: 'highlighting', title: 'Highlighting' },
  { id: 'grouped', title: 'Grouped' },
  { id: 'filtering', title: 'Filtering' },
  { id: 'limit', title: 'Limit and status' },
  { id: 'async', title: 'Async' },
  { id: 'inline', title: 'Inline list' },
  { id: 'grid', title: 'Grid layout' },
];

const ANATOMY = `<Autocomplete.Root items={tags}>
  <Field.Root className="fld">
    <Field.Label className="fld-label" htmlFor={id}>Search tags</Field.Label>
    <Autocomplete.Input id={id} className="ui-input ac-input" />
  </Field.Root>

  <Autocomplete.Portal>
    <Autocomplete.Positioner className="ac-positioner" sideOffset={6}>
      <Autocomplete.Popup className="ac-popup">
        <Autocomplete.Empty>
          <div className="ac-empty">No tags match that query.</div>
        </Autocomplete.Empty>
        <Autocomplete.List className="ac-list">
          {(tag) => (
            <Autocomplete.Item key={tag.id} className="ac-item" value={tag}>
              {tag.value}
            </Autocomplete.Item>
          )}
        </Autocomplete.List>
      </Autocomplete.Popup>
    </Autocomplete.Positioner>
  </Autocomplete.Portal>
</Autocomplete.Root>`;

export function AutocompletePage() {
  return (
    <>
      <PageHeader
        title="Autocomplete"
        lede="An input that suggests options as you type. The input holds free text — suggestions only optionally complete it — so reach for Combobox instead when the value must be one of the options and the choice has to be remembered. Every example here is composed inside Field."
        docs="https://base-ui.com/react/components/autocomplete"
        toc={TOC}
      />

      <Section
        id="anatomy"
        index={1}
        title="Anatomy"
        description="Root renders no element. Portal moves the list out to the end of the body so nothing can clip it; Positioner measures the input and exposes those measurements as CSS variables; Popup is the surface; List is the scroll container and takes a function child."
        source={basicSource}
      >
        <Callout>
          Every input on this page is composed inside a <code>Field.Root</code>, which is where
          the label association and the field state attributes come from — this page was written
          before Field existed and has been reworked onto it. The build refuses to regress:{' '}
          <code>npm run check:fields</code> fails if an <code>.ui-input</code> appears outside a{' '}
          <code>Field.Root</code>.
        </Callout>
        <Callout>
          One sharp edge in that composition.{' '}
          <code>Autocomplete.Input</code> sets <code>aria-labelledby</code> back to the{' '}
          <code>Field.Label</code>, so a screen reader names it correctly — but it never claims
          the control id <code>Field.Root</code> generated, so the label&rsquo;s <code>for</code>{' '}
          points at an element that does not exist and <strong>clicking the label focuses
          nothing</strong>. Found by testing the click, not by reading the DOM. The fix is one
          id in two places: <code>htmlFor</code> on the label and <code>id</code> on the input,
          from a single <code>React.useId()</code>.
        </Callout>
        <Callout>
          The <code>items</code> prop is what makes any of this work: Base UI filters that array
          against the input value and passes the survivors to <code>List</code>&rsquo;s function
          child. An <code>Item</code>&rsquo;s <code>value</code> should be the item object, not a
          string — that object is what the filter and <code>itemToStringValue</code> receive. An
          object shaped <code>{`{ value, label }`}</code> is understood without configuration.
        </Callout>
        <DemoGrid columns={1}>
          <Demo label="Autocomplete.Root" copy={ANATOMY} align="start" reserve="tall">
            <BasicAutocomplete />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="input-group"
        index={2}
        title="Input group"
        description="InputGroup makes an icon, the input and a clear button read as one control — the border and focus ring move to the group. Clear unmounts when there is nothing to clear rather than sitting there greyed out, and exposes the starting and ending style hooks so it can animate."
        source={inputGroupSource}
      >
        <DemoGrid columns={2}>
          <Demo label="type to open (default)" align="start" reserve>
            <InputGroupAutocomplete />
          </Demo>
          <Demo label="openOnInputClick" align="start" reserve>
            <InputGroupAutocomplete openOnClick />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="tokens"
        index={3}
        title="Size and theme"
        description="One component, retokenised live. Use the size and theme switches in the header — nothing here is pinned. The readout reports what the cascade resolved on <html>, so a token that fails to apply shows up rather than being taken on trust."
      >
        <DemoGrid columns={2}>
          <Demo label="follows the header" align="start" reserve>
            <BasicAutocomplete />
          </Demo>
          <Demo label="follows the header" align="start" reserve>
            <InputGroupAutocomplete openOnClick />
          </Demo>
        </DemoGrid>
        <TokenReadout />
        <Callout>
          The input takes <code>font-size: max(var(--step-text), 1rem)</code> on coarse pointers.
          iOS zooms the whole page when a focused input is under 16px, so the small size token
          would otherwise make the page jump on every tap.
        </Callout>
      </Section>

      <Section
        id="modes"
        index={4}
        title="Modes"
        description="mode is the prop that decides what kind of control this is. It sets two things at once: whether the list filters as you type, and whether the input text changes to the highlighted item. Arrow through each one — the readout shows the input value, so inline completion is visible rather than assumed."
        source={modesSource}
      >
        <DemoGrid columns={2}>
          <Demo label='mode="list" (default)' note="Filters. Input is left alone." align="start" reserve>
            <ModesAutocomplete mode="list" />
          </Demo>
          <Demo label='mode="both"' note="Filters, and completes the input inline." align="start" reserve>
            <ModesAutocomplete mode="both" />
          </Demo>
          <Demo label='mode="inline"' note="No filtering; arrow keys fill the input." align="start" reserve>
            <ModesAutocomplete mode="inline" />
          </Demo>
          <Demo label='mode="none"' note="Neither. A menu attached to an input." align="start" reserve>
            <ModesAutocomplete mode="none" />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="highlighting"
        index={5}
        title="Highlighting"
        description="Base UI marks the active row with data-highlighted whether it got there by keyboard or by pointer. Style that attribute and never :hover — a :hover rule gives you two highlighted rows the moment the pointer rests on one while the keyboard is on another."
        source={highlightSource}
      >
        <DemoGrid columns={2}>
          <Demo label="autoHighlight={false} (default)" align="start" reserve>
            <HighlightAutocomplete label="No auto highlight" />
          </Demo>
          <Demo
            label="autoHighlight"
            note="First match highlights once you type, so Enter picks it."
            align="start"
            reserve
          >
            <HighlightAutocomplete autoHighlight label="Auto highlight" />
          </Demo>
          <Demo
            label="keepHighlight"
            note="Highlight survives the pointer leaving the list."
            align="start"
            reserve
          >
            <HighlightAutocomplete autoHighlight keepHighlight label="Keep highlight" />
          </Demo>
          <Demo
            label="highlightItemOnHover={false}"
            note="Pointer no longer highlights, so :hover could differ."
            align="start"
            reserve
          >
            <HighlightAutocomplete
              autoHighlight
              highlightItemOnHover={false}
              label="No hover highlight"
            />
          </Demo>
        </DemoGrid>
        <Callout>
          With <code>autoHighlight</code> on, Enter picks the highlighted item without the user
          arrowing to it first — so be sure the first match is one they would want chosen.{' '}
          <code>&apos;always&apos;</code> highlights from the moment the list opens, which is what
          an inline list wants since it has no moment of opening.
        </Callout>
      </Section>

      <Section
        id="grouped"
        index={6}
        title="Grouped"
        description="Grouped data is an array of objects each carrying an items array. Base UI recognises that shape, filters inside each group and drops groups that come back empty — so no heading is left stranded over nothing. The markup mirrors the data: List gives you a group, Group scopes it, Collection renders its surviving items."
        source={groupedSource}
      >
        <DemoGrid columns={1}>
          <Demo label="Group > GroupLabel + Collection" align="start" reserve="tall">
            <GroupedAutocomplete />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="filtering"
        index={7}
        title="Filtering"
        description="The default filter is contains, case- and accent-sensitive. useFilter returns contains, startsWith and endsWith built on Intl.Collator, and takes Collator options — so sensitivity: 'base' makes München match munchen, which toLowerCase().includes() never would. Type munchen or sao across all three, then rd to separate contains from startsWith."
        source={filterSource}
      >
        <DemoGrid columns={3}>
          <Demo label="contains (default)" note="Accent-sensitive: munchen finds nothing." align="start" reserve>
            <FilterAutocomplete />
          </Demo>
          <Demo label="sensitivity: 'base'" note="munchen now matches München; rd finds Bordeaux." align="start" reserve>
            <FilterAutocomplete sensitivity="base" />
          </Demo>
          <Demo label="startsWith" note="Anchors to the start: rd finds nothing here." align="start" reserve>
            <FilterAutocomplete match="startsWith" sensitivity="base" />
          </Demo>
        </DemoGrid>

        <Demo label="Autocomplete.Value — marking the match" align="start" reserve="tall">
          <MatchHighlightAutocomplete />
        </Demo>
        <SourceBlock source={matchSource} filename="MatchHighlightAutocomplete.tsx" />
        <Callout>
          <code>Autocomplete.Value</code> takes a render function and hands it the current input
          value, so an item can mark its own matched text without the parent threading state down.
          Split on a capturing group and mark the odd indices — testing each piece against a global
          regex, as is often written, silently drops every other match because{' '}
          <code>lastIndex</code> carries between calls.
        </Callout>
      </Section>

      <Section
        id="limit"
        index={8}
        title="Limit and status"
        description="limit caps how many items render. On its own that is a silent truncation, so it wants a Status saying how much was hidden. Counting the full match set means filtering a second time with the same useFilter Base UI uses internally, so the two agree."
        source={limitSource}
      >
        <DemoGrid columns={1}>
          <Demo label="limit={5} + Autocomplete.Status" align="start" reserve="tall">
            <LimitAutocomplete />
          </Demo>
        </DemoGrid>
        <Callout>
          <code>Status</code> and <code>Empty</code> are live regions: their root element has to
          stay mounted for screen readers to announce changes consistently. Render their{' '}
          <em>children</em> conditionally — never hide or conditionally render the component
          itself, and never put <code>display: none</code>, <code>hidden</code> or{' '}
          <code>aria-hidden</code> on it.
        </Callout>
      </Section>

      <Section
        id="async"
        index={9}
        title="Async"
        description="For results that arrive from a server, filter={null} turns the built-in filtering off — the server already decided what matches, and filtering again would quietly drop rows it meant to return. An AbortController stops a slow earlier response overwriting a fast later one, and Status narrates the wait. Type fail to see the error path."
        source={asyncSource}
      >
        <DemoGrid columns={1}>
          <Demo label="filter={null} + Status + AbortController" align="start" reserve="tall">
            <AsyncAutocomplete />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="inline"
        index={10}
        title="Inline list"
        description="inline renders the list without the component's own popup — no Portal, no Positioner, no Popup. Use it when the surface already exists: a command palette inside a dialog, a search panel, a sidebar filter. Set open unconditionally, or the list is not considered visible and keyboard navigation never engages."
        source={inlineSource}
      >
        <DemoGrid columns={1}>
          <Demo label="inline + open + autoHighlight='always'" align="start">
            <InlineAutocomplete />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="grid"
        index={11}
        title="Grid layout"
        description="grid changes what the arrow keys mean: they move across rows and columns inferred from the DOM rather than down a single list. That needs real rows, which is what Autocomplete.Row is for — chunk the items in JS, not in CSS, or there is nothing for the navigation to read."
        source={gridSource}
      >
        <DemoGrid columns={1}>
          <Demo label="grid + Autocomplete.Row + Autocomplete.Trigger" align="start" reserve="tall">
            <GridAutocomplete />
          </Demo>
        </DemoGrid>
        <Callout>
          This is also where <code>Autocomplete.Trigger</code> earns its place. A picker has no
          sensible resting text, so a button opens it and the search input lives inside the popup.
          Ignoring the <code>item-press</code> reason in <code>onValueChange</code> keeps the
          chosen item&rsquo;s name out of the search box on the way out.
        </Callout>
      </Section>
    </>
  );
}
