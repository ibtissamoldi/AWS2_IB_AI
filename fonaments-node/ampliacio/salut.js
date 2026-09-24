const nom = process.env.NOM || "desconegut";
const idioma = process.env.IDIOMA || "ca";

const salutacions = {
  ca: "Bon dia",
  es: "Buenos días",
  en: "Good morning",
};

const salutacio = salutacions[idioma] || salutacions.ca;

console.log(`${salutacio}, ${nom}!`);