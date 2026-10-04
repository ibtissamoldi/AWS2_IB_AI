const {
  llegir,
  desar,
  prestar
} = require("./material");

const [id, persona] = process.argv.slice(2);

if (!id || !persona) {
  console.log("Ús: node prestec.js <id> <persona>");
  process.exit(1);
}

try {
  const llista = llegir();

  const element = llista.find((m) => m.id.startsWith(id));

  const novaLlista = prestar(llista, id, persona);

  desar(novaLlista);

  console.log(`Prestat: ${element.nom} → ${persona}`);
} catch (error) {
  console.log(error.message);
  process.exit(1);
}