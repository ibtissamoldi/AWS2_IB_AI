const { suma, resta, multiplica, divideix } = require("./operacions");

const num1 = Number(process.argv[2]);
const operador = process.argv[3];
const num2 = Number(process.argv[4]);

if (process.argv.length < 5 || Number.isNaN(num1) || Number.isNaN(num2)) {
  console.log("Ús: node ampliacio/calc.js <número> <operador> <número>");
  process.exit(1);
}

switch (operador) {
  case "+":
    console.log(suma(num1, num2));
    break;
  case "-":
    console.log(resta(num1, num2));
    break;
  case "x":
  case "X":
    console.log(multiplica(num1, num2));
    break;
  case "/":
    if (num2 === 0) {
      console.log("Error: no es pot dividir per zero");
    } else {
      console.log(divideix(num1, num2));
    }
    break;
  default:
    console.log(`Operador desconegut: ${operador}`);
    break;
}