<p align="right">
  <a href="README.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="README.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="README.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# Gradual migration from JavaScript to TypeScript

JS and TS coexist: enable allowJs and check with checkJs or JSDoc. Migrate by module, preserve tests and validate consumers. Renaming files does not guarantee type safety.

A bundler can transpile without type checking. Pin TypeScript in your project devDependencies and run tsc --noEmit in CI. This repository core does not install a compiler or modify source files.

Node 22.18 or later enables type stripping by default; 22.6–22.17 requires --experimental-strip-types. Stripping does not type-check, read tsconfig or support TSX, and requires erasable syntax. Build to JavaScript when these limits do not fit. Keep bundler configuration separate from Node execution configuration.

[Node.js](https://nodejs.org/api/typescript.html) · [allowJs](https://www.typescriptlang.org/tsconfig/allowJs.html) · [checkJs](https://www.typescriptlang.org/tsconfig/checkJs.html)

## Usage

Node.js 22 or later. Dependency-free ESM core, usable in modern browsers. Not published on npm: clone the repository or use a pinned Git revision. Preserve the license when copying the module.

```bash
git clone https://github.com/Rdraim/migracao-ts-gradual.git
cd migracao-ts-gradual
npm test
npm run example
```

```js
import { progresso, contarAny, classificar } from './src/progresso.js';
progresso(['a.ts', 'b.js', 'types.d.ts']); // { total: 2, ts: 1, js: 1, pct_ts: 50 }
contarAny('x: any[]; y as any'); // 2
classificar('Component.tsx'); // 'ts'
```

[tsconfig](examples/tsconfig.base.json)

## Limits

progresso measures files, not lines or type quality. Declaration files .d.ts/.d.mts/.d.cts are excluded from implementation counts. contarAny is a text heuristic: it counts common tokens, including comments/strings, and misses some explicit and implicit types. Use the compiler/linter for actual assessment.

## Verification

CI on Node 22 and 24, runnable examples, edge case tests and heuristic content/history checks. Automated checks do not replace human review.

## Contributing

Open an Issue with expected behavior and a synthetic example. Contributions need a PR with a regression test and synchronized documentation in all three languages. Do not submit real data, logs, configuration or credentials.

## Security

Use GitHub private vulnerability reporting when available. Do not post secrets or personal data in Issues. The core does not access networks, databases or files; validate contracts and limits in the consuming application.

## Changelog

1.1.0 — 2026-10-12: Node 22/24 CI, history checks, declarations excluded from progress, no double count of any[] and updated documentation.

## License

[MIT](LICENSE) © Rodrigo Rodrigues
