<p align="right">
  <a href="README.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="README.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="README.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# Migración gradual de JavaScript a TypeScript

<!-- public-badges:start -->
[![license](assets/support/badge-license.svg)](LICENSE) [![CI](assets/support/badge-ci.svg)](https://github.com/Rdraim/migracao-ts-gradual/actions) [![release](assets/support/badge-release.svg)](https://github.com/Rdraim/migracao-ts-gradual/releases) [![Git](assets/support/badge-git.svg)](https://github.com/Rdraim/migracao-ts-gradual/commits/main)
<!-- public-badges:end -->

<p align="center"><img src="assets/support/project-es-ar.svg" width="800" alt="migracao-ts-gradual: Migrá por módulo. Medí con Git."></p>

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
npm run example:integration
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

## Documentación completa

[API y recetas](API.es-AR.md) · [Compatibilidad](COMPATIBILITY.es-AR.md) · [Contribuciones](CONTRIBUTING.es-AR.md) · [Seguridad](SECURITY.es-AR.md) · [Historial](CHANGELOG.es-AR.md) · [Apoyo voluntario](SUPPORT.es-AR.md)

## Contratos TypeScript

El paquete incluye declaraciones .d.ts; el núcleo sigue siendo JavaScript ESM. Los ejemplos de tipos en test-types/consumer.mts se verificaron con un compilador existente, sin agregar dependencias. El CI ejecuta pruebas de ejecución y contenido; no instala un compilador TypeScript.

Para repetir el chequeo, usá TypeScript instalado en tu entorno:

```bash
tsc --noEmit --strict --target ES2022 --module NodeNext --moduleResolution NodeNext test-types/consumer.mts
```

## Nueva versión — 1.2.0

Agrega medición por el índice Git, contratos TypeScript, pruebas con repositorio sintético y documentación completa.

Los indicadores son condicionales: CI aprobado, versión estable publicada y estrellas/forks mayores que cero. Se actualizan cada seis horas y por eventos; una página abierta necesita recargarse.

## Medición por Git

Después de clonar, ejecutá para un checkout local. El JSON solo contiene conteos, sin nombres de archivos ni contenido:

```bash
node tools/progresso-git.mjs ./example-project
```

La herramienta Git lee solo nombres del índice. Cuenta pruebas y herramientas versionadas con extensiones de implementación; filtrar módulos es decisión del consumidor. Los archivos borrados del disco que siguen en el índice cuentan. No hace commit, push, checkout, instalación ni chequeo de tipos. Un porcentaje alto no demuestra calidad; conservá pruebas y revisá los any.

---

<p align="center">
  <img src="assets/support/banner-es-ar.svg" width="960" alt="Código abierto. Un café suma. Apoyá el trabajo de Rodrigo Rodrigues.">
</p>

## ☕ Invitame un café

¿Este proyecto te ayudó a resolver un problema, aprender algo nuevo o dar tus primeros pasos en desarrollo? Si querés apoyar mi trabajo, un café es una linda forma de agradecer.

Soy **Rodrigo Rodrigues**, creador de **Nexus** y de estos proyectos de código abierto. Tu aporte me ayuda a dedicar tiempo a mejorar el código, escribir ejemplos más claros y seguir compartiendo lo que aprendo.

**Aportá el monto que tenga sentido para vos. El apoyo es totalmente voluntario; el proyecto sigue siendo gratuito bajo la licencia MIT.**

[Apoyá con Pix](#apoyá-con-pix) · [Dejá un comentario](https://github.com/Rdraim/migracao-ts-gradual/issues/new?title=Comentario%3A%20este%20proyecto%20me%20ayud%C3%B3)

### Apoyá con Pix

En la app de tu banco, escaneá el QR o copiá la clave Pix de abajo. Elegí el monto y revisá los datos del destinatario antes de confirmar.

<p align="center">
  <img src="assets/support/pix-qr.png" width="260" alt="QR Pix original proporcionado por Rodrigo Rodrigues; también podés usar la clave de texto de abajo.">
</p>

**Clave Pix**

```text
8875a24e-44d1-4c91-b6bb-62c9f0070955
```

Pix es el sistema de pagos de Brasil. Si tu banco no lo admite, también podés ayudar compartiendo el proyecto, reportando un problema, mejorando la documentación o dejando un comentario.

### Tu comentario también suma

[Contame cómo te ayudó el proyecto](https://github.com/Rdraim/migracao-ts-gradual/issues/new?title=Comentario%3A%20este%20proyecto%20me%20ayud%C3%B3). Me gustaría saber qué creaste, qué aprendiste y qué podría ser más claro para quienes recién empiezan.

Los comentarios son bienvenidos con o sin donación. Cuidá tu privacidad: no publiques comprobantes de pago, datos personales, credenciales ni información privada de usuarios en las Issues.

**Gracias por apoyar mi trabajo y ayudarme a seguir creando y compartiendo. ❤️**
