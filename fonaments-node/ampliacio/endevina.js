const readline = require("node:readline");

const secret = Math.floor(Math.random() * 100) + 1;
let intents = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pregunta() {
  rl.question("Endevina el número (1-100): ", (resposta) => {
    const num = Number(resposta.trim());

    if (Number.isNaN(num) || num < 1 || num > 100) {
      console.log("Entrada no vàlida. Introdueix un número de l'1 al 100.");
      pregunta();
      return;
    }

    intents++;

    if (num < secret) {
      console.log("Més alt");
      pregunta();
    } else if (num > secret) {
      console.log("Més baix");
      pregunta();
    } else {
      console.log(`Correcte! Ho has fet en ${intents} intents`);
      rl.close();
    }
  });
}

pregunta();