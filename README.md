<p align="right">
  <a href="README.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="README.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="README.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# Migração gradual de JavaScript para TypeScript

JS e TS convivem: habilite allowJs e faça a checagem com checkJs ou JSDoc. Migre por módulo, preserve testes e valide o consumidor. Renomear arquivos não garante segurança de tipos.

O bundler pode transpilar sem checar tipos. Mantenha TypeScript fixado nas devDependencies do seu projeto e execute tsc --noEmit no CI. O núcleo deste repositório não instala compilador nem modifica fontes.

Node 22.18 ou superior habilita remoção de tipos por padrão; 22.6–22.17 exige --experimental-strip-types. A remoção não checa tipos, não lê tsconfig, não suporta TSX e exige sintaxe apagável. Use build para JavaScript quando esses limites não servirem. Separe a configuração do bundler da configuração de execução Node.

[Node.js](https://nodejs.org/api/typescript.html) · [allowJs](https://www.typescriptlang.org/tsconfig/allowJs.html) · [checkJs](https://www.typescriptlang.org/tsconfig/checkJs.html)

## Uso

Node.js 22 ou superior. Núcleo ESM sem dependências, utilizável em navegador moderno. Não publicado no npm: clone o repositório ou use uma revisão Git fixada. Preserve a licença ao copiar o módulo.

```bash
git clone https://github.com/Rdraim/migracao-ts-gradual.git
cd migracao-ts-gradual
npm test
npm run example
```

```js
import { progresso, contarAny, classificar } from './src/progresso.js';
progresso(['a.ts', 'b.js', 'types.d.ts']); // { total: 2, ts: 1, js: 1, pct_ts: 50 }
contarAny('x: any[]; y as any'); // 2
classificar('Component.tsx'); // 'ts'
```

[tsconfig](examples/tsconfig.base.json)

## Limites

progresso mede arquivos, não linhas nem qualidade. Declarações .d.ts/.d.mts/.d.cts não contam como implementação. contarAny é heurística textual: conta tokens comuns, também em comentários/strings; não detecta todos os tipos explícitos ou implícitos. Use o compilador/linter para avaliação real.

## Verificação

CI em Node 22 e 24, exemplos executáveis, testes de borda e revisão heurística de conteúdo/histórico. A revisão automática não substitui inspeção humana.

## Contribuição

Abra uma Issue com comportamento esperado e exemplo sintético. Para contribuir, envie PR com teste de regressão e documentação sincronizada nas três línguas. Não envie dados reais, logs, configurações ou credenciais.

## Segurança

Reporte vulnerabilidades pelo recurso privado de segurança do GitHub quando disponível. Não publique segredos nem dados pessoais em Issues. O núcleo não acessa rede, banco ou arquivos; valide contratos e limites no consumidor.

## Histórico

1.1.0 — 2026-10-12: CI Node 22/24, revisão de histórico, declarações excluídas do progresso, contagem sem duplicação de any[] e documentação atualizada.

## Licença

[MIT](LICENSE) © Rodrigo Rodrigues
