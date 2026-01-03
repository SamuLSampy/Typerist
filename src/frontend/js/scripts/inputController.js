export default function initInputController({inputTexto, wordSystem, game, lifebar, points, newClass}){
    inputTexto.addEventListener("input", (e) => {
        // Sensor de tecla certa
        if (wordSystem.getPalavraAtual()[inputTexto.value.length-1] == inputTexto.value[inputTexto.value.length-1] && inputTexto.value !== "" && e.key !== "Backspace"){

        }

        if(inputTexto.value.length > wordSystem.getPalavraAtual().length){
            new newClass.Drop(inputTexto.value[inputTexto.value.length-1], "absolute", ".dropSlot");
            inputTexto.value = inputTexto.value.slice(0, -1)
        }

        wordSystem.preencherChar(inputTexto);
        wordSystem.confirmarChar();
    });

    inputTexto.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            wordSystem.enviarPalavra(inputTexto, lifebar, points, newClass.Drop, newClass.Fly);
            wordSystem.sortearProximaPalavra();
            inputTexto.value = "";
        }
    });
}
