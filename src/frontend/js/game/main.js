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
const socket = io();

socket.emit("ping", {hello: 'world'});
socket.on("pong", msg =>{
    console.log("Resposta servidor: ", msg)
})

const gameId = params.get('g')
let gameData = {}

console.log(gameData)

const d = new Date();
const startBtn = document.querySelector(".start");
const game = document.querySelector(".game");
const inputTexto = document.querySelector(".inputTexto");
const button = document.querySelector(".reiniciar");
const placar = document.querySelector(".game-over");
const title = document.querySelector(".title");

// Escrever Título
async function titleWrite(text){
    const splited = text.split('')
    title.innerHTML = ""

    for(let letter of splited){
        let span = document.createElement("span")
        span.innerHTML = letter
        title.appendChild(span)
        await sleep(100)
    }
    return
}

titleWrite("Typerist")

// Pontos
const elCombo = document.querySelector(".gameRodape .left");
const elPontos = document.querySelector(".gameRodape .right");

const placarCombo = document.querySelector(".combo");
const placarPontos = document.querySelector(".pontos");

// Inits
initInputController({inputTexto, wordSystem, game, lifebar, points, newClass: {Drop, Fly}});
points.init(elCombo, elPontos);
gameOverUi.init(inputTexto, lifebar, placar, placarCombo, placarPontos, {socket});

// EventListeners
game.addEventListener("click", () => {
    inputTexto.focus();
})

// Botão de iniciar jogo
startBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    startBtn.classList.add("hidden");
    title.classList.add("hidden");
    await criarSessao(gameId);
    await wordSystem.init({socket})
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
async function reiniciar(){
    lifebar.resetVida();
    points.resetPontuacao();
    wordSystem.resetWordSystem();
    gameLoop.resetLoop();
    inputTexto.value = "";
    inputTexto.disabled = false;
    placar.classList.add("hidden");
    await wordSystem.init({socket})
    iniciarJogo();
    inputTexto.focus();
}

// Cria uma nova sessão
async function criarSessao() {
    console.log("Criando Sessão")
    let user;
    await fetch('/api/user')
        .then(res => res.json())
        .then(obj => {
            user = obj
        })
        .catch(console.error);
        console.log(user)

    socket.emit('game:start', user);
    socket.on('game:started', data => {
        try{
            gameData = data
            const url = new URL(window.location);
            url.searchParams.set('g', data.gameId);
            window.history.pushState({}, '', url);
            console.log('sessão criada')
            console.log(gameData)
        } catch(e){
            console.error("Erro ao criar sessão> ", e);
            gameData = {}
        }

    })
}

// Função de pausa
async function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms)) 
}