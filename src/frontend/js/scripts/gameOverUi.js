let input, lifebar, elPlacar, plCombo, plPontos, socket;

const elMsg = document.querySelector(".game-over-title")
const endGameMsg = [
    "Acabaram as teclas :(",
    "Maldito acento!!!",
    "Fim de jogo.",
    "Lorem ipsum dolor.",
    "<h1> Mensagem Final Aqui. </h1>",
    "F5 não vai te salvar agora.",
    "Seus dedos tropeçaram.",
    "Que bom que o dev não criou o placar ainda.",
    "Tente outra vez.",
    "Dica: Digitar com luvas de boxe é mais difícil.",
    "O ç te traiu de novo!",
    "Foi o teclado que travou, eu vi.",
    "O gato subiu no teclado?",
    'Era "coração", não "corassaum".',
    "Game Over: Insert Coin.",
    "Sem queijo para você! ^_^",
    "asdfjklç não é uma palavra válida.",
    "Que tal 10 flexões por palavra errada?",
    "Teclado ANSI?",
    "Você tentou desligar e ligar de novo?",
    "Temus augu en comun...",
    '"Exceção" ou "Excessão"? Viu? Por isso perdeu.',
    "Foi quase... mas quase não conta.",
    "CTRL + BACKSPACE apaga rápido, sabia?",
    "Apertou duas teclas ao mesmo tempo?",
    'O que é "idiossincrasia"?',
    "Coloca no inglês que não tem acentos.",
    "Tá tudo bem errar… de novo ♥",
    "A culpa é deles 👉 ~ ^ ` ´ ç",
    "Essa mensagem foi escolhida aleatoriamente.",
    "Troca de música, essa tá dando azar.",
    "Confia: da próxima você faz 20.000 pontos.",
    "Index -1 out of bounds. Me descuidei...",
    "Todo mundo erra… alguns mais rápido.",
    "Isso foi um experimento social.",
    "Sim, isso era para acontecer. Não se ganha nesse jogo.",
    "Seu cérebro pensou, mas os dedos não obedeceram.",
    "A tecla correta estava logo ali. 👇",
    "Nos encontramos de novo.",
    "Não te vi bebendo água hoje. (Sério, não vi)",
    "Eu não precisaria fazer essa tela se você fosse bom.",
    "Eu vi você olhando para o teclado!",
    "Pelo menos você não é um robô. Ou é?",
    "...",
    'Eu juro que não tem "paralelepípedo" (tem sim).',
    "Sim, acentos são obrigatórios, no ENEM também.",
    "Voc^e tbm tà tntndo dgitra rapdo?"
]

// pausa
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Funcao inicial para importar elementos
function init(inputText, importVida, placar, placarCombo, placarPontos, config){
    try{
        input = inputText;
        lifebar = importVida;
        elPlacar = placar;
        plCombo = placarCombo;
        plPontos = placarPontos;
        socket = config.socket
    } catch(e){
        console.error("ERRO: InitGameOver> " + e)
    }
}

// Inicia tela de gameover e finaliza o jogo
function gameOverEnable(points){
    socket.emit("game:end")
    console.log("Cheguei aqui e enviei")
    input.disabled = true;
    lifebar.setVidaMorto()
    apagarDados()

    let elTimeout = document.createElement("div");
    elTimeout.classList.add("timeout");
    document.querySelector(".game").appendChild(elTimeout)
    elTimeout.addEventListener("animationend", ()=>{
    elTimeout.remove()
    
    plPontos.innerHTML = points.getPontos();
    plCombo.innerHTML = points.getComboMaximo();

    setTimeout(async () =>{
            elMsg.textContent = ""
            elPlacar.classList.remove("hidden")
            const endMsg = endGameMsg[sortear(endGameMsg.length)]
            for (const letter of endMsg.split("")) {
                elMsg.textContent += letter
                await sleep(30)
            }
        })
    },1000)
}

function  apagarDados() {
    fetch('api/game/erase', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
    }).then(r => r.json)
        .then(console.log)
        .catch(console.log)
}

function sortear(max){
    return Math.floor(Math.random() * max)
}

export default {
    gameOverEnable,
    init
}