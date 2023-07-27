import { drawHalfCourt } from "./shotchart";

export function drawShots(svg, arr) {
    const shots = svg.selectAll(".dot") // .dot doesn't exist yet,
        .data(arr)
        .enter()                            // when we use enter each element becomes a .dot
        .append('circle')
        .attr("cx", function(d) { return 250 })     // d = datum, normal d3 syntax
        .attr("cy", function(d) { return 225 })     // starts at center
        .attr("r", 4)
        .style('fill', function(d) { return d[2] === 1 ? '#008000' : '#FF0000'})
        .style("stroke", "#333")
        .style("stroke-width", 1);
    shots
        // .attr("cy", function(d) {return d[1] + 455})
        .transition()
        .duration(1000)
        .attr("cx", function(d) { return d[0] + 250}) //moves to act pos
        .attr("cy", function(d) {return d[1] + 50});

    return shots
}

export function generateShotChart(player) {
    let playerChart = require(`../../assets/year_stats/${player}-23.json`);
    if (!playerChart) {
        drawHalfCourt(); // if 
    } else {
        let arr = [];
        playerChart.forEach(el => {
            arr.push([el.LOC_X, el.LOC_Y, el.SHOT_MADE_FLAG]);
        })
        let svg = drawHalfCourt();

    const chartLegend = svg.append("g")
        .attr('class', 'legend');
        
    chartLegend.append('circle')
        .attr('cx', 490)   
        .attr('cy', 428)
        .attr('r', 4)
        .style('fill', '#008000')
        .style("stroke", "#333")
        .style("stroke-width", 2);

    chartLegend.append('text')
        .attr("class", "legend-text")
        .attr('x', 404)
        .attr('y', 432)
        .text('Made Shots:')
        .style('fill', 'black');
    
    chartLegend.append('circle')
        .attr('cx', 490)
        .attr('cy', 440)
        .attr('r', 4)
        .style('fill', '#FF0000')
        .style("stroke", "#333")
        .style("stroke-width", 2);

    chartLegend.append('text')
        .attr('class', 'legend-text')
        .attr('x', 394)
        .attr('y', 444)
        .text('Missed Shots:')
        .style('fill', 'black');
        
        return drawShots(svg, arr);
    }
}