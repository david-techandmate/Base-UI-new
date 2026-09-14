import {
  Callout,
  Demo,
  DemoGrid,
  PageHeader,
  Section,
  SourceBlock,
  TokenReadout,
} from '../../showcase/ui';
import { BasicField } from './demos/BasicField';
import { StatesField } from './demos/StatesField';
import { NativeValidationField } from './demos/NativeValidationField';
import { ValidationModeField } from './demos/ValidationModeField';
import { CustomValidateField } from './demos/CustomValidateField';
import { AsyncValidateField } from './demos/AsyncValidateField';
import { ValidityField } from './demos/ValidityField';
import { FieldsetDemo } from './demos/FieldsetDemo';
import { ServerErrorsForm } from './demos/ServerErrorsForm';
import { ValuesForm } from './demos/ValuesForm';

import basicSource from './demos/BasicField.tsx?raw';
import statesSource from './demos/StatesField.tsx?raw';
import nativeSource from './demos/NativeValidationField.tsx?raw';
import modeSource from './demos/ValidationModeField.tsx?raw';
import customSource from './demos/CustomValidateField.tsx?raw';
import asyncSource from './demos/AsyncValidateField.tsx?raw';
import validitySource from './demos/ValidityField.tsx?raw';
import fieldsetSource from './demos/FieldsetDemo.tsx?raw';
import serverSource from './demos/ServerErrorsForm.tsx?raw';
import valuesSource from './demos/ValuesForm.tsx?raw';

const TOC = [
  { id: 'anatomy', title: 'Anatomy' },
  { id: 'states', title: 'States' },
  { id: 'tokens', title: 'Size and theme' },
  { id: 'native', title: 'Native validation' },
  { id: 'modes', title: 'Validation modes' },
  { id: 'custom', title: 'Custom validation' },
  { id: 'async', title: 'Async validation' },
  { id: 'validity', title: 'Raw validity' },
  { id: 'fieldset', title: 'Fieldset' },
  { id: 'form', title: 'Form' },
];

const ANATOMY = `<Field.Root className="fld">
  <Field.Label className="fld-label">Display name</Field.Label>
  <Field.Control required className="ui-input fld-control" />
  <Field.Error className="fld-error" match="valueMissing">
    Please enter a display name.
  </Field.Error>
  <Field.Description className="fld-description">
    Shown on your profile and in comments.
  </Field.Description>
</Field.Root>`;

