const gameService = require("../services/gameService")

const games = new Map();

function createGame(socketId, user){
    const game = {
        gameId: crypto.randomUUID(),
        playerId: user.id,
        nickname: user.nickname,
        currentWord: '',
        score: 0,
        history: [],
        typedHistory: [],
        startedAt: Date.now()
    }
    games.set(socketId, game)
    return game;
}

function getGame(socket) {
    return games.get(socket.id);
}

function gameDelete(id) {
    games.delete(id)
    return
}


module.exports = {
    createGame,
    getGame,
    gameDelete
}
