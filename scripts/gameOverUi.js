let input, lifebar, elPlacar, plCombo, plPontos;

function initGameOver(inputText, importVida, placar, placarCombo, placarPontos){
    try{
        input = inputText;
        lifebar = importVida;
        elPlacar = placar;
        plCombo = placarCombo;
        plPontos = placarPontos;
        console.log("GameOver iniciado.")
    } catch(e){
        console.error("ERRO: InitGameOver> " + e)
    }
}

function gameOverEnable(points){
    input.disabled = true;
    lifebar.setVidaMorto()

    let elTimeout = document.createElement("div");
    elTimeout.classList.add("timeout");
    document.querySelector(".game").appendChild(elTimeout)
    elTimeout.addEventListener("animationend", ()=>{
    elTimeout.remove()
    
    plPontos.innerHTML = points.getPontos();
    plCombo.innerHTML = points.getComboMaximo();

    setTimeout(() =>{
            elPlacar.classList.remove("hidden")
        })
    },1000)
}

export default {
    gameOverEnable,
    initGameOver
}