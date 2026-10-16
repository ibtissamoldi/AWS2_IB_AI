# Prediccions · Activitat 3
 
## Pas 0 · diagnostic.js
- **Predicció:**


console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
process.nextTick(() => console.log("D"));
setTimeout(() => {
  console.log("E");
  Promise.resolve().then(() => console.log("F"));
}, 0);
console.log("G");



creo que saldra :
A
G
D
C
F
E
B

porque A y G es codigo sincrono y js siempre ejecuta de arriba a bajo , y las otras como promese y set timeout estan programadas para mas tarde
luego D que es next tick porque tiene prioridad sobre todo los demas
luego se ejecutan las promesas y las ultimas son set timeout

- **Resultat:** :
Resultatdo del terminal:con node diagnostic.js
A
G
D
C
B
E
F

- **Explicació:** :

 

 
## Cas A
// Cas A
process.nextTick(() => console.log("1"));
Promise.resolve().then(() => console.log("2"));
process.nextTick(() => {
console.log("3");
process.nextTick(() => console.log("4"));
});
yo creo que mostrara:
1  3  4  2

creo que es que porque nexttick tiene mas prioridad que promise y nexttick se mostrara en orden o sea se mostrara 1 y luego 3 y luego 4 y al final promise la ultima que es 2.

resultado en el terminal:
1  3  4  2



// Cas B
setTimeout(() => console.log("1"), 0);
setTimeout(() => {
console.log("2");
process.nextTick(() => console.log("3"));
}, 0);
setTimeout(() => console.log("4"), 0);
Promise.resolve().then(() => setTimeout(() => console.log("5"),
0));

yo creo que mostrara:
3 1 2 4 5


resultado en el terminal:
1  2  3  4  5

mis predicciones eran incorrectas porque pense que process.nextTick tiene mas poder de saltar los temporizadores que habia

**Exercici 2**
fases.js:
```
const fs = require("node:fs");
setTimeout(() => console.log("principal · timeout"),0);
setImmediate(() => console.log("principal · immediate"));
```

-Respuesta a "¿Surt sempre igual?"?
No, he ejecutado node fases.js varias veces y no sale siempre igual
pero despues de ejecutarlo dentre del callback sale siempre igual
se ejecuta immediate y luego timeout y eso porque el callback de fs.readfile se ejecutas durante la fase de poll
y el siguente fase del event loop es siempre Check( setImmediate), el setTimeout debe esperar a la siguiente vuelta completa del bucle hasta llegar a la fase Timers



## Cas C
// Cas C



## Conclusions
- **Exercici 3:** quants tics es perden i per què
- **Exercici 4b:** què diuen els tics i el salt màxim
- **Exercici 5:** quants grups amb 2, 4 i 6 fils
- **Exercici 6:** trossos grans, petits i nextTick
