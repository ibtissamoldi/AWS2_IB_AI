const { lazy } = require("react");

//microtasca de temporizador se ejecuta despues del codigo sincron y las micrtotasquas
setTimeout(() => console.log("loop"),0);
//microtasca de promise se ejecutara despues del next tick
Promise.resolve().then(() =>console.log("l’event") );
//next tick justo cuando se queda la pila vacia antes de las promeses
process.nextTick(() =>console.log("des de"));
//codigo síncron s'ejecutara primero
console.log("Hola");

//cuando cambiamos process.nextTick por queueMicrotask:
//la salida es :

//Hola
//l'event
//des de
//loop

//el orden de la ejecucion cambia porque process.nextTick tiene mas prioridad que las microtasques (promeses y queuemicrotask)