export default function initInputController({inputTexto, wordSystem, game, lifebar, newClass}){
    inputTexto.addEventListener("input", (e) => {
        // Sensor de tecla certa
        if (wordSystem.getGamesPalavra()[wordSystem.getGamesPalavra().length -1][inputTexto.value.length-1] == inputTexto.value[inputTexto.value.length-1] && inputTexto.value !== "" && e.key !== "Backspace"){

        }

        if(inputTexto.value.length > wordSystem.getGamesPalavra()[wordSystem.getGamesPalavra().length -1].length){
            new newClass.Drop(inputTexto.value[inputTexto.value.length-1], "absolute", ".dropSlot");
            inputTexto.value = inputTexto.value.slice(0, -1)
        }

        wordSystem.preencherChar(inputTexto);
        wordSystem.confirmarChar();
    });

    inputTexto.addEventListener("keydown", (e) => {
        if (e.code === "Space" || e.code === "Enter") {
            e.preventDefault();
            wordSystem.enviarPalavra(inputTexto, lifebar, newClass.Drop, newClass.Fly);
            wordSystem.sortearProximaPalavra();
            inputTexto.value = "";
        }
    });
}
