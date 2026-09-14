/** Shared sample data for the Autocomplete demos. */

export interface Tag {
  id: string;
  value: string;
}

export interface TagGroup {
  value: string;
  items: Tag[];
}

export const TAGS: Tag[] = [
  { id: 't-feature', value: 'feature' },
  { id: 't-fix', value: 'fix' },
  { id: 't-bug', value: 'bug' },
  { id: 't-docs', value: 'docs' },
  { id: 't-internal', value: 'internal' },
  { id: 't-mobile', value: 'mobile' },
  { id: 't-frontend', value: 'frontend' },
  { id: 't-backend', value: 'backend' },
  { id: 't-performance', value: 'performance' },
  { id: 't-accessibility', value: 'accessibility' },
  { id: 't-design', value: 'design' },
  { id: 't-testing', value: 'testing' },
  { id: 'c-accordion', value: 'component: accordion' },
  { id: 'c-alert-dialog', value: 'component: alert dialog' },
  { id: 'c-autocomplete', value: 'component: autocomplete' },
  { id: 'c-avatar', value: 'component: avatar' },
  { id: 'c-checkbox', value: 'component: checkbox' },
  { id: 'c-collapsible', value: 'component: collapsible' },
  { id: 'c-combobox', value: 'component: combobox' },
  { id: 'c-dialog', value: 'component: dialog' },
  { id: 'c-menu', value: 'component: menu' },
  { id: 'c-popover', value: 'component: popover' },
  { id: 'c-select', value: 'component: select' },
  { id: 'c-slider', value: 'component: slider' },
  { id: 'c-switch', value: 'component: switch' },
  { id: 'c-tabs', value: 'component: tabs' },
  { id: 'c-toast', value: 'component: toast' },
  { id: 'c-tooltip', value: 'component: tooltip' },
];

/** A grouped shape: an array of objects, each with an `items` array. */
export const TAG_GROUPS: TagGroup[] = [
  { value: 'Type', items: TAGS.filter((tag) => tag.id.startsWith('t-')) },
  { value: 'Component', items: TAGS.filter((tag) => tag.id.startsWith('c-')) },
];

/** Accented entries, to show what collator sensitivity actually buys. */
export const CITIES: string[] = [
  'Amsterdam',
  'Anchorage',
  'Aarhus',
  'Bogotá',
  'Bordeaux',
  'Brasília',
  'Córdoba',
  'Copenhagen',
  'Kraków',
  'Lisbon',
  'Málaga',
  'Marseille',
  'Montréal',
  'München',
  'Reykjavík',
  'San José',
  'São Paulo',
  'Seville',
  'Zürich',
];

export interface DocEntry {
  id: string;
  title: string;
  summary: string;
}

export const DOCS: DocEntry[] = [
  {
    id: 'd-tokens',
    title: 'Design tokens',
    summary: 'Every colour, radius and type step, declared per theme and size.',
  },
  {
    id: 'd-theming',
    title: 'Theming',
    summary: 'How data-theme and data-size scope a token set to any subtree.',
  },
  {
    id: 'd-animation',
    title: 'Animation',
    summary: 'Styling entry and exit from data-starting-style and data-ending-style.',
  },
  {
    id: 'd-composition',
    title: 'Composition',
    summary: 'Replacing a part’s element with the render prop.',
  },
  {
    id: 'd-forms',
    title: 'Forms',
    summary: 'Field, validation state, and what gets submitted.',
  },
  {
    id: 'd-accessibility',
    title: 'Accessibility',
    summary: 'What Base UI wires up for you, and what is still yours to write.',
  },
  {
    id: 'd-styling',
    title: 'Styling',
    summary: 'Data attributes as the styling surface instead of React state.',
  },
];
