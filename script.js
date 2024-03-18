async function init() {
    await loadPokemon();
    renderPokemonInfoHeaderDetailView();
    renderMainPokemonImage();
    renderInfoAreaDetailsAbout();
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

    document.getElementById('mainPokemonImage').src = pokemonImage;
}

function renderInfoAreaDetailsAbout() {
    let infoAreaDetails = document.getElementById('infoAreaDetails');

    infoAreaDetails.innerHTML = `
        <div class="detailContainer">
            <span class="detailName">Base Experience</span>
            <span class="detailValue">${currentPokemon['base_experience']}</span>
        </div>
        <div class="detailContainer">
            <span class="detailName">Height</span>
            <span class="detailValue">${currentPokemon['height']}</span>
        </div>
        <div class="detailContainer">
            <span class="detailName">Weight</span>
            <span class="detailValue">${currentPokemon['weight']}</span>
        </div>
    `;

    document.getElementById('about').classList.add('active');
    document.getElementById('abilities').classList.remove('active');
    document.getElementById('stats').classList.remove('active');
}

function renderInfoAreaDetailsStats() {
    let infoAreaDetails = document.getElementById('infoAreaDetails');
    let pokemonStats = currentPokemon['stats'];

    infoAreaDetails.innerHTML = '';

    for (let i = 0; i < pokemonStats.length; i++) {
        const element = pokemonStats[i];
        
        infoAreaDetails.innerHTML += `
            <div class="detailContainer">
                <span class="detailName">${element['stat']['name']}</span>
                <span class="detailValue">${element['base_stat']}</span>
            </div>
        `;
    }

    document.getElementById('about').classList.remove('active');
    document.getElementById('abilities').classList.remove('active');
    document.getElementById('stats').classList.add('active');
}

function renderInfoAreaDetailsAbilities() {
    let infoAreaDetails = document.getElementById('infoAreaDetails');
    let pokemonAbilities = currentPokemon['abilities'];

    infoAreaDetails.innerHTML = '';

    for (let i = 0; i < pokemonAbilities.length; i++) {
        const element = pokemonAbilities[i];
        
        infoAreaDetails.innerHTML += `
            <div class="detailContainer">
                <span class="detailName">${element['ability']['name']}</span>
            </div>
        `;
    }

    document.getElementById('about').classList.remove('active');
    document.getElementById('abilities').classList.add('active');
    document.getElementById('stats').classList.remove('active');
}