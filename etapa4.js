//etapa 4 vender itens 
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
            prompt(
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
            prompt(
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