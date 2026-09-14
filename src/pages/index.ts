import type { ComponentType } from 'react';
import { AccordionPage } from './accordion/AccordionPage';
import { AutocompletePage } from './autocomplete/AutocompletePage';

/** Slug -> showcase page. Entries here must be marked 'ready' in the registry. */
export const PAGES: Record<string, ComponentType> = {
  accordion: AccordionPage,
  autocomplete: AutocompletePage,
};
