# Colorfly Studio

Colorfly Studio es una aplicación web estática e interactiva para generar paletas de colores aleatorias con un solo botón.

La app permite seleccionar cuántos colores quieres en la paleta y muestra cada color junto a su código HEX. Está construida con HTML, CSS y JavaScript puro, pensada para funcionar correctamente en desktop y mobile.

## Demo en línea

Puedes ver la aplicación en vivo en:

https://castronuovotamara90-art.github.io/FT76/

## Funcionalidades principales

- Generar una paleta de colores aleatoria.
- Seleccionar la cantidad de colores: 6, 8 o 9.
- Conversión de HSL a HEX para cada color.
- Visualización de cada color con su nombre y código.
- Modo claro / modo oscuro.
- Interfaz sencilla y rápida para experimentar con paletas.

## Decisiones técnicas

- Proyecto construido con HTML5, CSS y JavaScript puro.
- No usa frameworks ni dependencias externas.
- La aplicación es completamente estática y se despliega fácilmente en GitHub Pages.
- El diseño prioriza claridad visual, botones grandes y lectura directa de los códigos de color.
- Se utiliza un sistema de variables CSS (`:root`) para manejar colores y temas.

## Cómo usar la app

1. Abre la aplicación en el navegador desde el enlace:
   - https://castronuovotamara90-art.github.io/FT76/
2. Selecciona la cantidad de colores que quieres generar (6, 8 o 9).
3. Haz clic en el botón “Generar Paleta”.
4. Observa la paleta generada y copia los códigos HEX si los necesitas.
5. Si quieres, activa el modo oscuro con el botón correspondiente para ver la interfaz con fondo oscuro.

## Ejecución local

1. Clona el repositorio o descarga los archivos.
2. Abre el archivo `index.html` con tu navegador web.
3. También puedes usar un servidor local simple si prefieres, por ejemplo:
   - `python3 -m http.server 5500`
   - luego visita `http://localhost:5500` en tu navegador.
4. Selecciona la cantidad de colores y pulsa “Generar Paleta”.

## Despliegue en GitHub Pages

1. Asegúrate de tener el repositorio en GitHub.
2. Ve a la configuración del repositorio en GitHub.
3. En la sección “Pages”, selecciona la rama `main` y la carpeta `/root`.
4. Guarda los cambios.
5. GitHub desplegará la app y la publicará en:
   - `https://<tu-usuario>.github.io/<tu-repositorio>/`

En este proyecto, la URL actualmente disponible es:

https://castronuovotamara90-art.github.io/FT76/

## Checklist de implementación

- [x] Botón de generación de paleta funcional.
- [x] Selección de 6, 8 o 9 colores.
- [x] Generación de colores aleatorios en HSL.
- [x] Conversión de colores HSL a HEX.
- [x] Visualización de cada color con su código HEX.
- [x] HTML semántico con encabezados, secciones y labels.
- [ ] Estilos responsivos básicos para desktop y mobile.
- [x] Modo oscuro / modo claro.
- [ ] Mejorar accesibilidad y contraste en algunos estados.

## Nota

El proyecto está enfocado en una experiencia simple y rápida para crear paletas de colores. Las mejoras pendientes buscan aumentar la interactividad y usabilidad.
