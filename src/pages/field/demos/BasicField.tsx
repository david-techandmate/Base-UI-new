import { Field } from '@base-ui/react/field';

/**
 * The reference composition. Field.Root renders a div; Label renders a real
 * <label>, Control an <input>, Description a <p>, Error a <div>.
 *
 * Nothing here is wired up by hand. Label gets its `for` from the Control's
 * generated id, Description is referenced by `aria-describedby`, and Error
 * joins that same `aria-describedby` while it is showing — so a screen reader
 * reads the message without anything being announced twice.
 *
 * Error mounts only while its `match` condition holds. With `valueMissing`
 * that is the browser's own required-field check, read off the input's
 * ValidityState rather than reimplemented.
 */
export function BasicField() {
  return (
    <Field.Root className="fld">
      <Field.Label className="fld-label">Display name</Field.Label>
      <Field.Control required placeholder="Required" className="ui-input fld-control" />
      <Field.Error className="fld-error" match="valueMissing">
        Please enter a display name.
      </Field.Error>
      <Field.Description className="fld-description">
        Shown on your profile and in comments.
      </Field.Description>
    </Field.Root>
  );
}
