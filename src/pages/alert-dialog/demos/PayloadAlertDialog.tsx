import { AlertDialog } from '@base-ui/react/alert-dialog';

/**
 * One Root, many triggers. Each Trigger carries a `payload`, and Root accepts a
 * render function that receives the payload of whichever trigger opened it — so
 * a list of rows needs one dialog, not one per row.
 *
 * The render function replaces Root's children entirely (`children({ payload })`
 * is either/or), so the triggers live inside it too. The payload type flows from
 * Root's type argument into every Trigger, which makes a mistyped payload field
 * a compile error rather than an empty dialog.
 *
 * `payload` is `undefined` until a trigger opens the dialog, and the last value
 * is kept while it animates out, so the text doesn't blank mid-close.
 */
type Environment = {
  name: string;
  region: string;
  deployments: number;
};

const ENVIRONMENTS: Environment[] = [
  { name: 'production', region: 'eu-west-1', deployments: 412 },
  { name: 'staging', region: 'eu-west-1', deployments: 1_207 },
  { name: 'preview', region: 'us-east-1', deployments: 38 },
];

export function PayloadAlertDialog() {
  return (
    <AlertDialog.Root<Environment>>
      {({ payload }) => (
        <>
          <div className="ui-actions">
            {ENVIRONMENTS.map((environment) => (
              <AlertDialog.Trigger
                key={environment.name}
                className="ui-action adlg-trigger"
                data-tone="danger-quiet"
                payload={environment}
              >
                Reset {environment.name}
              </AlertDialog.Trigger>
            ))}
          </div>

          <AlertDialog.Portal>
            <AlertDialog.Backdrop className="adlg-backdrop" />
            <AlertDialog.Popup className="adlg-popup" data-tone="danger">
              <div className="adlg-header">
                <AlertDialog.Title className="adlg-title">
                  Reset {payload?.name}?
                </AlertDialog.Title>
                <AlertDialog.Description className="adlg-description">
                  {payload?.deployments.toLocaleString()} deployments in {payload?.region} are
                  removed and the environment is rebuilt from the current branch.
                </AlertDialog.Description>
              </div>
              <div className="adlg-actions">
                <AlertDialog.Close className="ui-action">Cancel</AlertDialog.Close>
                <AlertDialog.Close className="ui-action" data-tone="danger">
                  Reset {payload?.name}
                </AlertDialog.Close>
              </div>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </>
      )}
    </AlertDialog.Root>
  );
}
