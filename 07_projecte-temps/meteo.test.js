import test from "node:test";
import assert from "node:assert/strict";
import { cercarCiutat, tempsActual, tempsDe, comparar } from "./meteo.js";

const CIUTATS = {
  Lleida: { latitude: 41.61, temperatura: 13.7 },
  Girona: { latitude: 41.98, temperatura: 15.1 },
  Barcelona: { latitude: 41.38, temperatura: 18.4 },
};

async function fetchFals(url) {
  const adreca = new URL(url);

  if (adreca.hostname === "geocoding-api.open-meteo.com") {
    const nom = adreca.searchParams.get("name");
    const ciutat = CIUTATS[nom];

    return {
      ok: true,
      json: async () => ({
        results: ciutat
          ? [{ name: nom, country_code: "ES", latitude: ciutat.latitude, longitude: 2 }]
          : [],
      }),
    };
  }

  const latitud = Number(adreca.searchParams.get("latitude"));
  const ciutat = Object.values(CIUTATS).find((c) => c.latitude === latitud);

  return {
    ok: true,
    json: async () => ({
      current: {
        temperature_2m: ciutat.temperatura,
        wind_speed_10m: 8,
        weather_code: 2,
      },
    }),
  };
}

test("cercarCiutat retorna nom, pais, latitud i longitud", async () => {
  const resultat = await cercarCiutat("Girona", fetchFals);

  assert.deepEqual(resultat, {
    nom: "Girona",
    pais: "ES",
    latitud: 41.98,
    longitud: 2,
  });
});

test("cercarCiutat retorna 404 si la ciutat no existeix", async () => {
  await assert.rejects(
    () => cercarCiutat("Xyzzyqwk", fetchFals),
    { status: 404, message: "No s'ha trobat la ciutat: Xyzzyqwk" },
  );
});

test("cercarCiutat retorna 502 si Open-Meteo no respon", async () => {
  const fetchTrencat = async () => {
    throw new Error("timeout");
  };

  await assert.rejects(
    () => cercarCiutat("Girona", fetchTrencat),
    { status: 502 },
  );
});

test("tempsActual retorna les dades meteorològiques correctament", async () => {
  const resultat = await tempsActual(41.98, 2, fetchFals);

  assert.deepEqual(resultat, {
    temperatura: 15.1,
    vent: 8,
    codi: 2,
  });
});

test("tempsActual gestiona una resposta HTTP incorrecta", async () => {
  const fetchError = async () => ({ ok: false, status: 500 });

  await assert.rejects(
    () => tempsActual(41.38, 2.17, fetchError),
    { message: "Open-Meteo ha respost 500", status: 502 },
  );
});

test("tempsDe encadena les dues crides i descriu el temps", async () => {
  const resultat = await tempsDe("Girona", fetchFals);

  assert.deepEqual(resultat, {
    ciutat: "Girona",
    pais: "ES",
    temperatura: 15.1,
    vent: 8,
    descripcio: "Parcialment ennuvolat",
  });
});

test("comparar ordena de més calenta a més freda", async () => {
  const resultat = await comparar(["Lleida", "Barcelona", "Girona"], fetchFals);

  assert.deepEqual(
    resultat.map((r) => r.ciutat),
    ["Barcelona", "Girona", "Lleida"],
  );
});

test("comparar retorna 400 si no hi ha entre 2 i 5 ciutats", async () => {
  await assert.rejects(
    () => comparar(["Girona"], fetchFals),
    { status: 400 },
  );
});
