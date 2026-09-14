import * as React from 'react';
import { AlertDialog } from '@base-ui/react/alert-dialog';

/**
 * `onOpenChange` receives an `eventDetails` object whose `reason` says what
 * closed the dialog. Reading it here is the honest way to find out which
 * gestures an alert dialog actually accepts, rather than assuming.
 *
 * Observed: clicking the backdrop never closes it (Root forces
 * `disablePointerDismissal`), Escape closes it with reason `escape-key`, and a
 * Close button closes it with reason `close-press`.
 */
export function DismissalAlertDialog() {
  const [reason, setReason] = React.useState<string>('—');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AlertDialog.Root
        onOpenChange={(open, eventDetails) => {
          if (!open) {
            setReason(eventDetails.reason);
          }
        }}
      >
        <AlertDialog.Trigger className="ui-action adlg-trigger">
          Try to dismiss it
        </AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="adlg-backdrop" />
          <AlertDialog.Popup className="adlg-popup">
            <div className="adlg-header">
              <AlertDialog.Title className="adlg-title">Answer required</AlertDialog.Title>
              <AlertDialog.Description className="adlg-description">
                Click the backdrop — nothing happens. Press Escape, or use a button. Whichever
                gesture actually closes it reports its reason below.
              </AlertDialog.Description>
            </div>
            <div className="adlg-actions">
              <AlertDialog.Close className="ui-action">Dismiss</AlertDialog.Close>
              <AlertDialog.Close className="ui-action" data-tone="accent">
                Confirm
              </AlertDialog.Close>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <p className="state-readout">last close reason: &quot;{reason}&quot;</p>
    </div>
  );
}
