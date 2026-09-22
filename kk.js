const catalogo = ['Espada das Sombras', 'Asas Douradas', 'Capacete Neon', 'Pet Dragão', 'Skin Cyberpunk'];

for (const [indice, item] of catalogo.entries()) {
    console.log(`${indice + 1}. Item disponível: ${item}`);
}