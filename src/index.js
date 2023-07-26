import { background } from "./scripts/background";
import { drawHalfCourt } from "./scripts/shotchart";
import { drawShots, generateShotChart } from "./scripts/draw_shots";
import { drawHexbinChart } from "./scripts/zone";
import { writeProfile } from "./scripts/profile";
import { zoneData, leagueAverage, drawBarChart } from "./scripts/zone_comp";
import { drawEfficiencyChart } from "./scripts/league_avg";

const playerBackgrounds = require("../assets/player_backgrounds.json")

let defaultPlayer = ""; //* empty default so page renders with an empty court
let playerProfile = "lebron";
let playerProfile2 = 'curry';
const playerBackground = playerBackgrounds[playerProfile];
document.body.style.backgroundImage = `url(../assets/backgrounds/${playerBackground.image})`
document.body.style.backgroundColor = playerBackground.background;
document.body.style.backgroundRepeat = 'no-repeat';

const playerTwoSelector = document.querySelector(".player-two-selector")
const profileSelector = document.querySelector(".profile-dropdown")
const modal = document.querySelector(".modal")
const button = document.querySelector("#instructions")
const instructions = document.querySelector(".close")
const shotChart = document.querySelector("#shot-chart")
const hexChart = document.querySelector("#hex-chart")
const efficiencyChart = document.querySelector("#efficiency-chart")
const comparisonChart = document.querySelector("#comparison-chart")

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

// playerOneSelector.addEventListener("change", function () {
//     d3.select(".shot-chart svg").remove(); //* remove current chart

//     defaultPlayer = playerOneSelector.options[playerOneSelector.selectedIndex].value;
//     generateShotChart(defaultPlayer);
// })

playerTwoSelector.style.display = "none"

playerTwoSelector.addEventListener("change", () => {
    d3.select(".shot-chart svg").remove();
    playerProfile2 = playerTwoSelector.options[playerTwoSelector.selectedIndex].value;
    drawBarChart(playerProfile, playerProfile2);
})

profileSelector.addEventListener("change", function() {
    const playerBackgrounds = require("../assets/player_backgrounds.json")
    d3.select(".shot-chart svg").remove();
    d3.select(".profile-render div").remove()
    d3.select(".profile-image img").remove()
    playerProfile = profileSelector.options[profileSelector.selectedIndex].value;
    if (!playerProfile) {
        playerProfile = "lebron"
    }
    const playerBackground = playerBackgrounds[playerProfile];
    document.body.style.backgroundImage = `url(../assets/backgrounds/${playerBackground.image})`
    document.body.style.backgroundColor = playerBackground.background;
    document.body.style.backgroundRepeat = 'no-repeat';
    writeProfile(playerProfile);
    generateShotChart(playerProfile);
})

document.addEventListener("DOMContentLoaded", drawHalfCourt()); // defaults to an empty court
document.addEventListener("DOMContentLoaded", writeProfile(playerProfile));
shotChart.addEventListener('click', () => {
    d3.select(".shot-chart svg").remove();
    playerTwoSelector.style.display = 'none';
    generateShotChart(playerProfile)});

hexChart.addEventListener('click', () => {
    d3.select(".shot-chart svg").remove();
    playerTwoSelector.style.display = 'none';
    drawHexbinChart(playerProfile)});

efficiencyChart.addEventListener('click', () => {
    d3.select(".shot-chart svg").remove();
    drawEfficiencyChart(playerProfile);
})

comparisonChart.addEventListener("click", () => {
    d3.select(".shot-chart svg").remove();
    drawBarChart(playerProfile, playerProfile2);
    // drawBarChart(playerProfile, playerProfile2);
    if (playerTwoSelector.style.display === "none") {
        playerTwoSelector.style.display = "block";
    } else {
        playerTwoSelector.style.display = 'none';
    }
})
// document.addEventListener("DOMContentLoaded", drawHexbinChart(playerProfile));