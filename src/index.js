import { drawHalfCourt } from "./scripts/shotchart";
const doncic = require("../assets/year_stats/doncic-23.json");
const embiid = require("../assets/year_stats/embiid-23.json");
const giannis = require("../assets/year_stats/giannis-23.json");
const shai = require("../assets/year_stats/shai-23.json");
const tatum = require("../assets/year_stats/tatum-23.json");
const brown = require("../assets/year_stats/brown-23.json");
const butler = require("../assets/year_stats/butler-23.json");
const curry = require("../assets/year_stats/curry-23.json");
const jokic = require("../assets/year_stats/jokic-23.json");
const mitchell = require("../assets/year_stats/mitchell-23.json");
const fox = require("../assets/year_stats/fox-23.json");
const lebron = require("../assets/year_stats/lebron-23.json");
const lillard = require("../assets/year_stats/lillard-23.json");
const randle = require("../assets/year_stats/randle-23.json");
const sabonis = require("../assets/year_stats/sabonis-23.json");

// const shotChart = document.querySelector(".shot-chart")
// const width = 625
// const height = 587.5
let defaultPlayer = lebron;

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

document.addEventListener("DOMContentLoaded", function() {
    let arr = [];
    defaultPlayer.forEach(el => {
        arr.push([el.LOC_X, el.LOC_Y, el.SHOT_MADE_FLAG])
    })
    let svg = drawHalfCourt()
    drawShots(svg, arr)
});

// let arr = [];
// doncic.forEach(el => {
//     arr.push([el.LOC_X, el.LOC_Y, el.SHOT_MADE_FLAG])
// })
// let svg = drawHalfCourt()
// drawShots(svg, arr)
// let player_name = doncic;
// fetch(`../assets/year_stats/${player_name}-23.json`)
// .then(res => res.json())
// .then(data => {
//     const shots = data.map(hash => (
//         {x: hash.LOC_X + 250, y: hash.LOC_Y, made: hash.SHOT_MADE_FLAG}
//         ));
//         let svg = drawHalfCourt();
//         drawShots(svg, shots);
//     });

// let svg = drawHalfCourt();



// d3.area

// console.log(embiid[0])

// arr = [];
// arr2 = []

// embiid.forEach(el => {
//     // arr.push(el.LOC_X)
//     // if (el.LOC_Y < 0) arr2.push(el)
//     arr2.push(el.LOC_Y)
// })

// // console.log(arr2)

// // console.log(Math.min(...arr))
// // console.log(Math.max(...arr))

// console.log(Math.min(...arr2))
// console.log(Math.max(...arr2))