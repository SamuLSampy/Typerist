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

exports.startGame = ({id, nickname}) => {
    const firstWord = this.drawWord({id})
    return {
        gameId: id,
        player: nickname,
        word: firstWord.word,
        score: 0
    }
}

exports.drawWord = ({ id }) =>{
    const wordDrawn = listaPalavras[draw(listaPalavras.length)];
    return{
        gameId: id,
        word: wordDrawn
    }
}

function draw(max){
    return Math.floor(Math.random() * max);
}
