const {
  llegir,
  filtrar,
  linia
} = require("./material");

const filtres = Object.fromEntries(
  process.argv.slice(2).map((arg) => arg.split("="))
);

const resultat = filtrar(llegir(), filtres);

console.log(`${resultat.length} elements:`);

resultat.forEach((element) => {
  console.log(
    `- [${element.id.slice(0, 8)}] ${linia(element)}`
  );
});