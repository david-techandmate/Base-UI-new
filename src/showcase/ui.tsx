import * as React from 'react';
import { CheckIcon, CaretIcon, CopyIcon } from './icons';
import { THEMES, SIZES, type Theme, type Size } from './prefs';

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
  children: React.ReactNode;
}) {
  return (
    <figure className="demo">
      <div className="demo-bar">
        <figcaption className="demo-label">{props.label}</figcaption>
        {props.copy && <CopyButton text={props.copy} />}
      </div>
      {props.note && <p className="demo-note">{props.note}</p>}
      <div className="demo-stage" data-align={props.align} data-pad={props.pad}>
        {props.children}
      </div>
    </figure>
  );
}

/* --- Matrices ------------------------------------------------------------- */

/**
 * Renders the same demo once per theme, each inside its own `data-theme`
 * scope, so all three themes can be compared without toggling the whole app.
 */
export function ThemeMatrix({ children }: { children: (theme: Theme) => React.ReactNode }) {
  return (
    <div className="demo-grid" data-columns={3}>
      {THEMES.map((theme) => (
        <div key={theme} className="theme-pane" data-theme={theme}>
          <div className="theme-pane-bar">data-theme=&quot;{theme}&quot;</div>
          <div className="theme-pane-stage">{children(theme)}</div>
        </div>
      ))}
    </div>
  );
}

/** Renders the same demo once per size scale, each in its own `data-size` scope. */
export function SizeMatrix({ children }: { children: (size: Size) => React.ReactNode }) {
  return (
    <div className="demo-grid" data-columns={3}>
      {SIZES.map((size) => (
        <Demo key={size} label={`data-size="${size}"`}>
          <div data-size={size} style={{ width: '100%' }}>
            {children(size)}
          </div>
        </Demo>
      ))}
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return <div className="callout">{children}</div>;
}
