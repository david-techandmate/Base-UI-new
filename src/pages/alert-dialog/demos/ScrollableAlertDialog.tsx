import { AlertDialog } from '@base-ui/react/alert-dialog';

/**
 * Without a Viewport the Popup positions itself in the centre of the screen,
 * which means long content is simply cut off. Viewport puts a scroll container
 * between Portal and Popup: the container scrolls, the popup grows with its
 * content, and the whole thing stays reachable on a short screen.
 *
 * The CSS pairs with this — `.adlg-viewport .adlg-popup` drops back to
 * `position: static` so the grid lays it out instead of the popup centring
 * itself twice.
 */
export function ScrollableAlertDialog() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="ui-action adlg-trigger">
        Review terms
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="adlg-backdrop" />
        <AlertDialog.Viewport className="adlg-viewport">
          <AlertDialog.Popup className="adlg-popup">
            <div className="adlg-header">
              <AlertDialog.Title className="adlg-title">Accept the new terms?</AlertDialog.Title>
              <AlertDialog.Description className="adlg-description">
                Continuing requires accepting the revised agreement below.
              </AlertDialog.Description>
            </div>

            <div className="adlg-scroll-sample">
              {SECTIONS.map((section, index) => (
                <p key={section}>
                  <strong>
                    {index + 1}. {section}
                  </strong>{' '}
                  This clause is filler so the popup outgrows a short viewport and the scroll
                  container has something to scroll.
                </p>
              ))}
            </div>

            <div className="adlg-actions">
              <AlertDialog.Close className="ui-action">Decline</AlertDialog.Close>
              <AlertDialog.Close className="ui-action" data-tone="accent">
                Accept
              </AlertDialog.Close>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Viewport>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

const SECTIONS = [
  'Scope',
  'Licence',
  'Data processing',
  'Retention',
  'Sub-processors',
  'Liability',
  'Termination',
  'Governing law',
];
