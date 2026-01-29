import graphics from "../scripts/graphics"
const configClose = document.querySelector(".close-config")
const menuConfig = document.querySelector(".menu-config")
const menuBtn = document.querySelector(".menu")


configClose.addEventListener("click", () =>{
    menuConfig.classList.add("hidden")
})

menuBtn.addEventListener("click", () =>{
    menuConfig.classList.toggle("hidden")
})