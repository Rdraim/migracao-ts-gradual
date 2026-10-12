import ferramentas, { progresso, classificar, contarAny, type Progresso } from 'migracao-ts-gradual';
import { medirRepositorio } from 'migracao-ts-gradual/git';
const resultado: Progresso = progresso(new Set(['a.ts', 'b.js']));
const tipo: 'ts' | 'js' | 'outro' = classificar('a.ts');
const contador: number = contarAny('x: any');
ferramentas.progresso(['a.ts']);
medirRepositorio('.');
// @ts-expect-error iterable required
progresso(1);
// @ts-expect-error directory must be text
medirRepositorio(1);
void resultado; void tipo; void contador;
