import { Callout, Demo, DemoGrid, PageHeader, Section, TokenReadout } from '../../showcase/ui';
import { BasicOTPField } from './demos/BasicOTPField';
import { ValidationTypeOTPField } from './demos/ValidationTypeOTPField';
import { GroupedOTPField } from './demos/GroupedOTPField';
import { NormalizeOTPField } from './demos/NormalizeOTPField';
import { StatesOTPField } from './demos/StatesOTPField';
import { CompleteOTPField } from './demos/CompleteOTPField';

import basicSource from './demos/BasicOTPField.tsx?raw';
import typeSource from './demos/ValidationTypeOTPField.tsx?raw';
import groupedSource from './demos/GroupedOTPField.tsx?raw';
import normalizeSource from './demos/NormalizeOTPField.tsx?raw';
import statesSource from './demos/StatesOTPField.tsx?raw';
import completeSource from './demos/CompleteOTPField.tsx?raw';

const TOC = [
  { id: 'anatomy', title: 'Anatomy' },
  { id: 'tokens', title: 'Size and theme' },
  { id: 'types', title: 'Validation types' },
  { id: 'grouped', title: 'Grouped' },
  { id: 'normalize', title: 'Normalizing' },
  { id: 'states', title: 'States' },
  { id: 'complete', title: 'Completion' },
];

const ANATOMY = `<Field.Root className="fld">
  <Field.Label className="fld-label">Verification code</Field.Label>
  <OTPField.Root className="otp" length={6}>
    {Array.from({ length: 6 }, (_, index) => (
      <OTPField.Input
        key={index}
        className="ui-input otp-input"
        aria-label={index === 0 ? undefined : \`Character \${index + 1} of 6\`}
      />
    ))}
  </OTPField.Root>
</Field.Root>`;

