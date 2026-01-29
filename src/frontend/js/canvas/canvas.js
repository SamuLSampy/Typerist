const canvasEl = document.getElementById("graphics");
const ctx = canvasEl.getContext("2d");

// Lista para guardar o histórico do mouse
let points = []; 

function resize() {
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

window.addEventListener("mousemove", (e) => {

});