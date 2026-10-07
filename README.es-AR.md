# migracao-ts-gradual

**Idioma:** [PT-BR](README.md) · [EN-US](README.en-US.md) · **es-AR**

Un playbook (y herramientas puras) para pasar un proyecto de **JavaScript a TypeScript de a poco** — sin reescribir todo de una vez. JS y TS conviven, lo legado se vuelve TS a tu ritmo y todo módulo nuevo nace tipado.

## La estrategia

Reescribir todo (big-bang) es caro y riesgoso. La migración gradual es un *strangler*: el TS crece dentro de un proyecto que sigue funcionando.

1. **`tsconfig.json` con `allowJs: true`** — `.js` y `.ts` conviven en el mismo proyecto.
2. **`checkJs: true` (o `// @ts-check` arriba del `.js`)** — TS **analiza el JS viejo sin reescribirlo**. El paso de mayor retorno y menor riesgo: encuentra bugs reales con tipos inferidos y JSDoc, sin cambiar cómo corre el código.
3. **Renombrá de a poco** — `.js`/`.jsx` → `.ts`/`.tsx`, **un archivo por vez**, empezando por **utilitarios y módulos independientes** y por **features nuevas**.
4. **Evitá `any`** — migrar rápido tienta a tipar todo como `any`, lo que anula la seguridad. Definí interfaces y tipos reales de a poco; usá `unknown` + narrowing cuando no sepas.
5. **Todo módulo nuevo en `.ts`/`.tsx`** — de ahora en más, no más `.js`/`.jsx`. El porcentaje en TS solo sube.

## ¿El stack funciona en TS?

En general **sí** — pero lo que decide el esfuerzo es **cómo tu runtime ejecuta `.ts`**:

- **Front-end con bundler (Vite/esbuild, webpack, Next):** transpila `.ts`/`.tsx` de forma nativa, sin paso extra. `allowJs` deja convivir `.jsx` y `.tsx`. Agregá `typescript` como *devDependency* solo si querés chequeo de tipos real (el bundler transpila pero **no** chequea tipos).
- **Back-end Node:** acá está la decisión. Node **≥ 23.6 elimina tipos de forma nativa** (y 22.6–23.5 con `--experimental-strip-types`), pero el *stripping* solo acepta TS "borrable" (sin `enum`, sin `namespace`, sin parameter properties; usá `erasableSyntaxOnly`). En **Node < 22.6** necesitás un build (`tsc` → `.js`) o un loader. Opciones en el back-end:

  | opción | costo | nota |
  |---|---|---|
  | Subir Node a ≥ 23.6 y correr `.ts` directo | upgrade de runtime | sin dependencia nueva; TS "borrable" |
  | `tsc` en el build (compila a `dist`) | agrega build + devDep `typescript` | mantiene el Node actual |
  | Loader (`tsx`/`ts-node`) | dependencia en runtime | más rápido de adoptar |

- **Librerías:** casi todo trae tipos. Algunas son **TS-first** (ej.: Zod infiere el tipo del schema); ORMs/frameworks populares traen sus propios tipos o `@types/*`.

**Regla práctica:** empezá con `// @ts-check` (cero cambio de runtime), migrá el front con el bundler y recién después resolvé la ejecución de `.ts` en el back-end según la tabla.

## tsconfig inicial

Mirá [`examples/tsconfig.base.json`](examples/tsconfig.base.json): `allowJs` + `checkJs` + `strict` + `noEmit` (solo chequeo; la transpilación queda en el bundler/Node). Dejá `strict` activo en código nuevo; para lo legado, relajá por archivo hasta tipar de verdad.

## CI que frena la regresión

Chequeá tipos sin emitir:

```bash
npx tsc --noEmit
```

Ponelo en el CI junto a los tests. Así un `.ts` que rompe el contrato falla el pull request aunque el bundler lo transpile sin quejarse.

## Herramienta incluida

```js
import { progresso, contarAny, classificar } from 'migracao-ts-gradual';

progresso(['a.ts', 'b.js', 'c.js']);   // { total: 3, ts: 1, js: 2, pct_ts: 33.3 }
contarAny('function f(x: any) {}');    // 1  — meta: cero antes de darlo por migrado
classificar('tela.tsx');               // 'ts'
```

| función | descripción |
|---|---|
| `progresso(archivos)` | `{ total, ts, js, pct_ts }` desde una lista de rutas |
| `contarAny(texto)` | cuenta `: any`, `as any`, `<any>`, `any[]` |
| `classificar(ruta)` | `'ts'` · `'js'` · `'outro'` (otro) |

Alimentá `progresso` con la salida de `git ls-files` y tenés un termómetro de la migración para el CI.

## Limitaciones

- `contarAny` es un **barrido textual** (regex), no un parser de tipos: toma los casos comunes, no el `any` implícito. Para rigor, usá `noImplicitAny` en `tsconfig`.
- La herramienta mide **archivos**, no líneas ni la calidad de los tipos.
- El playbook es agnóstico de plataforma; la tabla del back-end depende de tu versión de Node.

## Tests

```bash
node --test
```

## Licencia

MIT © Rodrigo Rodrigues
