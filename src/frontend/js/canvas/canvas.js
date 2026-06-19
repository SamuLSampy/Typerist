import { Firefly } from "./class/Firefly";
import { Explosion } from "./class/Explosion";

const canvas = document.getElementById("graphics");
const ctx = canvas.getContext("2d");

const defaultConfig = {
  parallax: true,
  firefly: true,
  explosion: true
};

let preferences = JSON.parse(localStorage.getItem("preferences")) || defaultConfig;

window.addEventListener("preferences:change", (e) => {
  preferences = e.detail;

  if (!preferences.parallax) {
    parallaxX = 0;
    parallaxY = 0;
  }

  if (!preferences.firefly) {
    fireflies = [];
  }
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let parallaxX = 0;
let parallaxY = 0;

let fireflies = [];
let explosions = [];

let lastFireflySpawnTime = 0;
let nextFireflySpawnDelay = Math.random() * 2000 + 1000;

let lastExplosionSpawnTime = 0;
let nextExplosionSpawnDelay = Math.random() * 5000 + 1000;

let lastTime = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

window.addEventListener("pointermove", (e) => {
    if (!preferences.parallax) {
    parallaxX = 0;
    parallaxY = 0;
    return;
  }

  parallaxX = (e.x - window.innerWidth / 2) / 300;
  parallaxY = (e.y - window.innerHeight / 2) / 300;
});

function loop(currentTime){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  let dt = deltaTime / 16.66;

  if(isNaN(dt) || dt > 5) dt = 1;

  if(preferences.firefly) {
    if(fireflies.length <= 20 && currentTime - lastFireflySpawnTime >= nextFireflySpawnDelay){
      const firefly = new Firefly(canvas.width, canvas.height);
      fireflies.push(firefly);
      lastFireflySpawnTime = currentTime;
      nextFireflySpawnDelay = Math.random() * 3000 + 1000;
    }
    fireflies.forEach(f =>{
      f.draw(ctx, parallaxX, parallaxY)
      f.update(dt)
    })
  }

  if(preferences.explosion) {
    if(explosions.length <= 4 && currentTime - lastExplosionSpawnTime >= nextExplosionSpawnDelay){
      const explosion = new Explosion(canvas.width, canvas.height)
      explosions.push(explosion)
      lastExplosionSpawnTime = currentTime;
      nextExplosionSpawnDelay = Math.random() * 6000 + 6000;
    }
    explosions.forEach(e =>{
      e.draw(ctx, parallaxX, parallaxY)
      e.update(dt)
    })
  }

  fireflies = fireflies.filter(f => !f.isDead);
  explosions = explosions.filter(e => !e.isDead);

  requestAnimationFrame(loop)
}
requestAnimationFrame((time) => loop(time))
