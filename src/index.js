import { drawHalfCourt } from "./scripts/shotchart";
import { writeProfile } from "./scripts/profile";

let defaultPlayer = "";
let playerProfile = "";
let profileDetails = "";
let playerStats = "";

const playerOneSelector = document.querySelector(".player-one-selector")
const profileSelector = document.querySelector(".profile-dropdown")

function drawShots(svg, arr) {
    svg.selectAll(".dot")
    .data(arr)
    .enter()
    .append('circle')
    .attr("cx", function(d) { return d[0] + 250; })
    .attr("cy", function(d) { return d[1] + 50; })
    .attr("r", 4)
    .style('fill', function(d) { return d[2] === 1 ? '#008000' : '#FF0000'})
    .style("stroke", "#333")
    .style("stroke-width", 1);
    
    return svg
}

playerOneSelector.addEventListener("change", function () {
    d3.select(".shot-chart svg").remove();

    defaultPlayer = playerOneSelector.options[playerOneSelector.selectedIndex].value;
    generateShotChart(defaultPlayer);
})

function generateShotChart(player) {
    let playerChart = require(`../assets/year_stats/${player}-23.json`);
    if (!playerChart) {
        drawHalfCourt();
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
    d3.select("profile-render body").remove()
    playerProfile = profileSelector.options[profileSelector.selectedIndex].value;
    writeProfile(playerProfile);
})

document.addEventListener("DOMContentLoaded", drawHalfCourt());
document.addEventListener("DOMContentLoaded", writeProfile());