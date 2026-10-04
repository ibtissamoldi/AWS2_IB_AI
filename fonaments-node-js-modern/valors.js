const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "data", "material.json");
const dades = JSON.parse(fs.readFileSync(ruta, "utf8"));

const euros = (valor) => new Intl.NumberFormat("ca-ES", {style: "currency",
    currency: "EUR",}).format(valor);

const linia = (element) =>
  `${element.nom} · ${element.aula} · ${euros(element.valor)}`;

dades.forEach((element) => {
  console.log(linia(element));
});