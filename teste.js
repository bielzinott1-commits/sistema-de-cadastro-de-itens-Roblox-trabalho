// Lista de itens com preços e estoques individuais
const itens = {
    "espada de gelo": {
        preco: 500,
        estoque: 37
    },

    "espada de fogo": {
        preco: 750,
        estoque: 20
    },

    "arco de madeira": {
        preco: 50,
        estoque: 100
    },

    "machado de ferro": {
        preco: 150,
        estoque: 45
    },

    "cajado mágico": {
        preco: 1000,
        estoque: 10
    }
};

// Etapa 1: Escolha do item
let nomeItem = prompt("Digite o nome do item:").toLowerCase().trim();

// Verifica se o item existe
if (!(nomeItem in itens)) {

    console.log("Erro: item não encontrado!");

} else {

    // Obtém o preço e o estoque do item
    let precoItem = itens[nomeItem].preco;
    let quantidadeEstoque = itens[nomeItem].estoque;

    // Verifica se o preço é válido
    if (precoItem <= 0) {

        console.log("Erro: o preço do item não pode ser 0 ou menor!");

    } else {

        // Define a raridade do item
        let raridadeItem;

        if (precoItem < 100) {
            raridadeItem = "Comum";

        } else if (precoItem < 500) {
            raridadeItem = "Incomum";

        } else if (precoItem < 1000) {
            raridadeItem = "Raro";

        } else {
            raridadeItem = "Épico";
        }

        // Monta a descrição do item
        const descricaoItem =
`== SOBRE O ITEM ==

Nome: ${nomeItem}
Preço: R$ ${precoItem}
Raridade: ${raridadeItem}
Estoque: ${quantidadeEstoque} unidades`;

        // Exibe a descrição no console
        console.log(descricaoItem);
    }
}