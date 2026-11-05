const fs = require("node:fs");

const linies = fs.readFileSync("logs/produccio.ndjson", "utf8")
  .trim()
  .split("\n")
  .map((text) => JSON.parse(text));

const peticions = linies.filter((l) => l.msg === "petició atesa");
console.log(`${linies.length} línies, ${peticions.length} peticions`);

const perNivell = Object.groupBy(linies, (l) => l.level);
for (const [nivell, llista] of Object.entries(perNivell)) {
  console.log(`  ${nivell}: ${llista.length}`);
}

const incidencia = linies.filter((l) =>
  l.reqId === "3c9e1b2a" || l.ref === "3c9e1b2a");

console.log("\nIncidència 3c9e1b2a:");
console.log(incidencia);
