import { background } from "./scripts/background";
import { drawHalfCourt } from "./scripts/shotchart";
// import {drawShots} from "./scripts/";
import { zoneChart } from "./scripts/zone";
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
// draw the shots, if made shots = 1, the circle is green, otherwise it's red
function drawShots(svg, arr) {
    const shots = svg.selectAll(".dot") // .dot doesn't exist yet,
    .data(arr)
    .enter()                            // when we use enter each element becomes a .dot
    .append('circle')
    .attr("cx", function(d) { return d[0] + 250; })     // d = datum, normal d3 syntax
    // .attr("cy", function(d) { return d[1] + 50; })
    .attr("r", 4)
    .style('fill', function(d) { return d[2] === 1 ? '#008000' : '#FF0000'})
    .style("stroke", "#333")
    .style("stroke-width", 1);
    
    shots
        .attr("cy", function(d) {return d[1] + 455})
        .transition()
        .duration(1000)
        .attr("cy", function(d) {return d[1] + 50});
    return shots
}

playerOneSelector.addEventListener("change", function () {
    d3.select(".shot-chart svg").remove(); //* remove current chart

    defaultPlayer = playerOneSelector.options[playerOneSelector.selectedIndex].value;
    generateShotChart(defaultPlayer);
})

function generateShotChart(player) {
    let playerChart = require(`../assets/year_stats/${player}-23.json`);
    if (!playerChart) {
        drawHalfCourt(); // if 
    } else {
        let arr = [];
        playerChart.forEach(el => {
            arr.push([el.LOC_X, el.LOC_Y, el.SHOT_MADE_FLAG]);
        })
        let svg = drawHalfCourt();
        drawShots(svg, arr);
    }
}

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
})

document.addEventListener("DOMContentLoaded", drawHalfCourt()); // defaults to an empty court
document.addEventListener("DOMContentLoaded", writeProfile(playerProfile));