let allPokemon = [];

/**
 * * fetch of the Kantodex
 */

async function loadPokemon() {
  let pokedexBody = document.getElementById("pokedex");
  pokedexBody.innerHTML = "";

  for (let i = 1; i <= 151; i++) {
    let urlForValues = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let responeForValues = await fetch(urlForValues);
    PokemonValues = await responeForValues.json();
    allPokemon.push(PokemonValues);
    pokedexBody.innerHTML += loadSinglePokemon(i);

    standardInfos(i);
    firstType(i);
    secondType(i);
  }
}

/**
 * * The html and css of one pokemon
 */

function loadSinglePokemon(i) {
  return `
        <div onclick="showPokemon(${i})" class="singlePokemon-Container" id="singlePokemon(${i})">
            <figure class="singlePokemon-Figure">
                <img class="singlePokemon-Img" id="pokemonImg(${i})" src="">
                <span class="singlePokemon-Name" style="font-size: 1.4rem;" id="pokemonName(${i})">test1
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
                <span class="backbutton" onclick="closeClickedPokemon()">back</span>
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
  clickSound();
  showSinglePokemon(i);
  standardInfosClicked(i);
  firstTypeClicked(i);
  secondTypeClicked(i);
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

function firstType(i) {
  if (PokemonValues["types"].length == 1) {
    document.getElementById(`type2(${i})`).classList.add("d-none");
  }

  let type1 = PokemonValues["types"][0]["type"]["name"];

  if (type1 == "grass") {
    document.getElementById(`type1(${i})`).classList.add("grass");
    document.getElementById(`singlePokemon(${i})`).classList.add("grass");
  }

  if (type1 == "water") {
    document.getElementById(`type1(${i})`).classList.add("water");
    document.getElementById(`singlePokemon(${i})`).classList.add("water");
  }

  if (type1 == "fire") {
    document.getElementById(`type1(${i})`).classList.add("fire");
    document.getElementById(`singlePokemon(${i})`).classList.add("fire");
  }

  if (type1 == "poison") {
    document.getElementById(`type1(${i})`).classList.add("poison");
    document.getElementById(`singlePokemon(${i})`).classList.add("poison");
  }

  if (type1 == "normal") {
    document.getElementById(`type1(${i})`).classList.add("normal");
    document.getElementById(`singlePokemon(${i})`).classList.add("normal");
  }

  if (type1 == "electric") {
    document.getElementById(`type1(${i})`).classList.add("electro");
    document.getElementById(`singlePokemon(${i})`).classList.add("electro");
  }

  if (type1 == "flying") {
    document.getElementById(`type1(${i})`).classList.add("flying");
    document.getElementById(`singlePokemon(${i})`).classList.add("flying");
  }

  if (type1 == "bug") {
    document.getElementById(`singlePokemon(${i})`).classList.add("bug");
    document.getElementById(`type1(${i})`).classList.add("bug");
  }

  if (type1 == "dragon") {
    document.getElementById(`singlePokemon(${i})`).classList.add("dragon");
    document.getElementById(`type1(${i})`).classList.add("dragon");
  }

  if (type1 == "ice") {
    document.getElementById(`singlePokemon(${i})`).classList.add("ice");
    document.getElementById(`type1(${i})`).classList.add("ice");
  }

  if (type1 == "steel") {
    document.getElementById(`singlePokemon(${i})`).classList.add("steel");
    document.getElementById(`type1(${i})`).classList.add("steel");
  }

  if (type1 == "rock") {
    document.getElementById(`singlePokemon(${i})`).classList.add("rock");
    document.getElementById(`type1(${i})`).classList.add("rock");
  }

  if (type1 == "fairy") {
    document.getElementById(`singlePokemon(${i})`).classList.add("fairy");
    document.getElementById(`type1(${i})`).classList.add("fairy");
  }

  if (type1 == "psychic") {
    document.getElementById(`singlePokemon(${i})`).classList.add("psy");
    document.getElementById(`type1(${i})`).classList.add("psy");
  }

  if (type1 == "ground") {
    document.getElementById(`singlePokemon(${i})`).classList.add("ground");
    document.getElementById(`type1(${i})`).classList.add("ground");
  }

  if (type1 == "fighting") {
    document.getElementById(`singlePokemon(${i})`).classList.add("fight");
    document.getElementById(`type1(${i})`).classList.add("fight");
  }
}

function firstTypeClicked(i) {
  if (PokemonValuesClicked["types"].length == 1) {
    document.getElementById(`type2-Clicked(${i})`).classList.add("d-none");
  }

  let tpye1Clicked = PokemonValuesClicked["types"][0]["type"]["name"];

  if (tpye1Clicked == "grass") {
    document.getElementById(`type1-Clicked(${i})`).classList.add("grass");
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("grass");
  }

  if (tpye1Clicked == "water") {
    document.getElementById(`type1-Clicked(${i})`).classList.add("water");
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("water");
  }

  if (tpye1Clicked == "fire") {
    document.getElementById(`type1-Clicked(${i})`).classList.add("fire");
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("fire");
  }

  if (tpye1Clicked == "poison") {
    document.getElementById(`type1-Clicked(${i})`).classList.add("poison");
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("poison");
  }

  if (tpye1Clicked == "normal") {
    document.getElementById(`type1-Clicked(${i})`).classList.add("normal");
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("normal");
  }

  if (tpye1Clicked == "electric") {
    document.getElementById(`type1-Clicked(${i})`).classList.add("electro");
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("electro");
  }

  if (tpye1Clicked == "flying") {
    document.getElementById(`type1-Clicked(${i})`).classList.add("flying");
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("flying");
  }

  if (tpye1Clicked == "bug") {
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("bug");
    document.getElementById(`type1-Clicked(${i})`).classList.add("bug");
  }

  if (tpye1Clicked == "dragon") {
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("dragon");
    document.getElementById(`type1-Clicked(${i})`).classList.add("dragon");
  }

  if (tpye1Clicked == "ice") {
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("ice");
    document.getElementById(`type1-Clicked(${i})`).classList.add("ice");
  }

  if (tpye1Clicked == "steel") {
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("steel");
    document.getElementById(`type1-Clicked(${i})`).classList.add("steel");
  }

  if (tpye1Clicked == "rock") {
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("rock");
    document.getElementById(`type1-Clicked(${i})`).classList.add("rock");
  }

  if (tpye1Clicked == "fairy") {
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("fairy");
    document.getElementById(`type1-Clicked(${i})`).classList.add("fairy");
  }

  if (tpye1Clicked == "psychic") {
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("psy");
    document.getElementById(`type1-Clicked(${i})`).classList.add("psy");
  }

  if (tpye1Clicked == "ground") {
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("ground");
    document.getElementById(`type1-Clicked(${i})`).classList.add("ground");
  }

  if (tpye1Clicked == "fighting") {
    document
      .getElementById(`clickedPokemon-SingleID(${i})`)
      .classList.add("fight");
    document.getElementById(`type1-Clicked(${i})`).classList.add("fight");
  }
}

function secondType(i) {
  if (PokemonValues["types"].length == 2) {
    let type2 = PokemonValues["types"][1]["type"]["name"];
    document.getElementById(`type2(${i})`).innerHTML = type2;

    if (type2 == "grass") {
      document.getElementById(`type2(${i})`).classList.add("grass");
    }

    if (type2 == "water") {
      document.getElementById(`type2(${i})`).classList.add("water");
    }

    if (type2 == "fire") {
      document.getElementById(`type2(${i})`).classList.add("fire");
    }

    if (type2 == "poison") {
      document.getElementById(`type2(${i})`).classList.add("poison");
    }

    if (type2 == "normal") {
      document.getElementById(`type2(${i})`).classList.add("normal");
    }

    if (type2 == "electric") {
      document.getElementById(`type2(${i})`).classList.add("electro");
    }

    if (type2 == "flying") {
      document.getElementById(`type2(${i})`).classList.add("flying");
    }

    if (type2 == "bug") {
      document.getElementById(`type2(${i})`).classList.add("bug");
    }

    if (type2 == "dragon") {
      document.getElementById(`type2(${i})`).classList.add("dragon");
    }

    if (type2 == "ice") {
      document.getElementById(`type2(${i})`).classList.add("ice");
    }

    if (type2 == "steel") {
      document.getElementById(`type2(${i})`).classList.add("steel");
    }

    if (type2 == "rock") {
      document.getElementById(`type2(${i})`).classList.add("rock");
    }

    if (type2 == "fairy") {
      document.getElementById(`type2(${i})`).classList.add("fairy");
    }

    if (type2 == "psychic") {
      document.getElementById(`type2(${i})`).classList.add("psy");
    }

    if (type2 == "ground") {
      document.getElementById(`type2(${i})`).classList.add("ground");
    }

    if (type2 == "fighting") {
      document.getElementById(`type2(${i})`).classList.add("fight");
    }
  }
}

function secondTypeClicked(i) {
  if (PokemonValuesClicked["types"].length == 2) {
    let type2Clicked = PokemonValuesClicked["types"][1]["type"]["name"];
    document.getElementById(`type2-Clicked(${i})`).innerHTML = type2Clicked;

    if (type2Clicked == "grass") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("grass");
    }

    if (type2Clicked == "water") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("water");
    }

    if (type2Clicked == "fire") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("fire");
    }

    if (type2Clicked == "poison") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("poison");
    }

    if (type2Clicked == "normal") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("normal");
    }

    if (type2Clicked == "electric") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("electro");
    }

    if (type2Clicked == "flying") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("flying");
    }

    if (type2Clicked == "bug") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("bug");
    }

    if (type2Clicked == "dragon") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("dragon");
    }

    if (type2Clicked == "ice") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("ice");
    }

    if (type2Clicked == "steel") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("steel");
    }

    if (type2Clicked == "rock") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("rock");
    }

    if (type2Clicked == "fairy") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("fairy");
    }

    if (type2Clicked == "psychic") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("psy");
    }

    if (type2Clicked == "ground") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("ground");
    }

    if (type2Clicked == "fighting") {
      document.getElementById(`type2-Clicked(${i})`).classList.add("fight");
    }
  }
}

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
