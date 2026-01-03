const caracteres = document.querySelector(".caracteres");
const playerText = document.querySelector(".playerText");
let gamesPalavra = [];

async function init() {
    sortearProximaPalavra(true)
}

async function sortearProximaPalavra(init){
    // Apagar palavra anterior
    document.querySelectorAll(".char").forEach(el => {
        el.remove()
    })

    // Apagar input anterior
    document.querySelectorAll(".playerChar").forEach(el => {
        el.remove()
    })
    const palavraSorteada = await fetch('/api/game/drawWord', {
        method: 'POST',
        headers: {'content-type' : 'application/JSON'},
        body: JSON.stringify({})
    })
        .then(resolve => resolve.json())

    gamesPalavra.push(palavraSorteada);
    if(!init) criarSlotsInput(getPalavraAtual())
    console.log(gamesPalavra)
}

function criarSlotsInput(palavra){
        for(let i in palavra){
        // Criar palavra sorteada
        const char = document.createElement('div')
        char.innerHTML = palavra[i];
        char.classList.add(`char`);
        caracteres.appendChild(char);

        // Criar slots de input
        const PlayerChar = document.createElement('div')
        PlayerChar.innerHTML = ".";
        PlayerChar.classList.add(`playerChar`);
        PlayerChar.classList.add(`charVazio`);
        playerText.prepend(PlayerChar);
    }
}

// adiciona "." em caracteres vazios
function preencherChar(inputTexto){
    document.querySelectorAll(".playerChar").forEach((char, index) => {
        char.innerHTML = inputTexto.value[index]
        if(!inputTexto.value[index]){
            char.innerHTML = "."
        }
    });
}

// Ajusta cor
function confirmarChar(){
    document.querySelectorAll(".playerChar").forEach(el => {
        if(el.textContent === "."){
            el.classList.add("charVazio")
            return
        }
        el.classList.remove("charVazio")
        return
    })
}

function sortear(max){
    return Math.floor(Math.random() * max)
}

// Verifica se a palavra está correta ou errada
function enviarPalavra(inputTexto, lifebar, points, Drop, Fly){
    if(inputTexto.value === getPalavraAtual()){
        new Fly(10,"+");
        points.adicionarPontos(10);
        lifebar.atualizarVida(false, 10)
        lifebar.atualizarDano();

        console.log("Dano atual:", Math.abs(lifebar.getDanoVida()));
        return
    } else{
        for (let i = 0; i < inputTexto.value.length; i++) {
            new Drop(inputTexto.value[i], "relative", ".error");
            new Fly(10, "-")
            lifebar.atualizarVida(false, -5)
            points.adicionarPontos(-10);
            points.setComboVisual();
            points.setErrou(true);
        }
    }
}

function resetWordSystem(){
    // Apagar palavra anterior
    document.querySelectorAll(".char").forEach(el => {
        el.remove()
    })

    // Apagar input anterior
    document.querySelectorAll(".playerChar").forEach(el => {
        el.remove()
    })

    gamesPalavra = []
}

// Gets & Sets
function getGamesPalavra(){
    return gamesPalavra
}

function getPalavraAtual(){
    console.log(gamesPalavra[gamesPalavra.length-2])
    return gamesPalavra[gamesPalavra.length-2]
}

export default {
    init,
    sortearProximaPalavra,
    getGamesPalavra,
    preencherChar,
    confirmarChar,
    enviarPalavra,
    resetWordSystem,
    getPalavraAtual
}