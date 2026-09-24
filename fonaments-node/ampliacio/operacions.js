function suma(a, b) {
  return a + b;
}

function resta(a, b) {
  return a - b;
}

function multiplica(a, b) {
  return a * b;
}

function divideix(a, b) {
  if (b === 0) {
    throw new Error("no es pot dividir per zero");
  }
  return a / b;
}

module.exports = { suma, resta, multiplica, divideix };