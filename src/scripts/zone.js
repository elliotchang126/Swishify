import { drawHalfCourt } from "./shotchart";

export function drawHexbinChart(player) {
  d3.select(".shot-chart svg").remove();

  let tooltip;
  let playerChart = require(`../../assets/year_stats/${player}-23.json`);
  let shotCoords = playerChart.filter(el => el.SHOT_MADE_FLAG === 1)
      .map(el => ([el.LOC_X + 250, el.LOC_Y + 50]));
  // console.log(playerChart)
  // console.log(shotCoords)
  const width = 500;
  const height = 450;
  const radius = 25;

  const svg = drawHalfCourt()

  
  const hexbin = d3.hexbin()
  .radius(radius)
  .extent([[0, 0], [width, height]]);
  
  const bins = hexbin(shotCoords); // collects each shot location into "bins"
  // console.log(bins)
  
  const color = d3.scaleSequentialLog(d3.interpolateInferno)  // log scale works better compared to sequential
  .domain([1, d3.max(bins, d => d.length)]); // input bounds
  
  // add hexagons
  
  svg.append("g")
  .selectAll("path")
  .data(bins)
  .join('path')
  .attr("d", hexbin.hexagon())
  .attr("transform", d => `translate(${width / 2}, ${height / 2})`)
  .attr("fill", 'white') //d => color(d.length))
  .attr("stroke", '#333')
  .attr("stroke-width", 2)
  .attr("class", "shot-hexagons")
  // .on("mouseover", ((event, d) => {
  //   const [x, y] = d3.pointer(event, svg.node());
  //   tooltip.style("display", null);
  //   tooltip.select("text").text(`FG's Made: ${d.length}`);
  //   const tooltipWidth = tooltip.node().getBBox().width;
  //   const tooltipHeight = tooltip.node().getBBox().height;
  //   const xt = Math.min(width - tooltipWidth, Math.max(0, x - tooltipWidth / 2));
  //   const yt = Math.min(height - tooltipHeight, Math.max(0, y - tooltipHeight / 2));
  //   tooltip.attr("transform", `translate(${xt}, ${yt})`);
  // }))
  // .on('mouseout', () => tooltip.style("display", "none"))
    .transition()
    .duration(1000)
    .attr("transform", d => `translate(${d.x}, ${d.y})`)
    .transition()
    .duration(1200)
    .attr("fill", d => color(d.length))
    update => update
    .duration(1200)
    .attr('fill', d => color(d.length));
    
    // add information on hover tool
    
      // tooltip = svg.append("g")
      //     .attr("class", "tooltip")
      //     .style("display", "none");
    
      // tooltip.append("rect")
      //     .attr("width", 100)
      //     .attr("height", 25)
      //     .attr("fill", 'white')
      //     .style("stroke", "black")
      //     .style("stroke-width", 2)
      //     .attr("rx", 5)
      //     .attr("ry", 5)
      //     .style("opacity", 0.8);
    
      // tooltip.append("text")
      //     .attr("x", 50)
      //     .attr("dy", "1.2em")
      //     .style("text-anchor", "middle")
      //     .attr("font-size", "12px")
      //     .attr("font-weight", "bold")
      //     .attr("class", "tooltip-text")
      //     .style("pointer-events", "none")
    
    //* items to create the legend at the bottom of the chart
    const legendScale = d3.scaleLog()
        .domain([1, d3.max(bins, d => d.length)])
        .range([0, width - 200]);

      const numLegends = 8;

      const numLegendWidth = width / (1.5 * numLegends);

      const legendHeight = 20;
      const legendMargin = 10;

      const legend = svg.append('g')
        .attr("transform", `translate(80, 410)`);

      legend.selectAll(".legend-box")
        .data(d3.range(numLegends))
        .join("rect")
        .attr("x", (d, i) => i * numLegendWidth)
        .attr("width", numLegendWidth)
        .attr("height", legendHeight)
        .attr("fill", d => color(legendScale.invert(numLegendWidth * (d + 1))))
        .attr("stroke", "black");

      legend.selectAll(".legend-label")
        .data(d3.range(numLegends))
        .join("text")
        .attr("x", (d, i) => i * numLegendWidth)
        .attr("y", legendHeight + 10)
        .attr("class", "legend-label")
        .text(d => Math.round(legendScale.invert(numLegendWidth * (d + 1))));
      
  return svg
}