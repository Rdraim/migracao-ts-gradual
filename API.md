<p align="right">
  <a href="API.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="API.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="API.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# Referência da API

| API | Entrada | Resultado e erros |
|---|---|---|
| `classificar(caminho)` | Caminho convertido para texto; extensão sem diferenciar maiúsculas. | ts, js ou outro. Declarações .d.ts/.d.mts/.d.cts retornam outro. |
| `progresso(arquivos = [])` | Iterável de caminhos; não acessa o disco. | { total, ts, js, pct_ts }; percentual arredondado a uma casa, zero se vazio. |
| `contarAny(texto)` | Texto examinado por expressão regular, sem parser TypeScript. | Quantidade heurística. Inclui comentários/strings; não mede segurança dos tipos. |
| `medirRepositorio(diretorio = ".")` | Submódulo migracao-ts-gradual/git, Node e executável git disponível. | Progresso dos caminhos no índice Git, sem fontes, untracked ou acesso à rede. Erro em diretório inválido. |

## Receita de integração

Exemplo sintético. Adapte e teste o contrato do consumidor antes de integrar:

```js

import { medirRepositorio } from 'migracao-ts-gradual/git';
const resultado = medirRepositorio('.');
console.log({ metaAtingida: resultado.pct_ts >= 50 });
```

## Detalhes do contrato

A ferramenta Git lê apenas nomes no índice. Conta testes e ferramentas versionados se suas extensões forem de implementação; filtrar por módulos continua sendo decisão do consumidor. Arquivos removidos do disco mas ainda no índice contam. Não executa commit, push, checkout, instalação ou checagem de tipos. Percentual alto não demonstra qualidade; preserve testes e revise os any.

## Contratos TypeScript

Declarações .d.ts acompanham o pacote; o núcleo continua JavaScript ESM. Exemplos de tipos em test-types/consumer.mts foram verificados com o compilador já disponível, sem acrescentar dependências. O CI executa testes de runtime e conteúdo; não instala um compilador TypeScript.

[Voltar ao projeto](README.md) · [Compatibilidade](COMPATIBILITY.md)
