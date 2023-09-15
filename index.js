const pokemonsContainer = document.querySelector("#caja");

// Función para obtener los datos de un Pokémon
const getPokemonData = async(pokemonName) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (response.ok) {
            const pokemon = await response.json();
            return pokemon;
        } else {
            throw new Error("Pokemon not found");
        }
    } catch (error) {
        throw error;
    }
};

// Función para renderizar la tarjeta de un Pokémon
const renderPokemonCard = (pokemon) => {
    const { id, name, sprites, height, weight, types, base_experience, abilities } = pokemon;
    const image = sprites.front_default;

    const typesHTML = types.map((type) => `<span class="${type.type.name} poke__type">${type.type.name}</span>`).join("");

    // uso del Map para obtener los nombres de las habilidades
    const abilitiesList = abilities.map((ability) => ability.ability.name).join(", ");

    const html = `
        <div class="poke">
            <img src="${image}" alt="${name}">
            <h2 class="h2">${name.toUpperCase()}</h2>
            <span class="exp">EXP: ${base_experience}</span>
            <div class="tipo-poke">${typesHTML}</div>
            <p class="id-poke">#${id}</p>
            <p class="abilities">Abilities: ${abilitiesList}</p>
            <p class="height">Height: ${height / 10} Metros</p>
            <p class="weight">Weight: ${weight / 10} Kg</p>
        </div>
    `;

    const pokemonCard = document.getElementById("pokemonCard");
    pokemonCard.innerHTML = html;
    pokemonCard.classList.remove("hidden");
};

// Función para manejar la búsqueda de Pokémon
const getPokemonDataAndRender = async() => {
    const pokemonInput = document.getElementById("pokemonInput").value.toLowerCase();
    const errorMessage = document.getElementById("errorMessage");

    try {
        // Validar si el input es un número mayor a 1010 o negativo o no es un número
        const isInvalidInput = isNaN(pokemonInput) || +pokemonInput > 1010 || +pokemonInput < 1;
        const pokemonCard = document.getElementById("pokemonCard");

        if (isInvalidInput) {
            throw new Error("El número de Pokémon es inválido.<br/>Por favor, ingresar un número del 1 al 1.010.");
        }

        const pokemon = await getPokemonData(pokemonInput);
        renderPokemonCard(pokemon);
        errorMessage.innerHTML = ""; // Limpiar el mensaje de error
        errorMessage.classList.add("hidden");
    } catch (error) {
        errorMessage.innerHTML = error.message;
        errorMessage.classList.remove("hidden");

        // Ocultar la tarjeta del Pokémon anterior si estaba visible
        const pokemonCard = document.getElementById("pokemonCard");
        pokemonCard.innerHTML = "";
        pokemonCard.classList.add("hidden");
    }
};
// Función inicializadora
function init() {
    window.addEventListener("DOMContentLoaded", () => {
        const searchButton = document.querySelector("button");
        searchButton.addEventListener("click", getPokemonDataAndRender);
    });
}

init();