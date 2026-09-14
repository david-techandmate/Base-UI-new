import { AlertDialog } from '@base-ui/react/alert-dialog';

/**
 * The reference composition. Root renders no element of its own, so the first
 * thing carrying a class is the Trigger.
 *
 * Alert Dialog is always modal — unlike Dialog it accepts no `modal` prop — so
 * a Close must live inside the Popup, otherwise a touch screen reader has no
 * way out of it.
 */
export function BasicAlertDialog({ tone = 'neutral' }: { tone?: 'neutral' | 'danger' }) {
  const danger = tone === 'danger';

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger
        className="ui-action adlg-trigger"
        data-tone={danger ? 'danger-quiet' : undefined}
      >
        {danger ? 'Delete project' : 'Publish changes'}
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="adlg-backdrop" />
        <AlertDialog.Popup className="adlg-popup" data-tone={tone}>
          <div className="adlg-header">
            <AlertDialog.Title className="adlg-title">
              {danger ? 'Delete this project?' : 'Publish changes?'}
            </AlertDialog.Title>
            <AlertDialog.Description className="adlg-description">
              {danger
                ? 'The project and its 24 deployments are removed permanently. This cannot be undone.'
                : 'Your changes go live immediately and replace the current version.'}
            </AlertDialog.Description>
          </div>
          <div className="adlg-actions">
            <AlertDialog.Close className="ui-action">Cancel</AlertDialog.Close>
            <AlertDialog.Close className="ui-action" data-tone={danger ? 'danger' : 'accent'}>
              {danger ? 'Delete' : 'Publish'}
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
