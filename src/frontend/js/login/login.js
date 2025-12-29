const banner = document.querySelector('.banner-quote')
const inputNick = document.querySelector('.login-input')
let hello = false

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
        'Willkommen',
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

async function escrever(frase, sorted){
    banner.innerHTML = '';

    for (const letra of frase) {
        if(letra == ' ') {
            banner.innerHTML += '<br>'
        } else{
            banner.innerHTML += letra;
        }
        await sleep(250);
    }

    await sleep(1000);

    for (let i = frase.length; i > 0; i--) {
        frase = frase.slice(0, -1);
        banner.innerHTML = frase;
        await sleep(150);
    }

    await sleep(1000);

    if (inputNick.value !== '' && hello) {
        escrever(`${frases[1][sortear(frases[1].length)]}, ${inputNick.value}`)
    } else {
        escrever(frases[0][sortear(frases[0].length)])
    }
}

function sortear(max){
    return Math.floor(Math.random() * max)
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

escrever("Wellcome")
