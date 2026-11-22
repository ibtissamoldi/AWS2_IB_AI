import { descripcio } from "./codis.js";

export async function cercarCiutat(ciutat, fetchFn = fetch) {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");

  url.searchParams.set("name", ciutat);
  url.searchParams.set("count", "1");
  url.searchParams.set("language", "ca");

  let resposta;

  try {
    resposta = await fetchFn(url, {
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    const error = new Error(
      `Open-Meteo no respon: ${err.message}`,
      { cause: err },
    );
    error.status = 502;
    throw error;
  }

  if (!resposta.ok) {
    const err = new Error("Error en cercar la ciutat");
    err.status = 502;
    throw err;
  }

  const dades = await resposta.json();

  if (!dades.results || dades.results.length === 0) {
    const err = new Error("No s'ha trobat la ciutat");
    err.status = 404;
    throw err;
  }

  return dades.results[0];
}

export async function tempsActual(latitud, longitud, fetchFn = fetch) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", latitud);
  url.searchParams.set("longitude", longitud);
  url.searchParams.set(
    "current",
    "temperature_2m,weather_code,wind_speed_10m",
  );

  let resposta;

  try {
    resposta = await fetchFn(url, {
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    const error = new Error(
      `Open-Meteo no respon: ${err.message}`,
      { cause: err },
    );
    error.status = 502;
    throw error;
  }

  if (!resposta.ok) {
    const err = new Error(`Open-Meteo ha respost ${resposta.status}`);
    err.status = 502;
    throw err;
  }

  const dades = await resposta.json();

  return {
    temperatura: dades.current.temperature_2m,
    vent: dades.current.wind_speed_10m,
    codi: dades.current.weather_code,
  };
}

export async function tempsDe(ciutat, fetchFn = fetch) {
  const dadesCiutat = await cercarCiutat(ciutat, fetchFn);

  const dadesTemps = await tempsActual(
    dadesCiutat.latitude,
    dadesCiutat.longitude,
    fetchFn,
  );

  return {
    ciutat: dadesCiutat.name,
    pais: dadesCiutat.country,
    temperatura: dadesTemps.temperatura,
    vent: dadesTemps.vent,
    descripcio: descripcio(dadesTemps.codi),
  };
}

export async function comparar(ciutats, fetchFn = fetch) {
  if (!Array.isArray(ciutats) || ciutats.length < 2 || ciutats.length > 5) {
    const err = new Error("Cal indicar entre 2 i 5 ciutats");
    err.status = 400;
    throw err;
  }

  const resultats = await Promise.all(
    ciutats.map((ciutat) => tempsDe(ciutat, fetchFn)),
  );

  return resultats.sort(
    (a, b) => b.temperatura - a.temperatura,
  );
}
