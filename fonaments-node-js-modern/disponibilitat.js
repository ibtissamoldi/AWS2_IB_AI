const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "data", "material.json");
const material = JSON.parse(fs.readFileSync(ruta, "utf8"));

material.forEach((element) => {
  const persona = element.prestatA?.toUpperCase() ?? `a l'aula ${element.aula}`;

  const valor = element.valor ?? "sense valor";

  console.log(`${element.nom} · ${valor} € · ${persona}`);
});