function sumaFinsA(n) {
  let suma = 0;
  for (let i = 1; i <= n; i++) suma += i;
  return suma;
}

function esParell(n) {
  return n % 2 === 0;
}

module.exports = { sumaFinsA, esParell };