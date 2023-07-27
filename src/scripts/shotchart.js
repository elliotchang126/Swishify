export function drawHalfCourt () {
    const width = 500;
    const height = 450;

    const svg = d3.select(".shot-chart")
        .append("svg")
    //* data assumes 0, 0 is basket so
        // .attr('preserveAspectRatio', 'xMidYMid meet')
        // .attr('viewBox',`0 0 ${width} ${height}`)
        // .classed("svg-content-responsive", true);
        .attr("width", width) //* +250 to account for D3 start plot
        .attr("height", height); //* +50 to account for shots behind basket
    // try adding percentages?
    
    svg.append("image") // add conditional process.env.NODE_ENV !== "production"
        .attr("xlink:href", process.env.NODE_ENV !== "production" ? "./assets/hardwood.png": `${window.location}/assets/hardwood.png`)
        .attr("width", 1000)
        .attr("height", 1000);

    // half court
    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 500)
        .attr("height", 450)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 7);

    // free throw box
    svg.append("rect")
        .attr("x", 170)
        .attr("y", 0)
        .attr("width", 160)
        .attr("height", 181.9)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);

    // inner box lines
    svg.append("line")
        .attr("x1", 190)
        .attr("y1", 0)
        .attr("x2", 190)
        .attr("y2", 181.9)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);
        
    svg.append("line")
        .attr("x1", 310)
        .attr("y1", 0)
        .attr("x2", 310)
        .attr("y2", 181.9)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);

    // 3 point line, before arc
    svg.append("line")
        .attr("x1", 30)
        .attr("y1", 0)
        .attr("x2", 30)
        .attr("y2", 134)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);

    svg.append("line")
        .attr("x1", 470)
        .attr("y1", 0)
        .attr("x2", 470)
        .attr("y2", 134)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);
    
        // restricted area
    const restrictedArea = d3.arc()
        .innerRadius(40)
        .outerRadius(40)
        .startAngle(Math.PI)
        .endAngle(2 * Math.PI);

        
    svg.append("path")
        .attr("d", restrictedArea)
        .attr("transform", "translate(250, 50) rotate(-90)")
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);
        
        // basketball rim
        svg.append("circle")
        .attr("cx", 250)
        .attr("cy", 57.5)
        .attr("r", 7.5)
        .style("fill", "none")
        .style("stroke", "#FFA500")
        .style("stroke-width", 4);
        
    // backboard
    svg.append("line")
        .attr("x1", 220)
        .attr("y1", 50)
        .attr("x2", 280)
        .attr("y2", 50)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);

    // free throw arc
    const basket = d3.arc()
        .innerRadius(0)
        .outerRadius(60)
        .startAngle(Math.PI)
        .endAngle(2 * Math.PI);

    svg.append("path")
        .attr("d", basket)
        .attr("transform", "translate(250, 181.9) rotate (-90)")
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);

    svg.append("path")
        .attr("d", basket)
        .attr("transform", "translate(250, 181.9) rotate (90)")
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4)
        .style("stroke-dasharray", "10, 7");

    // 3 point arc
    const startAngle = Math.atan2(134 - 57.5, 30 - 250) + 0.005;  //starting point. opposite over adjacent. y coord then x
    const endAngle = Math.atan2(134 - 57.5, 470 - 250) - 0.005;     // end point, same as above but for the other side
    const outerRadius = Math.sqrt(Math.pow(30 - 250, 2) + Math.pow(134 - 57.5, 2)); // pyth theorem a^2 + b^2 = c^2

// arc starting and ending point //* need to understand how this works. d3.range is start, stop, and step
    const endingpoints = d3.range(startAngle, endAngle, (endAngle - startAngle) / 1000).map(function(t) {   // divides by 1000 to create different values by step
        return [outerRadius, t]; // creates each endpoint of the 'circle'. the 3 point line isn't exactly a perfect circle though
    });

// define the line //* also need to understand how this works. basically, it's not really a "circle" but a lot of little lines using the endpoints above
    const threePointArc = d3.lineRadial()       //built-in method
        .angle(function(d) { return d[1]; })    // angle from that point
        .radius(function(d) { return d[0]; });  

    svg.append("path")
        .datum(endingpoints)
        .attr("d", threePointArc)
        .attr("transform", `translate(250, 57.5) rotate(90)`)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);

    return svg
}

// export default drawHalfCourt;