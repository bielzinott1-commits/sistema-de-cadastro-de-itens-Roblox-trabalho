// Lista de itens e seus preços
let itens = {
    "espada de gelo": 500,
    "espada de fogo": 750, 
    "arco de madeira": 50, 
    "machado de ferro": 150, 
    "cajado mágico": 1000
};

// Etapa 1: Escolha do item
let nomeItem = prompt("Digite o nome do item:").toLowerCase();

// Verifica se o item existe
if (!(nomeItem in itens)) {
    console.log("Erro: item não encontrado!");
} else {

    // Obtém o preço do item
    let precoItem = itens[nomeItem];

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