import type { ComponentType } from 'react';
import { AccordionPage } from './accordion/AccordionPage';
import { AlertDialogPage } from './alert-dialog/AlertDialogPage';
import { FieldPage } from './field/FieldPage';

/** Slug -> showcase page. Entries here must be marked 'ready' in the registry. */
export const PAGES: Record<string, ComponentType> = {
  accordion: AccordionPage,
  'alert-dialog': AlertDialogPage,
  field: FieldPage,
};
