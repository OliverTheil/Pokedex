let allPokemon = [];

/**
 * * fetch of the Kantodex
 */

async function loadPokemon() {
  let pokedexBody = document.getElementById("pokedex");
  document.getElementById("pokedex").classList.add("d-none");

  pokedexBody.innerHTML = "";

  for (let i = 1; i <= 151; i++) {
    let urlForValues = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let responeForValues = await fetch(urlForValues);
    PokemonValues = await responeForValues.json();
    allPokemon.push(PokemonValues);
    pokedexBody.innerHTML += loadSinglePokemon(i);

    standardInfos(i);
    setTypes(i);
  }
  document.getElementById("pokedex").classList.remove("d-none");
  document.getElementById("loadingScreen").classList.add("d-none");
}

/**
 * * The html and css of one pokemon
 */

function loadSinglePokemon(i) {
  return `
        <div onclick="showPokemon(${i})" class="singlePokemon-Container" id="singlePokemon(${i})">
            <figure class="singlePokemon-Figure">
                <img class="singlePokemon-Img" id="pokemonImg(${i})" src="">
                <span class="singlePokemon-Name" style="font-size: 2rem;" id="pokemonName(${i})">test1
                </span>
                <div style="font-size: 1rem;" class="types">
                    <span class="type" id="type1(${i})">

                    </span>
                    <span class="type" id="type2(${i})">

                    </span>
                </div>
                <div class="singlePokemon-Number">
                    <span style="font-size: 1.8rem;">
                        #
                    </span>
                    <span style="font-size: 1.6rem;" id="pokemonNumber">
                        ${i}
                    </span>
                </div>
            </figure>
        </div>
        `;
}

/**
 * * The search bar. If the user enters a letter, includes checks the array of allPokemon and their names.
 * * Includes one name the letter, the pokemon get display flex, else display none.
 */

function searchForPokemon() {
  let search = document.getElementById("searchPokemon").value;
  search = search.toLowerCase();

  for (let i = 0; i < allPokemon.length; i++) {
    let PokeName = allPokemon[i].name;
    if (search.length > 0 && PokeName.includes(search)) {
      document.getElementById(`singlePokemon(${i + 1})`).style =
        "display: flex;";
    } else if (search.length > 0) {
      document.getElementById(`singlePokemon(${i + 1})`).style =
        "display: none;";
    } else if (search.length == 0) {
      document.getElementById(`singlePokemon(${i + 1})`).style =
        "display: flex;";
    }
  }
}

/**
 * * Loads the css and html of the clicked Pokemon, the different values get fetched and loaded into the single Pokemon.
 */

async function showPokemon(i) {
  document.getElementById("clickedPokemon-SectionID").innerHTML = "";

  document.getElementById("clickedPokemon-SectionID").innerHTML = `
            <div id="clickedPokemon-SingleID(${i})" style="display: none;" class="clickedPokemon"">
                <img id="pokemonImg-Clicked(${i})" src="" class="singlePokemon-Img-Clicked">
                <span class="backbutton" onclick="closeClickedPokemon()"><i class="fa-solid fa-backward fa-xl"></i></span>
                <span id="pokemonName-Clicked(${i})" class="singlePokemon-Name-Clicked">test</span>
                    <div style="font-size: 1.2rem;" class="types-Clicked">
                        <span class="type" id="type1-Clicked(${i})"></span>
                        <span class="type" id="type2-Clicked(${i})"></span>
                    </div>
                    <div class="singlePokemon-Number-Clicked">
                        <span style="font-size: 1.6rem;">
                            #
                        </span>
                        <span style="font-size: 1.4rem;">
                            ${i}
                        </span>
                    </div>
                    <div class="info-Container">
                        <div class="info-buttons">
                            <button onclick="showStats(${i})" class="info-button">Stats</button>
                            <button onclick="showOthers(${i})" class="info-button">Others</button>
                        </div>
                        <div id="stats(${i})" class="stats" style="display: none;">
                            <div class="stat-box">
                                <span>HP:</span>
                                <span id="hp(${i})"></span>
                            </div>
                            <div class="stat-box">
                                <span>ATK:</span>
                                <span id="attack(${i})"></span>
                            </div>
                            <div class="stat-box">
                                <span>DEF:</span>
                                <span id="defense(${i})"></span>
                            </div>
                            <div class="stat-box">
                                <span>SP-ATK:</span>
                                <span id="sp-atk(${i})"></span>
                            </div>
                            <div class="stat-box">
                                <span>SP-DEF:</span>
                                <span id="sp-def(${i})"></span>
                            </div>
                            <div class="stat-box">
                                <span>INIT:</span>
                                <span id="speed(${i})"></span>
                            </div>
                        </div>
                        <div id="others(${i})" class="others">
                            <div class="abilities">
                                <span>Abilities:</span>
                                <div>
                                    <span class="ability" id="ability1(${i})"></span>
                                    <span class="ability">or</span>
                                    <span class="ability" id="ability2(${i})"></span>
                                </div>
                            </div>
                            <div class="heightandweight">
                                <div class="hw-box">
                                    <span>Height:</span>
                                    <span id="height(${i})"></span>
                                </div>
                                <div class="hw-box">
                                    <span>Weight:</span>
                                    <span id="weight(${i})"></span>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    `;

  let urlForValuesClicked = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let responeForValuesClicked = await fetch(urlForValuesClicked);
  PokemonValuesClicked = await responeForValuesClicked.json();

  enableValueFunctions(i);
}

