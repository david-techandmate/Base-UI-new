import { Callout, Demo, DemoGrid, PageHeader, Section, TokenReadout } from '../../showcase/ui';
import { BasicAlertDialog } from './demos/BasicAlertDialog';
import { DismissalAlertDialog } from './demos/DismissalAlertDialog';
import { FocusAlertDialog } from './demos/FocusAlertDialog';
import { ScrollableAlertDialog } from './demos/ScrollableAlertDialog';
import { NestedAlertDialog } from './demos/NestedAlertDialog';
import { DetachedTriggerAlertDialog } from './demos/DetachedTriggerAlertDialog';
import { PayloadAlertDialog } from './demos/PayloadAlertDialog';
import { ControlledAlertDialog } from './demos/ControlledAlertDialog';

import basicSource from './demos/BasicAlertDialog.tsx?raw';
import dismissalSource from './demos/DismissalAlertDialog.tsx?raw';
import focusSource from './demos/FocusAlertDialog.tsx?raw';
import scrollableSource from './demos/ScrollableAlertDialog.tsx?raw';
import nestedSource from './demos/NestedAlertDialog.tsx?raw';
import detachedSource from './demos/DetachedTriggerAlertDialog.tsx?raw';
import payloadSource from './demos/PayloadAlertDialog.tsx?raw';
import controlledSource from './demos/ControlledAlertDialog.tsx?raw';

const TOC = [
  { id: 'anatomy', title: 'Anatomy' },
  { id: 'tones', title: 'Tones' },
  { id: 'tokens', title: 'Size and theme' },
  { id: 'dismissal', title: 'Dismissal' },
  { id: 'focus', title: 'Focus' },
  { id: 'scrollable', title: 'Scrollable content' },
  { id: 'nested', title: 'Nested' },
  { id: 'detached', title: 'Detached triggers' },
  { id: 'payload', title: 'Multiple triggers' },
  { id: 'controlled', title: 'Controlled' },
];

const ANATOMY = `<AlertDialog.Root>
  <AlertDialog.Trigger className="ui-action adlg-trigger">Delete</AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Backdrop className="adlg-backdrop" />
    {/* Optional: wrap the popup in a Viewport when content may overflow */}
    <AlertDialog.Popup className="adlg-popup">
      <div className="adlg-header">
        <AlertDialog.Title className="adlg-title">Delete this project?</AlertDialog.Title>
        <AlertDialog.Description className="adlg-description">
          This cannot be undone.
        </AlertDialog.Description>
      </div>
      <div className="adlg-actions">
        <AlertDialog.Close className="ui-action">Cancel</AlertDialog.Close>
        <AlertDialog.Close className="ui-action" data-tone="danger">Delete</AlertDialog.Close>
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>`;

