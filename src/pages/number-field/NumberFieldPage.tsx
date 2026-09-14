import { Callout, Demo, DemoGrid, PageHeader, Section, TokenReadout } from '../../showcase/ui';
import { BasicNumberField } from './demos/BasicNumberField';
import { StepsNumberField } from './demos/StepsNumberField';
import { RangeNumberField } from './demos/RangeNumberField';
import { FormatNumberField } from './demos/FormatNumberField';
import { ScrubNumberField } from './demos/ScrubNumberField';
import { StatesNumberField } from './demos/StatesNumberField';
import { ControlledNumberField } from './demos/ControlledNumberField';

import basicSource from './demos/BasicNumberField.tsx?raw';
import stepsSource from './demos/StepsNumberField.tsx?raw';
import rangeSource from './demos/RangeNumberField.tsx?raw';
import formatSource from './demos/FormatNumberField.tsx?raw';
import scrubSource from './demos/ScrubNumberField.tsx?raw';
import statesSource from './demos/StatesNumberField.tsx?raw';
import controlledSource from './demos/ControlledNumberField.tsx?raw';

const TOC = [
  { id: 'anatomy', title: 'Anatomy' },
  { id: 'tokens', title: 'Size and theme' },
  { id: 'steps', title: 'Step sizes' },
  { id: 'range', title: 'Min and max' },
  { id: 'format', title: 'Formatting' },
  { id: 'scrub', title: 'Scrub area' },
  { id: 'states', title: 'States' },
  { id: 'controlled', title: 'Controlled' },
];

const ANATOMY = `<Field.Root className="fld">
  <Field.Label className="fld-label">Quantity</Field.Label>
  <NumberField.Root defaultValue={4}>
    <NumberField.Group className="nf-group">
      <NumberField.Decrement className="nf-step" aria-label="Decrease">
        <MinusIcon className="ui-icon" />
      </NumberField.Decrement>
      <NumberField.Input className="ui-input nf-input" />
      <NumberField.Increment className="nf-step" aria-label="Increase">
        <PlusIcon className="ui-icon" />
      </NumberField.Increment>
    </NumberField.Group>
  </NumberField.Root>
</Field.Root>`;

