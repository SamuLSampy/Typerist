const fs = require('fs/promises');
const path = require('path');
let listaPalavras = [];

async function loadWordList(){
    try{
        const archive = await fs.readFile(path.resolve(__dirname, '../data/lista.txt'), 'utf-8');
        listaPalavras = archive.split('\n').map(p => p.trim()).filter(Boolean)
        console.log('- Palavras carregadas!')
    } catch(e) {
        console.error(e)
    }
}

loadWordList()

exports.drawWord = () =>{
    const wordDrawn = listaPalavras[draw(listaPalavras.length)];
    return wordDrawn
}

exports.valide = ({ history, typed}) => {
    for(let i in history){
        console.log(i)
    }
}

function draw(max){
    return Math.floor(Math.random() * max);
}