/**
 * * Loads the logic and effects of the clicked Pokemon
 */

function enableValueFunctions(i) {
  document.getElementById("searchPokemon").value = "";
  searchForPokemon();
  clickSound();
  showSinglePokemon(i);
  standardInfosClicked(i);
  setTypesClicked(i);
  showStats(i);
}

/**
 * * Loads name, img and the types of the pokemon
 */

function standardInfos(i) {
  document.getElementById(`pokemonName(${i})`).innerHTML =
    PokemonValues["name"];
  document.getElementById(`pokemonImg(${i})`).src =
    PokemonValues["sprites"]["other"]["dream_world"]["front_default"];
  document.getElementById(`type1(${i})`).innerHTML =
    PokemonValues["types"][0]["type"]["name"];
}

/**
 * * Loads name, img and the types of the clicked pokemon
 */

function standardInfosClicked(i) {
  document.getElementById(`pokemonName-Clicked(${i})`).innerHTML =
    PokemonValuesClicked["name"];
  document.getElementById(`pokemonImg-Clicked(${i})`).src =
    PokemonValuesClicked["sprites"]["other"]["dream_world"]["front_default"];
  document.getElementById(`type1-Clicked(${i})`).innerHTML =
    PokemonValuesClicked["types"][0]["type"]["name"];
}

/**
 * * Loads the stats of the clicked pokemon
 */

function showStats(i) {
  document.getElementById(`others(${i})`).style = "display: none;";
  document.getElementById(`stats(${i})`).style = "";
  document.getElementById(`hp(${i})`).innerHTML =
    PokemonValuesClicked["stats"][0]["base_stat"];
  document.getElementById(`attack(${i})`).innerHTML =
    PokemonValuesClicked["stats"][1]["base_stat"];
  document.getElementById(`defense(${i})`).innerHTML =
    PokemonValuesClicked["stats"][2]["base_stat"];
  document.getElementById(`sp-atk(${i})`).innerHTML =
    PokemonValuesClicked["stats"][3]["base_stat"];
  document.getElementById(`sp-def(${i})`).innerHTML =
    PokemonValuesClicked["stats"][4]["base_stat"];
  document.getElementById(`speed(${i})`).innerHTML =
    PokemonValuesClicked["stats"][5]["base_stat"];
}

/**
 * * Loads the weight and ability of the clicked pokemon
 */

function showOthers(i) {
  document.getElementById(`others(${i})`).style = "";
  document.getElementById(`stats(${i})`).style = "display: none;";
  document.getElementById(`height(${i})`).innerHTML =
    PokemonValuesClicked["height"] * 10 + " cm";
  document.getElementById(`weight(${i})`).innerHTML =
    PokemonValuesClicked["weight"] / 10 + " kg";

  document.getElementById(`ability1(${i})`).innerHTML =
    PokemonValuesClicked["abilities"][0]["ability"]["name"];
  if (PokemonValuesClicked["abilities"].length == 2) {
    document.getElementById(`ability2(${i})`).innerHTML =
      PokemonValuesClicked["abilities"][1]["ability"]["name"];
  }
}

/**
 * * Shows the clicked pokemon
 */

function showSinglePokemon(i) {
  document.getElementById("pokedex").classList.add("d-none");
  document.getElementById("clickedPokemon-SectionID").style = "display: flex";
  document.getElementById(`clickedPokemon-SingleID(${i})`).style =
    "display: flex";
}

/**
 * * Closes an clicked Pokemon
 */

function closeClickedPokemon() {
  clickSound();
  document.getElementById("clickedPokemon-SectionID").style = "display: none;";
  document.getElementById("pokedex").classList.remove("d-none");
}

/**
 * * Checks the different types of the pokemon and add the background color
 */

setTypes = (i) => {
  let typeOne = PokemonValues["types"][0]["type"]["name"];
  document.getElementById(`type1(${i})`).classList.add(typeOne);
  document.getElementById(`singlePokemon(${i})`).classList.add(typeOne);
  if (PokemonValues["types"].length == 1) {
    document.getElementById(`type2(${i})`).classList.add("d-none");
  }

  if (PokemonValues["types"].length == 2) {
    let typeTwo = PokemonValues["types"][1]["type"]["name"];
    document.getElementById(`type2(${i})`).classList.add(typeTwo);
    document.getElementById(`type2(${i})`).innerHTML = typeTwo;
  }
};

setTypesClicked = (i) => {
  let typeOne = PokemonValuesClicked["types"][0]["type"]["name"];
  document.getElementById(`type1-Clicked(${i})`).classList.add(typeOne);
  document
    .getElementById(`clickedPokemon-SingleID(${i})`)
    .classList.add(typeOne);
  if (PokemonValuesClicked["types"].length == 2) {
    let typeTwo = PokemonValuesClicked["types"][1]["type"]["name"];
    document.getElementById(`type2-Clicked(${i})`).innerHTML = typeTwo;
    document.getElementById(`type2-Clicked(${i})`).classList.add(typeTwo);
  }
};

/*
 * * Audio Effects
 */

let Audio_Backgroundsong = new Audio("sounds/sound1.mp3");
let Audio_ClickEffect = new Audio("sounds/sound2.mp3");

function clickSound() {
  Audio_ClickEffect.play();
}

let BackgroundSong = false;

function playBackgroundSong() {
  if (!BackgroundSong) {
    Audio_Backgroundsong.play();
    BackgroundSong = true;
  } else {
    Audio_Backgroundsong.pause();
    BackgroundSong = false;
  }
}
