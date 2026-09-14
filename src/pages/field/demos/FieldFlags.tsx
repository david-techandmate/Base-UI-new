import * as React from 'react';

const FLAGS = ['focused', 'touched', 'dirty', 'filled', 'valid', 'invalid', 'disabled'] as const;

/**
 * Showroom scaffolding, not part of the design system.
 *
 * Reads the data attributes Base UI actually put on the Field root, so the
 * state table below each demo is observed rather than described. A MutationObserver
 * is the honest way to do this — the attributes are written by Base UI, not by
 * React state we could subscribe to.
 */
export function FieldFlags({ rootRef }: { rootRef: React.RefObject<HTMLDivElement | null> }) {
  const [flags, setFlags] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const element = rootRef.current;
    if (!element) {
      return undefined;
    }

    function read(node: HTMLElement) {
      setFlags(Object.fromEntries(FLAGS.map((flag) => [flag, node.hasAttribute(`data-${flag}`)])));
    }

    read(element);
    const observer = new MutationObserver(() => read(element));
    observer.observe(element, { attributes: true });
    return () => observer.disconnect();
  }, [rootRef]);

  return (
    <div className="fld-flags">
      {FLAGS.map((flag) => (
        <span key={flag} className="fld-flag" data-flag={flag} data-on={flags[flag] || undefined}>
          {flag}
        </span>
      ))}
    </div>
  );
}
