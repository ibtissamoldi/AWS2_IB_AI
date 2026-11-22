import test from "node:test";
import assert from "node:assert/strict";
import { cercarCiutat, tempsActual } from "./meteo.js";

test("cercarCiutat troba una ciutat existent", async () => {
  const fetchFals = async () => ({
    ok: true,
    json: async () => ({
      results: [
        {
          name: "Barcelona",
          country: "Espanya",
          latitude: 41.3874,
          longitude: 2.1686,
        },
      ],
    }),
  });

  const resultat = await cercarCiutat("Barcelona", fetchFals);

  assert.equal(resultat.name, "Barcelona");
  assert.equal(resultat.country, "Espanya");
  assert.equal(resultat.latitude, 41.3874);
});

test("cercarCiutat retorna 404 si la ciutat no existeix", async () => {
  const fetchFals = async () => ({
    ok: true,
    json: async () => ({
      results: [],
    }),
  });

  await assert.rejects(
    () => cercarCiutat("Xyzzyqwk", fetchFals),
    { status: 404 },
  );
});

test("tempsActual retorna les dades meteorològiques correctament", async () => {
  const fetchFals = async () => ({
    ok: true,
    json: async () => ({
      current: {
        temperature_2m: 18,
        wind_speed_10m: 12,
        weather_code: 2,
      },
    }),
  });

  const resultat = await tempsActual(41.38, 2.17, fetchFals);

  assert.deepEqual(resultat, {
    temperatura: 18,
    vent: 12,
    codi: 2,
  });
});

test("tempsActual gestiona una resposta HTTP incorrecta", async () => {
  const fetchFals = async () => ({
    ok: false,
    status: 500,
  });

  await assert.rejects(
    () => tempsActual(41.38, 2.17, fetchFals),
    {
      message: "Open-Meteo ha respost 500",
      status: 502,
    },
  );
});
