import * as React from 'react';
import { AlertDialog } from '@base-ui/react/alert-dialog';

/**
 * A handle decouples the trigger from the Root. Pass the same handle to both and
 * the trigger no longer has to be a descendant — useful when the button lives in
 * a toolbar and the dialog is defined once at the top of the app.
 *
 * The handle is also an imperative escape hatch: `open(triggerId)`, `close()`
 * and `isOpen`. Create it once outside the component; `createHandle` returns a
 * store, not a hook.
 */
const confirmHandle = AlertDialog.createHandle();

export function DetachedTriggerAlertDialog() {
  const [saving, setSaving] = React.useState(false);

  // Only ever call handle methods from an event handler or effect — never
  // during render.
  React.useEffect(() => {
    if (!saving) {
      return undefined;
    }
    const timer = setTimeout(() => {
      setSaving(false);
      confirmHandle.close();
    }, 900);
    return () => clearTimeout(timer);
  }, [saving]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div className="ui-actions">
        {/* Detached: rendered outside the Root, wired up by the handle. */}
        <AlertDialog.Trigger className="ui-action adlg-trigger" handle={confirmHandle}>
          Discard draft
        </AlertDialog.Trigger>

        {/* No trigger at all — opened straight from the handle. */}
        <button type="button" className="ui-action" onClick={() => confirmHandle.open(null)}>
          Open imperatively
        </button>
      </div>

      <AlertDialog.Root handle={confirmHandle}>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="adlg-backdrop" />
          <AlertDialog.Popup className="adlg-popup">
            <div className="adlg-header">
              <AlertDialog.Title className="adlg-title">Discard this draft?</AlertDialog.Title>
              <AlertDialog.Description className="adlg-description">
                Both buttons above drive this one Root. Saving closes it from an effect through
                <code> handle.close()</code> rather than through a Close button.
              </AlertDialog.Description>
            </div>
            <div className="adlg-actions">
              <AlertDialog.Close className="ui-action" disabled={saving}>
                Keep editing
              </AlertDialog.Close>
              <button
                type="button"
                className="ui-action"
                data-tone="danger"
                disabled={saving}
                onClick={() => setSaving(true)}
              >
                {saving ? 'Discarding…' : 'Discard'}
              </button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
