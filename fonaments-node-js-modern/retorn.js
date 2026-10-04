const fs = require("node:fs");
const path = require("node:path");

const RUTA = path.join(__dirname, "data", "material.json");

const [id] = process.argv.slice(2);

if (!id) {
  console.log("Ús: node retorn.js <id>");
  process.exit(1);
}

const llista = JSON.parse(fs.readFileSync(RUTA, "utf8"));

const element = llista.find((m) => m.id.startsWith(id));

if (!element) {
  console.log(`No he trobat ${id}`);
  process.exit(1);
}

if (element.estat !== "prestat") {
  console.log(`No es pot retornar: està ${element.estat}`);
  process.exit(1);
}

const { prestatA, dataPrestec, ...resta } = element;

const novaLlista = llista.map((m) =>
  m.id === element.id
    ? {
        ...resta,
        estat: "disponible",
      }
    : m
);

fs.writeFileSync(RUTA, JSON.stringify(novaLlista, null, 2));

console.log(`Retornat: ${element.nom} (el tenia ${prestatA})`);