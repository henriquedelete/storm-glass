function fibonacci(size) {
  let start = 0; // Setando o valor A do fibonacci
  let end = 1; // Setando o valor B do fibonacci
  let acc = []; // Inicializando o acumulador que aqui vai ser number[];
  for (let i = 0; i < size; i++) {
    // Esse for roda size vezes executando o algoritmo.
    let next = start + end; // estamos atrelando o proximo valor a variavel next
    acc.push(start); // estamos inserindo dentro da lista, o valor A ou start
    start = end; // estamos atribuindo o valor B ou end ao valor A ou start
    end = next; // e Estamos aqui atribuindo o valor de next que seria a soma de A + B = end;
  }
  return acc; // e aqui retornamos toda a lista de numeros que foram obtidos no algoritmo.
}

console.log(fibonacci(10));
