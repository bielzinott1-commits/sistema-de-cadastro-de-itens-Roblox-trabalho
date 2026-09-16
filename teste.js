// Etapa 2

let nomeItem = prompt('Digite o nome do item:').toLowerCase();

let precoItem = itens[nomeItem];
let raridadeItem;

if (precoItem === undefined) {
    console.log('Erro: item não encontrado.');

} else if (precoItem <= 0) {
    console.log('Erro: o valor do item deve ser maior que 0.');

} else if (precoItem <= 100) {
    raridadeItem = 'comum';
    console.log(`Este item ${nomeItem} é comum.`);

} else if (precoItem <= 500) {
    raridadeItem = 'raro';
    console.log(`Este item ${nomeItem} é raro.`);

    raridadeItem = 'lendário';
    console.log(`Este item ${nomeItem} é lendário.`);

} else {
    raridadeItem = 'épico';
    console.log(`Este item ${nomeItem} é épico.`);
}