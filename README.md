# migracao-ts-gradual

**Idioma:** **PT-BR** · [EN-US](README.en-US.md) · [es-AR](README.es-AR.md)

Playbook (e ferramentas puras) para migrar um projeto de **JavaScript para TypeScript aos poucos** — sem reescrever tudo de uma vez. JS e TS convivem, o legado vira TS no seu ritmo, e todo módulo novo já nasce tipado.

## A estratégia

Big-bang (reescrever tudo) é caro e arriscado. A migração gradual é um *strangler*: o TS cresce por dentro do projeto que continua funcionando.

1. **`tsconfig.json` com `allowJs: true`** — `.js` e `.ts` convivem no mesmo projeto.
2. **`checkJs: true` (ou `// @ts-check` no topo do `.js`)** — o TS **analisa o JS antigo sem reescrever**. É o passo de maior retorno e menor risco: pega bugs reais só com tipos inferidos e JSDoc, sem mudar como o código roda.
3. **Renomeie aos poucos** — `.js`/`.jsx` → `.ts`/`.tsx`, **um arquivo por vez**, começando por **utilitários e módulos independentes** (poucas dependências de entrada) e por **features novas**.
4. **Fuja do `any`** — ao migrar rápido, a tentação é tipar tudo como `any`, o que anula a segurança. Defina interfaces e tipos reais aos poucos; use `unknown` + narrowing quando não souber.
5. **Todo módulo novo em `.ts`/`.tsx`** — a partir de agora não se cria mais `.js`/`.jsx`. Assim o percentual em TS só sobe.

## As linguagens/stack funcionam em TS?

Em geral, **sim** — mas o ponto que decide o esforço é **como o seu runtime executa `.ts`**:

- **Front-end com bundler (Vite/esbuild, webpack, Next):** transpila `.ts`/`.tsx` nativamente, sem passo extra. `allowJs` deixa `.jsx` e `.tsx` conviverem. Só adicione `typescript` como *devDependency* se quiser checagem de tipo real (o bundler transpila, mas **não** checa tipos).
- **Back-end Node:** aqui está a decisão. Node **≥ 23.6 remove tipos nativamente** (e 22.6–23.5 com `--experimental-strip-types`), mas o *type stripping* só aceita TS "apagável" (sem `enum`, sem `namespace`, sem *parameter properties*; use `erasableSyntaxOnly`). Em **Node < 22.6** você precisa de um passo de build (`tsc` → `.js`) ou de um loader. Resumo das opções no back-end:

  | opção | custo | observação |
  |---|---|---|
  | Subir Node p/ ≥ 23.6 e rodar `.ts` direto | upgrade de runtime | zero dependência nova; TS "apagável" |
  | `tsc` no build (compila p/ `dist`) | adiciona build + devDep `typescript` | mantém Node atual |
  | Loader (`tsx`/`ts-node`) | dependência em runtime | mais rápido de adotar |

- **Bibliotecas:** quase tudo no ecossistema tem tipos. Algumas são **TS-first** (ex.: Zod infere o tipo do schema); ORMs e frameworks populares trazem tipos próprios ou pacotes `@types/*`.

**Regra prática:** comece pelo `// @ts-check` (zero mudança de runtime), migre o front via bundler, e só então resolva a execução de `.ts` no back-end conforme a tabela.

## tsconfig inicial

Veja [`examples/tsconfig.base.json`](examples/tsconfig.base.json): `allowJs` + `checkJs` + `strict` + `noEmit` (só checagem; a transpilação fica com o bundler/Node). Comece com `strict` ligado em código novo; para o legado, relaxe por arquivo até tipar de verdade.

## CI que segura a regressão

Rode a checagem de tipos sem emitir nada:

```bash
npx tsc --noEmit
```

Coloque isso no CI junto dos testes. Assim um `.ts` que quebrou o contrato falha o *pull request*, mesmo que o bundler transpile sem reclamar.

## Ferramenta incluída

```js
import { progresso, contarAny, classificar } from 'migracao-ts-gradual';

progresso(['a.ts', 'b.js', 'c.js']);   // { total: 3, ts: 1, js: 2, pct_ts: 33.3 }
contarAny('function f(x: any) {}');    // 1  — meta: zero antes de dar por migrado
classificar('tela.tsx');               // 'ts'
```

| função | descrição |
|---|---|
| `progresso(arquivos)` | `{ total, ts, js, pct_ts }` a partir de uma lista de caminhos |
| `contarAny(texto)` | conta `: any`, `as any`, `<any>`, `any[]` |
| `classificar(caminho)` | `'ts'` · `'js'` · `'outro'` |

Alimente `progresso` com a saída de `git ls-files` e você tem um termômetro da migração para pôr no CI.

## Limitações

- `contarAny` é um **pente textual** (regex), não um parser de tipos: pega os casos comuns, não `any` implícito. Para rigor, use `noImplicitAny` no `tsconfig`.
- A ferramenta mede **arquivos**, não linhas nem qualidade dos tipos.
- O playbook é agnóstico de plataforma; a tabela do back-end depende da sua versão de Node.

## Testes

```bash
node --test
```

## Licença

MIT © Rodrigo Rodrigues
