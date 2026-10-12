/* ============================================================================
   migracao-ts-gradual — ferramentas puras para acompanhar uma migração gradual
   de JavaScript para TypeScript: mede o progresso (% em .ts) e conta usos de
   `any` explícito (que anulam a segurança do TS). Sem dependências.

   A estratégia por trás (ver README): JS e TS convivem com `allowJs`, código
   legado é checado sem reescrita com `checkJs`/`// @ts-check`, arquivos são
   renomeados aos poucos (utilitários e módulos independentes primeiro) e todo
   módulo novo já nasce em .ts/.tsx. O objetivo é chegar a 100% sem um "big bang".
   ============================================================================ */

const EXT_TS = ['.ts', '.tsx', '.mts', '.cts'];
const EXT_JS = ['.js', '.jsx', '.mjs', '.cjs'];

/** Classifica um caminho por extensão: 'ts', 'js' ou 'outro'. */
export function classificar(caminho) {
  const p = String(caminho || '').toLowerCase();
  if (/\.d\.(?:ts|mts|cts)$/.test(p)) return 'outro';
  if (EXT_TS.some((e) => p.endsWith(e))) return 'ts';
  if (EXT_JS.some((e) => p.endsWith(e))) return 'js';
  return 'outro';
}

/** Progresso da migração a partir de uma lista de caminhos de arquivo. */
export function progresso(arquivos = []) {
  let ts = 0, js = 0;
  for (const a of arquivos) {
    const c = classificar(a);
    if (c === 'ts') ts++;
    else if (c === 'js') js++;
  }
  const total = ts + js;
  const pct_ts = total ? Math.round((ts / total) * 1000) / 10 : 0;
  return { total, ts, js, pct_ts };
}

/** Conta usos de `any` explícito (`: any`, `as any`, `<any>`, `any[]`). Durante
   a migração, resistir ao `any` é o que preserva o ganho de segurança do TS. */
export function contarAny(texto) {
  const re = /:\s*any\b(?:\s*\[\s*\])?|\bas\s+any\b(?:\s*\[\s*\])?|<any>|\bany\s*\[\s*\]/g;
  return (String(texto || '').match(re) || []).length;
}

export default { classificar, progresso, contarAny };
