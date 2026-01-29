const gameService = require("../services/gameService")
const gameManager = require("./gameManager")

module.exports = (io, socket) => {
    socket.on("game:start", (data) =>{
        if(!data){
            socket.emit("game:error", {message: "User não informado", type: "user"})
            return
        }

        socket.data.user = {
            id: data._id,
            nickname: data.user
        }

        const game = gameManager.createGame(data);
        socket.data.game = game;
        socket.emit("game:started", game);
    })

    socket.on("game:draw", () => {
        const word = gameService.drawWord();
        try{
            socket.data.game.history.push(word);
        } catch(e){
            console.error(e);
        }
        socket.emit("game:word", {word: word});
    })

    socket.on("game:sendWord", (data) =>{
        const {typed, correct} = data;

        socket.data.game.typedHistory.push(typed);
    })

    socket.on("game:delete", () =>{
        gameManager.gameDelete(socket.id);
    })

    socket.on("disconnect", () =>{
        gameManager.gameDelete(socket.id);
    })

    socket.on("game:end", () =>{
        let game = gameManager.getGame(socket.data.game.gameId)
        if(!game.gameId){
            socket.emit("game:error", {message: "O jogo não foi encontrado", type: "endgame"});
            return
        }
        let result = [];

        let {typedHistory, history} = game;
        typedHistory.forEach((el, i) => {
            if(el === history[i]){
                result.push(true)
            } else{
                result.push(false)
            }
        });
        const points = gameManager.endPoints(result);
        gameManager.gameDelete(game.gameId)
        delete socket.data.game
        socket.emit("game:ended", {
            points
        })
    })

    socket.on("game:update", (data) =>{
        
    })
};