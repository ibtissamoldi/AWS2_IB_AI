# Punt de control 3 · Endevina el resultat

Escriu què mostra cada línia **sense executar res**. Després comprova-ho amb Node.

```js
const m = { nom: "HP 14", valor: 0 };
```

1. console.log(0 ?? 5);                                   → Mostra: 0  Encertat: 0
2. console.log(0 || 5);                                   → Mostra: 5  Encertat: 5
3. console.log("" ?? "buit");                             → Mostra:""  Encertat: ""
4. console.log("" || "buit");                             → Mostra: buit  Encertat: buit
5. console.log(m.valor || "sense valor");                 → Mostra: 0  Encertat: sense valor
6. console.log(m.valor ?? "sense valor");                 → Mostra: 0  Encertat: 0
7. console.log(m.prestatA?.toUpperCase());                → Mostra:   Encertat: undefined
8. console.log(m.prestatA?.toUpperCase() ?? "a l'aula");  → Mostra: a l'aula  Encertat: a l'aula

## Per pensar

- Quina diferència hi ha entre `??` i `||`? En quins casos donen resultats diferents?
- Què passaria a la línia 7 sense el `?.`?
- A l'inventari, la tauleta donada val `0`. Quin operador faries servir per mostrar-ne el valor? Per què?
