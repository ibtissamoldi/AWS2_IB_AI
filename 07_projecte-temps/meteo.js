import { descripcio } from "./codis.js";

export async function cercarCiutat(ciutat) {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");

  url.searchParams.set("name", ciutat);
  url.searchParams.set("count", "1");
  url.searchParams.set("language", "ca");

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Error en cercar la ciutat");
  }

  const dades = await resposta.json();

  if (!dades.results || dades.results.length === 0) {
    throw new Error("No s'ha trobat la ciutat");
  }

  return dades.results[0];
}

export async function tempsActual(latitud, longitud) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", latitud);
  url.searchParams.set("longitude", longitud);
  url.searchParams.set(
    "current",
    "temperature_2m,weather_code,wind_speed_10m",
  );

  let resposta;

  try {
    resposta = await fetch(url, {
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    throw new Error(`Open-Meteo no respon: ${err.message}`, { cause: err });
  }

  if (!resposta.ok) {
    throw new Error(`Open-Meteo ha respost ${resposta.status}`);
  }

  const dades = await resposta.json();

  return {
    temperatura: dades.current.temperature_2m,
    vent: dades.current.wind_speed_10m,
    codi: dades.current.weather_code,
  };
}

export async function tempsDe(ciutat) {
  const dadesCiutat = await cercarCiutat(ciutat);

  const dadesTemps = await tempsActual(
    dadesCiutat.latitude,
    dadesCiutat.longitude,
  );

  return {
    ciutat: dadesCiutat.name,
    pais: dadesCiutat.country,
    temperatura: dadesTemps.temperatura,
    vent: dadesTemps.vent,
    descripcio: descripcio(dadesTemps.codi),
  };
}
export async function comparar(ciutats) {
  if (!Array.isArray(ciutats) || ciutats.length < 2 || ciutats.length > 5) {
    const err = new Error("Cal indicar entre 2 i 5 ciutats");
    err.status = 400;
    throw err;
  }

  const resultats = await Promise.all(
    ciutats.map((ciutat) => tempsDe(ciutat)),
  );

  return resultats;
}
const resultats = await comparar(["Barcelona", "Girona", "Lleida"]);

console.log(resultats);
