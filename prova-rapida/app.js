const fs = require("node:fs");
const { disponibles, valorTotal } = require("./material");
console.log("A · Inici");
fs.readFile("data/material.json", "utf8", (err, text) => {
if (err) return console.error("No trobo material.json");
const llista = JSON.parse(text);
console.log(`B · Disponibles: ${disponibles(llista).length}`);
 console.log(`C · Valor: ${valorTotal(llista)} €`);
});
process.nextTick(() => console.log("D · nextTick"));
console.log("E · Fi");





/*
a)
1r:A . Inici
2n:E · Fi
3r:D · nextTick
4t:B · Disponibles: 2
5e:C · Valor: 760 €


b) si no existe data/material.json mostrara que n encuentra material.json (No trobo material.json)
porque funcionara la primera condición de la función de  if (err) y ejecutara el console.error

si el json esta mal escrito se ejecutara un error de syntaxis al intentar ejecutar JSON.parse(text)




*/


/*ejercicio d*/

fs.readFile("data/material.json", "utf8", (err, text) => {
  if (err) return console.error("No trobo material.json");

  try {
    const llista = JSON.parse(text);
    console.log(`B Disponibles: ${disponibles(llista).length}`);
    console.log(`C Valor: ${valorTotal(llista)} €`);
  } catch (error) {
    console.error("material.json no és JSON vàlid");
  }
});