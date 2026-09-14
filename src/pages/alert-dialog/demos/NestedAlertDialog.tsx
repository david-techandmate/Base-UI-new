import * as React from 'react';
import { AlertDialog } from '@base-ui/react/alert-dialog';

/**
 * Nesting is handled for you: the inner Root detects the outer one and Base UI
 * sets `data-nested` on the inner popup, `data-nested-dialog-open` on the outer
 * one, and a `--nested-dialogs` count on every popup in the stack. The CSS
 * turns that count into depth, so the stack reads as layers.
 *
 * What Base UI does not do is treat the stack as one flow. Each Root owns its
 * own open state, so an `AlertDialog.Close` in the inner popup closes only the
 * inner dialog and drops the user back to the outer one — wrong for a
 * confirmation chain, where confirming should end the whole thing.
 *
 * The fix is to control the outer dialog and close it from the inner confirm.
 * Cancel still steps back one level, which is what you want there.
 */
export function NestedAlertDialog() {
  const [outerOpen, setOuterOpen] = React.useState(false);

  return (
    <AlertDialog.Root open={outerOpen} onOpenChange={setOuterOpen}>
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
                      Back steps down one level. Close account ends both dialogs, because
                      confirming should not drop you onto the question you just answered.
                    </AlertDialog.Description>
                  </div>
                  <div className="adlg-actions">
                    {/* Closes only this dialog — one step back. */}
                    <AlertDialog.Close className="ui-action">Back</AlertDialog.Close>
                    {/* Closes this dialog AND the one beneath it. Close handles the
                        inner Root; onClick closes the outer, controlled one. */}
                    <AlertDialog.Close
                      className="ui-action"
                      data-tone="danger"
                      onClick={() => setOuterOpen(false)}
                    >
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
