const { sumaFinsA, esParell } = require("./utils");

console.log(sumaFinsA(100));
console.log(esParell(7));



const { estadistiques } = require("./utils");

const rawArgs = process.argv.slice(2);

if (rawArgs.length === 0) {
  console.log("Comanda correcta: npm start -- <números>");
  process.exit(0);
}

const numeros = rawArgs.map(Number);


const { minim, maxim, mitjana } = estadistiques(numeros);

console.log(`Mínim: ${minim}  Màxim: ${maxim}  Mitjana: ${mitjana}`);