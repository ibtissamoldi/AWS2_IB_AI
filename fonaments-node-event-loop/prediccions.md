Predicciones:


Paso 0: Diagnóstico

"
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
process.nextTick(() => console.log("D"));
setTimeout(() => {
  console.log("E");
  Promise.resolve().then(() => console.log("F"));
}, 0);
console.log("G");
"

Mi predicción:

creo que saldra :
A
G
D
C
B
E
F