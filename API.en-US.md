<p align="right">
  <a href="API.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="API.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="API.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# API reference

| API | Input | Result and errors |
|---|---|---|
| `classificar(caminho)` | Path coerced to text; case-insensitive extension. | ts, js or outro. Declarations .d.ts/.d.mts/.d.cts return outro. |
| `progresso(arquivos = [])` | Iterable of paths; does not access disk. | { total, ts, js, pct_ts }; percentage rounded to one decimal, zero if empty. |
| `contarAny(texto)` | Text examined with a regular expression, not a TypeScript parser. | Heuristic count. Includes comments/strings; does not measure type safety. |
| `medirRepositorio(diretorio = ".")` | migracao-ts-gradual/git submodule, Node and an available git executable. | Progress of Git-index paths, without source content, untracked files or network access. Throws for an invalid directory. |

## Integration recipe

Synthetic example. Adapt and test the consuming application contract before integrating:

```js

import { medirRepositorio } from 'migracao-ts-gradual/git';
const result = medirRepositorio('.');
console.log({ targetReached: result.pct_ts >= 50 });
```

## Contract details

The Git tool reads indexed names only. It counts tracked tests and tools with implementation extensions; module filtering remains a consumer decision. Deleted-on-disk files still in the index count. It does not commit, push, checkout, install or type-check. A high percentage does not demonstrate quality; preserve tests and review any usage.

## TypeScript contracts

The package includes .d.ts declarations; the core remains JavaScript ESM. Type examples in test-types/consumer.mts were checked with an existing compiler, without adding dependencies. CI runs runtime and content tests; it does not install a TypeScript compiler.

[Back to project](README.en-US.md) · [Compatibility](COMPATIBILITY.en-US.md)
