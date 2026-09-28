// Função de cadastrar item (NOVO);

function consultarItem(){

    console.log("\nCatálogo de itens: \n")

    let nomes = Object.keys(itens);

    for (let i = 0; i < nomes.length; i++){

        let nome = nomes[i];

        let preco = itens[nome].preco;

        let estoque = itens[nome].estoque;

        let raridade = obterRaridade(preco);

        console.log("Item: " + nome);

        console.log("Preço: " + preco);

        console.log("Estoque: " + estoque);

        if (estoque > 0){
            console.log("Item DISPONIVEL");
        }else {
            console.log("Item INDISPONIVEL")
        }

        console.log("Raridade: " + raridade);

        console.log("-----------------------")
    }

}

//melhorado

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