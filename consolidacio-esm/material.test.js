import test from "node:test";
import assert from "node:assert/strict";
import { prestar } from "./material.js";

const llista = [
  {
    codi: "INV-TEST-001",
    nom: "Portàtil HP",
    estat: "disponible",
  },
  {
    codi: "INV-TEST-002",
    nom: "Projector Epson",
    estat: "prestat",
    prestatA: "Marta",
  },
  {
    codi: "INV-TEST-003",
    nom: "Tauleta Samsung",
    estat: "avariat",
  },
];

test("prestar marca l'element com a prestat", () => {
  const novaLlista = prestar(llista, "INV-TEST-001", "Laia Puig");

  const element = novaLlista.find(
    (m) => m.codi === "INV-TEST-001");

  assert.equal(element.estat, "prestat");
  assert.equal(element.prestatA, "Laia Puig");
  assert.ok(element.dataPrestec);
});

test("prestar no modifica la llista original", () => {
  const original = structuredClone(llista);

  prestar(llista, "INV-TEST-001", "Laia Puig");

  assert.deepEqual(llista, original);
});

test("prestar rebutja un element que no està disponible", () => {
  assert.throws(
    () => prestar(llista, "INV-TEST-002", "Pau"),
    { status: 409 });
});
