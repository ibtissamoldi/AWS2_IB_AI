const m = { nom: "HP 14", valor: 0 };

console.log(0 ?? 5);
console.log(0 || 5);
console.log("" ?? "buit");
console.log("" || "buit");
console.log(m.valor || "sense valor");
console.log(m.valor ?? "sense valor");
console.log(m.prestatA?.toUpperCase());
console.log(m.prestatA?.toUpperCase() ?? "a l'aula");