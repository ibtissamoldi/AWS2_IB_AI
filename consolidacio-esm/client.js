const API = process.env.API_URL ?? "http://localhost:3000";

const [accio, valor, persona] = process.argv.slice(2);

if (!accio || (accio !== "llista" && accio !== "presta")) {
  console.error("Ús: node client.js llista [estat] | presta <codi> <persona>");
  process.exit(2);
}

let ruta;
let opcions = {};

if (accio === "llista") {
  ruta = valor ? `/material?estat=${valor}` : "/material";
} else {
  if (!valor || !persona) {
    console.error("Ús: node client.js presta <codi> <persona>");
    process.exit(2);
  }

  ruta = "/prestecs";
  opcions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ codi: valor, persona }),
  };
}

let resposta;

try {
  resposta = await fetch(API + ruta, opcions);
} catch (err) {
  const motiu = err.cause?.code ?? err.message;
  console.error(`No es pot connectar amb ${API}: ${motiu}`);
  process.exit(1);
}

const dades = await resposta.json();

if (!resposta.ok) {
  console.error(`Error ${resposta.status}: ${dades.error}`);
  process.exit(1);
}

if (accio === "presta") {
  console.log(
    `${dades.codi} ${dades.nom} ${dades.estat} (${dades.prestatA})`,
  );
} else {
  const materials = Array.isArray(dades) ? dades : [dades];

  for (const material of materials) {
    console.log(
      `${material.codi} ${material.nom} ${material.estat}`,
    );
  }
}
