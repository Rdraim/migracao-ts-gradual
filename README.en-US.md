# migracao-ts-gradual

**Language:** [PT-BR](README.md) · **EN-US** · [es-AR](README.es-AR.md)

A playbook (and pure tools) to move a project from **JavaScript to TypeScript gradually** — without rewriting everything at once. JS and TS coexist, legacy becomes TS at your pace, and every new module is born typed.

## The strategy

A big-bang rewrite is costly and risky. Gradual migration is a *strangler*: TS grows inside a project that keeps working.

1. **`tsconfig.json` with `allowJs: true`** — `.js` and `.ts` live in the same project.
2. **`checkJs: true` (or `// @ts-check` atop a `.js`)** — TS **analyzes old JS without rewriting it**. Highest return, lowest risk: it catches real bugs from inferred types and JSDoc, changing nothing about how the code runs.
3. **Rename a little at a time** — `.js`/`.jsx` → `.ts`/`.tsx`, **one file at a time**, starting with **utilities and independent modules** and with **new features**.
4. **Avoid `any`** — migrating fast tempts you to type everything as `any`, which defeats the safety. Define real interfaces and types gradually; use `unknown` + narrowing when unsure.
5. **Every new module in `.ts`/`.tsx`** — from now on, no more `.js`/`.jsx`. The TS percentage only climbs.

## Does the stack work in TS?

Generally **yes** — but what decides the effort is **how your runtime executes `.ts`**:

- **Front-end with a bundler (Vite/esbuild, webpack, Next):** transpiles `.ts`/`.tsx` natively, no extra step. `allowJs` lets `.jsx` and `.tsx` coexist. Add `typescript` as a *devDependency* only if you want real type-checking (bundlers transpile but **do not** type-check).
- **Node back-end:** the decision lives here. Node **≥ 23.6 strips types natively** (and 22.6–23.5 with `--experimental-strip-types`), but stripping only accepts "erasable" TS (no `enum`, no `namespace`, no parameter properties; use `erasableSyntaxOnly`). On **Node < 22.6** you need a build step (`tsc` → `.js`) or a loader. Back-end options:

  | option | cost | note |
  |---|---|---|
  | Bump Node to ≥ 23.6 and run `.ts` directly | runtime upgrade | zero new dependency; "erasable" TS |
  | `tsc` in the build (compiles to `dist`) | adds a build + `typescript` devDep | keeps current Node |
  | Loader (`tsx`/`ts-node`) | runtime dependency | fastest to adopt |

- **Libraries:** almost everything ships types. Some are **TS-first** (e.g., Zod infers the type from the schema); popular ORMs/frameworks bring their own types or `@types/*`.

**Rule of thumb:** start with `// @ts-check` (zero runtime change), migrate the front-end via the bundler, and only then settle `.ts` execution on the back-end per the table.

## Starter tsconfig

See [`examples/tsconfig.base.json`](examples/tsconfig.base.json): `allowJs` + `checkJs` + `strict` + `noEmit` (type-check only; transpiling stays with the bundler/Node). Keep `strict` on for new code; relax per file for legacy until truly typed.

## CI that stops regressions

Type-check without emitting:

```bash
npx tsc --noEmit
```

Put it in CI next to the tests. A `.ts` that breaks the contract then fails the pull request even if the bundler transpiles it happily.

## Included tool

```js
import { progresso, contarAny, classificar } from 'migracao-ts-gradual';

progresso(['a.ts', 'b.js', 'c.js']);   // { total: 3, ts: 1, js: 2, pct_ts: 33.3 }
contarAny('function f(x: any) {}');    // 1  — target: zero before calling it migrated
classificar('tela.tsx');               // 'ts'
```

| function | description |
|---|---|
| `progresso(files)` | `{ total, ts, js, pct_ts }` from a list of paths |
| `contarAny(text)` | counts `: any`, `as any`, `<any>`, `any[]` |
| `classificar(path)` | `'ts'` · `'js'` · `'outro'` (other) |

Feed `progresso` with `git ls-files` output and you have a migration thermometer for CI.

## Limitations

- `contarAny` is a **text scan** (regex), not a type parser: it catches common cases, not implicit `any`. For rigor, use `noImplicitAny` in `tsconfig`.
- The tool measures **files**, not lines or type quality.
- The playbook is platform-agnostic; the back-end table depends on your Node version.

## Tests

```bash
node --test
```

## License

MIT © Rodrigo Rodrigues
