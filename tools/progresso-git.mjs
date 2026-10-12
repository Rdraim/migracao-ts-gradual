import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { progresso } from '../src/progresso.js';

/** Counts indexed paths only. Does not read source content or access a remote. */
export function medirRepositorio(diretorio = '.') {
  const raiz = path.resolve(diretorio);
  const caminhos = execFileSync('git', ['-C', raiz, 'ls-files', '-z'], {
    encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 32 * 1024 * 1024
  }).split('\0').filter(Boolean);
  return progresso(caminhos);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length > 3) throw new Error('Expected one repository directory');
    console.log(JSON.stringify(medirRepositorio(process.argv[2] ?? '.')));
  } catch {
    console.error('Cannot measure repository. Provide one existing Git checkout directory.');
    process.exitCode = 1;
  }
}
