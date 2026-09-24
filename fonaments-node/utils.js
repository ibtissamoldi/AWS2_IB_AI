function sumaFinsA(n) {
  let suma = 0;
  for (let i = 1; i <= n; i++) suma += i;
  return suma;
}

function esParell(n) {
  return n % 2 === 0;
}

module.exports = { sumaFinsA, esParell };


function estadistiques(numeros) {
  const minim = Math.min(...numeros);
  const maxim = Math.max(...numeros);
  const suma = numeros.reduce((acc, num) => acc + num, 0);
  const mitjana = suma / numeros.length;

  return { minim, maxim, mitjana };
}

module.exports = { sumaFinsA, esParell, estadistiques };