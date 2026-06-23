# Color Factory

Color Factory es una aplicación web para generar paletas de colores aleatorias en el navegador. Permite elegir el tamaño de la paleta, ver los colores en HSL y HEX, bloquear colores para mantenerlos al regenerar, alternar modo claro/oscuro y recibir una notificación tipo toast al generar.

La aplicación es completamente estática: no necesita backend ni dependencias externas.

## Índice

- [Descripción general](#descripción-general)
- [Manual de usuario — Instrucciones de uso](#manual-de-usuario--instrucciones-de-uso)
- [Decisiones técnicas — Manual técnico](#decisiones-técnicas--manual-técnico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Pasos para descargar y ejecutar en local](#pasos-para-descargar-y-ejecutar-en-local)
- [Pasos para desplegar la aplicación](#pasos-para-desplegar-la-aplicación)
- [Uso de IA en el proyecto](#uso-de-ia-en-el-proyecto)

## Descripción general

La app genera paletas de colores aleatorias usando JavaScript. Cada tarjeta muestra un color con su nombre, su código HEX y su valor HSL.

Funcionalidades incluidas:

- Generar paleta con 6, 8 o 9 colores.
- Bloquear colores individuales para conservarlos entre regeneraciones.
- Modo claro y modo oscuro.
- Toast de confirmación al generar una nueva paleta.

Demo en línea:

https://castronuovotamara90-art.github.io/FT76_ProyectoM1_TamaraCastronuovo/

## Manual de usuario — Instrucciones de uso

### Pantalla principal

| Elemento | Descripción |
| --- | --- |
| Título "Color Factory" | Identifica la aplicación |
| Botón "Modo oscuro / Modo claro" | Alterna el tema visual |
| Botón "Generar Paleta" | Genera nuevos colores |
| Selector de cantidad | Permite elegir 6, 8 o 9 colores |
| Tarjetas de color (swatches) | Muestran color, HEX, HSL y botón de bloqueo |
| Toast | Muestra confirmación al generar paleta |

### Generar una paleta

1. Selecciona la cantidad de colores (6, 8 o 9).
2. Haz clic en "Generar Paleta".
3. Se renderizan los colores en pantalla.
4. Aparece un toast con el mensaje de confirmación.

### Bloquear colores

1. En cada swatch, pulsa el candado abierto (🔓) para bloquear ese color.
2. El icono cambia a candado cerrado (🔒).
3. Al generar una nueva paleta, los colores bloqueados se mantienen y solo cambian los desbloqueados.

### Cambiar de tema

1. Pulsa el botón de modo en el encabezado.
2. La app alterna entre modo oscuro y modo claro.
3. El texto del botón también se actualiza para indicar el modo disponible.

## Decisiones técnicas — Manual técnico

### Lenguajes y tecnologías

| Tecnología | Uso |
| --- | --- |
| HTML5 | Estructura semántica de la interfaz |
| CSS3 | Estilos, tema claro/oscuro, layout y estados visuales |
| JavaScript (ES6+) | Lógica de generación, render, eventos y toast |

El proyecto es 100 % vanilla (sin frameworks ni librerías externas).

### Generación de colores en HSL

Cada color se genera con un hue aleatorio y saturación/luminosidad fijas para mantener una apariencia consistente:

```js
const h = Math.round(Math.random() * 360);
const hsl = "hsl(" + h + ", 70%, 60%)";
```

### Conversión HSL a HEX

La función `hslToHex(h, s, l)` convierte matemáticamente de HSL a HEX sin dependencias externas.

```js
function hslToHex(h, s, l) {
   l = l / 100;
   const a = (s * Math.min(l, 1 - l)) / 100;
   const f = function (n) {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
         .toString(16)
         .padStart(2, "0");
   };
   return "#" + f(0) + f(8) + f(4);
}
```

### Sistema de bloqueo de colores

El bloqueo se maneja en memoria con dos estructuras:

- `coloresBloquedos`: índices de tarjetas bloqueadas.
- `paletaBloqueada`: objeto con los colores guardados por índice.

Al regenerar, si un índice está bloqueado, se reutiliza su color guardado.

### Toast de notificación

El toast es un `div` fijo que se muestra añadiendo la clase `toast--visible` y se oculta con `setTimeout`.

```js
toast.classList.add("toast--visible");
clearTimeout(mostrarToast._timeout);
mostrarToast._timeout = setTimeout(() => {
   toast.classList.remove("toast--visible");
}, 1800);
```

### Modo claro/oscuro con variables CSS

Se usan custom properties en `:root` y se reemplazan al activar `body.dark-mode`, lo que permite cambiar el tema sin duplicar componentes.

### Accesibilidad aplicada

- `role="status"`, `aria-live="polite"` y `aria-atomic="true"` en el toast.
- `aria-label` en el botón de bloqueo de cada swatch.
- HTML semántico con `header`, `main`, `section` y `footer`.

## Estructura del proyecto

```text
FT76/
├── index.html
├── script.js
├── README.md
├── assets/
│   └── img/
├── css/
│   └── styles.css
├── demo/
│   └── demo FT76 Tamara Castronuovo.gif
└── ia/
      ├── Captura de pantalla 2026-06-20 a las 10.33.28.png
      ├── Captura de pantalla 2026-06-20 a las 10.33.39.png
      ├── Captura de pantalla 2026-06-20 a las 10.33.44.png
      ├── Captura de pantalla 2026-06-20 a las 10.33.51.png
      └── Captura de pantalla 2026-06-20 a las 10.34.17.png
```

## Pasos para descargar y ejecutar en local

### Requisitos previos

- Navegador moderno (Chrome, Edge, Firefox o Safari actualizados).
- Git (opcional, para clonar).
- VS Code + Live Server (opcional, recomendado).

### Opción A — Clonar con Git

```bash
git clone https://github.com/castronuovotamara90-art/FT76_ProyectoM1_TamaraCastronuovo.git
cd FT76_ProyectoM1_TamaraCastronuovo
```

### Opción B — Descargar ZIP

1. En GitHub, abre el repositorio.
2. Pulsa "Code".
3. Selecciona "Download ZIP".
4. Descomprime el archivo.

### Ejecutar la aplicación

Con VS Code + Live Server:

1. Abre la carpeta del proyecto en VS Code.
2. Haz clic derecho en `index.html`.
3. Selecciona "Open with Live Server".

Alternativa simple:

1. Abre `index.html` con doble clic.
2. O levanta un servidor local:

```bash
python3 -m http.server 5500
```

3. Luego abre `http://localhost:5500`.

## Pasos para desplegar la aplicación

Como es una app estática, puedes desplegarla en GitHub Pages, Netlify o Vercel.

### GitHub Pages (recomendado)

1. Sube el proyecto a GitHub.
2. Ve a Settings > Pages.
3. En Source, selecciona rama `main` y carpeta `/root`.
4. Guarda cambios.

URL publicada actual:

https://castronuovotamara90-art.github.io/FT76_ProyectoM1_TamaraCastronuovo/

### Netlify

1. Inicia sesión en Netlify.
2. Arrastra la carpeta del proyecto al panel de deploy manual.
3. Netlify crea una URL pública automáticamente.

### Vercel

1. Inicia sesión en Vercel con GitHub.
2. Importa el repositorio.
3. Vercel detecta proyecto estático y despliega.

## Uso de IA en el proyecto

Durante el desarrollo utilicé IA para mejorar iteraciones de HTML, CSS y JavaScript, especialmente en la implementación de bloqueo de colores, mejoras de UX (toast) y documentación técnica.

### Evidencia visual del proceso

**Proceso de IA:**

![Captura 1](ia/Captura%20de%20pantalla%202026-06-20%20a%20las%2010.33.28.png)
![Captura 2](ia/Captura%20de%20pantalla%202026-06-20%20a%20las%2010.33.39.png)
![Captura 3](ia/Captura%20de%20pantalla%202026-06-20%20a%20las%2010.33.44.png)
![Captura 4](ia/Captura%20de%20pantalla%202026-06-20%20a%20las%2010.33.51.png)
![Captura 5](ia/Captura%20de%20pantalla%202026-06-20%20a%20las%2010.34.17.png)

**Demo:**

![Proceso de desarrollo y validación del proyecto con IA](demo/demo%20FT76%20Tamara%20Castronuovo.gif)
