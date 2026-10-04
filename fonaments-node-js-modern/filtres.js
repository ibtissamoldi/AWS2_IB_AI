const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "data", "material.json");
const material = JSON.parse(fs.readFileSync(ruta, "utf8"));

const filtres = Object.fromEntries(
  process.argv.slice(2).map((arg) => arg.split("="))
);

const valids = ["tipus", "estat", "aula"];

for (const clau of Object.keys(filtres)) {
  if (!valids.includes(clau)) {
    console.log(
      `Filtre desconegut: ${clau} (vàlids: ${valids.join(", ")})`
    );
    process.exit(1);
  }
}

const resultat = material.filter((element) =>
  Object.entries(filtres).every(
    ([clau, valor]) => element[clau] === valor
  )
);

console.log(`${resultat.length} elements:`);

resultat.forEach((element) => {
  console.log(
    `- [${element.id.slice(0, 8)}] ${element.nom} · ${element.aula} · ${element.valor.toFixed(2).replace(".", ",")} €`
  );
});