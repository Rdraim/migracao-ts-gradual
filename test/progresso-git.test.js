import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { medirRepositorio } from '../tools/progresso-git.mjs';

test('Git measurement includes indexed files, excludes declarations and untracked paths', t => {
  const raiz = mkdtempSync(path.join(tmpdir(), 'migration-public-test-'));
  t.after(() => {
    if (!path.resolve(raiz).startsWith(path.resolve(tmpdir()) + path.sep)) throw new Error('Unexpected fixture location');
    rmSync(raiz, { recursive: true, force: true });
  });
  execFileSync('git', ['init', '--quiet', raiz]);
  mkdirSync(path.join(raiz, 'source with spaces'));
  for (const nome of ['source with spaces/a.ts', 'legacy.jsx', 'types.d.ts', 'unused.js']) writeFileSync(path.join(raiz, nome), '// synthetic fixture\n');
  execFileSync('git', ['-C', raiz, 'add', '--', 'source with spaces/a.ts', 'legacy.jsx', 'types.d.ts']);
  assert.deepEqual(medirRepositorio(raiz), { total: 2, ts: 1, js: 1, pct_ts: 50 });
  const script = fileURLToPath(new URL('../tools/progresso-git.mjs', import.meta.url));
  const resultado = spawnSync(process.execPath, [script, raiz], { encoding: 'utf8' });
  assert.equal(resultado.status, 0);
  assert.deepEqual(JSON.parse(resultado.stdout), { total: 2, ts: 1, js: 1, pct_ts: 50 });
  assert.ok(!resultado.stdout.includes('source with spaces'));
});
test('invalid repository and extra arguments fail without emitting source or path details', () => {
  const script = fileURLToPath(new URL('../tools/progresso-git.mjs', import.meta.url));
  const resultado = spawnSync(process.execPath, [script, '.', 'extra'], { encoding: 'utf8' });
  assert.equal(resultado.status, 1);
  assert.equal(resultado.stdout, '');
  assert.match(resultado.stderr, /Cannot measure repository/);
  assert.throws(() => medirRepositorio(path.join(tmpdir(), 'nonexistent-migration-fixture')));
});
