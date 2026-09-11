# Base UI Showroom

A public reference **and** a starting point.

Every [Base UI](https://base-ui.com) component, styled with plain CSS, shown across themes, size
scales, and structural variations — so you can see what's possible before you build. Then copy the
repo and start your app with the tokens, themes, and Base UI wiring already done correctly.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
```

## Using this as a starting point

The repo is deliberately split into two halves:

| Keep | Delete |
| --- | --- |
| `src/styles/` — the design system | `src/showcase/` — showroom chrome |
| | `src/pages/` — the showcase pages |
| | `src/registry.ts` — the component catalogue |

Everything the design system needs is behind a single import:

```ts
import './styles/index.css';
```

That pulls in the reset, the theme and size tokens, the shared primitives, and every component
stylesheet. Nothing in `src/styles/` knows the showroom exists, so deleting the other half leaves
you with a working design system and no dangling references.

The component demos under `src/pages/*/demos/` are written to be copy-pasted — plain Base UI
markup with class names, no wrapper abstractions in the way.

## Themes and sizes

Tokens are declared on `[data-theme]` and `[data-size]` selectors rather than `:root` alone, so any
subtree can opt into a different theme or scale:

```html
<div data-theme="dark" data-size="sm">…</div>
```

Set them on `<html>` and the whole app retokenises — that is what the switches in the showroom
header do. Scope them to a subtree only when you deliberately want an island on a different theme.

**Order matters.** `[data-theme='x']` and `:root` have identical specificity, so on `<html>`
whichever is declared last wins. Every theme block must come after the `:root` defaults, or a theme
that overrides a default is silently dropped when set on `<html>`.

- **Themes:** `light`, `dark`, `contrast`
- **Sizes:** `sm`, `md`, `lg`

To rebrand, edit `src/styles/base/tokens.css` — it is the only file holding colour, radius, shadow,
and type-scale values. Components reference tokens exclusively and never hard-code a colour.

## Styling convention

Global CSS classes driven by data attributes, so demo markup is copy-pasteable as-is:

```jsx
<Collapsible.Root className="col" data-variant="outline">
  <Collapsible.Trigger className="col-trigger">
    Trigger
    <ChevronIcon className="ui-icon" data-indicator="chevron" />
  </Collapsible.Trigger>
  <Collapsible.Panel className="ui-panel col-panel">
    <div className="col-content">Panel</div>
  </Collapsible.Panel>
</Collapsible.Root>
```

- **Variant and size** are attributes on the root: `data-variant`, `data-size`.
- **Interactive state** comes from Base UI's own attributes — `[data-panel-open]`, `[data-open]`,
  `[data-disabled]`, `[data-starting-style]`, `[data-ending-style]`. No React state drives styling.
- **`ui-` prefixed classes** are shared primitives from `base/primitives.css`; component-prefixed
  classes (`acc-`, `col-`) are specific to that component.

Anything two components would both need lives in `base/primitives.css` rather than being duplicated
— the panel height transition, indicator rotation, action buttons, badges, avatars.

## Layout

| Path | Purpose |
| --- | --- |
| `src/styles/index.css` | Single entry point for the design system |
| `src/styles/base/reset.css` | Reset and document defaults |
| `src/styles/base/tokens.css` | Theme and size tokens — edit this to rebrand |
| `src/styles/base/primitives.css` | Rules shared by more than one component |
| `src/styles/components/` | One stylesheet per component |
| `src/showcase/` | Showroom shell and page primitives |
| `src/pages/<slug>/` | A component's showcase page and demos |
| `src/registry.ts` | Component catalogue driving sidebar and routes |

## Adding a component page

1. Create `src/pages/<slug>/<Name>Page.tsx` plus a `demos/` folder — one file per demo, so the
   section's "Demo source" block can import it with `?raw` and show real code.
2. Add `src/styles/components/<slug>.css` and `@import` it from `src/styles/index.css`.
3. Register the page in `src/pages/index.ts`.
4. Flip the entry's `status` to `'ready'` in `src/registry.ts`.

Pages are assembled from the primitives in `src/showcase/ui.tsx`: `PageHeader`, `Section`,
`DemoGrid`, `Demo`, `TokenReadout`, `SourceBlock`, `Callout`.

Sections run simple to complex down the page — plain variants first, then alternative functional
setups, then full compositions.

## Deployment

Deployed on Vercel from `main`. Every push to `main` publishes to production; every pull request
gets its own preview URL.

`vercel.json` carries two things:

- **A SPA rewrite.** Routes like `/c/accordion` are React Router paths, not files. Without the
  rewrite, opening or refreshing one returns 404. Static files are matched before rewrites, so this
  only catches unmatched paths.
- **Immutable caching for `/assets/*`.** Vite emits content-hashed filenames, so those are safe to
  cache forever.

Build settings are auto-detected (`npm run build` → `dist`).

## Checking the API

Base UI ships TypeScript definitions, and they are the authoritative source when the docs are
ambiguous:

```bash
cat node_modules/@base-ui/react/<component>/root/*Root.d.ts
cat node_modules/@base-ui/react/<component>/*/[A-Z]*CssVars.d.ts
cat node_modules/@base-ui/react/<component>/*/[A-Z]*DataAttributes.d.ts
```
