# Base UI Showroom

A visual design-system reference. Every [Base UI](https://base-ui.com) component gets a page
showing the same component under our own CSS across themes, size scales, and structural
variations — so we can pick and prototype patterns quickly.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
```

## How it is put together

| Path | Purpose |
| --- | --- |
| `src/registry.ts` | The component catalogue. Drives the sidebar and routing. |
| `src/styles/tokens.css` | Theme and size tokens. |
| `src/styles/components/` | One stylesheet per component. |
| `src/showcase/` | App shell (sidebar, toolbar) and page primitives. |
| `src/pages/<slug>/` | A component's showcase page and its demos. |

### Themes and sizes

Tokens are declared on `[data-theme]` and `[data-size]` selectors rather than `:root` alone, so
any subtree can opt into a different theme or scale:

```html
<div data-theme="dark" data-size="sm">…</div>
```

That is what lets a single section show all three themes, or all three size scales, side by side
while the toolbar controls the rest of the page.

Themes: `light`, `dark`, `contrast`. Sizes: `sm`, `md`, `lg`. The toolbar selection persists in
`localStorage`.

### Styling convention

Components are styled with plain global CSS classes and driven by data attributes, so the markup
in a demo is copy-pasteable as-is:

```jsx
<Accordion.Root className="acc" data-variant="outline">
```

Variant and size are attributes on the root (`data-variant`, `data-size`); interactive state comes
from Base UI's own attributes (`[data-panel-open]`, `[data-open]`, `[data-disabled]`,
`[data-starting-style]`, `[data-ending-style]`).

## Adding a component page

1. Create `src/pages/<slug>/<Name>Page.tsx` plus a `demos/` folder — one file per demo, so the
   section's "Demo source" block can import it with `?raw` and show real code.
2. Add `src/styles/components/<slug>.css` and import it in `src/main.tsx`.
3. Register the page in `src/pages/index.ts`.
4. Flip the entry's `status` to `'ready'` in `src/registry.ts`.

Pages are built from the primitives in `src/showcase/ui.tsx`: `PageHeader`, `Section`, `DemoGrid`,
`Demo`, `SizeMatrix`, `ThemeMatrix`, `SourceBlock`, `Callout`.

Sections run from simple to complex down the page — plain variants first, then alternative
functional setups, then full compositions.
