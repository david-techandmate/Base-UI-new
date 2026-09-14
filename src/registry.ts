/**
 * The component catalogue that drives sidebar navigation and routing.
 *
 * Adding a showcase page is a two-step change: flip `status` to 'ready' and
 * register the page component in `src/pages/index.ts`.
 */

export type ComponentStatus = 'ready' | 'planned';

export interface ComponentEntry {
  /** URL slug, used as /c/:slug */
  slug: string;
  /** Display name in the sidebar and page title. */
  name: string;
  /** One-line summary shown under the page title. */
  summary: string;
  /** Path on base-ui.com for the "Base UI docs" link. */
  docs: string;
  status: ComponentStatus;
}

export interface ComponentGroup {
  label: string;
  items: ComponentEntry[];
}

function entry(
  slug: string,
  name: string,
  summary: string,
  status: ComponentStatus = 'planned',
): ComponentEntry {
  return { slug, name, summary, docs: `https://base-ui.com/react/components/${slug}`, status };
}

export const GROUPS: ComponentGroup[] = [
  {
    label: 'Disclosure',
    items: [
      entry(
        'accordion',
        'Accordion',
        'A set of collapsible panels with headings.',
        'ready',
      ),
      entry('collapsible', 'Collapsible', 'A panel controlled by a button.'),
      entry('tabs', 'Tabs', 'Toggles between related panels on the same page.'),
    ],
  },
  {
    label: 'Overlays',
    items: [
      entry('alert-dialog', 'Alert Dialog', 'Requires a user response to proceed.', 'ready'),
      entry('dialog', 'Dialog', 'Opens on top of the entire page.'),
      entry('drawer', 'Drawer', 'A panel with swipe-to-dismiss gestures.'),
      entry('popover', 'Popover', 'An accessible popup anchored to a button.'),
      entry('preview-card', 'Preview Card', 'Shows a link destination preview.'),
      entry('tooltip', 'Tooltip', 'A hint shown on hover or focus.'),
    ],
  },
  {
    label: 'Menus & navigation',
    items: [
      entry('context-menu', 'Context Menu', 'Appears at the pointer on right click.'),
      entry('menu', 'Menu', 'A dropdown list of actions.'),
      entry('menubar', 'Menubar', 'A bar of commands and options.'),
      entry('navigation-menu', 'Navigation Menu', 'Links and menus for site navigation.'),
      entry('toolbar', 'Toolbar', 'Groups a set of buttons and controls.'),
    ],
  },
  {
    label: 'Inputs',
    items: [
      entry('input', 'Input', 'A text input.'),
      entry('number-field', 'Number Field', 'Increment, decrement, and a scrub area.'),
      entry('otp-field', 'OTP Field', 'One-time password and verification code entry.'),
      entry('field', 'Field', 'Labelling and validation for form controls.'),
      entry('fieldset', 'Fieldset', 'A group of controls with a legend.'),
      entry('form', 'Form', 'Consolidated error handling for a form.'),
    ],
  },
  {
    label: 'Selection',
    items: [
      entry('autocomplete', 'Autocomplete', 'An input with a list of filtered options.'),
      entry('checkbox', 'Checkbox', 'A two-state or indeterminate control.'),
      entry('checkbox-group', 'Checkbox Group', 'Shared state for a series of checkboxes.'),
      entry('combobox', 'Combobox', 'An input combined with predefined items.'),
      entry('radio', 'Radio', 'A single choice within a group.'),
      entry('select', 'Select', 'Choose a predefined value in a dropdown.'),
      entry('slider', 'Slider', 'Works like a range input.'),
      entry('switch', 'Switch', 'Indicates whether a setting is on or off.'),
      entry('toggle', 'Toggle', 'A two-state button.'),
      entry('toggle-group', 'Toggle Group', 'Shared state for a series of toggles.'),
    ],
  },
  {
    label: 'Feedback',
    items: [
      entry('meter', 'Meter', 'A graphical display of a numeric value.'),
      entry('progress', 'Progress', 'The status of a long-running task.'),
      entry('toast', 'Toast', 'Transient notifications.'),
    ],
  },
  {
    label: 'Display',
    items: [
      entry('avatar', 'Avatar', 'An image with a fallback.'),
      entry('button', 'Button', 'Renders as another tag or focusable when disabled.'),
      entry('scroll-area', 'Scroll Area', 'A scroll container with custom scrollbars.'),
      entry('separator', 'Separator', 'A divider that is accessible to screen readers.'),
    ],
  },
];

export const ALL_COMPONENTS: ComponentEntry[] = GROUPS.flatMap((group) => group.items);

export function findComponent(slug: string | undefined): ComponentEntry | undefined {
  return ALL_COMPONENTS.find((item) => item.slug === slug);
}

export const READY_COUNT = ALL_COMPONENTS.filter((item) => item.status === 'ready').length;
