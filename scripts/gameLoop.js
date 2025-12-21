let loop = true
let ultimoTime = 0;

function atualizarTime(lifebar, atualTime) {
    if (!loop) return;

    if (!ultimoTime) {
        ultimoTime = atualTime;
        requestAnimationFrame(time => atualizarTime(lifebar, time));
        return;
    }

    const deltaTime = (atualTime - ultimoTime) / 1000;
    ultimoTime = atualTime;

    lifebar.atualizarVida(false, -5 * deltaTime);

    requestAnimationFrame(time => atualizarTime(lifebar, time));
}



function setLoop(bool){
    loop = bool
}

export default {
    atualizarTime,
    setLoop
}