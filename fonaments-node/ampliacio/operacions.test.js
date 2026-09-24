const test = require("node:test");
const assert = require("node:assert");
const { suma, resta, multiplica, divideix } = require("./operacions");

test("suma", () => {
  assert.strictEqual(suma(2, 3), 5);
});

test("resta", () => {
  assert.strictEqual(resta(5, 2), 3);
});

test("multiplica", () => {
  assert.strictEqual(multiplica(3, 4), 12);
});

test("divideix", () => {
  assert.strictEqual(divideix(10, 2), 5);
});

test("divideix per zero llança error", () => {
  assert.throws(() => divideix(10, 0), {
    message: "no es pot dividir per zero",
  });
});