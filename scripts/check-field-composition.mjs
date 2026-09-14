#!/usr/bin/env node
/**
 * Fails the build if a demo hand-rolls what Field already does.
 *
 * The showroom is built component by component, so it is tempting to write a
 * bare <label> around an input before Field exists, promise to come back, and
 * never come back. This makes that promise enforceable: the build goes red
 * until the demo composes Field properly.
 *
 * Two rules, both about the same thing — the label/description/error wiring and
 * the seven state attributes belong to Field, not to hand-written markup:
 *
 *   1. A demo rendering `.ui-input` must sit inside a `Field.Root`.
 *   2. A demo must not wrap a control in a bare <label> element.
 *
 * Opt a file out with a `field-composition-exempt: <reason>` comment, which
 * forces the reason to be written down rather than silently skipped.
 */
import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const files = globSync('src/pages/**/demos/*.tsx');
const failures = [];

for (const file of files) {
  const raw = readFileSync(file, 'utf8');

  const exempt = raw.match(/field-composition-exempt:\s*(.+)/);
  if (exempt) {
    continue;
  }

  // Strip comments before scanning: prose about <label> is not markup.
  const source = raw
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');

  const usesInput = /className="[^"]*\bui-input\b/.test(source);
  const hasFieldRoot = /<(Field|Fieldset)\.Root\b/.test(source);
  if (usesInput && !hasFieldRoot) {
    failures.push(
      `${file}\n    renders .ui-input but no <Field.Root>. Wrap the control in Field.Root so it\n    gets the label, description, error wiring and state attributes.`,
    );
  }

  // A bare <label> around a control is exactly what Field.Label replaces.
  if (/<label\b/.test(source)) {
    failures.push(
      `${file}\n    renders a bare <label>. Use <Field.Label> inside <Field.Root> instead — it\n    associates itself with the control and carries the field state attributes.`,
    );
  }
}

if (failures.length > 0) {
  console.error(
    `\n✖ Field composition check failed (${failures.length} ${failures.length === 1 ? 'issue' : 'issues'}):\n`,
  );
  for (const failure of failures) {
    console.error(`  ${failure}\n`);
  }
  console.error(
    '  These demos predate Field, or were written without it. Compose them with\n' +
      '  Field.Root/Field.Label, or add a "field-composition-exempt: <reason>" comment\n' +
      '  to the file if there is a real reason not to.\n',
  );
  process.exit(1);
}

console.log(`✓ Field composition check passed (${files.length} demo files)`);
