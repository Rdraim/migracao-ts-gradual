import { progresso, contarAny } from '../src/progresso.js';

// Imagine a lista de arquivos do seu projeto (ex.: saída de `git ls-files`):
const arquivos = [
  'src/util/data.ts',      // já migrado
  'src/util/texto.ts',     // já migrado
  'src/legado/relatorio.js',
  'src/legado/importador.js',
  'src/app.jsx',
];

console.log('progresso:', progresso(arquivos));
// { total: 5, ts: 2, js: 3, pct_ts: 40 }

const trecho = 'function parse(x: any) { return x as any; }';
console.log('usos de any:', contarAny(trecho)); // 2 — reduza antes de dar por migrado
