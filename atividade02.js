const prompt = require("prompt-sync")();

let catalogo = {

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


// FUNÇÃO PARA DESCOBRIR A RARIDADE

function obterRaridade(preco) {

    if (preco <= 100) {
        return "Comum";

    } else if (preco <= 500) {
        return "Incomum";

    } else if (preco <= 1000) {
        return "Raro";

    } else if (preco <= 100000) {
        return "Épico";

    } else {
        return "Nível Deus";
    }
}


// MENU PRINCIPAL

let opcao = "";

while (opcao != "0") {

    console.log("\n==============================");
    console.log("       CATÁLOGO ROBLOX");
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

        for (const [nome, item] of Object.entries(catalogo)) {

            console.log("------------------------------");
            console.log("Item: " + nome);
            console.log("Preço: R$ " + item.preco);
            console.log("Estoque: " + item.estoque);
            console.log("Raridade: " + obterRaridade(item.preco));
        }

    }

    // OPÇÃO 2 - CADASTRAR ITEM

    else if (opcao == "2") {

        console.log("\n===== CADASTRO DE ITEM =====");

        let novoItem = prompt("Nome do item: ").toLowerCase();
        let novoPreco = Number(prompt("Preço do item: "));
        let novoEstoque = Number(prompt("Quantidade em estoque: "));

        catalogo[novoItem] = {
            preco: novoPreco,
            estoque: novoEstoque
        };

        console.log("Item " + novoItem + " cadastrado com sucesso!");

        // Operador %

        if (Object.keys(catalogo).length % 2 === 0) {
            console.log("Item em promoção da semana!");
        }

    }

    // OPÇÃO 3 - COMPRAR ITEM

    else if (opcao == "3") {

        console.log("\n===== COMPRAR ITEM =====");

        let nomeItem = prompt("Digite o nome do item: ").toLowerCase();

        if (catalogo[nomeItem]) {

            let item = catalogo[nomeItem];

            console.log("\nItem encontrado!");
            console.log("Nome: " + nomeItem);
            console.log("Preço: R$ " + item.preco);
            console.log("Estoque: " + item.estoque);
            console.log("Raridade: " + obterRaridade(item.preco));


            if (item.estoque > 0 && item.preco > 0) {

                let comprar = prompt("Deseja comprar? (s/n): ");

                if (comprar == "s") {

                    item.estoque--;

                    console.log("Compra realizada!");
                    console.log("Estoque restante: " + item.estoque);

                } else {

                    console.log("Compra cancelada.");

                }

            } else {

                console.log("Item indisponível.");

            }

        } else {

            console.log("Item não encontrado.");

        }

    }

    // OPÇÃO 4 - VER ESTOQUE

    else if (opcao == "4") {

        console.log("\n===== CONTROLE DE ESTOQUE =====");

        let nomeItem = prompt("Digite o nome do item: ").toLowerCase();

        if (catalogo[nomeItem]) {

            let quantidadeEstoque = catalogo[nomeItem].estoque;

            console.log("Item: " + nomeItem);

            while (quantidadeEstoque > 0) {

                quantidadeEstoque--;

                console.log(
                    "Venda realizada. Estoque restante: "
                    + quantidadeEstoque
                );
            }

            console.log("Item esgotado!");

        } else {

            console.log("Item não encontrado.");

        }

    }


    // ==================================
    // SAIR
    // ==================================

    else if (opcao == "0") {

        console.log("Saindo do catálogo...");

    }


    else {

        console.log("Opção inválida!");

    }
}