export function FieldPage() {
  return (
    <>
      <PageHeader
        title="Field"
        lede="Labelling and validation for a form control. Field is the foundation every other input in this system sits inside — it owns the label association, the description and error wiring, and the seven state attributes that Input, Number Field, OTP Field, Checkbox, Select and the rest all inherit."
        docs="https://base-ui.com/react/components/field"
        toc={TOC}
      />

      <Section
        id="anatomy"
        index={1}
        title="Anatomy"
        description="Root renders a div, Label a real <label>, Control an <input>, Description a <p>, Error a <div>. Nothing is wired up by hand: Label gets its for from the Control's generated id, Description is referenced by aria-describedby, and Error joins that same aria-describedby only while it is showing."
        source={basicSource}
      >
        <DemoGrid columns={1}>
          <Demo label="Field.Root" copy={ANATOMY} align="start">
            <BasicField />
          </Demo>
        </DemoGrid>
        <Callout>
          <code>Field.Control</code> is optional. Any Base UI input works inside{' '}
          <code>Field.Root</code> and picks up the same wiring — <code>Input</code>,{' '}
          <code>Checkbox</code>, <code>Select</code>, <code>Number Field</code>,{' '}
          <code>OTP Field</code>, <code>Autocomplete</code>. That is the whole reason this page
          comes first: everything else in the Inputs and Selection groups composes into it.
        </Callout>
      </Section>

      <Section
        id="states"
        index={2}
        title="States"
        description="Seven states, each a data attribute — and each present on Root, Label, Control, Description and Error alike, so any part can respond without a descendant selector. The chips below are read off the real DOM with a MutationObserver, so they report what Base UI actually set."
        source={statesSource}
      >
        <DemoGrid columns={2}>
          <Demo label="type, then tab away" align="start">
            <StatesField />
          </Demo>
          <Demo label="disabled" align="start">
            <StatesField disabled />
          </Demo>
        </DemoGrid>
        <Callout>
          <code>data-valid</code> is absent until the field has actually been validated — it is
          not the opposite of <code>data-invalid</code>, and before validation the field is
          neither. So a green “valid” treatment on first paint would be a lie; and in{' '}
          <code>Field.Validity</code>, <code>validity.valid</code> is <code>null</code> rather
          than <code>false</code>, which makes <code>!validity.valid</code> a bug waiting to
          happen. Test for <code>=== false</code> when you mean “has failed”.
        </Callout>
      </Section>

      <Section
        id="tokens"
        index={3}
        title="Size and theme"
        description="One field, retokenised live. Use the size and theme switches in the header — nothing here is pinned. The input box itself is .ui-input from the shared primitives, so it is the same box in a field, an autocomplete and a select."
      >
        <DemoGrid columns={2}>
          <Demo label="follows the header" align="start">
            <BasicField />
          </Demo>
          <Demo label="follows the header" align="start">
            <FieldsetDemo />
          </Demo>
        </DemoGrid>
        <TokenReadout />
      </Section>

      <Section
        id="native"
        index={4}
        title="Native validation"
        description="match maps an Error to one key of the browser's own ValidityState, so the constraint lives on the input — required, type, pattern, minLength, min/max — and Base UI only decides which message to show. Several Errors can sit in one Field, each matched to a different failure, so the user sees the reason rather than a generic 'invalid'. Type something and clear it, rather than just tabbing through: see the first note below."
        source={nativeSource}
      >
        <DemoGrid columns={3}>
          <Demo label="valueMissing + typeMismatch" align="start">
            <NativeValidationField kind="email" />
          </Demo>
          <Demo label="patternMismatch" align="start">
            <NativeValidationField kind="pattern" />
          </Demo>
          <Demo label="tooShort" align="start">
            <NativeValidationField kind="length" />
          </Demo>
        </DemoGrid>
        <Callout>
          <code>match</code> also accepts <code>true</code>, which always shows the message. That
          is the hook for an external validation library driving visibility itself, alongside the{' '}
          <code>invalid</code>, <code>dirty</code> and <code>touched</code> props on{' '}
          <code>Field.Root</code> for when the state lives outside Base UI entirely.
        </Callout>
        <Callout>
          Two things worth knowing, both measured in a browser rather than assumed. First,{' '}
          <code>onBlur</code> does not validate a field the user never edited — tabbing through an
          untouched empty required field reports nothing, even though its{' '}
          <code>validity.valueMissing</code> is already <code>true</code>. Right call, but it means
          submit is what actually catches a never-filled required field.
        </Callout>
        <Callout>
          Second, and this one is a genuine trap: browsers compile the <code>pattern</code>{' '}
          attribute with the regex <code>v</code> flag, under which a bare <code>-</code> at the
          edge of a character class is a <em>syntax error</em> — and an uncompilable pattern is
          ignored outright rather than reported. So <code>pattern=&quot;[a-z0-9-]+&quot;</code>{' '}
          accepts <em>anything</em>, silently. Measured in Chromium 141:{' '}
          <code>[a-z0-9-]+</code> and <code>[-a-z0-9]+</code> never mismatch;{' '}
          <code>[a-z0-9\-]+</code> and <code>[a-z0-9]+</code> do. Escape the hyphen, and test
          that your pattern actually rejects something.
        </Callout>
      </Section>

      <Section
        id="modes"
        index={5}
        title="Validation modes"
        description="validationMode decides when the field is checked, and the difference is entirely about how it feels to type. Each of these counts how many times validate() has actually run, so the cost of onChange is visible rather than theoretical."
        source={modeSource}
      >
        <DemoGrid columns={2}>
          <Demo
            label='"onSubmit" (default)'
            note="Nothing until submit — then re-checks on every change, so the error clears as it is fixed."
            align="start"
          >
            <ValidationModeField mode="onSubmit" />
          </Demo>
          <Demo
            label='"onBlur"'
            note="Checked when focus leaves. The usual choice."
            align="start"
          >
            <ValidationModeField mode="onBlur" />
          </Demo>
          <Demo
            label='"onChange"'
            note="Every keystroke. Watch the counter climb."
            align="start"
          >
            <ValidationModeField mode="onChange" />
          </Demo>
          <Demo
            label="onChange + validationDebounceTime"
            note="Same mode, one check per pause."
            align="start"
          >
            <ValidationModeField mode="onChange" debounce={400} />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="custom"
        index={6}
        title="Custom validation"
        description="validate() is for rules the browser has no attribute for. Return a string to fail with that message, an array to fail with several, or nothing to pass. Its second argument is the whole form's values, which is how one field validates against another without lifting state into React."
        source={customSource}
      >
        <DemoGrid columns={2}>
          <Demo label="returning an array of messages" align="start">
            <CustomValidateField kind="rules" />
          </Demo>
          <Demo label="validate(value, formValues)" align="start">
            <CustomValidateField kind="cross-field" />
          </Demo>
        </DemoGrid>
        <Callout>
          A password rule reads far better as a checklist of what is still missing than as one
          sentence trying to say all of it — which is what returning an array is for. The
          cross-field example only works because both fields carry a <code>name</code> and share
          an owning <code>Form</code>.
        </Callout>
      </Section>

      <Section
        id="async"
        index={7}
        title="Async validation"
        description="validate() may be async, which is how a field checks something only the server knows. Type admin, root, support, david or claude to see it fail."
        source={asyncSource}
      >
        <DemoGrid columns={1}>
          <Demo label="async validate + debounce" align="start">
            <AsyncValidateField />
          </Demo>
        </DemoGrid>
        <Callout>
          An async <code>validate</code> does <strong>not</strong> hold up submission when{' '}
          <code>validationMode</code> is <code>onSubmit</code> — the form submits while the check
          is still in flight. Treat it as fast feedback, never as the enforcement point: the
          server has to reject the value too.
        </Callout>
      </Section>

      <Section
        id="validity"
        index={8}
        title="Raw validity"
        description="Field.Validity renders nothing itself — it takes a render function and hands over the raw data: every ValidityState key, the errors array from a custom validate, the value and the initial value. That is how you build what Error cannot: a live checklist, a strength meter, a message that depends on two failures at once."
        source={validitySource}
      >
        <DemoGrid columns={1}>
          <Demo label="Field.Validity" align="start">
            <ValidityField />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="fieldset"
        index={9}
        title="Fieldset"
        description="Fieldset.Root renders a real <fieldset>, so the grouping is in the markup and the legend is announced with each control inside. The practical reason to use it over a div: disabling the fieldset disables every control in it natively, with no flag drilled into each field."
        source={fieldsetSource}
      >
        <DemoGrid columns={2}>
          <Demo label="Fieldset.Root" align="start">
            <FieldsetDemo />
          </Demo>
          <Demo label="disabled" align="start">
            <FieldsetDemo disabled />
          </Demo>
        </DemoGrid>
        <Callout>
          <code>Fieldset.Legend</code> renders a <code>&lt;div&gt;</code>, not a{' '}
          <code>&lt;legend&gt;</code>, and is associated by aria instead. That is deliberate: a
          real <code>&lt;legend&gt;</code> sits inside the border and ignores most layout, so Base
          UI trades the element for one that styles like anything else.
        </Callout>
      </Section>

      <Section
        id="form"
        index={10}
        title="Form"
        description="Client validation catches shape; only the server knows facts. Form's errors prop is how a server's answer gets back onto the right field — an object keyed by each Field.Root's name. The field then behaves as if it had failed locally, and the message clears as the user edits."
        source={serverSource}
      >
        <DemoGrid columns={1}>
          <Demo label="Form errors={...}" align="start">
            <ServerErrorsForm />
          </Demo>
        </DemoGrid>

        <Demo label="onFormSubmit + actionsRef.validate()" align="start">
          <ValuesForm />
        </Demo>
        <SourceBlock source={valuesSource} filename="ValuesForm.tsx" />
        <Callout>
          <code>onFormSubmit</code> hands you the values as an object rather than a{' '}
          <code>FormData</code> to unpack, and calls <code>preventDefault()</code> for you — use
          it when the payload needs reshaping on the way out.{' '}
          <code>actionsRef.current.validate()</code> runs validation without submitting, and takes
          a field name to check just one.
        </Callout>
      </Section>
    </>
  );
}
