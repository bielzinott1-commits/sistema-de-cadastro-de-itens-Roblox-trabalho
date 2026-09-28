const prompt = require('prompt-sync')({ sigint: true });

let itens = {
    "katana de grogor": { preco: 500, estoque: 37 },
    "machado sagrado": { preco: 750, estoque: 20 },
    "reliquia sombria": { preco: 50, estoque: 100 },
    "lança de zeus": { preco: 150, estoque: 45 },
    "arquiles sagrada": { preco: 10000, estoque: 7 },
    "luke skarwars": { preco: 100000, estoque: 12 },
    "espada de kratos": { preco: 1000000, estoque: 1 },
    "proibida": { preco: 1000000, estoque: 4 }
};

function obterRaridade(preco) {
    if (preco <= 100) return "Comum";
    if (preco <= 500) return "Incomum";
    if (preco <= 1000) return "Raro";
    return "Épico";
}

// Lê um número repetindo até ser válido. Retorna null se a entrada for cancelada.
function lerNumero(mensagem, ehValido, mensagemErro) {
    while (true) {
        const texto = prompt(mensagem);

        if (texto === null) return null;

        const limpo = texto.trim().replace(",", ".");
        const numero = Number(limpo);

        if (limpo !== "" && ehValido(numero)) return numero;

        console.log(mensagemErro);
    }
}

function perguntarSimNao(mensagem) {
    const resposta = prompt(mensagem);
    if (resposta === null) return false;

    const r = resposta.toLowerCase().trim();
    return r === "s" || r === "sim";
}

// ===== CADASTRAR ITENS =====

function cadastrarItens() {
    const quantidade = lerNumero(
        "Quantos itens você deseja cadastrar? (1 a 5): ",
        n => Number.isInteger(n) && n >= 1 && n <= 5,
        "Erro! Digite uma quantidade entre 1 e 5."
    );

    if (quantidade === null) {
        console.log("Cadastro cancelado.");
        return;
    }

    for (let i = 1; i <= quantidade; i++) {
        console.log(`\n===== CADASTRO ${i} DE ${quantidade} =====`);

        let nomeItem;

        while (true) {
            nomeItem = prompt(`Digite o nome do item ${i}: `);

            if (nomeItem === null) {
                console.log("Cadastro cancelado.");
                return;
            }

            nomeItem = nomeItem.toLowerCase().trim();

            if (nomeItem === "") {
                console.log("O nome não pode ficar vazio.");
                continue;
            }

            if (nomeItem in itens) {
                console.log(`O item "${nomeItem}" já existe no sistema.`);
                continue;
            }

            break;
        }

        const preco = lerNumero(
            `Digite o preço do item "${nomeItem}": `,
            n => n > 0,
            "Erro! O preço deve ser maior que zero."
        );
        if (preco === null) {
            console.log("Cadastro cancelado.");
            return;
        }

        const estoque = lerNumero(
            `Digite o estoque do item "${nomeItem}": `,
            n => Number.isInteger(n) && n >= 0,
            "Erro! O estoque deve ser um número inteiro igual ou maior que zero."
        );
        if (estoque === null) {
            console.log("Cadastro cancelado.");
            return;
        }

        itens[nomeItem] = { preco, estoque };

        console.log(`Item "${nomeItem}" cadastrado com sucesso!`);
    }

    console.log("\nCadastro finalizado!");
}

// ===== CONSULTAR ITENS =====

function consultarItem() {
    console.log("\n===== CATÁLOGO DE ITENS =====\n");

    const catalogo = Object.entries(itens);

    catalogo.forEach(([nome, dados], indice) => {
        const disponibilidade = dados.estoque > 0 ? "DISPONÍVEL" : "INDISPONÍVEL";

        console.log(`${indice + 1}. ${nome}`);
        console.log(`   Disponibilidade: ${disponibilidade}`);
        console.log(`   Preço: R$ ${dados.preco.toFixed(2)}`);
        console.log(`   Estoque: ${dados.estoque} unidade(s)`);
        console.log(`   Raridade: ${obterRaridade(dados.preco)}`);
        console.log("   --------------------------------");
    });
}

// ===== COMPRAR ITEM =====

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

    console.log(`Estoque disponível de "${nomeItem}": ${itens[nomeItem].estoque}`);

    const quantidade = lerNumero(
        "Quantas unidades deseja comprar? ",
        n => Number.isInteger(n) && n > 0,
        "Erro! Digite uma quantidade inteira maior que zero."
    );
    if (quantidade === null) return;

    if (quantidade > itens[nomeItem].estoque) {
        console.log(`Estoque insuficiente! Apenas ${itens[nomeItem].estoque} unidade(s) disponível(is).`);
        return;
    }

    const precoUnitario = itens[nomeItem].preco;
    const valorTotal = precoUnitario * quantidade;

    console.log(`Valor total da compra: R$ ${valorTotal.toFixed(2)}`);

    const saldo = lerNumero(
        "Digite o seu saldo disponível: ",
        n => n >= 0,
        "Erro! O saldo deve ser um número igual ou maior que zero."
    );
    if (saldo === null) return;

    if (saldo < valorTotal) {
        console.log("\nCompra recusada! Saldo insuficiente.");
        console.log(`Valor da compra: R$ ${valorTotal.toFixed(2)}`);
        console.log(`Seu saldo: R$ ${saldo.toFixed(2)}`);
        return;
    }

    itens[nomeItem].estoque -= quantidade;
    const saldoRestante = saldo - valorTotal;

    console.log("\n== COMPRA REALIZADA ==");
    console.log(`Item: ${nomeItem}`);
    console.log(`Quantidade: ${quantidade} unidade(s)`);
    console.log(`Preço unitário: R$ ${precoUnitario.toFixed(2)}`);
    console.log(`Valor total: R$ ${valorTotal.toFixed(2)}`);
    console.log(`Saldo inicial: R$ ${saldo.toFixed(2)}`);
    console.log(`Saldo restante: R$ ${saldoRestante.toFixed(2)}`);
    console.log(`Estoque restante: ${itens[nomeItem].estoque} unidade(s)`);
}

// ===== MENU PRINCIPAL =====

const ACOES = {
    "1": cadastrarItens,
    "2": consultarItem,
    "3": comprarItem
};

function menuPrincipal() {
    while (true) {
        console.log("\n===== MENU PRINCIPAL =====\n");
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
        if (!perguntarSimNao("Deseja realizar outra operação? (S/N): ")) {
            console.log("Atividade finalizada!");
            break;
        }
    }
}

menuPrincipal();