const rawNumero = process.argv[2];
const rawLimit = process.argv[3];

const numero = Number(rawNumero);
const limit = rawLimit ? Number(rawLimit) : 10;

if (!rawNumero || Number.isNaN(numero) || Number.isNaN(limit)) {
  console.log("Ús: node ampliacio/taula.js <número> [límit]");
  process.exit(1);
}

for (let i = 1; i <= limit; i++) {
  console.log(`${numero} x ${i} = ${numero * i}`);
}