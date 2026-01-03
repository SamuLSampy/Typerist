let pontos = 0;
let combo = 0;
let comboVisual = 0;
let errou = false;
let comboMaximo = 0;

let elCombo, elPoint;

// Funcao para inicializar pontos
function init(importElCombo, importElPoint){
    elCombo = importElCombo;
    elPoint = importElPoint;
}

// Adiciona ou remove pontos
function adicionarPontos(newPontos) {
    if (newPontos > 0) {
        pontos += newPontos * combo;
        incrementarCombo();
    } else if (pontos + newPontos < 0) {
        pontos = 0;
    } else {
        pontos += newPontos;
    }
}

// Aumenta o valor do combo
function incrementarCombo(){
    pulseCombo();
    combo++
    return
}

// Reseta o combo, subtraindo gradualmente
function zerarCombo(){
    pulseCombo()
    if(errou){
        if(combo > comboMaximo){
            comboMaximo = combo
        }
    }
    if(comboVisual <= 0) errou = false
    if(errou) {
        combo--
        comboVisual--
    }
    return
}

// Efeito visual de pulsar no combo
function pulseCombo(){
    elCombo.classList.remove("pulse");

    elCombo.classList.add("pulse");

    elCombo.addEventListener("animationend", () => {
        elCombo.classList.remove("pulse");
    }, { once: true });
}

// Funcao que reseta para uma proxima partida
function resetPontuacao(){
    pontos = 0;
    combo = 0;
    comboVisual = 0;
    errou = false;
    comboMaximo = 0;
}

// Gets & Sets
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

export default {
    init,
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