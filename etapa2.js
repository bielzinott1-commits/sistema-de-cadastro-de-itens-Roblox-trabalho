const prompt = require('prompt-sync')();

let itens = {

    "katana de grogor": {
        preco: 500,
        estoque: 37
    },

    "machado sagrado": {
        preco: 750,
        estoque: 20
    },

    "reliquia sombria": {
        preco: 50,
        estoque: 100
    },

    "lança de zeus": {
        preco: 150,
        estoque: 45
    },

    "arquiles sagrada": {
        preco: 10000,
        estoque: 7
    },

    "luke skarwars": {
        preco: 100000,
        estoque: 12
    },

    "espada de kratos": {
        preco: 1000000,
        estoque: 1
    },

    "proibida": {
        preco: 1000000,
        estoque: 4
    }

};


function obterRaridade(preco) {

    if (preco <= 100) {
        return "Comum";

    } else if (preco <= 500) {
        return "Incomum";

    } else if (preco <= 1000) {
        return "Raro";

    } else if (preco <= 10000) {
        return "Épico";

    }else{
        return "Nivel Deus"
    }

}


let nomeItem = prompt("Digite o nome do item: ");

nomeItem = nomeItem.toLowerCase().trim();


if (nomeItem in itens) {

    let item = itens[nomeItem];

    let raridade = obterRaridade(item.preco);

    console.log(`
=== CONFIGURAÇÃO DO ITEM ===

Nome: ${nomeItem}
Preço: R$ ${item.preco.toFixed(2)}
Estoque: ${item.estoque} unidade(s)
Raridade: ${raridade}
`);

} else {

    console.log("Item não encontrado!");

}