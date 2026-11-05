// importa.js · Afegeix a l'inventari el material d'un CSV de compra
// Ús: node importa.js data/compra-octubre.csv
const fs = require("node:fs");
const material = require("./material");

const fitxer = process.argv[2];

const opciones = process.argv.slice(3);

const verbose = opciones.includes("--verbose");
const quiet = opciones.includes("--quiet");

for (const opcion of opciones) {
  if (opcion !== "--verbose" && opcion !== "--quiet") {
    console.error(`Opcion desconocida: ${opcion}`);
    console.error("Ús: node importa.js data/compra-octubre.csv [--verbose] [--quiet]");
    process.exit(2);
  }
}

if (!fitxer) {
  console.error("Ús: node importa.js data/compra-octubre.csv");
  process.exit(2);
}

const NIVELLS = { error: 0, warn: 1, info: 2, debug: 3 };
let nivell = "info";

if (quiet) {
  nivell = "error";
}
if (verbose) {
  nivell = "debug";
}

const log = {};

for (const [nom, valor] of Object.entries(NIVELLS)) {
  log[nom] = (missatge) => {
    if (valor <= NIVELLS[nivell]) {
      console.error(missatge);
    }
  };
}

try {
  log.debug(`Llegint ${fitxer}`);
  const text = fs.readFileSync(fitxer, "utf8");
  // La primera línia és la capçalera: nom;tipus;aula;valor
  const files = text.trim().split("\n").slice(1);
  const inventari = material.llegir();
  const importats = [];
  let rebutjats = 0;

  files.forEach((fila, i) => {
    const [nom, tipus, aula, valor] = fila.split(";");
    try {
      const nou = material.crear({ nom, tipus, aula, valor });
      inventari.push(nou);
      importats.push(nou);
      log.debug(`Fila ${i + 2} importada: ${nou.nom} (${nou.id.slice(0, 8)})`);
    } catch (err) {
      rebutjats++;
      log.warn(` Fila ${i + 2} rebutjada: ${err.message}`);
    }
  });

  material.desar(inventari);
  log.info(`Importació: ${importats.length} importats i ${rebutjats} rebutjats de ${files.length} files`);
  if (rebutjats > 0) {
    process.exitCode = 1;
  }
  console.log(JSON.stringify(importats, null, 2));
} catch (err) {
  log.error("No es pot importar: " + err.message);
  process.exitCode = 1;
}
