async function init() {
    await loadPokemon();
    renderPokemonInfoHeaderDetailView();
    renderMainPokemonImage();
}

let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log(currentPokemon);
}

function renderPokemonInfoHeaderDetailView() {
    let pokemonName = currentPokemon['name'];
    let pokemonTypes = currentPokemon['types'];

    document.getElementById('pokemonName').innerHTML = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    for (let i = 0; i < pokemonTypes.length; i++) {
        const type = pokemonTypes[i]['type']['name'];
        
        document.getElementById('pokemonTypes').innerHTML += `
            <span class="pokemonType">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
        `;
    }
    
}

function renderMainPokemonImage() {
    let pokemonImage = currentPokemon['sprites']['front_default'];

    document.getElementById('mainPokemonImage').innerHTML = `<img src="${pokemonImage}">`;
}

