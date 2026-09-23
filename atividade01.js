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

// FUNÇÃO PARA OBTER A RARIDADE

function obterRaridade(preco) {

    if (preco <= 100) {
        return "Comum";

    } else if (preco <= 500) {
        return "Incomum";

    } else if (preco <= 1000) {
        return "Raro";

    } else {
        return "Épico";
    }

}

// FUNÇÃO PARA CADASTRAR ITENS

function cadastrarItens() {

    let quantidade;

    do {

        quantidade = Number(
            prompt("Quantos itens você deseja cadastrar? (1 a 5)\n")
        );

        if (
            !Number.isInteger(quantidade) ||
            quantidade < 1 ||
            quantidade > 5
        ) {

            alert("Erro! Digite uma quantidade entre 1 e 5.\n");

        }

    } while (
        !Number.isInteger(quantidade) ||
        quantidade < 1 ||
        quantidade > 5
    );


    for (let i = 1; i <= quantidade; i++) {

        console.log(`\n===== CADASTRO ${i} DE ${quantidade} =====`);

        let nomeItem;

        do {

            nomeItem = prompt(`Digite o nome do item ${i}:\n`);

            if (nomeItem === null) {

                console.log("Cadastro cancelado.");

                return;

            }

            nomeItem = nomeItem.toLowerCase().trim();

            if (nomeItem === "") {

                alert("O nome não pode ficar vazio.");

            }

        } while (nomeItem === "");


        if (nomeItem in itens) {

            alert("Esse item já está cadastrado!");

            console.log(`O item "${nomeItem}" já existe no sistema.`);

            i--;

            continue;

        }


        let preco;

        do {

            preco = Number(
                prompt(`Digite o preço do item "${nomeItem}":\n`)
            );

            if (isNaN(preco) || preco <= 0) {

                alert("Erro! O preço deve ser maior que zero.");

            }

        } while (isNaN(preco) || preco <= 0);


        let estoque;

        do {

            estoque = Number(
                prompt(`Digite o estoque do item "${nomeItem}":\n`)
            );

            if (
                !Number.isInteger(estoque) ||
                estoque < 0
            ) {

                alert(
                    "Erro! O estoque deve ser um número inteiro igual ou maior que zero."
                );

            }

        } while (
            !Number.isInteger(estoque) ||
            estoque < 0
        );


        itens[nomeItem] = {

            preco: preco,
            estoque: estoque

        };


        console.log(`Item "${nomeItem}" cadastrado com sucesso!`);

    }


    console.log("Cadastro finalizado!");

}

// FUNÇÃO PARA CONSULTAR ITEM


    function consultarItem() {

        let catalogo = Object.entries(itens);

        let lista = "===== CATÁLOGO DE ITENS =====\n\n";

        for (const [indice, [nome, dados]] of catalogo.entries()) {

            const disponibilidade =
                dados.estoque > 0
                    ? "DISPONÍVEL"
                    : "INDISPONÍVEL";

            const raridade = obterRaridade(dados.preco);

            lista +=
    `${indice + 1}. ${nome}

    Disponibilidade: ${disponibilidade}
    Preço: R$ ${dados.preco.toFixed(2)}
    Estoque: ${dados.estoque} unidade(s)
    Raridade: ${raridade}

    --------------------------------

    `;
        }

        console.log(lista);
        alert(lista);
    }

// FUNÇÃO PARA COMPRAR ITENS

function comprarItem() {

    let nomeItem = prompt(
        "Digite o nome do item que deseja comprar:\n"
    );

    if (nomeItem === null) {

        return;

    }

    nomeItem = nomeItem.toLowerCase().trim();


    // Verifica se o item existe

    if (!(nomeItem in itens)) {

        alert("Erro! Esse item não existe no sistema.");

        console.log("Item não encontrado.");

        return;

    }


    // Verifica se existe estoque

    if (itens[nomeItem].estoque <= 0) {

        alert("Esse item está fora de estoque!");

        return;

    }


    // Solicita a quantidade

    let quantidade;

    do {

        quantidade = Number(
            console.log(
                `Quantas unidades de "${nomeItem}" você deseja comprar?\n\n` +
                `Estoque disponível: ${itens[nomeItem].estoque}`
            )
        );


        if (
            !Number.isInteger(quantidade) ||
            quantidade <= 0
        ) {

            alert(
                "Erro! Digite uma quantidade inteira maior que zero."
            );

        }

    } while (
        !Number.isInteger(quantidade) ||
        quantidade <= 0
    );


    // Verifica se há estoque suficiente

    if (quantidade > itens[nomeItem].estoque) {

        alert(
            `Estoque insuficiente!\n\n` +
            `Estoque disponível: ${itens[nomeItem].estoque} unidades.`
        );

        return;

    }


    // Calcula o valor total

    const precoUnitario = itens[nomeItem].preco;

    const valorTotal = precoUnitario * quantidade;


    // Solicita o saldo da pessoa

    let saldo;

    do {

        saldo = Number(
            console.log(
                `Valor total da compra: R$ ${valorTotal.toFixed(2)}\n\n` +
                "Digite o seu saldo disponível:\n"
            )
        );


        if (isNaN(saldo) || saldo < 0) {

            alert(
                "Erro! O saldo deve ser um número igual ou maior que zero."
            );

        }

    } while (isNaN(saldo) || saldo < 0);


    // Verifica se o saldo é suficiente

    if (saldo < valorTotal) {

        alert(
            `Compra recusada!\n\n` +
            `Valor da compra: R$ ${valorTotal.toFixed(2)}\n` +
            `Seu saldo: R$ ${saldo.toFixed(2)}\n\n` +
            `Saldo insuficiente.`
        );

        console.log("Compra recusada por falta de saldo.");

        return;

    }


    // Diminui o estoque

    itens[nomeItem].estoque -= quantidade;


    // Calcula o troco

    const saldoRestante = saldo - valorTotal;


    // Exibe o resultado

    const comprovante =

`== COMPRA REALIZADA ==

Item: ${nomeItem}

Quantidade: ${quantidade} unidade(s)

Preço unitário: R$ ${precoUnitario.toFixed(2)}

Valor total: R$ ${valorTotal.toFixed(2)}

Saldo inicial: R$ ${saldo.toFixed(2)}

Saldo restante: R$ ${saldoRestante.toFixed(2)}

Estoque restante: ${itens[nomeItem].estoque} unidade(s)`;


    alert(comprovante);

    console.log(comprovante);

}

// MENU PRINCIPAL

const ACOES = {
    "1": cadastrarItens,
    "2": consultarItem,
    "3": comprarItem
};

function menuPrincipal() {
    let continuar = true;

    while (continuar) {
        const escolha = readline.question(
            "\n===== MENU PRINCIPAL =====\n\n" +
            "1 - Cadastrar itens\n" +
            "2 - Consultar item\n" +
            "3 - Comprar item\n" +
            "4 - Finalizar atividade\n"
        ).trim();

        if (escolha === "4") {
            console.log("Atividade finalizada!");
            break;
        }

        let acao = ACOES[escolha];

        if (!acao) {
            console.log("Opção inválida! Digite 1, 2, 3 ou 4.");
            continue;
        }

        acao();

        continuar = perguntarSimNao("\nDeseja realizar outra operação?\nDigite S para continuar ou N para finalizar.\n");

        if (!continuar) console.log("Atividade finalizada!");
    }
}

menuPrincipal();