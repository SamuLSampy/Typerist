const gameService = require("../services/gameService")

const games = new Map();

function createGame(user){
    const gameId = crypto.randomUUID()
    const game = {
        gameId: gameId,
        playerId: user.id,
        nickname: user.user,
        currentWord: '',
        score: 0,
        history: [],
        typedHistory: [],
        startedAt: Date.now()
    }
    games.set(gameId, game)
    return game;
}

function getGame(gameId) {
    return games.get(gameId);
}

function endPoints(arr){
    let combo = 0;
    let points = 0;

    arr.forEach(value => {
        if(value){
            combo++;
            points += 10*combo
        } else{
            combo = 0;
            points -= 10
            points < 0 ? points = 0 : null;
        }
    });
    console.log(arr)
    return points
}

function gameDelete(id) {
    games.delete(id)
    return
}


module.exports = {
    createGame,
    getGame,
    gameDelete,
    endPoints
}
