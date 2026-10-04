const fs = require("node:fs");
const path = require("node:path");

const RUTA = path.join(__dirname, "data", "material.json");

const [id, persona] = process.argv.slice(2);

if (!id || !persona) {
  console.log("Ús: node prestec.js <id> <persona>");
  process.exit(1);
}

const llista = JSON.parse(fs.readFileSync(RUTA, "utf8"));

const element = llista.find((m) => m.id.startsWith(id));

if (!element) {
  console.log(`No he trobat ${id}`);
  process.exit(1);
}

if (element.estat !== "disponible") {
  console.log(`No es pot prestar: està ${element.estat}${element.prestatA ? ` a ${element.prestatA}` : ""}`);
  process.exit(1);
}

const novaLlista = llista.map((m) =>
  m.id === element.id
    ? {
        ...m,
        estat: "prestat",
        prestatA: persona,
        dataPrestec: new Date().toISOString(),
      }
    : m
);

fs.writeFileSync(RUTA, JSON.stringify(novaLlista, null, 2));

console.log(`Prestat: ${element.nom} → ${persona}`);