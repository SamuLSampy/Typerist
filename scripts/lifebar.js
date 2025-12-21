let vida;
let vidaAtual = 100
let danoVida = -2
let danoMaximo = 15;
let danoCrescimento = 0.02;

function criarVida(game){
    if (vida) return; // Already created
    vida = document.createElement("div");
    vida.classList.add("vida")
    vida.style.setProperty("--vida-atual", "1")
    game.prepend(vida)
}

function atualizarVida(absolute, valor){
    if(absolute){
        vidaAtual = valor;
    } else {
        vidaAtual += valor;
    }

    vidaAtual = Math.max(0, Math.min(100, vidaAtual))
    vida.style.setProperty("--vida-atual", `${vidaAtual / 100}`)
    return
}

function getVidaAtual(){
    return vidaAtual
}

function setVidaMorto(){
    vida.classList.add("morto")
}

function setDanoVida(novoDano){
    danoVida = novoDano
}

function getDanoVida(){
    return danoVida
}

function atualizarDano() {
    const danoAtual = Math.abs(danoVida);

    const incremento = (danoMaximo - danoAtual) * danoCrescimento;

    const novoDano = Math.min(
        danoMaximo,
        danoAtual + incremento
    );

    danoVida = -novoDano;
}

function resetVida(){
    vidaAtual = 100
    danoVida = -2
    danoMaximo = 15;
    danoCrescimento = 0.02;
    vida.classList.remove("morto")
    vida.style.setProperty("--vida-atual", "1");
}

export default {
    criarVida,
    atualizarVida,
    getVidaAtual,
    setVidaMorto,
    setDanoVida,
    getDanoVida,
    atualizarDano,
    resetVida
}