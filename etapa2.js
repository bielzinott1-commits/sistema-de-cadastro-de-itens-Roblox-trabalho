// etapa 2 operadores e condicionais 

let nomeItem = prompt('Digite o nome do item:').toLowerCase();

let precoItem = itens[nomeItem];

if (precoItem < 100) {
    raridadeItem = 'comum' ;
    console.log(`Este item ${nomeItem} é comum`);
}

else if (precoItem >= 100) {
    const descricaoItem =
    `==SOBRE O ITEM==
    Nome: ${nomeItem}
    Preço: ${precoItem}
    Raridade: ${raridadeItem}
    Estoque: ${quantidadeEstoque}`;

    console.log(descricaoItem);
}

else if (precoItem >= 500) {
    const descricaoItem =
    `==SOBRE O ITEM==
    Nome: ${nomeItem}
    Preço: ${precoItem}
    Raridade: ${raridadeItem}
    Estoque: ${quantidadeEstoque}`;
    
    console.log(descricaoItem);
}

else {
    raridadeItem = 'épico' ;
    console.log(`Este item ${nomeItem} é épico`);
}