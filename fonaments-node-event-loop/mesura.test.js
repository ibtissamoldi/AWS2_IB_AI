
const { test } = require("node:test");
const assert = require("node:assert");
const { performance } = require("node:perf_hooks");
const { ocupa, batec } = require("./mesura.js");

//test1
test("ocupa bloqueja el fil el temps demanat", () => {
    let inicio = performance.now();
    ocupa(50);
    let d = performance.now() -inicio;
    assert.ok(d >= 50);
});

//test 2

test("batec detecta un bloqueig", () => {
    let b = batec(10);
    ocupa(100);

    let resultado = b.atura();
    assert.strictEqual(resultado.tics, 0);
    assert.ok(resultado.maxSalto >= 100);
});

//Test 3

test("batec compta tics si el fil es lliure", (t, done) => {
    let b = batec(10);

    setTimeout(() => {
        let resultado = b.atura();

        assert.ok(resultado.tics > 0);
        done();
    }, 100);
});
