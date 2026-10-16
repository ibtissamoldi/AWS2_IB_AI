const fs = require("node:fs");
const batec = require("./mesura.js").batec;


let reloj = batec(200);
let lineas = Array.from({ length: 1000000 }, (_, i) => {
    const numero = String(i + 1).padStart(7, '0');
    return "Línia " + numero +" · El fil principal no s'ha d'aturar mai";
});

let texto = lineas.join("\n") + "\n";
fs.writeFileSync("gran.txt", texto);
let datos = fs.statSync("gran.txt");
let mb = datos.size /1024 / 1024;

console.log("gran.txt: 1.000.000 línies · "+mb.toFixed(1)+ " MB");

let resultado = reloj.atura();
console.log("Tics: "+ resultado.tics);
console.log("Salto Maximo: " + resultado.maxSalto + " ms");