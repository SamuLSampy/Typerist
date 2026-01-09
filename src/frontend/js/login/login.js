const banner = document.querySelector('.banner-quote')
const inputNick = document.querySelector('.login-input')
let hello = false

const socket = io()

inputNick.addEventListener('blur', () =>{
    hello = true
})

inputNick.addEventListener('focus', () =>{
    hello = false
})

const frases = [
    [   
        'Welcome',
        'Bem-vindo',
        'Bienvenido',
        'Benvenuto',
        'Willkommen'
    ],
    [
        'Olá',
        'Hello',
        'Bonjour',
        'Ciao',
        'Hola',
        'Hallo'
    ]
]

// Caso já tenha o Nick escrito, a segunda saudação é selecionada
if(inputNick.value !== '') hello = true

// Função que escreve saudações
async function escrever(frase, sorted){
    banner.innerHTML = '';

    // Escreve a frase
    for (const letra of frase) {
        if(letra == ' ') {
            banner.innerHTML += '<br>'
        } else{
            banner.innerHTML += letra;
        }
        await sleep(250);
    }

    // Espera antes de apagar
    await sleep(1000);

    // Apaga frase
    for (let i = frase.length; i > 0; i--) {
        frase = frase.slice(0, -1);
        banner.innerHTML = frase;
        await sleep(150);
    }

    await sleep(1000);
    // Detecta se o usuário já escreveu o nome dele
    if (inputNick.value !== '' && hello) {
        // Garante que a palavra sorteada não seja a mesma que anterior
        let newSorted = frases[1][sortear(frases[1].length)]
        console.log(newSorted)
        while(sorted === newSorted){
            newSorted = frases[1][sortear(frases[1].length)]
        }

        // Chama função novamente
        escrever(`${newSorted}, ${inputNick.value}`, newSorted)
    } else {
        // Garante que a palavra sorteada não seja a mesma que anterior
        let newSorted = frases[0][sortear(frases[0].length)]
        console.log(newSorted)
        while(sorted === newSorted){
            newSorted = frases[0][sortear(frases[0].length)]
        }

        // Chama função novamente
        escrever(newSorted, newSorted)

    }
}

// Função de sorteio
function sortear(max){
    return Math.floor(Math.random() * max)
}

// Função de espera
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

escrever("Wellcome", "Wellcome")
