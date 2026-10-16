const { performance } = require("node:perf_hooks");
function ocupa(ms) {
    const fi = performance.now() + ms;
    while (performance.now() < fi) { /* espera activa */ }
}

let tics = 0;
let inicio = performance.now();
let ultimoTic = inicio;
let saltoMax = 0;

let id = setInterval(() => {
    tics++;
    let ahora = performance.now();

    let tiempo = Math.round(ahora- inicio);
    let salto = Math.round(ahora- ultimoTic);

    console.log("tic " + tics + " · " + tiempo + " ms");
    saltoMax = Math.max(saltoMax,salto);

    ultimoTic =ahora;

    if (tics== 8) {
        clearInterval(id);
        console.log("Salt més gran entre tics: " +saltoMax + " ms");
    }
}, 200);
setTimeout(() =>{
    console.log("Comença la feina pesada (2 s)...");
    ocupa(2000);
    console.log("Feina feta");
}, 900);