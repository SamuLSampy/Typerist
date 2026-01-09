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

exports.createUser = ({gameId}) => {
    return {
        gameId,
        playerId : req.session.user.id,
        nickname: req.session.user.nickname,
        currentWord: firstWord,
        score: 0,
        history: [firstWord],
        typed: [],
        startedAt: Date.now()
    }
}

exports.createGame = (session, gameId, firstWord) => {
    if(!session.user){
        console.log("Guest")
        return {
            guest: true,
            currentWord: firstWord || '',
            score: 0,
            history: [firstWord || ''],
            typedHistory: [],
            startedAt: Date.now()
        }
    } else{
        console.log("User")
        return {
            gameId,
            playerId : session.user.id,
            nickname: session.user.nickname,
            currentWord: firstWord,
            score: 0,
            history: [firstWord || ''],
            typedHistory: [],
            startedAt: Date.now()
        }
    }
}

function draw(max){
    return Math.floor(Math.random() * max);
}
