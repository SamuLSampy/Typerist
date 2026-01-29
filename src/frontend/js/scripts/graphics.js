let elements = []
let force = 100
let divisor = {
    a: 400,
    b: 320,
    c: 250,
    d: 100
}

let mousePos = []

function init(config){
    elements = config.el
    console.log(elements)
}

document.addEventListener("mousemove", e =>{
    if(elements.length === 0) return
    let width = window.innerWidth/2
    let height = window.innerHeight/2
    mousePos = [e.clientX, e.clientY]
    let pos = {
        x: (e.clientX-width)*-1, 
        y: (e.clientY-height)*-1
    }

    elements.a.forEach(el => {
        el.style.transform = `translateX(${pos.x/divisor.a}px) translateY(${pos.y/divisor.a}px)`
    });
    elements.b.forEach(el => {
        el.style.transform = `translateX(${pos.x/divisor.b}px) translateY(${pos.y/divisor.b}px)`
    });
    elements.c.forEach(el => {
        el.style.transform = `translateX(${pos.x/divisor.c}px) translateY(${pos.y/divisor.c}px)`
    });
    elements.d.forEach(el => {
        el.style.transform = `translateX(${pos.x/divisor.d}px) translateY(${pos.y/divisor.d}px)`
    });
})

function animar(){

    requestAnimationFrame(animar)
}

requestAnimationFrame(animar)

export default{
    init
}