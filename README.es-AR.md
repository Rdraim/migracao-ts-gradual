<p align="right">
  <a href="README.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="README.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="README.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# Migración gradual de JavaScript a TypeScript

JS y TS conviven: habilitá allowJs y chequeá con checkJs o JSDoc. Migrá por módulo, conservá pruebas y validá consumidores. Renombrar archivos no garantiza seguridad de tipos.

Un bundler puede transpilar sin chequear tipos. Fijá TypeScript en las devDependencies de tu proyecto y ejecutá tsc --noEmit en CI. El núcleo de este repositorio no instala compiladores ni modifica fuentes.

Node 22.18 o superior habilita la eliminación de tipos por defecto; 22.6–22.17 requiere --experimental-strip-types. No chequea tipos, no lee tsconfig, no soporta TSX y exige sintaxis borrable. Compilá a JavaScript cuando estos límites no sirvan. Separá la configuración del bundler de la ejecución Node.

[Node.js](https://nodejs.org/api/typescript.html) · [allowJs](https://www.typescriptlang.org/tsconfig/allowJs.html) · [checkJs](https://www.typescriptlang.org/tsconfig/checkJs.html)

## Uso

Node.js 22 o superior. Núcleo ESM sin dependencias, utilizable en navegadores modernos. No está publicado en npm: cloná el repositorio o usá una revisión Git fija. Conservá la licencia al copiar el módulo.

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

## Límites

progresso mide archivos, no líneas ni calidad de tipos. Las declaraciones .d.ts/.d.mts/.d.cts no cuentan como implementación. contarAny es una heurística textual: cuenta tokens comunes, también en comentarios/cadenas, y omite algunos tipos explícitos e implícitos. Usá el compilador/linter para una evaluación real.

## Verificación

CI en Node 22 y 24, ejemplos ejecutables, pruebas de bordes y revisión heurística de contenido/historial. La revisión automática no reemplaza la inspección humana.

## Contribuciones

Abrí una Issue con el comportamiento esperado y un ejemplo sintético. Enviá un PR con prueba de regresión y documentación sincronizada en los tres idiomas. No envíes datos reales, registros, configuración ni credenciales.

## Seguridad

Usá el reporte privado de vulnerabilidades de GitHub cuando esté disponible. No publiques secretos ni datos personales en Issues. El núcleo no accede a redes, bases ni archivos; validá contratos y límites en la aplicación consumidora.

## Historial

1.1.0 — 2026-10-12: CI Node 22/24, revisión del historial, declaraciones excluidas del progreso, sin doble conteo de any[] y documentación actualizada.

## Licencia

[MIT](LICENSE) © Rodrigo Rodrigues