export function NumberFieldPage() {
  return (
    <>
      <PageHeader
        title="Number Field"
        lede="A numeric input with steppers, a scrub area, and Intl formatting. It sits inside Field, which owns the label and the validation — Number Field only owns the number."
        docs="https://base-ui.com/react/components/number-field"
        toc={TOC}
      />

      <Section
        id="anatomy"
        index={1}
        title="Anatomy"
        description="Group is what makes the three parts read as one control: it takes the border and the focus ring, and the input and steppers give up their own edges. Field.Root wraps the whole thing, so the label association and validation state come from Field rather than being rebuilt here."
        source={basicSource}
      >
        <DemoGrid columns={1}>
          <Demo label="Field.Root > NumberField.Root > Group" copy={ANATOMY} align="start">
            <BasicNumberField />
          </Demo>
        </DemoGrid>
        <Callout>
          The input is a text input with <code>inputMode</code> set, not{' '}
          <code>&lt;input type=&quot;number&quot;&gt;</code>. That is deliberate:{' '}
          <code>type=&quot;number&quot;</code> brings spinners you cannot style, silently accepts{' '}
          <code>1e5</code>, and in some browsers hands you an empty string when the value is
          invalid. Base UI parses and formats the text itself instead.
        </Callout>
        <Callout>
          Tabular figures on the input matter more here than anywhere else. Without{' '}
          <code>font-variant-numeric: tabular-nums</code> the field changes width as digits change,
          so holding the increment button makes the whole control jitter.
        </Callout>
      </Section>

      <Section
        id="tokens"
        index={2}
        title="Size and theme"
        description="One control, retokenised live. The steppers are sized from the same type and padding steps as the input, so the group stays square at every size — nothing here is a fixed pixel height."
      >
        <DemoGrid columns={2}>
          <Demo label="follows the header" align="start">
            <BasicNumberField />
          </Demo>
          <Demo label="follows the header" align="start">
            <FormatNumberField preset="currency" />
          </Demo>
        </DemoGrid>
        <TokenReadout />
      </Section>

      <Section
        id="steps"
        index={3}
        title="Step sizes"
        description="Three step sizes reachable without leaving the keyboard: arrow keys use step, Alt+arrow uses smallStep, Shift+arrow uses largeStep. The same modifiers apply to the buttons and to scrubbing, so one control covers coarse and fine adjustment without a second input."
        source={stepsSource}
      >
        <DemoGrid columns={2}>
          <Demo
            label="step={1} (default)"
            note="Alt for 0.1, Shift for 10 — both defaults."
            align="start"
          >
            <StepsNumberField hint="Try Alt+Up and Shift+Up." />
          </Demo>
          <Demo
            label="step={0.25} smallStep={0.05} largeStep={1}"
            note="All three set explicitly."
            align="start"
          >
            <StepsNumberField
              step={0.25}
              smallStep={0.05}
              largeStep={1}
              hint="Arrow 0.25, Alt 0.05, Shift 1."
            />
          </Demo>
          <Demo
            label="step={5} snapOnStep"
            note="Rounds to a multiple instead of adding."
            align="start"
          >
            <StepsNumberField
              step={5}
              snapOnStep
              defaultValue={7}
              hint="From 7, incrementing gives 10 — not 12."
            />
          </Demo>
          <Demo
            label='step="any"'
            note="Disables step validation on submit."
            align="start"
          >
            <StepsNumberField step="any" hint="Stepping still uses 1; any value is valid." />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="range"
        index={4}
        title="Min and max"
        description="min and max bound the value, and the steppers pick up data-disabled at each end automatically — a button at the limit dims with no React state tracking it. allowOutOfRange is the interesting prop: it splits typing from stepping."
        source={rangeSource}
      >
        <DemoGrid columns={2}>
          <Demo label="default — typing is clamped" align="start">
            <RangeNumberField />
          </Demo>
          <Demo label="allowOutOfRange" align="start">
            <RangeNumberField allowOutOfRange />
          </Demo>
        </DemoGrid>
        <Callout>
          Clamping silently is safe but hides the mistake — the user typed 50, got 10, and was
          never told why. With <code>allowOutOfRange</code> the typed value survives so the
          browser&rsquo;s own <code>rangeOverflow</code> / <code>rangeUnderflow</code> fires and a{' '}
          <code>Field.Error</code> can explain it. Stepping still clamps either way, which is
          right: a button press is not a typo.
        </Callout>
      </Section>

      <Section
        id="format"
        index={5}
        title="Formatting"
        description="format takes Intl.NumberFormatOptions verbatim, so currency, percent and unit display come from the platform rather than from string concatenation — and follow the user's locale for separators and symbol placement without any work."
        source={formatSource}
      >
        <DemoGrid columns={2}>
          <Demo label='style: "currency"' align="start">
            <FormatNumberField preset="currency" />
          </Demo>
          <Demo label='style: "percent"' align="start">
            <FormatNumberField preset="percent" />
          </Demo>
          <Demo label='style: "unit"' align="start">
            <FormatNumberField preset="unit" />
          </Demo>
          <Demo label="useGrouping" align="start">
            <FormatNumberField preset="grouped" />
          </Demo>
        </DemoGrid>
        <Callout>
          Two things this buys that hand-formatting does not. The underlying value stays a plain
          number — the percent field holds <code>0.15</code>, not <code>&quot;15%&quot;</code> —
          and typing <code>£1,234</code> or <code>1,234</code> is <em>parsed</em> rather than
          rejected. Pin <code>locale</code> when the formatting should not follow the user&rsquo;s
          runtime.
        </Callout>
      </Section>

      <Section
        id="scrub"
        index={6}
        title="Scrub area"
        description="ScrubArea turns a region into a drag handle for the value. Wrapping the label is the usual choice — it is already next to the field and already means 'this number'. Press and drag any of these."
        source={scrubSource}
      >
        <DemoGrid columns={3}>
          <Demo label="horizontal (default)" align="start">
            <ScrubNumberField hint="Drag the label sideways." />
          </Demo>
          <Demo label='direction="vertical"' align="start">
            <ScrubNumberField direction="vertical" hint="Drag the label up and down." />
          </Demo>
          <Demo label="pixelSensitivity={10}" align="start">
            <ScrubNumberField pixelSensitivity={10} hint="Five times less sensitive." />
          </Demo>
        </DemoGrid>
        <Callout>
          <code>ScrubArea</code> does <em>not</em> expose its <code>direction</code> as a data
          attribute, so a <code>[data-direction=&apos;vertical&apos;]</code> rule matches nothing
          and a vertical scrub keeps the horizontal cursor. Pass the prop through as a data
          attribute yourself — the demo does — to keep the cursor rule in CSS rather than inlining
          a style. Caught here because the vertical demo was showing{' '}
          <code>ew-resize</code>.
        </Callout>
        <Callout>
          <code>ScrubAreaCursor</code> draws a custom cursor during the drag using the Pointer Lock
          API, so the browser may show its own “pointer is locked” notice — and Base UI disables it
          in Safari, where that notice causes a layout shift. The scrub still works there; only the
          custom cursor is absent. <code>teleportDistance</code> wraps the pointer back to the
          centre so a long drag never runs out of screen.
        </Callout>
      </Section>

      <Section
        id="states"
        index={7}
        title="States"
        description="Number Field adds data-readonly and data-required to Field's seven, all landing on Root, Group, Input and both steppers. The steppers also gain data-disabled at the ends of the range, not only when the whole field is disabled."
        source={statesSource}
      >
        <DemoGrid columns={3}>
          <Demo label="default" align="start">
            <StatesNumberField variant="default" />
          </Demo>
          <Demo label="disabled" align="start">
            <StatesNumberField variant="disabled" />
          </Demo>
          <Demo label="readOnly" align="start">
            <StatesNumberField variant="readOnly" />
          </Demo>
          <Demo label="required" align="start">
            <StatesNumberField variant="required" />
          </Demo>
          <Demo label="allowWheelScrub" align="start">
            <StatesNumberField variant="wheel" />
          </Demo>
        </DemoGrid>
        <Callout>
          <code>readOnly</code> and <code>disabled</code> are not the same thing. A read-only field
          is still focusable and its value is still submitted; a disabled one is neither.{' '}
          <code>allowWheelScrub</code> is off by default for a good reason — a page scrolling under
          the pointer would otherwise change values by accident.
        </Callout>
      </Section>

      <Section
        id="controlled"
        index={8}
        title="Controlled"
        description="Two callbacks, and the difference matters. onValueChange fires on every change and reports where it came from; onValueCommitted fires when the value settles — on blur after typing, on pointer release after a drag or a button hold."
        source={controlledSource}
      >
        <DemoGrid columns={1}>
          <Demo label="onValueChange vs onValueCommitted" align="start">
            <ControlledNumberField />
          </Demo>
        </DemoGrid>
        <Callout>
          That distinction is the difference between a network request per pixel of a drag and one
          request when the user lets go: <strong>persist on commit, preview on change</strong>. And
          the value is <code>number | null</code> — <code>null</code>, not <code>0</code>, when the
          input is empty, because <code>0</code> is a real value a user may want and the two must
          not be conflated.
        </Callout>
      </Section>
    </>
  );
}
