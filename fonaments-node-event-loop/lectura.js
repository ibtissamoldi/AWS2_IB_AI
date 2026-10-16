const fs = require("node:fs");
const { performance } = require("node:perf_hooks");
const { batec } = require("./mesura.js");
let RUTA = "gran.txt";

let inicio = performance.now();
let reloj = batec(10);
let correcto = true;

try {
    for (let i = 0; i < 5; i++) {
        fs.readFileSync(RUTA);
    }

    let tiempo = Math.round(performance.now() - inicio);
    let resultado = reloj.atura();

    console.log("Síncron: 5 lectures en " + tiempo +" ms · tics: " + resultado.tics +
        " · salt màxim: " + resultado.maxSalto + " ms");

} catch (err) {
    reloj.atura();
    correcto = false;

    if (err.code === "ENOENT") {
        console.log("No existeix gran.txt: executa primer node genera.js");
    } else {
        console.log(err);
    }

}

if (correcto) {
    inicio = performance.now();

    let b = batec(10);
    let pendents = 5;

    console.log("Lectures asíncrones en marxa...");

    for (let i = 0; i < 5; i++) {
        fs.readFile(RUTA, (err) => {

            if (err) {
                console.log("Error: executa primer node genera.js");
                process.exit(1);
            }

            pendents--;

            if (pendents === 0) {
                let tiempo = Math.round(performance.now() - inicio);
                let resultado = b.atura();

                console.log("Asíncron: 5 lectures en " + tiempo +" ms · tics: " + resultado.tics +
                    " · salt màxim: " + resultado.maxSalto + " ms"
                );
            }
        });
    }
}