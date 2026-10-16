const { performance } = require("node:perf_hooks");
function ocupa(ms) {
    const fi = performance.now() + ms;
    while (performance.now() < fi) { /* espera activa */ }
}

let tics = 0;
let inicio = performance.now();

let id = setInterval(() => {
    tics++;
});