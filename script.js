let url = "https://pokeapi.co/api/v2/pokemon/bulbasaur";
let currentPokemon;

async function init() {
  await loadPokemon();
  renderPokemonInfoHeaderDetailView();
  renderMainPokemonImage();
  renderInfoAreaDetailsAbout();
  loadBgColor();
}

async function loadPokemon() {
  let response = await fetch(url);
  currentPokemon = await response.json();
}

function changePokemon() {
  pokemon = pokemonSearch.value.toLowerCase();
  url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  init();

  pokemonSearch.value = "";
}

function renderPokemonInfoHeaderDetailView() {
  let pokemonName = currentPokemon["name"];
  let pokemonTypes = currentPokemon["types"];

  document.getElementById("pokemonName").innerHTML =
    pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

  document.getElementById("pokemonTypes").innerHTML = "";

  for (let i = 0; i < pokemonTypes.length; i++) {
    const type = pokemonTypes[i]["type"]["name"];

    document.getElementById("pokemonTypes").innerHTML += `
            <span class="pokemonType">${
              type.charAt(0).toUpperCase() + type.slice(1)
            }</span>
        `;
  }
}

function loadBgColor() {
  if (
    document.getElementById("pokemonTypes").innerHTML.indexOf("Grass") !== -1
  ) {
    document.getElementById("pokemonDetailView").style =
      "background-color: #65c9a8;";
  }

  if (
    document.getElementById("pokemonTypes").innerHTML.indexOf("Fire") !== -1
  ) {
    document.getElementById("pokemonDetailView").style =
      "background-color: #c96565;";
  }

  if (
    document.getElementById("pokemonTypes").innerHTML.indexOf("Water") !== -1
  ) {
    document.getElementById("pokemonDetailView").style =
      "background-color: #658dc9;";
  }

  if (
    document.getElementById("pokemonTypes").innerHTML.indexOf("Electric") !== -1
  ) {
    document.getElementById("pokemonDetailView").style =
      "background-color: #c9c265;";
  }
}

function renderMainPokemonImage() {
  let pokemonImage = currentPokemon["sprites"]["front_default"];

  document.getElementById("mainPokemonImage").src = pokemonImage;
}

function renderInfoAreaDetailsAbout() {
  let infoAreaDetails = document.getElementById("infoAreaDetails");

  infoAreaDetails.innerHTML = "";

  infoAreaDetails.innerHTML = infoAreaDetailsAboutHTMLTemplate();

  document.getElementById("about").classList.add("active");
  document.getElementById("abilities").classList.remove("active");
  document.getElementById("stats").classList.remove("active");
}

function infoAreaDetailsAboutHTMLTemplate() {
    return `
    <div class="detailContainer">
        <span class="detailName">Base Experience</span>
        <span class="detailValue">${currentPokemon["base_experience"]} XP</span>
    </div>
    <div class="detailContainer">
        <span class="detailName">Height</span>
        <span class="detailValue">${currentPokemon["height"]}0 cm</span>
    </div>
    <div class="detailContainer">
        <span class="detailName">Weight</span>
        <span class="detailValue">${currentPokemon["weight"]}00 g</span>
    </div>
`;
}

function renderInfoAreaDetailsStats() {
  let infoAreaDetails = document.getElementById("infoAreaDetails");
  let pokemonStats = currentPokemon["stats"];

  infoAreaDetails.innerHTML = "";

  for (let i = 0; i < pokemonStats.length; i++) {
    const element = pokemonStats[i];

    infoAreaDetails.innerHTML += infoAreaDetailsStatHTMLTemplate(element);
  }

  document.getElementById("about").classList.remove("active");
  document.getElementById("abilities").classList.remove("active");
  document.getElementById("stats").classList.add("active");
}

function infoAreaDetailsStatHTMLTemplate(element) {
    return `
    <div class="detailContainer">
        <span class="detailName">${element["stat"]["name"]}</span>
        <span class="detailValue">${element["base_stat"]}</span>
    </div>
`;
}

function renderInfoAreaDetailsAbilities() {
  let infoAreaDetails = document.getElementById("infoAreaDetails");
  let pokemonAbilities = currentPokemon["abilities"];

  infoAreaDetails.innerHTML = "";

  for (let i = 0; i < pokemonAbilities.length; i++) {
    const element = pokemonAbilities[i];

    infoAreaDetails.innerHTML += infoAreaDetailsAbilitiesHTMLTemplate(element);
  }

  document.getElementById("about").classList.remove("active");
  document.getElementById("abilities").classList.add("active");
  document.getElementById("stats").classList.remove("active");
}

function infoAreaDetailsAbilitiesHTMLTemplate(element) {
    return `
    <div class="detailContainer">
        <span class="detailName">${element["ability"]["name"]}</span>
    </div>
`;
}

function likePokemon() {
  if (
    document.getElementById('likeIcon').src.indexOf('/img/icons/heart-regular-white.svg') !== -1
  ) {
    document.getElementById("likeIcon").src = "./img/icons/heart-solid-filled.svg";
  } else {
    document.getElementById("likeIcon").src = "./img/icons/heart-regular-white.svg";
  }
}
