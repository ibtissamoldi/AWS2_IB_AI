const [ordre, ...argumentsOrdre] = process.argv.slice(2);
const API = "http://localhost:3000";

async function obtenirDades(ruta) {
  const resposta = await fetch(`${API}${ruta}`);
  const dades = await resposta.json();

  if (!resposta.ok) {
    throw new Error(`Error ${resposta.status}: ${dades.error}`);
  }

  return dades;
}

function mostrarTemps(dades) {
  console.log(
    `${dades.ciutat} (${dades.pais}) ${dades.temperatura} °C `
    + `vent ${dades.vent} km/h    ${dades.descripcio}`,
  );
}

async function main() {
  if (ordre === "temps") {
    const ciutat = argumentsOrdre.join(" ");

    if (!ciutat) {
      console.error("Ús: node client.js temps <ciutat>");
      process.exitCode = 2;
      return;
    }

    const dades = await obtenirDades(
      `/temps/${encodeURIComponent(ciutat)}`,
    );

    mostrarTemps(dades);
    return;
  }

  if (ordre === "compara") {
    if (argumentsOrdre.length < 2 || argumentsOrdre.length > 5) {
      console.error(
        "Ús: node client.js compara <ciutat1> <ciutat2> [ciutat3...]",
      );
      process.exitCode = 2;
      return;
    }

    const ciutats = argumentsOrdre.map(encodeURIComponent).join(",");
    const dades = await obtenirDades(`/compara?ciutats=${ciutats}`);

    for (const ciutat of dades) {
      mostrarTemps(ciutat);
    }
    return;
  }

  console.error(
    "Ús: node client.js temps <ciutat> | compara <ciutat1> <ciutat2>...",
  );
  process.exitCode = 2;
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
