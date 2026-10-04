const fs = require("fs");
const dades = JSON.parse(fs.readFileSync(`${__dirname}/data/material.json`, "utf8"));

const disponibles = dades.filter((element) => element.estat === "disponible");

const total = dades.reduce((suma, element) => suma + element.valor, 0);

const nomsDisponibles = disponibles.map((element) => `${element.nom} (${element.aula})`);

console.log(`Elements: ${dades.length}`);
console.log(`Valor total: ${total} euros`);
console.log(`Disponibles: ${disponibles.length}`);

nomsDisponibles.forEach((nom) => {
  console.log(`  - ${nom}`);
});