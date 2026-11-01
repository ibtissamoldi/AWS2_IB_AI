// importa.js · Afegeix a l'inventari el material d'un CSV de compra
// Ús: node importa.js data/compra-octubre.csv
const fs = require("node:fs");
const material = require("./material");

const fitxer = process.argv[2];

if(!fitxer){
  console.error("Ús: node importa.js data/compra-octubre.csv")
  process.exit(2);
}
  console.error("Iniciant importació...");

try {
  const text = fs.readFileSync(fitxer, "utf8");
  // La primera línia és la capçalera: nom;tipus;aula;valor
  const files = text.trim().split("\n").slice(1);
  const inventari = material.llegir();
  const importats = [];
  let rebutjats=0;

  files.forEach((fila, i) => {
    const [nom, tipus, aula, valor] = fila.split(";");
    try {
      const nou = material.crear({ nom, tipus, aula, valor });
      inventari.push(nou);
      importats.push(nou);
    } catch(err) {
      rebutjats++;
      console.error(`Fila ${i+2} rebutjada: ${err.message}`);
    }
  });

  material.desar(inventari);
  console.error(`Importació: ${importats.length} importats i ${rebutjats} rebutjats de ${files.length} files`);

  if (rebutjats >0){
    process.exitCode=1;
  }
  console.log(JSON.stringify(importats, null, 2));
} catch (err) {
  console.error("No es pot importar: " + err.message);
  process.exitCode=1;
}
