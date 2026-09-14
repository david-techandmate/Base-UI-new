import * as React from 'react';
import { AlertDialog } from '@base-ui/react/alert-dialog';

/**
 * `initialFocus` chooses what receives focus on open, `finalFocus` what
 * receives it on close. Both take a boolean, a ref, or a function that is
 * handed the interaction type (`mouse`, `touch`, `pen`, `keyboard`).
 *
 * Defaulting focus to Cancel rather than the destructive action is the point
 * of this for a confirmation: a stray Enter should not delete anything.
 */
export function FocusAlertDialog() {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const returnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <AlertDialog.Root>
        <AlertDialog.Trigger className="ui-action adlg-trigger" data-tone="danger-quiet">
          Delete account
        </AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="adlg-backdrop" />
          <AlertDialog.Popup
            className="adlg-popup"
            data-tone="danger"
            initialFocus={cancelRef}
            finalFocus={returnRef}
          >
            <div className="adlg-header">
              <AlertDialog.Title className="adlg-title">Delete your account?</AlertDialog.Title>
              <AlertDialog.Description className="adlg-description">
                Focus starts on Cancel, not on Delete. On close it moves to the button below
                rather than back to the trigger.
              </AlertDialog.Description>
            </div>
            <div className="adlg-actions">
              <AlertDialog.Close className="ui-action" ref={cancelRef}>
                Cancel
              </AlertDialog.Close>
              <AlertDialog.Close className="ui-action" data-tone="danger">
                Delete
              </AlertDialog.Close>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <button type="button" className="ui-action" ref={returnRef}>
        Focus returns here
      </button>
    </div>
  );
}
