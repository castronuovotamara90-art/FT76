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

function crearSwatch(colorHSL, colorHEX, nombre, indice) {
  const swatch = document.createElement("article");
  swatch.className = "swatch";
  swatch.dataset.indice = indice;
  
  // Bloque superior _ el rectanculo de color
  const color = document.createElement("div");
  color.className = "swatch_color";
  color.style.backgroundColor = colorHSL;

  // Botón de bloqueo
  const botonBloqueo = document.createElement("button");
  botonBloqueo.className = "swatch_bloqueo";
  botonBloqueo.setAttribute("aria-label", "Bloquear color");
  botonBloqueo.innerHTML = "🔓";
  
  botonBloqueo.addEventListener("click", function(e) {
    e.stopPropagation();
    const estaBloquedo = coloresBloquedos.includes(indice);
    
    if (estaBloquedo) {
      coloresBloquedos = coloresBloquedos.filter(i => i !== indice);
      botonBloqueo.innerHTML = "🔓";
      botonBloqueo.classList.remove("bloqueado");
    } else {
      coloresBloquedos.push(indice);
      botonBloqueo.innerHTML = "🔒";
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

  info.append(elNombre, elCodigo, elCodigoHSL);

  swatch.append(color, info);

  return swatch;
}

function generarColor() {
  const h = Math.round(Math.random() * 360);
  const hsl = "hsl(" + h + ", 70%, 60%)";
  const hex = hslToHex(h, 70, 60);
  return { hsl, hex };
}
// Variables para el sistema de bloqueo

let coloresBloquedos = [];
let paletaBloqueada = {};

const galeria = document.getElementById("galeria");

function renderPaleta(cantidad) {
  galeria.innerHTML = "";
  
  // Resetear bloqueados si la cantidad cambió
  coloresBloquedos = coloresBloquedos.filter(i => i < cantidad);
  
  for (let i = 0; i < cantidad; i++) {
    let color;
    
    if (coloresBloquedos.includes(i) && paletaBloqueada[i]) {
      // Si está bloqueado, usar el color guardado
      color = paletaBloqueada[i];
    } else {
      // Si no está bloqueado, generar nuevo color
      color = generarColor();
      paletaBloqueada[i] = color;
    }
    
    const swatch = crearSwatch(color.hsl, color.hex, "Color " + (i + 1), i);
    
    // Si está bloqueado, mostrar candado cerrado
    if (coloresBloquedos.includes(i)) {
      const botonBloqueo = swatch.querySelector(".swatch_bloqueo");
      botonBloqueo.innerHTML = "🔒";
      botonBloqueo.classList.add("bloqueado");
    }
    
    galeria.appendChild(swatch);
  }
}

const toast = document.getElementById("toast");

function mostrarToast(mensaje) {
  if (!toast) return;
  toast.textContent = mensaje;
  toast.classList.add("toast--visible");
  clearTimeout(mostrarToast._timeout);
  mostrarToast._timeout = setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 1800);
}

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

renderPaleta(6)

