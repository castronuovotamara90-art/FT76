# Colorfly Studio

Colorfly Studio es una aplicación web estática e interactiva para generar paletas de colores aleatorias con un solo botón.

La app permite seleccionar cuántos colores quieres en la paleta y muestra cada color junto a su código HEX. Está construida con HTML, CSS y JavaScript puro, pensada para funcionar correctamente en desktop y mobile.

## Funcionalidades principales

- Generar una paleta de colores aleatoria.
- Seleccionar el tamaño de la paleta: 6, 8 o 9 colores.
- Colores generados en formato HSL con conversión a HEX.
- Visualización de cada color con su código HEX.
- Render dinámico según la cantidad seleccionada.
- Modo oscuro/modo claro. (nuevo requerimiento)

## Alcance funcional mínimo

- Botón “Generar paleta” operativo: ✅
- Generación correcta de colores aleatorios: ✅
- Render dinámico según el tamaño seleccionado: ✅
- Microfeedback visible (tooltip, toast u equivalente): ⚠️ Pendiente
- Uso de HTML semántico: ✅
- Consideraciones básicas de accesibilidad (labels asociados, contraste suficiente, foco visible): ✅
- Responsive en mobile y desktop: ⚠️ Pendiente

## Checklist de implementación

- [x] Botón de generación de paleta funcional.
- [x] Selección de 6, 8 o 9 colores.
- [x] Generación de colores aleatorios en HSL.
- [x] Conversión de colores HSL a HEX.
- [x] Visualización de cada color con su código HEX.
- [x] Renderizado dinámico según el tamaño de la paleta.
- [x] HTML semántico con encabezados, secciones y labels.
- [ ] Estilos responsivos básicos para desktop y mobile.
- [x] Modo oscuro / modo claro.
- [x] Microfeedback visible al generar la paleta (tooltip, toast u otro).


## Extra credit

- [ ] Bloqueo de colores.
- [ ] Guardado de paletas en localStorage.
- [ ] Animaciones sutiles.
- [ ] Copiar el código HEX al portapapeles al hacer clic sobre un color.
- [ ] Mejoras visuales de UI.

## Tech stack

- HTML5
- CSS
- JavaScript
- Git / GitHub
- GitHub Pages

## Cómo usar

1. Abrir `index.html` en el navegador.
2. Seleccionar la cantidad de colores (6, 8 o 9).
3. Hacer clic en el botón “Generar Paleta”.
4. Ver los colores generados y sus códigos HEX.

## Nota

El proyecto está enfocado en una experiencia simple y rápida para crear paletas de colores. Las mejoras pendientes buscan aumentar la interactividad y usabilidad.
