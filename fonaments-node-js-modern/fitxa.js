const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "data", "material.json");
const dades = JSON.parse(fs.readFileSync(ruta, "utf8"));

function fitxa({ nom, valor, estat = "disponible", ...resta }) {
  console.log(
    `${nom} — ${valor.toFixed(2).replace(".", ",")} € — ${estat}`
  );

  console.log(
    `Altres camps: ${Object.keys(resta).join(", ") || "cap"}`
  );
}

const primer = dades[0];

fitxa(primer);

fitxa({
  nom: "Ratolí sense fil",
  valor: 8,
});

const amortitzat = {
  ...primer,
  valor: primer.valor * 0.8,
};

console.log(
  `Original: ${primer.valor.toFixed(2).replace(".", ",")} € · Amortitzat: ${amortitzat.valor.toFixed(2).replace(".", ",")} €`
);