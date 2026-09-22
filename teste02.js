const readline = require('readline-sync');

// ===============================
// DADOS INICIAIS
// ===============================

const itens = {
    "katana de grogor": { preco: 500, estoque: 37 },
    "machado sagrado": { preco: 750, estoque: 20 },
    "reliquia sombria": { preco: 50, estoque: 100 },
    "lança de zeus": { preco: 150, estoque: 45 },
    "ggg": { preco: 1000, estoque: 10 }
};

// ===============================
// FUNÇÕES UTILITÁRIAS
// ===============================

function formatarMoeda(valor) {
    return `R$ ${valor.toFixed(2)}`;
}

function obterRaridade(preco) {
    if (preco < 100) return "Comum";
    if (preco < 500) return "Incomum";
    if (preco < 1000) return "Raro";
    return "Épico";
}

// Lê um número inteiro do usuário, repetindo até que seja válido.
// `min` e `max` são opcionais (use null para não limitar).
function lerInteiro(mensagem, min = null, max = null) {
    let valor;

    while (true) {
        valor = Number(readline.question(mensagem));

        const valido =
            Number.isInteger(valor) &&
            (min === null || valor >= min) &&
            (max === null || valor <= max);

        if (valido) return valor;

        console.log(
            `Erro! Digite um número inteiro${min !== null ? ` entre ${min}` : ''}${max !== null ? ` e ${max}` : ''}.`
        );
    }
}

// Lê um número (decimal permitido) maior que um mínimo.
function lerNumero(mensagem, minimo = 0, permitirIgual = true) {
    let valor;

    while (true) {
        valor = Number(readline.question(mensagem));

        const valido = !isNaN(valor) && (permitirIgual ? valor >= minimo : valor > minimo);

        if (valido) return valor;

        console.log(`Erro! Digite um número ${permitirIgual ? '>=' : '>'} ${minimo}.`);
    }
}

// Lê um texto não vazio.
function lerTexto(mensagem) {
    let texto;

    do {
        texto = readline.question(mensagem).toLowerCase().trim();
        if (texto === "") console.log("O nome não pode ficar vazio.");
    } while (texto === "");

    return texto;
}

function perguntarSimNao(mensagem) {
    const resposta = readline.question(mensagem).toLowerCase().trim();
    return resposta === "s";
}

// ===============================
// CADASTRAR ITENS
// ===============================

function cadastrarItens() {
    const quantidade = lerInteiro("Quantos itens você deseja cadastrar? (1 a 5)\n", 1, 5);

    let cadastrados = 0;

    while (cadastrados < quantidade) {
        console.log(`\n===== CADASTRO ${cadastrados + 1} DE ${quantidade} =====`);

        const nomeItem = lerTexto(`Digite o nome do item ${cadastrados + 1}:\n`);

        if (nomeItem in itens) {
            console.log(`O item "${nomeItem}" já existe no sistema. Tente outro nome.`);
            continue;
        }

        const preco = lerNumero(`Digite o preço do item "${nomeItem}":\n`, 0, false);
        const estoque = lerInteiro(`Digite o estoque do item "${nomeItem}":\n`, 0);

        itens[nomeItem] = { preco, estoque };

        console.log(`Item "${nomeItem}" cadastrado com sucesso!`);
        cadastrados++;
    }

    console.log("\n===== CADASTRO FINALIZADO =====");
}

// ===============================
// CONSULTAR ITEM
// ===============================

function consultarItem() {
    const catalogo = Object.entries(itens);
    const linhas = ["===== CATÁLOGO DE ITENS ====="];

    catalogo.forEach(([nome, dados], indice) => {
        const disponibilidade = dados.estoque > 0 ? "DISPONÍVEL" : "INDISPONÍVEL";
        const raridade = obterRaridade(dados.preco);

        linhas.push(
            `\n${indice + 1}. ${nome}`,
            `   Disponibilidade: ${disponibilidade}`,
            `   Preço: ${formatarMoeda(dados.preco)}`,
            `   Estoque: ${dados.estoque} unidade(s)`,
            `   Raridade: ${raridade}`,
            `   --------------------------------`
        );
    });

    console.log(linhas.join("\n"));
}

// ===============================
// COMPRAR ITEM
// ===============================

function comprarItem() {
    const nomeItem = lerTexto("Digite o nome do item que deseja comprar:\n");

    if (!(nomeItem in itens)) {
        console.log("Erro! Esse item não existe no sistema.");
        return;
    }

    const item = itens[nomeItem];

    if (item.estoque <= 0) {
        console.log("Esse item está fora de estoque!");
        return;
    }

    const quantidade = lerInteiro(
        `Quantas unidades de "${nomeItem}" você deseja comprar?\nEstoque disponível: ${item.estoque}\n`,
        1
    );

    if (quantidade > item.estoque) {
        console.log(`Estoque insuficiente! Disponível: ${item.estoque} unidades.`);
        return;
    }

    const valorTotal = item.preco * quantidade;

    const saldo = lerNumero(
        `Valor total da compra: ${formatarMoeda(valorTotal)}\nDigite o seu saldo disponível:\n`,
        0
    );

    if (saldo < valorTotal) {
        console.log(
            `Compra recusada por falta de saldo.\n` +
            `Valor da compra: ${formatarMoeda(valorTotal)}\n` +
            `Seu saldo: ${formatarMoeda(saldo)}`
        );
        return;
    }

    item.estoque -= quantidade;
    const saldoRestante = saldo - valorTotal;

    console.log(
        `\n== COMPRA REALIZADA ==\n` +
        `Item: ${nomeItem}\n` +
        `Quantidade: ${quantidade} unidade(s)\n` +
        `Preço unitário: ${formatarMoeda(item.preco)}\n` +
        `Valor total: ${formatarMoeda(valorTotal)}\n` +
        `Saldo inicial: ${formatarMoeda(saldo)}\n` +
        `Saldo restante: ${formatarMoeda(saldoRestante)}\n` +
        `Estoque restante: ${item.estoque} unidade(s)`
    );
}

// ===============================
// MENU PRINCIPAL
// ===============================

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

        const acao = ACOES[escolha];

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