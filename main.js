import Drop from './scripts/class/Drop.js'
import Fly from './scripts/class/Fly.js';

import vida from './scripts/lifebar.js'
import wordSystem from "./scripts/wordSystem.js"
import initInputController from './scripts/inputController.js';
import gameLoop from './scripts/gameLoop.js'
import lifebar from './scripts/lifebar.js';

// Importar .txt

const d = new Date();
vida
const startBtn = document.querySelector(".start");
const game = document.querySelector(".game");
const inputTexto = document.querySelector(".inputTexto");

initInputController({inputTexto, wordSystem, game, lifebar, newClass: {Drop, Fly}});

game.addEventListener("click", (e) => {
    inputTexto.focus()
})

startBtn.addEventListener("click", () => {
    iniciarJogo()
})

function iniciarJogo(){
    wordSystem.sortearProximaPalavra()
    lifebar.criarVida(game)
    gameLoop.atualizarTime(lifebar)
}




