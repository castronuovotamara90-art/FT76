// ==============================
// ESTADO GLOBAL
// ==============================

let coloresBloqueados = [];
let paletaBloqueada = {};

// ==============================
// FUNCIONES DE UTILIDAD
// ==============================

/**
 * Convierte valores HSL a formato HEX
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Código HEX (ej: #ff0000)
 */
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

/**
 * Copia texto al portapapeles con fallback para navegadores antiguos
 * @param {string} texto - Texto a copiar
 */
async function copiarTexto(texto) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);
    } else {
      const area = document.createElement("textarea");
      area.value = texto;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    mostrarToast("Color copiado: " + texto);
  } catch (error) {
    mostrarToast("No se pudo copiar el color");
  }
}

/**
 * Genera un color aleatorio en HSL
 * @returns {Object} Objeto con propiedades hsl y hex
 */
function generarColor() {
  const h = Math.round(Math.random() * 360);
  const hsl = "hsl(" + h + ", 70%, 60%)";
  const hex = hslToHex(h, 70, 60);
  return { hsl, hex };
}

/**
 * Muestra un toast de notificación temporal
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = mensaje;
  toast.classList.add("toast--visible");
  clearTimeout(mostrarToast._timeout);
  mostrarToast._timeout = setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 1800);
}


// ==============================
// FUNCIONES DE RENDER
// ==============================

/**
 * Crea una tarjeta de color individual (swatch)
 * @param {string} colorHSL - Color en formato HSL
 * @param {string} colorHEX - Color en formato HEX
 * @param {string} nombre - Nombre descriptivo del color
 * @param {number} indice - Índice en la paleta
 * @returns {HTMLElement} Elemento article con la tarjeta
 */
function crearSwatch(colorHSL, colorHEX, nombre, indice) {
  const swatch = document.createElement("article");
  swatch.className = "swatch";
  swatch.dataset.indice = indice;
  swatch.tabIndex = 0;
  
  // Boton para copiar el color al hacer click en el swatch
  const botonCopiar = document.createElement("button");
  botonCopiar.className = "swatch_copiar";
  botonCopiar.type = "button";
  botonCopiar.setAttribute("aria-label", "Copiar código HEX + HSL");
  botonCopiar.textContent = "📋";

botonCopiar.addEventListener("click", function (e) {
  e.stopPropagation();
  const textoCompleto = `HEX: ${colorHEX}\nHSL: ${colorHSL}`;
  copiarTexto(textoCompleto);
});

  // Bloque superior _ el rectanculo de color
  const color = document.createElement("div");
  color.className = "swatch_color";
  color.style.backgroundColor = colorHSL;

  // Botón de bloqueo
  const botonBloqueo = document.createElement("button");
  botonBloqueo.className = "swatch_bloqueo";
  botonBloqueo.setAttribute("aria-label", "Bloquear color");
  botonBloqueo.textContent = "🔓";
  
  botonBloqueo.addEventListener("click", function(e) {
    e.stopPropagation();
    const estaBloqueado = coloresBloqueados.includes(indice);
    
    if (estaBloqueado) {
      coloresBloqueados = coloresBloqueados.filter(i => i !== indice);
      botonBloqueo.textContent = "🔓";
      botonBloqueo.classList.remove("bloqueado");
    } else {
      coloresBloqueados.push(indice);
      botonBloqueo.textContent = "✅";
      botonBloqueo.classList.add("bloqueado");
    }
  });
  
  color.appendChild(botonBloqueo);

  // Bloque inferior _ el bloque de info
  const info = document.createElement("div");
  info.className = "swatch_info";

  const elNombre = document.createElement("p");
  elNombre.className = "swatch_name";
  elNombre.textContent = nombre;

  const elCodigo = document.createElement("p");
  elCodigo.className = "swatch_codigo";
  elCodigo.textContent = colorHEX;

  const elCodigoHSL = document.createElement("p");
  elCodigoHSL.className = "swatch_codigo";
  elCodigoHSL.textContent = colorHSL;

  info.append(elNombre, elCodigo, elCodigoHSL, botonCopiar);

  swatch.append(color, info);

  return swatch;
}

const galeria = document.getElementById("galeria");

/**
 * Renderiza la paleta de colores en la galería
 * @param {number} cantidad - Cantidad de colores a generar
 */
function renderPaleta(cantidad) {
  galeria.innerHTML = "";
  
  // Resetear bloqueados si la cantidad cambió
  coloresBloqueados = coloresBloqueados.filter(i => i < cantidad);
  
  for (let i = 0; i < cantidad; i++) {
    let color;
    
    if (coloresBloqueados.includes(i) && paletaBloqueada[i]) {
      // Si está bloqueado, usar el color guardado
      color = paletaBloqueada[i];
    } else {
      // Si no está bloqueado, generar nuevo color
      color = generarColor();
      paletaBloqueada[i] = color;
    }
    
    const swatch = crearSwatch(color.hsl, color.hex, "Color " + (i + 1), i);
    
    // Si está bloqueado, mostrar icono de bloqueado
    if (coloresBloqueados.includes(i)) {
      const botonBloqueo = swatch.querySelector(".swatch_bloqueo");
      botonBloqueo.textContent = "✅";
      botonBloqueo.classList.add("bloqueado");
    }
    
    galeria.appendChild(swatch);
  }
}

// ==============================
// INICIALIZACIÓN Y EVENTOS
// ==============================

const boton = document.getElementById("generar");

if (boton) {
  const selector = document.getElementById("cantidad");
  boton.addEventListener("click", function () {
    renderPaleta(Number(selector.value));
    mostrarToast("Paleta generada correctamente");
  });
} else {
  console.log("Boton no encontrado, Revisar el id del boton en el HTML.");
}

const botonModo = document.getElementById("modo");

if (botonModo) {
  botonModo.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      botonModo.textContent = "Modo claro";
    } else {
      botonModo.textContent = "Modo oscuro";
    }
  });
}

// ==============================
// INICIO DE LA APLICACIÓN
// ==============================

/**
 * Inicializa la aplicación
 */
function init() {
  renderPaleta(6);
}

// Ejecutar inicialización al cargar el DOM
init();

