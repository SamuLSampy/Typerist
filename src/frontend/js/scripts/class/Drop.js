export default class Drop{
    constructor(char, position, local){
        const caracteres = document.querySelector(local);
        const newEl = document.createElement("div");
        newEl.innerText = char;
        newEl.classList.add("drop")
        
        const rotacao = sortear(-25, 25);
        const dx = sortear(-15, 15);
        const dy = sortear(30, 60);
        
        newEl.style.setProperty('--rotacao', `${rotacao}deg`)
        newEl.style.setProperty('--dx', `${dx}px`)
        newEl.style.setProperty('--dy', `${dy}px`)
        newEl.style.setProperty('--posicao', `${position}`)

        caracteres.appendChild(newEl)
        newEl.addEventListener('animationend', () => {
            newEl.remove();
        })
    }
}

function sortear(min, max){
    return Math.random() * (max - min) + min;
}
