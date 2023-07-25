import { background } from "./scripts/background";
import { drawHalfCourt } from "./scripts/shotchart";
import { generateShotChart } from "./scripts/draw_shots";
import { drawHexbinChart } from "./scripts/zone";
import { writeProfile } from "./scripts/profile";
const playerBackgrounds = require("../assets/player_backgrounds.json")

let defaultPlayer = ""; //* empty default so page renders with an empty court
let playerProfile = "lebron";
const playerBackground = playerBackgrounds[playerProfile];
document.body.style.backgroundImage = `url(../assets/backgrounds/${playerBackground.image})`
document.body.style.backgroundColor = playerBackground.background;
document.body.style.backgroundRepeat = 'no-repeat';

const playerOneSelector = document.querySelector(".player-one-selector")
const profileSelector = document.querySelector(".profile-dropdown")
const modal = document.querySelector(".modal")
const button = document.querySelector("#instructions")
const instructions = document.querySelector(".close")

// open instructions when button is clicked
button.onclick = function() {
    modal.style.display = "block";
    document.querySelector(".content").classList.add("blur");
}

// these next two close the buttons
instructions.onclick = function() {
    modal.style.display = "none";
    document.querySelector(".content").classList.remove("blur");
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.querySelector(".content").classList.remove("blur");
    }
}

playerOneSelector.addEventListener("change", function () {
    d3.select(".shot-chart svg").remove(); //* remove current chart

    defaultPlayer = playerOneSelector.options[playerOneSelector.selectedIndex].value;
    generateShotChart(defaultPlayer);
})

profileSelector.addEventListener("change", function() {
    const playerBackgrounds = require("../assets/player_backgrounds.json")

    d3.select(".profile-render div").remove()
    d3.select(".profile-container img").remove()
    playerProfile = profileSelector.options[profileSelector.selectedIndex].value;
    if (!playerProfile) {
        playerProfile = "lebron"
    }
    const playerBackground = playerBackgrounds[playerProfile];
    document.body.style.backgroundImage = `url(../assets/backgrounds/${playerBackground.image})`
    document.body.style.backgroundColor = playerBackground.background;
    document.body.style.backgroundRepeat = 'no-repeat';
    writeProfile(playerProfile);
    drawHexbinChart(playerProfile);
})

document.addEventListener("DOMContentLoaded", drawHalfCourt()); // defaults to an empty court
document.addEventListener("DOMContentLoaded", writeProfile(playerProfile));
// document.addEventListener("DOMContentLoaded", drawHexbinChart(playerProfile));