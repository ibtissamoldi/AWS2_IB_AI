const fs = require("node:fs");

const ruta = process.argv[2];

if (!ruta) {
  console.log("Ús: node ampliacio/paraules.js <ruta-del-fitxer>");
  process.exit(1);
}

try {
  const text = fs.readFileSync(ruta, "utf8");

  const linies = text.split("\n").length;
  const paraulesArray = text.trim().split(/\s+/).filter((p) => p.length > 0);
  const paraules = paraulesArray.length;
  const caracters = text.length;

  console.log(`Línies:    ${linies}`);
  console.log(`Paraules:  ${paraules}`);
  console.log(`Caràcters: ${caracters}`);

  if (paraulesArray.length > 0) {
    const mesLlarga = paraulesArray.reduce(
      (acc, curr) => (curr.length > acc.length ? curr : acc),
      ""
    );
    console.log(`Paraula més llarga: ${mesLlarga}`);
  }
} catch (err) {
  console.log(`No he trobat el fitxer ${ruta}`);
}