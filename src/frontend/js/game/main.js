import 'core-js/stable';

import Drop from '../scripts/class/Drop.js'
import Fly from '../scripts/class/Fly.js';

import wordSystem from "../scripts/wordSystem.js";
import initInputController from '../scripts/inputController.js';
import gameLoop from '../scripts/gameLoop.js';
import lifebar from '../scripts/lifebar.js';
import points from '../scripts/points.js';
import gameOverUi from '../scripts/gameOverUi.js';

// Importar .txt

const d = new Date();
const startBtn = document.querySelector(".start");
const game = document.querySelector(".game");
const inputTexto = document.querySelector(".inputTexto");
const button = document.querySelector(".reiniciar");
const placar = document.querySelector(".game-over");

// Pontos
const elCombo = document.querySelector(".gameRodape .left");
const elPontos = document.querySelector(".gameRodape .right");

const placarCombo = document.querySelector(".combo");
const placarPontos = document.querySelector(".pontos");

// Inits
initInputController({inputTexto, wordSystem, game, lifebar, points, newClass: {Drop, Fly}});
points.init(elCombo, elPontos);
gameOverUi.init(inputTexto, lifebar, placar, placarCombo, placarPontos);
wordSystem.init();

// EventListeners
game.addEventListener("click", () => {
    inputTexto.focus();
})

startBtn.addEventListener("click", async () => {
    await criarSessao();
    iniciarJogo();
})

button.addEventListener("click", ()=>{
    reiniciar();
})

// Iniciar jogo
function iniciarJogo(){
    wordSystem.sortearProximaPalavra();
    lifebar.criarVida(game);
    gameLoop.setLoop(true);
    gameLoop.atualizarTime({lifebar, points, gameOver: gameOverUi, rodapePontos: {elCombo, elPontos}, atualTime: performance.now()});
    startBtn.classList.add("hidden");
}

// Reseta todas todos os elementos e partida
function reiniciar(){
    lifebar.resetVida();
    points.resetPontuacao();
    wordSystem.resetWordSystem();
    gameLoop.resetLoop();
    inputTexto.value = "";
    inputTexto.disabled = false;
    placar.classList.add("hidden");
    wordSystem.init();
    iniciarJogo();
    inputTexto.focus();
}

async function criarSessao(){
    fetch('/api/game/start', {
        method: 'POST',
    })
      .then(r => r.json())
      .then(data => {
        const url = new URL(window.location);
        url.searchParams.set('g', data.gameId);
        window.history.pushState({}, '', url);
      })
      .catch(err => console.error('Erro: Usuário possívelmente não logado \\/\n', err));
}




