import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classificar, progresso, contarAny } from '../src/progresso.js';

test('classifica por extensão', () => {
  assert.equal(classificar('a/b/util.ts'), 'ts');
  assert.equal(classificar('Component.TSX'), 'ts');
  assert.equal(classificar('velho.js'), 'js');
  assert.equal(classificar('tela.jsx'), 'js');
  assert.equal(classificar('readme.md'), 'outro');
});

test('mede o progresso em % de .ts', () => {
  const r = progresso(['a.ts', 'b.js', 'c.js', 'd.js', 'logo.png']);
  assert.deepEqual(r, { total: 4, ts: 1, js: 3, pct_ts: 25 });
});

test('lista vazia não divide por zero', () => {
  assert.deepEqual(progresso([]), { total: 0, ts: 0, js: 0, pct_ts: 0 });
});

test('conta any explícito (: any, as any, <any>)', () => {
  assert.equal(contarAny('a: any; b as any; <any>c'), 3);
  assert.equal(contarAny('const x = 1; let y: string'), 0);
});
