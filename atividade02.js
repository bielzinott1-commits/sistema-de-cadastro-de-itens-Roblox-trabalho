const prompt = require("prompt-sync")();

let catalogo = [
    "Espada das Sombras",
    "Asas Douradas",
    "Capacete Neon",
    "Pet Dragão",
    "Skin Cyberpunk"
];

let precos = [500, 750, 300, 1000, 1200];

let estoques = [10, 8, 15, 5, 7];

// MENU PRINCIPAL

let opcao = "";

while (opcao != "0") {

    console.log("\n==============================");
    console.log("      CATÁLOGO ROBLOX");
    console.log("==============================");
    console.log("1 - Ver catálogo");
    console.log("2 - Cadastrar item");
    console.log("3 - Comprar item");
    console.log("4 - Ver estoque");
    console.log("0 - Sair");
    console.log("==============================");

    opcao = prompt("Escolha uma opção: ");

    // OPÇÃO 1 - VER CATÁLOGO

    if (opcao == "1") {

        console.log("\n===== CATÁLOGO =====");

        for (const item of catalogo) {
            console.log(`Item: ${item} `);
        }
    }

    // OPÇÃO 2 - CADASTRAR ITEM

    else if (opcao == "2") {

        console.log("\n===== CADASTRO DE ITENS =====");

        for (let i = 1; i <= 1; i++) {

            let novoItem = prompt("Nome do item: ");
            let novoPreco = Number(prompt("Preço do item: "));
            let novoEstoque = Number(prompt("Quantidade em estoque: "));

            catalogo.push(novoItem);
            precos.push(novoPreco);
            estoques.push(novoEstoque);

            console.log(`Item ${novoItem} cadastrado com sucesso!`);

            // Operador módulo %
            if (catalogo.length % 2 === 0) {
                console.log("Item em promoção da semana!");
            }
        }
    }

    // OPÇÃO 3 - COMPRAR ITEM

    else if (opcao == "3") {

        console.log("\n===== COMPRAR ITEM =====");

        let nomeItem = prompt("Digite o nome do item: ");

        let encontrado = false;

        for (let i = 0; i < catalogo.length; i++) {

            if (catalogo[i] == nomeItem) {

                encontrado = true;

                console.log("\nItem encontrado!");
                console.log("Nome: " + catalogo[i]);
                console.log("Preço: R$ " + precos[i]);
                console.log("Estoque: " + estoques[i]);

                // ETAPA 2
                // Verifica se existe estoque

                if (estoques[i] > 0 && precos[i] > 0) {

                    let comprar = prompt("Deseja comprar? (s/n): ");

                    if (comprar == "s") {

                        estoques[i]--;

                        console.log("Compra realizada!");
                        console.log("Estoque restante: " + estoques[i]);

                    } else {
                        console.log("Compra cancelada.");
                    }

                } else {
                    console.log("Item indisponível.");
                }
            }
        }

        if (encontrado == false) {
            console.log("Item não encontrado.");
        }
    }

    // OPÇÃO 4 - VER ESTOQUE

    else if (opcao == "4") {

        console.log("\n===== CONTROLE DE ESTOQUE =====");

        let escolha = Number(
            prompt("Digite o número do item para simular vendas: ")
        );

        let indice = escolha - 1;

        if (indice >= 0 && indice < catalogo.length) {

            let quantidadeEstoque = estoques[indice];

            console.log("Item: " + catalogo[indice]);

            while (quantidadeEstoque > 0) {

                quantidadeEstoque--;

                console.log(
                    "Venda realizada. Estoque restante: "
                    + quantidadeEstoque
                );
            }

            console.log("Item esgotado!");

        } else {

            console.log("Item inválido.");
        }
    }

    // SAIR

    else if (opcao == "0") {

        console.log("Saindo do catálogo...");

    } else {

        console.log("Opção inválida!");
    }
}