import * as React from 'react';
import { AlertDialog } from '@base-ui/react/alert-dialog';

/**
 * Controlled: `open` is state you own, `onOpenChange` is the request to change
 * it. Because the dialog can be opened from somewhere that isn't a Trigger,
 * `triggerId` tells Base UI which trigger to return focus to — set it when you
 * open from a trigger, clear it when you open programmatically.
 *
 * `eventDetails.cancel()` refuses a close outright. That is the strongest form
 * of "requires a response": until the checkbox is ticked, neither Escape nor a
 * Close button gets out of the dialog.
 */
export function ControlledAlertDialog() {
  const [open, setOpen] = React.useState(false);
  const [triggerId, setTriggerId] = React.useState<string | null>(null);
  const [understood, setUnderstood] = React.useState(false);
  const [lastBlocked, setLastBlocked] = React.useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <AlertDialog.Root
        open={open}
        triggerId={triggerId}
        onOpenChange={(nextOpen, eventDetails) => {
          // Refuse every close until the box is ticked — except the explicit
          // acknowledge button below, which ticks it first.
          if (!nextOpen && !understood) {
            setLastBlocked(eventDetails.reason);
            eventDetails.cancel();
            return;
          }
          setOpen(nextOpen);
          if (!nextOpen) {
            setUnderstood(false);
            setLastBlocked(null);
            setTriggerId(null);
          }
        }}
      >
        <div className="ui-actions">
          <AlertDialog.Trigger
            id="controlled-alert-trigger"
            className="ui-action adlg-trigger"
            onClick={() => setTriggerId('controlled-alert-trigger')}
          >
            Open from trigger
          </AlertDialog.Trigger>

          <button
            type="button"
            className="ui-action"
            onClick={() => {
              setTriggerId(null);
              setOpen(true);
            }}
          >
            Open from state
          </button>
        </div>

        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="adlg-backdrop" />
          <AlertDialog.Popup className="adlg-popup" data-tone="danger">
            <div className="adlg-header">
              <AlertDialog.Title className="adlg-title">Rotate the API key?</AlertDialog.Title>
              <AlertDialog.Description className="adlg-description">
                Every client using the current key stops working the moment it is rotated.
              </AlertDialog.Description>
            </div>

            <label className="adlg-body" style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={understood}
                onChange={(event) => {
                  setUnderstood(event.target.checked);
                  if (event.target.checked) {
                    setLastBlocked(null);
                  }
                }}
              />
              I have updated every client that uses this key.
            </label>

            {lastBlocked && (
              <p className="state-readout">blocked a close with reason &quot;{lastBlocked}&quot;</p>
            )}

            <div className="adlg-actions">
              <AlertDialog.Close className="ui-action">Cancel</AlertDialog.Close>
              <button
                type="button"
                className="ui-action"
                data-tone="danger"
                onClick={() => {
                  // Closing by setting state directly never goes through
                  // onOpenChange, so the guard above doesn't apply to it.
                  setOpen(false);
                  setUnderstood(false);
                  setLastBlocked(null);
                  setTriggerId(null);
                }}
              >
                Rotate now
              </button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <p className="state-readout">
        open: {String(open)} · triggerId: {triggerId ?? 'null'}
      </p>
    </div>
  );
}
