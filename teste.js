// Etapa 1

let itens = {
    espada: 50,
    escudo: 300,
    arco: 1000,
    armadura: 5000,
    cajado: 150000
};

// Etapa 2

let nomeItem = prompt('Digite o nome do item:').toLowerCase();

while (itens[nomeItem] === undefined) {
    console.log('Este item não é válido! Favor digite outro!');
    nomeItem = prompt('Digite outro item:').toLowerCase();
}

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

} else if (precoItem <= 5000) {
    raridadeItem = 'lendário';
    console.log(`Este item ${nomeItem} é lendário.`);

} else if (precoItem <=100000){
    raridadeItem = 'épico';
    console.log(`Este item ${nomeItem} é épico.`);

} else {
    raridadeItem = 'Deus';
    console.log(`Este item ${nomeItem} é Deus.`);

}