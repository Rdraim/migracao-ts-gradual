import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Inspect npm's real pack list; no archive, install, hook or network access. */
export function verificarPacote(root, npmCli) {
  if (!npmCli) throw new Error('Run with npm run check:package');
  const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
  const output = execFileSync(process.execPath, [npmCli, 'pack', '--dry-run', '--json', '--ignore-scripts', '--offline', '--no-update-notifier'], {
    cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 4 * 1024 * 1024, timeout: 30000
  });
  const parsed = JSON.parse(output);
  const packed = Array.isArray(parsed) ? parsed[0] : Object.values(parsed)[0];
  if (!packed?.files || packed.name !== pkg.name || packed.version !== pkg.version) throw new Error('Unexpected npm pack result');
  const files = new Set(packed.files.map(file => file.path));
  const required = new Set(['LICENSE', 'package.json', 'examples/uso.mjs', 'examples/integracao.mjs', 'test-types/consumer.mts']);
  const collect = value => {
    if (typeof value === 'string' && value.startsWith('./')) required.add(value.slice(2));
    else if (value && typeof value === 'object') Object.values(value).forEach(collect);
  };
  collect(pkg.exports); collect(pkg.types);
  for (const name of files) {
    if (!name.endsWith('.md')) continue;
    const text = readFileSync(path.join(root, name), 'utf8');
    const targets = [...text.matchAll(/\]\(([^\s)]+)\)/g)].map(m => m[1]);
    for (const m of text.matchAll(/\b(?:href|src)="([^"]+)"/g)) targets.push(m[1]);
    for (const target of targets) {
      if (/^(?:https?:|mailto:|data:|#)/i.test(target)) continue;
      const file = decodeURIComponent(target.split('#')[0]);
      if (file) required.add(path.posix.normalize(path.posix.join(path.posix.dirname(name), file)));
    }
  }
  const missing = [...required].filter(name => !files.has(name));
  if (missing.length) throw new Error(`Package is missing referenced files: ${missing.join(', ')}`);
  return { name: packed.name, version: packed.version, files: files.size, referencedFiles: required.size };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  console.log(JSON.stringify(verificarPacote(root, process.env.npm_execpath)));
}
