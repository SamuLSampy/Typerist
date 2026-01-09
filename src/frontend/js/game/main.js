import 'core-js/stable';

import Drop from '../scripts/class/Drop.js'
import Fly from '../scripts/class/Fly.js';

import wordSystem from "../scripts/wordSystem.js";
import initInputController from '../scripts/inputController.js';
import gameLoop from '../scripts/gameLoop.js';
import lifebar from '../scripts/lifebar.js';
import points from '../scripts/points.js';
import gameOverUi from '../scripts/gameOverUi.js';

const params = new URLSearchParams(window.location.search)

const gameId = params.get('g')
let gameData = {}
if (gameId) {
    fetch('/api/game/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: gameId })
    })
    .then(r => r.json())
    .then(data => {
        if(data.error) throw new Error(data.error)
        gameData = data;
        wordSystem.init(gameData)
        console.log('sessão restaurada')
        startBtn.classList.add("hidden");
        iniciarJogo()
    })
    .catch(error => {
        console.error("Erro ao restaurar jogo:", error);
        console.error("!SESSÃO SERÁ APAGADA ATÉ QUE SEJA CRIADO UM REDIRECIONAMENTO!")
        criarSessao();
    });
}

console.log(gameData)

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

// EventListeners
game.addEventListener("click", () => {
    inputTexto.focus();
})

// Botão de iniciar jogo
startBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    startBtn.classList.add("hidden");
    await criarSessao(gameId);
    await wordSystem.init()
    iniciarJogo();
})

// Botão de reiniciar
button.addEventListener("click", ()=>{
    reiniciar();
})

// Iniciar jogo
function iniciarJogo(gameData){
    lifebar.criarVida(game);
    gameLoop.setLoop(true);
    gameLoop.atualizarTime({lifebar, points, gameOver: gameOverUi, rodapePontos: {elCombo, elPontos}, atualTime: performance.now()});
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

// Cria uma nova sessão
async function criarSessao(gameId){
    if(gameId){
        console.log('Sessão Existente')
        return
    }
    await fetch('/api/game/erase', {method: 'POST'})
        .then(console.log('sessão apagada'))
    await fetch('/api/game/start', {
        method: 'POST',
    })
        .then(r => r.json())
        .then(data => {
            console.log(data)
            const url = new URL(window.location);
            url.searchParams.set('g', data.gameId);
            window.history.pushState({}, '', url);
            console.log('sessão criada')
      })
      .catch(err => console.error('Erro: Usuário possívelmente não logado \\/\n', err));
}
