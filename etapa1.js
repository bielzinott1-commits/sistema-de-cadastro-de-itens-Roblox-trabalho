let nomeItem = "Espada de Gelo";
let precoItem = 250;
let raridadeItem;
let quantidadeEstoque = 12;
    
if (precoItem <= 100) {
    raridadeItem = "comum",
    console.log ("este item é comum");

    } else if (precoItem <= 500) {
        raridadeItem = "incomum";
        console.log ("este item é incomum");

    } else if (precoItem <= 1000) {
        raridadeItem = "raro";
        console.log ("este item é raro");

    } else if (precoItem <= 100000) {
        raridadeItem = "épico";
        console.log ("este item é épico");

    } else {
        raridadeItem = "Nivel Deus";
        console.log ("este item é nivel Deus");
}

console.log(`
    === FICHA DO ITEM ===
    Nome: ${nomeItem}
    Preço: ${precoItem}
    Raridade: ${raridadeItem}
    Estoque: ${quantidadeEstoque}
    unidades
    `);