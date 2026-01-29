const caracteres = document.querySelector(".caracteres");
const playerText = document.querySelector(".playerText");
let game = {};
let gamesPalavra = [];
let typedWords = []
let palavra = ''
let emiting = false
let started = false;

let socket = null

// Aguarda até que o buffer tenha palavras suficientes
async function aguardarBuffer() {
    while (gamesPalavra.length < 1) {
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

// Carrega buffer de palavras
async function init(config, gameData) {
    if(!socket){
        console.log("Criando Socket")
        socket = config.socket;
        socket.on('game:word', data => {
            console.log(data);
            gamesPalavra.push(data.word);
            emiting = false
        });
    }
    
    if(!started){
        if(gameData){
        importarDados(gameData)
        return
    }
    console.log("Cheguei aqui")
    if(gamesPalavra.length > 0) return;
    novaPalavra(true)
    novaPalavra(true)
    await aguardarBuffer()
    }

    started = true;
    consumirPalavra()
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
        await novaPalavra();
        return;
    }

    if (gamesPalavra.length < 3) {
        novaPalavra();
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
async function novaPalavra(){
    if (emiting) return;
    emiting = true;
    socket.emit('game:draw');
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
            points.adicionarPontos(-10);
            points.setComboVisual();
            points.setErrou(true);
        for (let i = 0; i < inputTexto.value.length; i++) {
            new Drop(inputTexto.value[i], "relative", ".error");
            new Fly(10, "-");
            lifebar.atualizarVida(false, -5);
        }
    }
}

// Envia palavras escritas para o backend validar
async function enviarBackend(palavra) {
    try {
        socket.emit('game:sendWord', { word: palavra.word , typed: palavra.typed, typedHistory: typedWords})
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
    gamesPalavra = []
    palavra = ''
    typedWords = []
    started = false
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
    importarDados,
}
