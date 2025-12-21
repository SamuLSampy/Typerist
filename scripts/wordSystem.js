const caracteres = document.querySelector(".caracteres");
const playerText = document.querySelector(".playerText");
let gamesPalavra = []


// Carregar lista de palavras
const res = await fetch("lista.txt");
const arquivo = await res.text();
const listaPalavras = arquivo.split('\n').map(p => p.trim()).filter(l => l !== "");

function sortearProximaPalavra(){
    // Apagar palavra anterior
    document.querySelectorAll(".char").forEach(el => {
        el.remove()
    })

    // Apagar input anterior
    document.querySelectorAll(".playerChar").forEach(el => {
        el.remove()
    })

    const palavraSorteada = listaPalavras[sortear(listaPalavras.length)]
    for(let i in palavraSorteada){
        // Criar palavra sorteada
        const char = document.createElement('div')
        char.innerHTML = palavraSorteada[i];
        char.classList.add(`char`);
        caracteres.appendChild(char);

        // Criar slots de input
        const PlayerChar = document.createElement('div')
        PlayerChar.innerHTML = ".";
        PlayerChar.classList.add(`playerChar`);
        PlayerChar.classList.add(`charVazio`);
        playerText.prepend(PlayerChar);
    }
    gamesPalavra.push(palavraSorteada);
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
    if(inputTexto.value === getGamesPalavra()[getGamesPalavra().length-1]){
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

export default {
    sortearProximaPalavra,
    getGamesPalavra,
    preencherChar,
    confirmarChar,
    enviarPalavra,
    resetWordSystem
}