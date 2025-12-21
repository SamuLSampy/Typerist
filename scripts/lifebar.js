let vida;
let vidaAtual = 100

function criarVida(game){
    vida = document.createElement("div");
    vida.classList.add("vida")
    vida.style.setProperty("--vida-atual", "100%")
    game.prepend(vida)
}

function atualizarVida(absolute, valor){
    if(absolute){
        vidaAtual = valor;
    } else {
        vidaAtual += valor;
    }

    vidaAtual = Math.max(0, Math.min(100, vidaAtual))
    vida.style.setProperty("--vida-atual", `${vidaAtual}%`)
    return
}

function getVidaAtual(){
    return vidaAtual
}

export default {
    criarVida,
    atualizarVida,
    getVidaAtual
}