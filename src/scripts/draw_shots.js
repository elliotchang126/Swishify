import { drawHalfCourt } from "./shotchart";

export function drawShots(svg, arr, width = 500, height = 450) {
    const centerCoordX = width / 2;
    const centerCoordY = height * 0.125; // Adjust according to the basket position

    const shots = svg.selectAll(".dot") // .dot doesn't exist yet,
        .data(arr)
        .enter()                            
        .append('circle')
        .attr("cx", centerCoordX)  // Start at center
        .attr("cy", centerCoordY)  // Start at center
        .attr("r", 4)
        .style('fill', function(d) { return d[2] === 1 ? '#008000' : '#FF0000' })
        .style("stroke", "#333")
        .style("stroke-width", 1);
    
    shots.transition()
        .duration(1000)
        .attr("cx", function(d) { return d[0] + centerCoordX }) // Move to actual position
        .attr("cy", function(d) { return centerCoordY - d[1] }); // Adjust y to match the court's coordinate system

    return shots;
}

export function generateShotChart(player) {
    let playerChart = require(`../../assets/year_stats/${player}-23.json`);
    if (!playerChart) {
        drawHalfCourt();
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