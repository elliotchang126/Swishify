import { drawHalfCourt } from "./scripts/shotchart";
import { generateShotChart } from "./scripts/draw_shots";
import { drawHexbinChart } from "./scripts/zone";
import { writeProfile } from "./scripts/profile";
import { drawBarChart } from "./scripts/zone_comp";
import { drawEfficiencyChart } from "./scripts/league_avg";

const playerBackgrounds = require("../assets/player_backgrounds.json")

let defaultPlayer = ""; //* empty default so page renders with an empty court
let playerProfile = "lebron";
let playerProfile2 = 'curry';
let playerInfo = require(`../assets/player_profile/${playerProfile}.json`)
let playerInfo2 = require(`../assets/player_profile/${playerProfile2}.json`)

// set default background when page loads
const playerBackground = playerBackgrounds[playerProfile];
document.body.style.backgroundImage = `url(/assets/backgrounds/${playerBackground.image})`
document.body.style.backgroundColor = playerBackground.background;
document.body.style.backgroundPosition = 'center';
document.body.style.backgroundRepeat = 'no-repeat';

const playerTwoSelector = document.querySelector(".player-two-selector")
const playerTwoDropdown = document.querySelector(".player-two-dropdown")
const profileSelector = document.querySelector(".profile-dropdown")
const modal = document.querySelector(".modal")
const button = document.querySelector("#instructions")
const instructions = document.querySelector(".close")
const shotChart = document.querySelector("#shot-chart")
const hexChart = document.querySelector("#hex-chart")
const efficiencyChart = document.querySelector("#efficiency-chart")
const comparisonChart = document.querySelector("#comparison-chart")
const chartTitle = document.querySelector("#shot-chart-title")

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

playerTwoDropdown.style.display = "none"

playerTwoSelector.addEventListener("change", () => {
    d3.select(".shot-chart svg").remove();
    playerProfile2 = playerTwoSelector.options[playerTwoSelector.selectedIndex].value;
    playerInfo2 = require(`../assets/player_profile/${playerProfile2}.json`)
    chartTitle.textContent = `${playerInfo[0].DISPLAY_FIRST_LAST} vs. ${playerInfo2[0].DISPLAY_FIRST_LAST} Efficiency`
    drawBarChart(playerProfile, playerProfile2);
})

profileSelector.addEventListener("change", function() {
    const playerBackgrounds = require("../assets/player_backgrounds.json")
    d3.select(".shot-chart svg").remove();
    d3.select(".profile-render div").remove()
    d3.select(".profile-image img").remove()
    playerTwoDropdown.style.display = 'none';
    playerProfile = profileSelector.options[profileSelector.selectedIndex].value;
    if (!playerProfile) {
        playerProfile = "lebron"
    }
    playerInfo = require(`../assets/player_profile/${playerProfile}.json`)
    const playerBackground = playerBackgrounds[playerProfile];
    document.body.style.backgroundImage = `url(/assets/backgrounds/${playerBackground.image})`
    document.body.style.backgroundColor = playerBackground.background;
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    chartTitle.textContent = `${playerInfo[0].DISPLAY_FIRST_LAST}'s Shot Chart`
    writeProfile(playerProfile);
    generateShotChart(playerProfile);
})

document.addEventListener("DOMContentLoaded", () => {
    chartTitle.textContent = `${playerInfo[0].DISPLAY_FIRST_LAST} Shot Chart`
    generateShotChart(playerProfile)
});
document.addEventListener("DOMContentLoaded", writeProfile(playerProfile));

shotChart.addEventListener('click', () => {
    d3.select(".shot-chart svg").remove();
    chartTitle.textContent = `${playerInfo[0].DISPLAY_FIRST_LAST} Shot Chart`
    playerTwoDropdown.style.display = 'none';
    generateShotChart(playerProfile)});

hexChart.addEventListener('click', () => {
    d3.select(".shot-chart svg").remove();
    chartTitle.textContent = `${playerInfo[0].DISPLAY_FIRST_LAST} Favorite Zones`
    playerTwoDropdown.style.display = 'none';
    drawHexbinChart(playerProfile)});

efficiencyChart.addEventListener('click', () => {
    d3.select(".shot-chart svg").remove();
    chartTitle.textContent = `${playerInfo[0].DISPLAY_FIRST_LAST} vs. League Average`
    drawEfficiencyChart(playerProfile);
    playerTwoDropdown.style.display = 'none';
})

comparisonChart.addEventListener("click", () => {
    d3.select(".shot-chart svg").remove();
    chartTitle.textContent = `${playerInfo[0].DISPLAY_FIRST_LAST} vs. ${playerInfo2[0].DISPLAY_FIRST_LAST} Efficiency`
    drawBarChart(playerProfile, playerProfile2);
    if (playerTwoDropdown.style.display === "none") {
        playerTwoDropdown.style.display = "flex";
    }
})
// document.addEventListener("DOMContentLoaded", drawHexbinChart(playerProfile));