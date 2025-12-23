let loop = true
let ultimoTime = 0;
let errou = false

// Loop do jogo
function atualizarTime({lifebar, points, gameOver, rodapePontos, atualTime}) {
    if (!loop) return;

    if (!ultimoTime) {
        ultimoTime = atualTime;
        requestAnimationFrame(time => atualizarTime({lifebar, points, gameOver, rodapePontos, atualTime: time }));
        return;
    }
    
    const deltaTime = (atualTime - ultimoTime) / 1000;
    ultimoTime = atualTime;

    // Codigo em loop sincroniado
    lifebar.atualizarVida(false, lifebar.getDanoVida() * deltaTime);

    if(points.getErrou()) points.zerarCombo(-1)

        // GameOver
    if(lifebar.getVidaAtual() <= 0){
        gameOver.gameOverEnable(points)
        return
    };

        // Atualizar pontos
    rodapePontos.elPontos.innerHTML = `${points.getPontos()}ppm`
    rodapePontos.elCombo.innerHTML = `x ${points.getCombo()}`

    // Fim código em loop
    requestAnimationFrame(time => atualizarTime({lifebar, points, gameOver, rodapePontos, atualTime: time }));
}

function resetLoop(){
    loop = false;
    ultimoTime = 0;
}

// Gets & Sets
function setLoop(bool){
    loop = bool
}

export default {
    atualizarTime,
    setLoop,
    resetLoop
}