import * as React from 'react';
import { Field } from '@base-ui/react/field';
import { Form } from '@base-ui/react/form';

/**
 * Client validation catches shape; only the server knows facts. `Form errors`
 * is how a server's answer gets back onto the right field: an object keyed by
 * each `Field.Root`'s `name`.
 *
 * The field then behaves as if it had failed locally — `data-invalid`, the
 * Error mounts, and the message clears as soon as the user edits it, because
 * the default `onSubmit` mode re-validates on change after the first submit.
 *
 * Which is also why the `name` on Field.Root matters: it is the key the server
 * answers against, and it takes precedence over a `name` on the Control.
 */
export function ServerErrorsForm() {
  const [errors, setErrors] = React.useState<Record<string, string | string[]>>({});
  const [pending, setPending] = React.useState(false);
  const [done, setDone] = React.useState(false);

  return (
    <Form
      className="frm"
      errors={errors}
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setPending(true);
        setDone(false);
        const result = await submit(String(data.get('workspace') ?? ''));
        setPending(false);

        setErrors(result.errors ?? {});
        setDone(!result.errors);
      }}
    >
      <Field.Root name="workspace" className="fld">
        <Field.Label className="fld-label">Workspace name</Field.Label>
        <Field.Control
          required
          defaultValue="acme"
          placeholder="acme"
          className="ui-input fld-control"
        />
        <Field.Error className="fld-error" match="valueMissing">
          A workspace name is required.
        </Field.Error>
        {/* No `match` — this Error shows whatever the server sent back. */}
        <Field.Error className="fld-error" />
        <Field.Description className="fld-description">
          “acme” and “test” are taken on the server. Submit to see it come back.
        </Field.Description>
      </Field.Root>

      <div className="frm-actions">
        <button type="submit" className="ui-action" data-tone="accent" disabled={pending}>
          {pending ? (
            <>
              <span className="ui-spinner" aria-hidden /> Creating…
            </>
          ) : (
            'Create workspace'
          )}
        </button>
      </div>

      {done && (
        <p className="frm-note" data-tone="success">
          Workspace created.
        </p>
      )}
    </Form>
  );
}

/** Stands in for the server. */
async function submit(name: string): Promise<{ errors?: Record<string, string> }> {
  await new Promise((resolve) => {
    setTimeout(resolve, 600);
  });

  if (['acme', 'test'].includes(name.trim().toLowerCase())) {
    return { errors: { workspace: `“${name}” is already taken.` } };
  }
  return {};
}
