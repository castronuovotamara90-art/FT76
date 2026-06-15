function generarColorHSL () {
    const h = Math.round(Math.random() * 360);
    return "hsl(" + h + ", 70%, 60%)";
}

const paleta = [];

for (let i = 0; i < 5; i ++) { 
    const color = generarColorHSL();
    paleta.push(color);
}

console.log(paleta);

document.addEventListener('DOMContentLoaded', () => {
  const swatches = document.querySelectorAll('.swatch_color');
  swatches.forEach((el, i) => {
    const color = paleta[i % paleta.length];
    el.style.backgroundColor = color; // aplica color generado
    const codigo = el.parentElement.querySelector('.swatch_codigo');
    if (codigo) codigo.textContent = color; // muestra el valor HSL en la tarjeta
  });
});

