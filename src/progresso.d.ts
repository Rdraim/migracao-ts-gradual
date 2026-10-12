export interface Progresso {
  total: number;
  ts: number;
  js: number;
  pct_ts: number;
}
/** String-coerces input; declarations are not implementation files. */
export function classificar(caminho: unknown): 'ts' | 'js' | 'outro';
export function progresso(arquivos?: Iterable<unknown>): Progresso;
/** Text heuristic; may count comments/strings and miss some type syntax. */
export function contarAny(texto: unknown): number;
declare const ferramentas: {
  classificar: typeof classificar;
  progresso: typeof progresso;
  contarAny: typeof contarAny;
};
export default ferramentas;
