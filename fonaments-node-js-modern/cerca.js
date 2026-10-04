const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "data", "material.json");
const material = JSON.parse(fs.readFileSync(ruta, "utf8"));

const prefix = process.argv[2];

if (!prefix) {
  console.log("Ús: node cerca.js <inici-id>");
  process.exit(1);
}

const element = material.find((m) => m.id.startsWith(prefix));

if (!element) {
  console.log(`No he trobat cap element amb l'id ${prefix}`);
  process.exit(1);
}

const ubicacio =
  element.prestatA?.toUpperCase() ?? `a l'aula ${element.aula}`;

console.log(element.nom);
console.log(
  `\t${element.tipus} · ${element.aula} · ${element.estat} (${element.prestatA ?? "disponible"})`
);