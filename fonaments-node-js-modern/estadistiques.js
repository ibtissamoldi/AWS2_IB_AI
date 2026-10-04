const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "data", "material.json");
const material = JSON.parse(fs.readFileSync(ruta, "utf8"));

const total = material.reduce((suma, m) => suma + m.valor, 0);
const mitjana = total / material.length;

const perTipus = material.reduce((acc, m) => {
  acc[m.tipus] = (acc[m.tipus] ?? 0) + 1;
  return acc;
}, {});

const perAula = Object.groupBy(material, (m) => m.aula);

const mesValuos = material.reduce((max, m) =>
  m.valor > max.valor ? m : max
);

const hiHaAvariat = material.some((m) => m.estat === "avariat");
const totsAmbAula = material.every((m) => m.aula);

const euros = (valor) =>
  new Intl.NumberFormat("ca-ES", {
    style: "currency",
    currency: "EUR",
  }).format(valor);

console.log(
  `Elements: ${material.length} · Valor total: ${euros(total)}`
);

console.log(`Valor mitjà: ${euros(mitjana)}`);

console.log(
  `Per tipus: ${Object.entries(perTipus)
    .map(([tipus, quantitat]) => `${tipus} ${quantitat}`)
    .join(" · ")}`
);

console.log(
  `Per aula: ${Object.entries(perAula)
    .map(([aula, elements]) => `${aula} ${elements.length}`)
    .join(" · ")}`
);

console.log(
  `Més valuós: ${mesValuos.nom} (${euros(mesValuos.valor)})`
);

console.log(`Hi ha material avariat? ${hiHaAvariat ? "sí" : "no"}`);

console.log(`Tot té aula assignada? ${totsAmbAula ? "sí" : "no"}`);