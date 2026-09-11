import { Collapsible } from '@base-ui/react/collapsible';
import { PlusIcon } from '../../../showcase/icons';

/**
 * Panel mounting has three modes:
 *
 *   default            closed panel is removed from the DOM
 *   keepMounted        closed panel stays in the DOM, hidden
 *   hiddenUntilFound   stays mounted with hidden="until-found", so browser
 *                      find-in-page and search engines can reach it
 *
 * On Collapsible these are Panel props — Accordion also accepts
 * hiddenUntilFound on its Root to apply it to every panel at once.
 */
export function MountingCollapsible({
  mode = 'default',
}: {
  mode?: 'default' | 'keepMounted' | 'hiddenUntilFound';
}) {
  return (
    <Collapsible.Root className="col" data-variant="solid">
      <Collapsible.Trigger className="col-trigger">
        {mode === 'hiddenUntilFound' ? 'Warranty terms' : 'Panel contents'}
        <PlusIcon className="ui-icon" data-indicator="plus" />
      </Collapsible.Trigger>
      <Collapsible.Panel
        className="ui-panel col-panel"
        keepMounted={mode === 'keepMounted'}
        hiddenUntilFound={mode === 'hiddenUntilFound'}
      >
        <div className="col-content">
          {mode === 'hiddenUntilFound'
            ? 'Coverage lasts 24 months from the delivery date. Accidental damage requires the extended plan.'
            : 'Inspect this panel in devtools with it closed to see the difference between the mounting modes.'}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
