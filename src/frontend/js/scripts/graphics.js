let enabled = true;

let elements = {
    a: [],
    b: [],
    c: [],
    d: []
};
let force = 100
let divisor = {
    a: 400,
    b: 300,
    c: 220,
    d: 100
}

let mousePos = []

function init(config){
    elements = {
        a: [],
        b: [],
        c: [],
        d: [],
        ...config.el
    };
}

const defaultConfig = {
  parallax: true,
  firefly: true,
  explosion: true
};

let preferences = JSON.parse(localStorage.getItem("preferences")) || defaultConfig;
if(!preferences.parallax){
    enabled = false
}

function hasElements() {
    return elements.a.length || elements.b.length || elements.c.length || elements.d.length;
}

document.addEventListener("mousemove", e =>{
    if (!hasElements() || !enabled) return;
    let width = window.innerWidth/2
    let height = window.innerHeight/2
    mousePos = [e.clientX, e.clientY]
    let pos = {
        x: (e.clientX-width), 
        y: (e.clientY-height)
    }

    updatePosition(pos.x, pos.y)
})

window.addEventListener("preferences:change", (e) => {
    let preferences = e.detail;
    enabled = preferences.parallax
    
    if(!enabled){
        updatePosition(0, 0)
    }
});

function updatePosition(posX, posY){

    elements.a.forEach(el => {
        el.style.transform = `translateX(${posX/divisor.a}px) translateY(${posY/divisor.a}px)`
    });
    elements.b.forEach(el => {
        el.style.transform = `translateX(${posX/divisor.b}px) translateY(${posY/divisor.b}px)`
    });
    elements.c.forEach(el => {
        el.style.transform = `translateX(${posX/divisor.c}px) translateY(${posY/divisor.c}px)`
    });
    elements.d.forEach(el => {
        el.style.transform = `translateX(${posX/divisor.d}px) translateY(${posY/divisor.d}px)`
    });
}

export default{
    init
}
