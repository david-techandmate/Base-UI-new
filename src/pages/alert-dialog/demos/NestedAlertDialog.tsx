import { AlertDialog } from '@base-ui/react/alert-dialog';

/**
 * Nesting is handled for you: the inner Root detects the outer one and Base UI
 * sets `data-nested` on the inner popup, `data-nested-dialog-open` on the outer
 * one, and a `--nested-dialogs` count on every popup in the stack.
 *
 * The CSS turns that count into depth — each popup below the top is pushed down
 * and scaled back — so the stack reads as layers rather than two dialogs landing
 * on the same spot.
 */
export function NestedAlertDialog() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="ui-action adlg-trigger" data-tone="danger-quiet">
        Close account
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="adlg-backdrop" />
        <AlertDialog.Popup className="adlg-popup">
          <div className="adlg-header">
            <AlertDialog.Title className="adlg-title">Close your account?</AlertDialog.Title>
            <AlertDialog.Description className="adlg-description">
              Billing stops at the end of the period. Data is kept for 30 days, then removed.
            </AlertDialog.Description>
          </div>
          <div className="adlg-actions">
            <AlertDialog.Close className="ui-action">Keep account</AlertDialog.Close>

            {/* The second confirmation. Its Root sits inside the first popup,
                which is all the nesting detection needs. */}
            <AlertDialog.Root>
              <AlertDialog.Trigger className="ui-action" data-tone="danger">
                Continue
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Backdrop className="adlg-backdrop" />
                <AlertDialog.Popup className="adlg-popup" data-tone="danger">
                  <div className="adlg-header">
                    <AlertDialog.Title className="adlg-title">
                      This removes everything
                    </AlertDialog.Title>
                    <AlertDialog.Description className="adlg-description">
                      Type-free final confirmation. The dialog beneath dims and steps back rather
                      than disappearing, so the trail back is still visible.
                    </AlertDialog.Description>
                  </div>
                  <div className="adlg-actions">
                    <AlertDialog.Close className="ui-action">Back</AlertDialog.Close>
                    <AlertDialog.Close className="ui-action" data-tone="danger">
                      Close account
                    </AlertDialog.Close>
                  </div>
                </AlertDialog.Popup>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
