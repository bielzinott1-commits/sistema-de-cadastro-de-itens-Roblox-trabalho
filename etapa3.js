//etapa 3 cadastrar itens
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


    alert("Cadastro finalizado!");

    console.log("\n===== CADASTRO FINALIZADO =====");

}