const caracteres = document.querySelector(".caracteres");
const playerText = document.querySelector(".playerText");
let game = {};
let gamesPalavra = [];
let typedWords = []
let palavra = ''
let fetching
let started = false;

// Carrega buffer de palavras
async function init(gameData) {
    if(!started){
        if(gameData){
        importarDados(gameData)
        return
    }
    console.log("Cheguei aqui")
    if(gamesPalavra.length > 0) return;
    await fetchProximaPalavra(true)
    await fetchProximaPalavra(true)
    await fetchProximaPalavra(true)
    
    consumirPalavra()
    }
    started = true;
    return
}

// Importa dados da sessão da partida
function importarDados(gameData) {
    game = gameData || {};

    gamesPalavra = game.history || [];
    typedWords = game.typedHistory
    console.log("Historico: ", game)
    game.typedHistory.forEach(()=>{
        gamesPalavra.shift();
    })
    palavra = gamesPalavra[0] || '';

    consumirPalavra()
}

// Garante que o buffer de palavras não esvazie
async function reporPalavras(){
    if (gamesPalavra.length === 0) {
        await fetchProximaPalavra();
        return;
    }

    if (gamesPalavra.length < 3) {
        fetchProximaPalavra();
    }
}

// Avança a fila de palavras
function consumirPalavra(){
    palavra = gamesPalavra.shift()

    criarSlotsInput(palavra)
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

    if(!init) consumirPalavra()
}

// Busca uma nova palavra no backend
async function fetchProximaPalavra(){
    if (fetching) return;

    fetching = true;

    try {
        const res = await fetch('/api/game/drawWord', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        });

        const novaPalavra = await res.json();
        gamesPalavra.push(novaPalavra.word || 'Error');
    } catch (e) {
        console.error(e);
    } finally {
        fetching = false;
    }
}


function criarSlotsInput(palavra){
        for(let i in palavra){
        // Criar palavra sorteada
        const char = document.createElement('div');
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

// Ajusta cor dos slots do input
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

// Verifica se a palavra está correta ou errada
function enviarPalavra(inputTexto, lifebar, points, Drop, Fly){
    console.log(gamesPalavra)
    console.log(typedWords)
    typedWords.push(inputTexto.value);
    enviarBackend({word: getPalavraAtual(), typed: inputTexto.value})
    if(inputTexto.value === getPalavraAtual()){
        new Fly(10,"+");
        points.adicionarPontos(10);
        lifebar.atualizarVida(false, 10)
        lifebar.atualizarDano();
    } else{
        for (let i = 0; i < inputTexto.value.length; i++) {
            new Drop(inputTexto.value[i], "relative", ".error");
            new Fly(10, "-");
            lifebar.atualizarVida(false, -5);
            points.adicionarPontos(-10);
            points.setComboVisual();
            points.setErrou(true);
        }
    }
}

// Envia palavras escritas para o backend validar
async function enviarBackend(palavra) {
    try {
        const res = await fetch('/api/game/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ word: palavra.word , typed: palavra.typed, typedHistory: typedWords})
        });
        console.log(palavra.word, palavra.typed, typedWords)
        const data = await res.json();
    } catch (err) {
        console.error('Erro ao enviar palavra:', err);
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
    
    consumirPalavra()

}

// Gets & Sets
function getGamesPalavra(){
    return gamesPalavra
}

function getPalavraAtual(){
    return palavra
}

export default {
    init,
    sortearProximaPalavra,
    getGamesPalavra,
    preencherChar,
    confirmarChar,
    enviarPalavra,
    resetWordSystem,
    getPalavraAtual,
    reporPalavras,
    importarDados
}
