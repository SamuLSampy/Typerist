let pontos = 0;
let combo = 0;
let comboVisual = 0;
let errou = false;
let comboMaximo = 0;

let elCombo, elPoint;

function initPoints(importElCombo, importElPoint){
    elCombo = importElCombo;
    elPoint = importElPoint;
}

function adicionarPontos(newPontos) {
    incrementarCombo();

    if (newPontos > 0) {
        pontos += newPontos * combo;
    } else if (pontos + newPontos < 0) {
        pontos = 0;
    } else {
        pontos += newPontos;
    }
}

function incrementarCombo(el){
    pulseCombo();
    combo++
    return
}

function zerarCombo(){
    pulseCombo()
    if (combo > comboMaximo) comboMaximo = combo
    if(comboVisual <= 0) errou = false
    if(errou) {
        combo--
        comboVisual--
    }
    return
}

function pulseCombo(){
    elCombo.classList.remove("pulse");

    elCombo.classList.add("pulse");

    elCombo.addEventListener("animationend", () => {
        elCombo.classList.remove("pulse");
    }, { once: true });
}

function getPontos(){
    return pontos
}

function getCombo(){
    return combo
}

function getComboVisual(){
    return comboVisual
}

function setComboVisual(){
    comboVisual = combo
    return
}

function getErrou(){
    return errou
}

function setErrou(bool){
    errou = bool
    comboVisual = combo
}

function getComboMaximo(){
    return comboMaximo
}

function resetPontuacao(){
    pontos = 0;
    combo = 0;
    comboVisual = 0;
    errou = false;
    comboMaximo = 0;
}

export default {
    initPoints,
    adicionarPontos,
    incrementarCombo,
    getPontos,
    getCombo,
    getComboVisual,
    setComboVisual,
    getErrou,
    setErrou,
    zerarCombo,
    pulseCombo,
    resetPontuacao,
    getComboMaximo
}