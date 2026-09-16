// etapa 2
escudo:100
let nomeItem = prompt('Digite o nome do item:').toLowerCase();

let precoItem = itens[nomeItem];

if (precoItem < 100) {
    raridadeItem = 'comum' ;
    console.log(`Este item ${nomeItem} é comum`);
}

if (precoItem >= 100) {
    raridadeItem = 'raro' ;
    console.log(`Este item ${nomeItem} é raro`);
}

if (precoItem >= 500) {
    raridadeItem = 'lendario' ;
    console.log(`Este item ${nomeItem} é lendario`);
}

if (precoItem >= 10000) {
    raridadeItem = 'épico' ;
    console.log(`Este item ${nomeItem} é épico`);
}




