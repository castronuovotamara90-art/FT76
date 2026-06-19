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

function crearSwatch(colorHSL, colorHEX, nombre) {
  const swatch = document.createElement("article");
  swatch.className = "swatch";
  // Bloque superior _ el rectanculo de color
  const color = document.createElement("div");
  color.className = "swatch_color";
  color.style.backgroundColor = colorHSL;

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

const galeria = document.getElementById("galeria");

function renderPaleta(cantidad) {
  galeria.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    const color = generarColor();
    const swatch = crearSwatch(color.hsl, color.hex, "Color " + (i + 1));
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