export function OTPFieldPage() {
  return (
    <>
      <PageHeader
        title="OTP Field"
        lede="A one-time code split across individual character slots. Each slot is a real input, so paste, autofill and the platform's SMS-code suggestion all work — which is the whole reason not to build this out of a single text box."
        docs="https://base-ui.com/react/components/otp-field"
        toc={TOC}
      />

      <Section
        id="anatomy"
        index={1}
        title="Anatomy"
        description="length is required, not optional — the root needs it to clamp values, detect completion and render consistent validation markup before the slots hydrate. Render exactly that many Inputs, and let Field.Root own the label and validation as everywhere else."
        source={basicSource}
      >
        <DemoGrid columns={2}>
          <Demo label="length={6}" copy={ANATOMY} align="start">
            <BasicOTPField />
          </Demo>
          <Demo label="length={4}" align="start">
            <BasicOTPField
              length={4}
              label="PIN"
              description="Any length works; four is common for a PIN."
            />
          </Demo>
        </DemoGrid>
        <Callout>
          Only the <em>first</em> slot takes the field label. The rest need their own{' '}
          <code>aria-label</code> saying which position they are — otherwise a screen reader
          announces six identically-named inputs and the user cannot tell where they are in the
          code.
        </Callout>
        <Callout>
          <code>autoComplete</code> defaults to <code>one-time-code</code>, which is what lets iOS
          and Android offer the SMS code above the keyboard. It is applied to the first slot and
          the hidden validation input, and that is enough — putting it on every slot is wrong.
        </Callout>
      </Section>

      <Section
        id="tokens"
        index={2}
        title="Size and theme"
        description="The slots are sized from the type and padding steps, so they grow with the rest of the system rather than being pinned to 40px. Coarse pointers get the 16px floor that stops iOS zooming, and the box grows to match rather than letting the character overflow."
      >
        <DemoGrid columns={2}>
          <Demo label="follows the header" align="start">
            <BasicOTPField description={null} />
          </Demo>
          <Demo label="follows the header" align="start">
            <GroupedOTPField />
          </Demo>
        </DemoGrid>
        <TokenReadout />
      </Section>

      <Section
        id="types"
        index={3}
        title="Validation types"
        description="validationType filters what a slot accepts and sets a matching inputMode with it — numeric brings up the number pad on a phone, the others the ordinary keyboard. Try typing the wrong kind of character into each."
        source={typeSource}
      >
        <DemoGrid columns={2}>
          <Demo label='"numeric" (default)' align="start">
            <ValidationTypeOTPField type="numeric" />
          </Demo>
          <Demo label='"alpha"' align="start">
            <ValidationTypeOTPField type="alpha" />
          </Demo>
          <Demo label='"alphanumeric"' align="start">
            <ValidationTypeOTPField type="alphanumeric" />
          </Demo>
          <Demo label='"none"' align="start">
            <ValidationTypeOTPField type="none" />
          </Demo>
        </DemoGrid>
        <Callout>
          A rejected character is <em>not</em> a validation error — nothing was committed, so
          there is no invalid state to report and no <code>Field.Error</code> to show. It surfaces
          through <code>onValueInvalid</code> instead, which is the hook for momentary feedback.
          See the next section but one.
        </Callout>
      </Section>

      <Section
        id="grouped"
        index={4}
        title="Grouped"
        description="A six-character code is easier to read and to dictate as two groups of three. Wrapping subsets of slots in plain divs is all it takes — Base UI tracks the slots by order, not by their being direct children."
        source={groupedSource}
      >
        <DemoGrid columns={1}>
          <Demo label="OTPField.Separator" align="start">
            <GroupedOTPField />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="normalize"
        index={5}
        title="Normalizing"
        description="normalizeValue runs after validationType filtering, and its result is filtered again and clamped to length. The usual use is case — a recovery code reads better uppercased than as whatever was typed. Type lowercase here, then try a symbol."
        source={normalizeSource}
      >
        <DemoGrid columns={1}>
          <Demo label="normalizeValue + onValueInvalid" align="start">
            <NormalizeOTPField />
          </Demo>
        </DemoGrid>
        <Callout>
          The normalizer <strong>must be idempotent</strong>. Base UI may normalize the same value
          more than once while handling an edit, storing state and rendering, so one that changes
          its output on a second pass — appending, incrementing, trimming a character at a time —
          compounds. <code>toUpperCase()</code> is safe precisely because running it twice does
          nothing.
        </Callout>
        <Callout>
          The shake is visual only, so the same news goes to an <code>aria-live</code> region. A
          rejected keystroke that is silent to a screen reader is a keystroke the user thinks
          worked.
        </Callout>
      </Section>

      <Section
        id="states"
        index={6}
        title="States"
        description="OTP Field adds data-readonly, data-required, data-complete and data-filled to Field's seven. data-complete is the useful one for styling — every slot filled, so the row can settle and signal the code is ready."
        source={statesSource}
      >
        <DemoGrid columns={2}>
          <Demo label="default" align="start">
            <StatesOTPField variant="default" />
          </Demo>
          <Demo label="placeholder hints" align="start">
            <StatesOTPField variant="placeholder" />
          </Demo>
          <Demo label="mask" align="start">
            <StatesOTPField variant="mask" />
          </Demo>
          <Demo label="readOnly" align="start">
            <StatesOTPField variant="readOnly" />
          </Demo>
          <Demo label="disabled" align="start">
            <StatesOTPField variant="disabled" />
          </Demo>
          <Demo label="required" align="start">
            <StatesOTPField variant="required" />
          </Demo>
        </DemoGrid>
        <Callout>
          <code>data-filled</code> means two different things depending on where it sits: a{' '}
          <em>slot</em> is filled when it holds a character, the <em>root</em> when any slot does.
          Worth knowing before writing a selector that assumes one of them.
        </Callout>
      </Section>

      <Section
        id="complete"
        index={7}
        title="Completion"
        description="Three callbacks, and the ordering matters. onValueChange fires on every change with a reason; onValueComplete fires once every slot is filled, after the internal update; autoSubmit submits the owning form the moment it completes — which is what a verification screen wants, with no button to reach for."
        source={completeSource}
      >
        <DemoGrid columns={1}>
          <Demo label="onValueComplete + autoSubmit" align="start">
            <CompleteOTPField />
          </Demo>
        </DemoGrid>
        <Callout>
          Paste the whole code rather than typing it: a six-character paste fills every slot rather
          than only the first, and reports <code>input-paste</code>. One edge worth knowing —
          pasting a complete value over an already-complete one fires{' '}
          <code>onValueComplete</code> but <em>not</em> <code>onValueChange</code>, because the
          value did not actually change.
        </Callout>
      </Section>
    </>
  );
}
