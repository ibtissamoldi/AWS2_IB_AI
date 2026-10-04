const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const RUTA = path.join(__dirname, "data", "material.json");

const TIPUS = ["portatil", "tauleta", "projector", "cable", "altres"];

const [nom, tipus, aula, text] = process.argv.slice(2);

if (!nom || !tipus || !aula || !text) {
  console.log("Ús: node alta.js <nom> <tipus> <aula> <valor>");
  process.exit(1);
}

if (!TIPUS.includes(tipus)) {
  console.log(`Tipus no vàlid: ${tipus}`);
  console.log(`Vàlids: ${TIPUS.join(", ")}`);
  process.exit(1);
}

const valor = Number(text);

if (Number.isNaN(valor) || valor < 0) {
  console.log(`Valor no vàlid: ${text}`);
  process.exit(1);
}

const llista = JSON.parse(fs.readFileSync(RUTA, "utf8"));

const nou = {
  id: crypto.randomUUID(),
  nom,
  tipus,
  aula,
  valor,
  estat: "disponible",
  dataAlta: new Date().toISOString(),
};

const novaLlista = [...llista, nou];

fs.writeFileSync(RUTA, JSON.stringify(novaLlista, null, 2));

console.log(
  `Alta feta: [${nou.id.slice(0, 8)}] ${nou.nom} · ${nou.aula} · ${nou.valor.toFixed(2).replace(".", ",")} €`
);