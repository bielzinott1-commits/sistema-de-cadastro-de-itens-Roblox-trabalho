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
    } else {
        return "Épico";
    }
}

function perguntarSimNao(mensagem) {
    let resposta = prompt(mensagem);
    if (!resposta) return false;
    resposta = resposta.toLowerCase().trim();
    return resposta === 's' || resposta === 'sim';
}

function cadastrarItens() {
    let quantidade;

    do {
        quantidade = Number(
            prompt("Quantos itens você deseja cadastrar? (1 a 5): ")
        );

        if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 5) {
            console.log("Erro! Digite uma quantidade entre 1 e 5.");
        }
    } while (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 5);

    for (let i = 1; i <= quantidade; i++) {
        console.log(`\n===== CADASTRO ${i} DE ${quantidade} =====`);

        let nomeItem;

        do {
            nomeItem = prompt(`Digite o nome do item ${i}: `);

            if (nomeItem === null) {
                console.log("Cadastro cancelado.");
                return;
            }

            nomeItem = nomeItem.toLowerCase().trim();

            if (nomeItem === "") {
                console.log("O nome não pode ficar vazio.");
            }
        } while (nomeItem === "");

        if (nomeItem in itens) {
            console.log(`O item "${nomeItem}" já existe no sistema.`);
            i--;
            continue;
        }

        let preco;

        do {
            preco = Number(
                prompt(`Digite o preço do item "${nomeItem}": `)
            );

            if (isNaN(preco) || preco <= 0) {
                console.log("Erro! O preço deve ser maior que zero.");
            }
        } while (isNaN(preco) || preco <= 0);

        let estoque;

        do {
            estoque = Number(
                prompt(`Digite o estoque do item "${nomeItem}": `)
            );

            if (!Number.isInteger(estoque) || estoque < 0) {
                console.log("Erro! O estoque deve ser um número inteiro igual ou maior que zero.");
            }
        } while (!Number.isInteger(estoque) || estoque < 0);

        itens[nomeItem] = {
            preco: preco,
            estoque: estoque
        };

        console.log(`Item "${nomeItem}" cadastrado com sucesso!`);
    }

    console.log("Cadastro finalizado!");
}

function consultarItem() {
    console.log("\nCatálogo de itens:\n");

    let nomes = Object.keys(itens);

    for (let i = 0; i < nomes.length; i++) {
        let nome = nomes[i];
        let preco = itens[nome].preco;
        let estoque = itens[nome].estoque;
        let raridade = obterRaridade(preco);

        console.log("Item: " + nome);
        console.log("Preço: R$ " + preco);
        console.log("Estoque: " + estoque);

        if (estoque > 0) {
            console.log("Status: DISPONIVEL");
        } else {
            console.log("Status: INDISPONIVEL");
        }

        console.log("Raridade: " + raridade);
        console.log("-----------------------");
    }
}

function comprarItem() {
    let nomeItem = prompt("Digite o nome do item que deseja comprar: ");

    if (nomeItem === null) return;

    nomeItem = nomeItem.toLowerCase().trim();

    if (!(nomeItem in itens)) {
        console.log("Erro! Esse item não existe no sistema.");
        return;
    }

    if (itens[nomeItem].estoque <= 0) {
        console.log("Esse item está fora de estoque!");
        return;
    }

    let quantidade;

    do {
        console.log(`Estoque disponível de "${nomeItem}": ${itens[nomeItem].estoque}`);
        quantidade = Number(prompt("Quantas unidades deseja comprar? "));

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            console.log("Erro! Digite uma quantidade inteira maior que zero.");
        }
    } while (!Number.isInteger(quantidade) || quantidade <= 0);

    if (quantidade > itens[nomeItem].estoque) {
        console.log(`Estoque insuficiente! Apenas ${itens[nomeItem].estoque} unidade(s) disponível(is).`);
        return;
    }

    const precoUnitario = itens[nomeItem].preco;
    const valorTotal = precoUnitario * quantidade;

    let saldo;

    do {
        console.log(`Valor total da compra: R$ ${valorTotal.toFixed(2)}`);
        saldo = Number(prompt("Digite o seu saldo disponível: "));

        if (isNaN(saldo) || saldo < 0) {
            console.log("Erro! O saldo deve ser um número maior ou igual a zero.");
        }
    } while (isNaN(saldo) || saldo < 0);

    if (saldo < valorTotal) {
        console.log(`Compra recusada! Valor: R$ ${valorTotal.toFixed(2)} | Seu saldo: R$ ${saldo.toFixed(2)}`);
        return;
    }

    itens[nomeItem].estoque -= quantidade;
    const saldoRestante = saldo - valorTotal;

    console.log("\n== COMPRA REALIZADA ==");
    console.log(`Item: ${nomeItem}`);
    console.log(`Quantidade: ${quantidade}`);
    console.log(`Preço unitário: R$ ${precoUnitario.toFixed(2)}`);
    console.log(`Valor total: R$ ${valorTotal.toFixed(2)}`);
    console.log(`Saldo inicial: R$ ${saldo.toFixed(2)}`);
    console.log(`Saldo restante: R$ ${saldoRestante.toFixed(2)}`);
    console.log(`Estoque restante: ${itens[nomeItem].estoque}`);
}

const ACOES = {
    "1": cadastrarItens,
    "2": consultarItem,
    "3": comprarItem
};

function menuPrincipal() {
    let continuar = true;

    while (continuar) {
        console.log("\n===== MENU PRINCIPAL =====");
        console.log("1 - Cadastrar itens");
        console.log("2 - Consultar item");
        console.log("3 - Comprar item");
        console.log("4 - Finalizar atividade");

        let escolha = prompt("Opção: ");

        if (escolha === null) {
            console.log("Atividade finalizada!");
            break;
        }

        escolha = escolha.trim();

        if (escolha === "4") {
            console.log("Atividade finalizada!");
            break;
        }

        const acao = ACOES[escolha];

        if (!acao) {
            console.log("Opção inválida! Digite 1, 2, 3 ou 4.");
            continue;
        }

        acao();

        console.log("");
        continuar = perguntarSimNao("Deseja realizar outra operação? (S/N): ");

        if (!continuar) {
            console.log("Atividade finalizada!");
        }
    }
}

menuPrincipal();