export function AlertDialogPage() {
  return (
    <>
      <PageHeader
        title="Alert Dialog"
        lede={`A modal dialog that requires a response before anything else can continue. It is Dialog with the accidental exits removed: Root pins modal to true and disablePointerDismissal to true — which is why neither prop appears on its type — and renders role="alertdialog" so assistive technology announces an alert rather than a window.`}
        docs="https://base-ui.com/react/components/alert-dialog"
        toc={TOC}
      />

      <Section
        id="anatomy"
        index={1}
        title="Anatomy"
        description="Root renders no element of its own. Portal moves the backdrop and popup to the end of the body so nothing in the page can clip or stack above them. Title and Description are wired to the popup's aria-labelledby and aria-describedby automatically — write them, don't label anything by hand."
      >
        <Callout>
          Alert Dialog reuses Dialog's <code>Backdrop</code>, <code>Popup</code>,{' '}
          <code>Portal</code>, <code>Title</code>, <code>Description</code>, <code>Close</code> and{' '}
          <code>Viewport</code>. Only <code>Root</code>, <code>Trigger</code> and{' '}
          <code>createHandle</code> are its own — which is why the props table is Dialog's, minus{' '}
          <code>modal</code> and <code>disablePointerDismissal</code>. Those two are removed from
          the type because Root sets both itself: an alert dialog is always modal and never
          dismissed by clicking away.
        </Callout>
        <DemoGrid columns={1}>
          <Demo label="AlertDialog.Root" copy={ANATOMY}>
            <BasicAlertDialog />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="tones"
        index={2}
        title="Tones"
        description="Same markup, one data-tone attribute on the popup. The destructive tone marks the border and the title so the intent survives being read without colour, and the confirming action is the only button that carries fill."
        source={basicSource}
      >
        <DemoGrid columns={2}>
          <Demo label='data-tone="neutral"'>
            <BasicAlertDialog />
          </Demo>
          <Demo label='data-tone="danger"'>
            <BasicAlertDialog tone="danger" />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="tokens"
        index={3}
        title="Size and theme"
        description="One component, retokenised live. Use the size and theme switches in the header — nothing here is pinned, so the dialog moves with them. The readout reports what the cascade actually resolved on <html>, so a token that fails to apply shows up rather than being taken on trust."
      >
        <DemoGrid columns={2}>
          <Demo label="follows the header">
            <BasicAlertDialog />
          </Demo>
          <Demo label="follows the header">
            <BasicAlertDialog tone="danger" />
          </Demo>
        </DemoGrid>
        <TokenReadout />
      </Section>

      <Section
        id="dismissal"
        index={4}
        title="Dismissal"
        description="This is the whole reason Alert Dialog exists separately from Dialog. Clicking the backdrop does nothing — Root forces disablePointerDismissal internally, which is why the prop is removed from its type. Escape still closes it, because taking the keyboard escape route away from a modal is an accessibility regression, not a safety feature. The readout below is the reason Base UI reported on onOpenChange, so this is observed rather than asserted."
        source={dismissalSource}
      >
        <DemoGrid columns={1}>
          <Demo label="onOpenChange(open, eventDetails)">
            <DismissalAlertDialog />
          </Demo>
        </DemoGrid>
        <Callout>
          Since <code>modal</code> is forced to <code>true</code>, always render at least one{' '}
          <code>AlertDialog.Close</code> inside the popup — a touch screen reader has no Escape
          key, so a button is its only way out. If you need to refuse Escape as well, do it in{' '}
          <code>onOpenChange</code> with <code>eventDetails.cancel()</code>, as in the controlled
          example below.
        </Callout>
      </Section>

      <Section
        id="focus"
        index={5}
        title="Focus"
        description="initialFocus picks what receives focus on open, finalFocus what receives it on close. Both accept a boolean, a ref, or a function handed the interaction type (mouse, touch, pen, keyboard). For a destructive confirmation, put initial focus on Cancel — a stray Enter should not delete anything."
        source={focusSource}
      >
        <DemoGrid columns={1}>
          <Demo label="initialFocus={cancelRef} finalFocus={returnRef}">
            <FocusAlertDialog />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="scrollable"
        index={6}
        title="Scrollable content"
        description="Without a Viewport the popup centres itself and long content is simply cut off. Viewport inserts a scroll container between Portal and Popup: the container scrolls, the popup grows with its content, and the actions stay reachable on a short screen."
        source={scrollableSource}
      >
        <DemoGrid columns={1}>
          <Demo label="Portal > Viewport > Popup">
            <ScrollableAlertDialog />
          </Demo>
        </DemoGrid>
        <Callout>
          Adding a Viewport changes how the popup is positioned, so the CSS has to follow:{' '}
          <code>.adlg-viewport .adlg-popup</code> drops back to <code>position: static</code>,
          otherwise the popup centres itself inside a container that is already centring it.
        </Callout>
      </Section>

      <Section
        id="nested"
        index={7}
        title="Nested"
        description="Put a Root inside another Root's popup and Base UI handles the rest: data-nested on the inner popup, data-nested-dialog-open on the outer one, and a --nested-dialogs count on every popup in the stack. The count drives the offset and scale here, so depth is CSS rather than React state."
        source={nestedSource}
      >
        <DemoGrid columns={1}>
          <Demo label="--nested-dialogs / [data-nested-dialog-open]">
            <NestedAlertDialog />
          </Demo>
        </DemoGrid>
        <Callout>
          What Base UI does not do is treat the stack as one flow. Each Root owns its own open
          state, so an <code>AlertDialog.Close</code> in the inner popup closes only the inner
          dialog and drops the user back onto the question they just answered. For a confirmation
          chain, control the outer dialog and close it from the inner confirm — as here, where
          Back steps down one level and Close account ends both.
        </Callout>
      </Section>

      <Section
        id="detached"
        index={8}
        title="Detached triggers"
        description="AlertDialog.createHandle() decouples the trigger from the Root. Pass the same handle to both and the trigger no longer has to be a descendant — the dialog can be declared once and opened from a toolbar, a table row, or no trigger at all. The handle also exposes open(triggerId), close() and isOpen for imperative control."
        source={detachedSource}
      >
        <DemoGrid columns={1}>
          <Demo label="handle={confirmHandle}">
            <DetachedTriggerAlertDialog />
          </Demo>
        </DemoGrid>
        <Callout>
          Call handle methods from an event handler or an effect, never during render. Calls made
          before a Root attaches to the handle — or after it unmounts — are ignored rather than
          queued.
        </Callout>
      </Section>

      <Section
        id="payload"
        index={9}
        title="Multiple triggers with a payload"
        description="Each Trigger carries a payload, and Root accepts a render function that receives the payload of whichever trigger opened it. A list of rows needs one dialog, not one per row. The render function replaces Root's children entirely, so the triggers live inside it too."
        source={payloadSource}
      >
        <DemoGrid columns={1}>
          <Demo label="<AlertDialog.Root<Environment>>{({ payload }) => …}">
            <PayloadAlertDialog />
          </Demo>
        </DemoGrid>
      </Section>

      <Section
        id="controlled"
        index={10}
        title="Controlled"
        description="open is state you own, onOpenChange is the request to change it. triggerId tells Base UI which trigger to return focus to, which matters once the dialog can also be opened from something that isn't a trigger. eventDetails.cancel() refuses a close outright — the strongest form of requires a response."
        source={controlledSource}
      >
        <DemoGrid columns={1}>
          <Demo label="open / onOpenChange / triggerId">
            <ControlledAlertDialog />
          </Demo>
        </DemoGrid>
        <Callout>
          Setting <code>open</code> state directly never goes through{' '}
          <code>onOpenChange</code>, so a guard written there does not apply to your own
          programmatic closes. That is a feature — it is how the acknowledge button gets out — but
          it is worth being deliberate about.
        </Callout>
      </Section>
    </>
  );
}
