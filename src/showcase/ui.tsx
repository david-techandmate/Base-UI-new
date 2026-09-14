import * as React from 'react';
import { CheckIcon, CaretIcon, CopyIcon } from './icons';
import { usePrefs } from './prefs';

/* --- Copy to clipboard ---------------------------------------------------- */

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => () => clearTimeout(timeout.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be denied; leave the button in its resting state
      // rather than reporting a success that did not happen.
    }
  }

  return (
    <button type="button" className="copy-button" data-copied={copied} onClick={copy}>
      {copied ? <CheckIcon width={12} height={12} /> : <CopyIcon width={12} height={12} />}
      {copied ? 'Copied' : label}
    </button>
  );
}

/* --- Page scaffolding ----------------------------------------------------- */

export interface TocItem {
  id: string;
  title: string;
}

export function PageHeader(props: {
  title: string;
  lede: string;
  docs?: string;
  toc?: TocItem[];
}) {
  return (
    <header className="page-header">
      <h1 className="page-title">{props.title}</h1>
      <p className="page-lede">{props.lede}</p>
      {props.docs && (
        <div className="page-links">
          <a href={props.docs} target="_blank" rel="noreferrer">
            Base UI docs ↗
          </a>
        </div>
      )}
      {props.toc && props.toc.length > 0 && (
        <nav className="page-toc" aria-label="Sections on this page">
          {props.toc.map((item) => (
            <a key={item.id} className="page-toc-link" href={`#${item.id}`}>
              {item.title}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Section(props: {
  id: string;
  index: number;
  title: string;
  description?: React.ReactNode;
  source?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section" id={props.id} aria-labelledby={`${props.id}-title`}>
      <div className="section-head">
        <span className="section-index">{String(props.index).padStart(2, '0')}</span>
        <h2 className="section-title" id={`${props.id}-title`}>
          {props.title}
        </h2>
      </div>
      {props.description && <p className="section-desc">{props.description}</p>}
      <div className="section-body">{props.children}</div>
      {props.source && <SourceBlock source={props.source} />}
    </section>
  );
}

export function SourceBlock({
  source,
  filename = 'Demo source',
}: {
  source: string;
  filename?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="source">
      <div className="source-bar" data-open={open}>
        <button
          type="button"
          className="source-toggle"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <CaretIcon className="source-toggle-caret" width={12} height={12} />
          {filename}
        </button>
        <CopyButton text={source} label="Copy source" />
      </div>
      {open && (
        <pre className="source-pre">
          <code>{source}</code>
        </pre>
      )}
    </div>
  );
}

/* --- Demo cards ----------------------------------------------------------- */

export function DemoGrid({
  columns,
  children,
}: {
  columns?: 1 | 2 | 3;
  children: React.ReactNode;
}) {
  return (
    <div className="demo-grid" data-columns={columns}>
      {children}
    </div>
  );
}

export function Demo(props: {
  label: string;
  note?: string;
  copy?: string;
  align?: 'start' | 'stretch';
  pad?: 'default' | 'tight';
  /** Reserve height below the demo so a popup can open downward. */
  reserve?: true | 'tall';
  children: React.ReactNode;
}) {
  return (
    <figure className="demo">
      <div className="demo-bar">
        <figcaption className="demo-label">{props.label}</figcaption>
        {props.copy && <CopyButton text={props.copy} />}
      </div>
      {props.note && <p className="demo-note">{props.note}</p>}
      <div
        className="demo-stage"
        data-align={props.align}
        data-pad={props.pad}
        data-reserve={props.reserve === true ? '' : props.reserve}
      >
        {props.children}
      </div>
    </figure>
  );
}

/* --- Live token readout --------------------------------------------------- */

const READOUT_TOKENS = [
  '--step-text',
  '--step-pad-x',
  '--step-icon',
  '--radius-sm',
  '--hairline',
  '--bg',
  '--surface',
  '--text',
  '--accent',
] as const;

/**
 * Reads the tokens the toolbar is currently resolving to, straight off
 * <html>. This is the honest version of a token table: it reports what the
 * cascade actually produced, so a token that silently fails to apply shows up
 * here rather than being taken on trust.
 */
export function TokenReadout() {
  const { theme, size } = usePrefs();
  const [values, setValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    // PrefsProvider writes data-theme/data-size in its own effect, and parent
    // effects run after child effects — so reading synchronously here would
    // report the previous selection. A frame later the attributes are settled.
    const frame = requestAnimationFrame(() => {
      const computed = getComputedStyle(document.documentElement);
      const next: Record<string, string> = {};
      for (const token of READOUT_TOKENS) {
        next[token] = computed.getPropertyValue(token).trim();
      }
      setValues(next);
    });
    return () => cancelAnimationFrame(frame);
  }, [theme, size]);

  return (
    <div className="readout">
      <div className="readout-bar">
        resolved on &lt;html data-theme=&quot;{theme}&quot; data-size=&quot;{size}&quot;&gt;
      </div>
      <dl className="readout-grid">
        {READOUT_TOKENS.map((token) => (
          <div className="readout-row" key={token}>
            <dt>{token}</dt>
            <dd>
              {token.startsWith('--bg') ||
              token.startsWith('--surface') ||
              token.startsWith('--text') ||
              token.startsWith('--accent') ? (
                <span className="readout-swatch" style={{ background: `var(${token})` }} />
              ) : null}
              {values[token] || '—'}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return <div className="callout">{children}</div>;
}
