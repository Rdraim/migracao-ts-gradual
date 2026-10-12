<p align="right">
  <a href="README.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="README.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="README.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# Gradual migration from JavaScript to TypeScript

<!-- public-badges:start -->
[![license](assets/support/badge-license.svg)](LICENSE) [![CI](assets/support/badge-ci.svg)](https://github.com/Rdraim/migracao-ts-gradual/actions) [![release](assets/support/badge-release.svg)](https://github.com/Rdraim/migracao-ts-gradual/releases) [![Git](assets/support/badge-git.svg)](https://github.com/Rdraim/migracao-ts-gradual/commits/main)
<!-- public-badges:end -->

<p align="center"><img src="assets/support/project-en-us.svg" width="800" alt="migracao-ts-gradual: Migrate by module. Measure with Git."></p>

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
npm run example:integration
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

## Complete documentation

[API and recipes](API.en-US.md) · [Compatibility](COMPATIBILITY.en-US.md) · [Contributing](CONTRIBUTING.en-US.md) · [Security](SECURITY.en-US.md) · [Changelog](CHANGELOG.en-US.md) · [Voluntary support](SUPPORT.en-US.md)

## TypeScript contracts

The package includes .d.ts declarations; the core remains JavaScript ESM. Type examples in test-types/consumer.mts were checked with an existing compiler, without adding dependencies. CI runs runtime and content tests; it does not install a TypeScript compiler.

To repeat the check, use TypeScript installed in your environment:

```bash
tsc --noEmit --strict --target ES2022 --module NodeNext --moduleResolution NodeNext test-types/consumer.mts
```

## New release — 1.2.0

Adds Git-index measurement, TypeScript contracts, synthetic-repository tests and complete documentation.

Indicators are conditional: successful CI, a published stable release and stars/forks above zero. Refresh runs every six hours and on events; an open page needs reloading.

## Git measurement

After cloning, run this for a local checkout. JSON output contains counts only, without filenames or source content:

```bash
node tools/progresso-git.mjs ./example-project
```

The Git tool reads indexed names only. It counts tracked tests and tools with implementation extensions; module filtering remains a consumer decision. Deleted-on-disk files still in the index count. It does not commit, push, checkout, install or type-check. A high percentage does not demonstrate quality; preserve tests and review any usage.

---

<p align="center">
  <img src="assets/support/banner-en-us.svg" width="960" alt="Open source. A coffee makes a difference. Support Rodrigo Rodrigues’s work.">
</p>

## ☕ Buy me a coffee

Did this project help you solve a problem, learn something new, or take your first steps in development? If you feel like supporting my work, a coffee is a kind way to say thank you.

I’m **Rodrigo Rodrigues**, creator of **Nexus** and these open source projects. Your support helps me set aside time to improve the code, write clearer examples, and keep sharing what I learn.

**Give any amount that feels right to you. Supporting is completely optional — the project remains free under the MIT license.**

<p>
  <a href="#support-via-pix"><img src="assets/support/pix-en-us.svg" width="190" height="44" alt="Support via Pix"></a>
  <a href="https://github.com/Rdraim/migracao-ts-gradual/issues/new?title=Feedback%3A%20this%20project%20helped%20me"><img src="assets/support/comment-en-us.svg" width="210" height="44" alt="Leave a comment"></a>
</p>

### Support via Pix

In your banking app, scan the QR code or copy the Pix key below. Choose your amount and check the recipient details before confirming.

<p align="center">
  <img src="assets/support/pix-qr.png" width="260" alt="Original Pix QR code supplied by Rodrigo Rodrigues; the text key below is an alternative.">
</p>

**Pix key**

```text
8875a24e-44d1-4c91-b6bb-62c9f0070955
```

Pix is Brazil’s payment system. If your bank does not support it, you can still help by sharing the project, reporting a bug, improving the documentation, or leaving feedback.

### Your feedback matters, too

[Tell me how the project helped you](https://github.com/Rdraim/migracao-ts-gradual/issues/new?title=Feedback%3A%20this%20project%20helped%20me). I’d love to hear what you built, what you learned, and what could be clearer for someone just starting out.

A comment is welcome with or without a donation. Please keep payment receipts, personal details, credentials and private user data out of public Issues.

---

**Thank you for supporting my work and helping me keep building and sharing. ❤️**
