const { performance } = require("node:perf_hooks");
function ocupa(ms) {
    const fi = performance.now() + ms;
    while (performance.now() < fi) { /* espera activa */ }
}
