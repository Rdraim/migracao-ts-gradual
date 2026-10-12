import { progresso, contarAny } from '../src/progresso.js';
const arquivos = ['src/domain/value.ts', 'src/ui/Card.tsx', 'src/legacy/report.js', 'src/types.d.ts', 'assets/logo.svg'];
const resultado = progresso(arquivos);
console.log({ ...resultado, metaSinteticaAtingida: resultado.pct_ts >= 50 });
console.log({ anotacoesHeuristicas: contarAny('value: any[]; result as any') });
// The Git tool is demonstrated by repository fixture tests; the core example needs no Git checkout.
