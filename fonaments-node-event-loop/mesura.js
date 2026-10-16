const { performance } = require("node:perf_hooks");
function ocupa(ms) {
    const fi = performance.now() + ms;
    while (performance.now() < fi) { /* espera activa */ }
}
function batec(cadaMs) {
let tics = 0;
let maxSalto = 0;

let anterior = performance.now();

    let id = setInterval(()=> {
        let ahora = performance.now();

        let salto = ahora - anterior;

        tics++;

        if (salto > maxSalto) {
            maxSalto = salto;
        }

        anterior = ahora;
    }, cadaMs);

    return {
        atura() {
        clearInterval(id);
        let ahora = performance.now();
            let saltoFinal = ahora - anterior;

            if (saltoFinal > maxSalto) {
                maxSalto = saltoFinal;
            }

        return { 
            tics, maxSalto: Math.round(maxSalto) 
        };
        }
    };
}

module.exports = {ocupa,batec};