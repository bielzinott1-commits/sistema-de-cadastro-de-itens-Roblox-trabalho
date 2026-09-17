// etapa 2

let nomeItem = prompt('Digite o nome do item:').toLowerCase();

let precoItem = itens[nomeItem];

if (precoItem < 100) {
    raridadeItem = 'comum' ;
    console.log(`Este item ${nomeItem} é comum`);
}

else if (precoItem >= 100) {
    raridadeItem = 'raro' ;
    console.log(`Este item ${nomeItem} é raro`);
}

else if (precoItem >= 500) {
    raridadeItem = 'lendario' ;
    console.log(`Este item ${nomeItem} é lendario`);
}

else {
    raridadeItem = 'épico' ;
    console.log(`Este item ${nomeItem} é épico`);
}