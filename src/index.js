import { drawHalfCourt } from "./scripts/shotchart";
// import { writeProfile } from "./scripts/profile";

let defaultPlayer = ""; //* empty default so page renders with an empty court
let playerProfile = "lebron";
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
    d3.select(".profile-render body").remove()
    playerProfile = profileSelector.options[profileSelector.selectedIndex].value;
    if (!playerProfile) {
        playerProfile = "lebron"
    }
    writeProfile(playerProfile);
})

function writeProfile(player) {
    let playerDetails = require(`../assets/player_profile/${player}.json`)
    let playerStats = require(`../assets/player_career_stats/${player}.json`)

    const body = d3.select(".profile-render")
    .append("body")
    .attr("width", 500)
    .attr("height", 500);

    body.append("p")
        .attr("class", "detail")
        .text("Name:");
    body.append("P")
        .text(`${playerDetails[0]["DISPLAY_FIRST_LAST"]}`);

    body.append("p")
    .attr("class", "detail")
        .text("Position:");
    body.append("P")
        .text(`${playerDetails[0]["POSITION"]}`);

    body.append("p")
    .attr("class", "detail")
        .text("Country:");
    body.append("P")
        .text(`${playerDetails[0]["COUNTRY"]}`);

    body.append("p")
    .attr("class", "detail")
        .text("Birth Date:");
    body.append("p")
        .text(`${playerDetails[0]["BIRTHDATE"]}`);

    body.append("p")
    .attr("class", "detail")
        .text("School:");
    body.append("p")
        .text(`${playerDetails[0]["SCHOOL"]}`);

    body.append("p")
    .attr("class", "detail")
        .text("Height:");
    body.append("p")
        .text(`${playerDetails[0]["HEIGHT"]}`);

    body.append("p")
    .attr("class", "detail")
        .text("Weight:");
    body.append("p")
        .text(`${playerDetails[0]["WEIGHT"]}`);

    body.append("p")
    .attr("class", "detail")
        .text("Team Name:");
    body.append("p")
        .text(`${playerDetails[0]["TEAM_NAME"]}`);

    body.append("p")
    .attr("class", "detail")
        .text("Jersey Number:");
    body.append("p")
        .text(`${playerDetails[0]["JERSEY"]}`);

    body.append("p")
            .attr("class", "detail")
        .text("Draft Year:");
    body.append("p")
        .text(`${playerDetails[0]["DRAFT_YEAR"]}`);

    body.append("p")
            .attr("class", "detail")
        .text("Draft Round:");
    body.append("p")
        .text(`${playerDetails[0]["DRAFT_ROUND"]}`);

    body.append("p")
            .attr("class", "detail")
        .text("Draft Number:");
    body.append("p")
        .text(`${playerDetails[0]["DRAFT_NUMBER"]}`);

    body.append("p")
            .attr("class", "detail")
        .text("Average Points:");
    body.append("p")
        .text(`${playerStats[0]["PTS"]}`);

    body.append("p")
            .attr("class", "detail")
        .text("Average Rebounds:");
    body.append("p")
        .text(`${playerStats[0]["REB"]}`);

    body.append("p")
            .attr("class", "detail")
        .text("Average Assists:");
    body.append("p")
        .text(`${playerStats[0]["AST"]}`);

    body.append("p")
            .attr("class", "detail")
        .text("Field Goal %:");
    body.append("p")
        .text(`${playerStats[0]["FG_PCT"]}`);

    body.append("p")
            .attr("class", "detail")
        .text("3 Point %:");
    body.append("p")
        .text(`${playerStats[0]["FG3_PCT"]}`);

    body.append("p")
            .attr("class", "detail")
        .text("Free Throw %:");
    body.append("p")
        .text(`${playerStats[0]["FT_PCT"]}`);
}


document.addEventListener("DOMContentLoaded", drawHalfCourt()); // defaults to an empty court
document.addEventListener("DOMContentLoaded", writeProfile(playerProfile));