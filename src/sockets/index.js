module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("Usuário conectado: ", socket.id);

        require("./game.socket")(io, socket)
    })
}