<p align="right">
  <a href="API.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="API.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="API.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# Referencia de API

| API | Entrada | Resultado y errores |
|---|---|---|
| `classificar(caminho)` | Ruta convertida a texto; extensión sin distinguir mayúsculas. | ts, js u outro. Las declaraciones .d.ts/.d.mts/.d.cts devuelven outro. |
| `progresso(arquivos = [])` | Iterable de rutas; no accede al disco. | { total, ts, js, pct_ts }; porcentaje redondeado a un decimal, cero si está vacío. |
| `contarAny(texto)` | Texto examinado por expresión regular, sin parser TypeScript. | Conteo heurístico. Incluye comentarios/cadenas; no mide seguridad de tipos. |
| `medirRepositorio(diretorio = ".")` | Submódulo migracao-ts-gradual/git, Node y ejecutable git disponible. | Progreso de rutas del índice Git, sin contenido fuente, archivos no versionados ni red. Error en directorio inválido. |

## Receta de integración

Ejemplo sintético. Adaptá y probá el contrato consumidor antes de integrar:

```js

import { medirRepositorio } from 'migracao-ts-gradual/git';
const resultado = medirRepositorio('.');
console.log({ metaAlcanzada: resultado.pct_ts >= 50 });
```

## Detalles del contrato

La herramienta Git lee solo nombres del índice. Cuenta pruebas y herramientas versionadas con extensiones de implementación; filtrar módulos es decisión del consumidor. Los archivos borrados del disco que siguen en el índice cuentan. No hace commit, push, checkout, instalación ni chequeo de tipos. Un porcentaje alto no demuestra calidad; conservá pruebas y revisá los any.

## Contratos TypeScript

El paquete incluye declaraciones .d.ts; el núcleo sigue siendo JavaScript ESM. Los ejemplos de tipos en test-types/consumer.mts se verificaron con un compilador existente, sin agregar dependencias. El CI ejecuta pruebas de ejecución y contenido; no instala un compilador TypeScript.

[Volver al proyecto](README.es-AR.md) · [Compatibilidad](COMPATIBILITY.es-AR.md)
