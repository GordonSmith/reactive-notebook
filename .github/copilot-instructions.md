# Copilot Instructions for this repo

Purpose: Enable AI agents to work productively with this Vite + TypeScript + Observable notebook app.

## Big picture

- Entry: `index.html` → `src/main.ts` → `render()` from `src/notebook.ts`.
- Notebook: `src/notebook.definition.js` provides cells; `NotebookRuntimeEx` mounts each cell into `#app`.
- Cells use `@observablehq/plot`, `d3`, and `FileAttachment` to load from `/data/**` and render charts (e.g., timeline with zoom/brush).
- Vite aliases support CDN-style imports: `npm:` (jsDelivr ESM), `jsr:` (esm.sh), and local `observable:`.

## Run/build

- Dev: `npm run dev` (Vite dev server).
- Build/Preview: `npm run build` / `npm run preview`.
- Docs (optional): `npm run docs-build` and `npm run docs-watch` for the `docs/` site via the `notebooks` CLI.

## Key files

- `src/notebook.ts`: extends `NotebookRuntime`; manages per-cell state (`add/remove/removeAll`). `render(el)` appends a div per cell and calls `runtime.add("cell_${cell.id}", cell, div)`.
- `src/notebook.definition.js`: Observable cells. Patterns:
  - Data: `FileAttachment("../data/phonesTimeLineData.json").json()`
  - Plots: `Plot.plot({ marks: [Plot.barY(...), Plot.ruleY([0])] })`
  - d3 zoom/axis utilities for timelines (see axis and zoom functions in the file).
- `util/npm.ts` + `vite.config.ts`: implement `npm:`/`jsr:`/`observable:` resolvers; defaults for some packages; top-level await enabled.

## Conventions

- Prefer CDN ESM via `npm:` in browser code (e.g., `import * as d3 from "npm:d3@7"`).
- Keep data under `/data/`; use `FileAttachment("../data/...")` in cells for consistent paths.
- Avoid Node-only APIs in cells; code runs in the browser.
- ESM + strict TS; explicit extensions allowed (see `tsconfig.json`).

## Typical edits

- New viz: add a new `javascript` cell in `src/notebook.definition.js`; if DOM glue is needed, do it via the runtime’s `render()` flow.
- Shared helpers: place in `src/lib.js` (or similar) and import from cells (relative path or `observable:src/lib.js`).
- CDN rules/pins: edit `util/npm.ts` (`getDefaultRange`/`getDefaultPath`).

## Debugging and gotchas

- Inspect in browser during `npm run dev`; each cell renders under `#app`.
- To re-mount a cell, use `NotebookRuntimeEx.remove(id)` then `add(...)` (see `src/notebook.ts`).
- There’s a nested `reactive-notebook/` example—run scripts at the repo root unless intentionally working in that subproject.
- Maintain `../data/...` paths in `FileAttachment(...)` to match existing cells.
