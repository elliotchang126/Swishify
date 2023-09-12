export function drawHalfCourt(width = 500, height = 450) {
    const svg = d3.select(".shot-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Hardwood image
    const imgWidth = width * 1.2;
    const imgHeight = height * 1.2;
    svg.append("image")
        .attr("xlink:href", process.env.NODE_ENV !== "production" ? "./assets/hardwood.png" : `${window.location}/assets/hardwood.png`)
        .attr("width", imgWidth)
        .attr("height", imgHeight);

    const drawRect = (x, y, w, h, strokeWidth) => {
        svg.append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("width", w)
            .attr("height", h)
            .style("fill", "none")
            .style("stroke", "#333")
            .style("stroke-width", strokeWidth);
    }

    const drawLine = (x1, y1, x2, y2, strokeWidth) => {
        svg.append("line")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2)
            .style("fill", "none")
            .style("stroke", "#333")
            .style("stroke-width", strokeWidth);
    }

    // Half court
    drawRect(0, 0, width, height, 7);

    // Free throw box
    drawRect(width * 0.34, 0, width * 0.32, height * 0.4, 4);

    // Inner box lines
    drawLine(width * 0.38, 0, width * 0.38, height * 0.4, 4);
    drawLine(width * 0.62, 0, width * 0.62, height * 0.4, 4);

    // 3 point line, before arc
    drawLine(width * 0.06, 0, width * 0.06, height * 0.3, 4);
    drawLine(width * 0.94, 0, width * 0.94, height * 0.3, 4);

    // Restricted area (semi-circle below the basket)
    const restrictedRadius = width * 0.08;
    const restrictedArea = d3.arc()
        .innerRadius(restrictedRadius)
        .outerRadius(restrictedRadius)
        .startAngle(Math.PI)
        .endAngle(2 * Math.PI);

    svg.append("path")
        .attr("d", restrictedArea)
        .attr("transform", `translate(${width / 2}, ${height * 0.125}) rotate(-90)`)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);

    // Basketball rim
    svg.append("circle")
        .attr("cx", width / 2)
        .attr("cy", height * 0.125)
        .attr("r", width * 0.015)
        .style("fill", "none")
        .style("stroke", "#FFA500")
        .style("stroke-width", 4);

    // Backboard
    drawLine(width * 0.44, height * 0.11, width * 0.56, height * 0.11, 4);

    // Free throw arc
    svg.append("path")
        .attr("d", basket)
        .attr("transform", `translate(${width / 2}, ${height * 0.125}) rotate(-90)`)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);

    // 3 point arc
    const threePointRadius = width * 0.4;
    const threePointArc = d3.arc()
        .innerRadius(threePointRadius)
        .outerRadius(threePointRadius)
        .startAngle(Math.acos((width * 0.06) / threePointRadius))
        .endAngle(Math.PI * 2 - Math.acos((width * 0.06) / threePointRadius));

    svg.append("path")
        .attr("d", threePointArc)
        .attr("transform", `translate(${width / 2}, ${height * 0.125}) rotate(-90)`)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);

    // Center circle
    const centerCircleRadius = width * 0.12;
    svg.append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", centerCircleRadius)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);

    const innerCenterCircleRadius = width * 0.04;
    svg.append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", innerCenterCircleRadius)
        .style("fill", "none")
        .style("stroke", "#333")
        .style("stroke-width", 4);

    return svg;
}


// export default drawHalfCourt;