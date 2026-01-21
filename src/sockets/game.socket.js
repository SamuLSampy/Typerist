const gameService = require("../services/gameService")
const gameManage = require("./gameManager")

module.exports = (io, socket) => {
    socket.on("game:start", (data) =>{
        
        if(!data){
            socket.emit("game:error", {message: "User não informado"})
            return
        }

        socket.data.user = {
            id: data._id,
            nickname: data.nickname
        }

        const game = gameManage.createGame(socket.id, data)
        socket.data.game = game
        console.log("Data do Socket> ", socket.data.game)
        socket.emit("game:started", game)
    })

    socket.on("game:draw", () => {
        const word = gameService.drawWord();
        socket.emit("game:word", {word: word});
    })

    socket.on("game:sendWord", (data) =>{
        const {typed, correct} = data;
        socket.data.game.typedHistory.push(typed);
        socket.data.game.history.push(correct);
    })

    socket.on("game:delete", () =>{
        gameManage.gameDelete(socket.id)
    })

    socket.on("disconnect", () =>{
        gameManage.gameDelete(socket.id)
    })
};