// etapa 5 arrays

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