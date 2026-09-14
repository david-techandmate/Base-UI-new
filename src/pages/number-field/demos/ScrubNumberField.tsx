import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { NumberField } from '@base-ui/react/number-field';
import { MinusIcon, PlusIcon, ScrubIcon } from '../../../showcase/icons';

/**
 * ScrubArea turns a region into a drag handle for the value — press and move
 * the pointer and the number changes. Wrapping the label is the usual choice:
 * it is already next to the field and already means "this number".
 *
 * `pixelSensitivity` is how far the pointer must move per step; `direction`
 * switches the axis; `teleportDistance` wraps the pointer back to the centre
 * so a long drag never runs out of screen.
 *
 * `allowWheelScrub` is on here. It defaults to off — a page scrolling under the
 * pointer would otherwise change values by accident — but a scrub area is the
 * one place where that is not a surprise: the wheel is the same gesture as the
 * drag, just a different device. Leaving it off here meant the wheel was dead
 * on precisely the demos where a reader reaches for it.
 *
 * Measured, because the two gestures do not share a target: the drag works from
 * the ScrubArea (the label), while the wheel only works with the input focused
 * AND the pointer over the input itself. Wheeling over the label scrolls the
 * page instead. Worth knowing before wiring a tooltip that says "scroll to
 * adjust" onto the label.
 *
 * One gap worth knowing: ScrubArea does not expose its `direction` as a data
 * attribute, so `[data-direction='vertical']` matches nothing and a vertical
 * scrub would keep the horizontal cursor. Pass the prop through as a data
 * attribute yourself, as here, to keep the cursor rule in CSS.
 *
 * ScrubAreaCursor draws a custom cursor during the drag. It uses the Pointer
 * Lock API, so the browser may show its own "pointer is locked" notice — and
 * Base UI disables it in Safari, where that notice causes a layout shift. The
 * scrub still works there; only the custom cursor is absent.
 */
export function ScrubNumberField({
  direction = 'horizontal',
  pixelSensitivity,
  teleportDistance,
  hint,
}: {
  direction?: 'horizontal' | 'vertical';
  pixelSensitivity?: number;
  teleportDistance?: number;
  hint: string;
}) {
  const [scrubbing, setScrubbing] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  // data-scrubbing lands on the Root; watching it is how the readout below
  // reports a live drag without Number Field exposing an onScrub callback.
  React.useEffect(() => {
    const element = rootRef.current;
    if (!element) {
      return undefined;
    }
    const observer = new MutationObserver(() =>
      setScrubbing(element.hasAttribute('data-scrubbing')),
    );
    observer.observe(element, { attributes: true, attributeFilter: ['data-scrubbing'] });
    return () => observer.disconnect();
  }, []);

  return (
    <Field.Root className="fld">
      <NumberField.Root ref={rootRef} defaultValue={50} allowWheelScrub>
        <Field.Label className="fld-label">
          {/* ScrubArea does not expose its direction as a data attribute, so the
              cursor has to be driven from the prop. Passing it through as one
              keeps the rule in CSS rather than inlining a style. */}
          <NumberField.ScrubArea
            className="nf-scrub"
            data-direction={direction}
            direction={direction}
            pixelSensitivity={pixelSensitivity}
            teleportDistance={teleportDistance}
          >
            Opacity
            <ScrubIcon className="ui-icon nf-scrub-hint" />
            <NumberField.ScrubAreaCursor className="nf-cursor">
              <CursorArrows />
            </NumberField.ScrubAreaCursor>
          </NumberField.ScrubArea>
        </Field.Label>

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

      <Field.Description className="fld-description">
        {scrubbing ? 'data-scrubbing is on every part right now.' : hint}
      </Field.Description>
    </Field.Root>
  );
}

function CursorArrows() {
  return (
    <svg width="26" height="14" viewBox="0 0 24 14" fill="black" stroke="white" aria-hidden>
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}
