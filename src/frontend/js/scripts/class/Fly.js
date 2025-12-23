export default class Fly{
    constructor(pontos, comp){
        const ref = document.querySelector(".referencia");
        const newEl = document.createElement("div");
        newEl.classList.add(comp === '+' ? 'fly' : 'flyNegativo')
        newEl.innerText = pontos+comp;

        ref.appendChild(newEl);

        newEl.addEventListener('animationend', () => {
            newEl.remove()
        })

    }
}