/*1.(WHILE) Crie o array do MODELO_01. Percorra o array e procure qual o menor número que existe dentro do array. 
Resultado esperado: O passageiro mais novo do ônibus tem 0 anos e está na cadeira 6.
Ônibus = [2, 8, 9, 5, 4, 6, 0, 7, 1, 3]*/


const bus = [2, 8, 9, 5, 4, 6, 0, 7, 1, 3];
/*
let i = 0;
let age = "";
let index = bus.indexOf(0);

while (bus[i]) {
  age = [bus.length = 0];
  i++;
}
console.log("O passageiro mais novo do ônibus tem " + age + " anos e está na cadeira " +  index + ".");*/

let index1 = bus.indexOf(minimunArray(bus));

function minimunArray(arr) {
  let search = arr.length;
  let minimum = Infinity;
  while (search--) {
    if (arr[search] < minimum) {
      minimum = arr[search];
    }
  }
  return minimum;
}

console.log("O passageiro mais novo do ônibus tem " + minimunArray(bus) + " anos e está na cadeira " + index1 + ".");