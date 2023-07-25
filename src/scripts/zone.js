import { drawHalfCourt } from "./shotchart";

export function drawHexbinChart(player) {
  d3.select(".shot-chart svg").remove();

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

  const bins = hexbin(shotCoords);
  // console.log(bins)

  const color = d3.scaleSequentialLog(d3.interpolateInferno)
      .domain([1, d3.max(bins, d => d.length)]);

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
      .transition()
      .duration(1000)
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .transition()
      .duration(1200)
      .attr("fill", d => color(d.length))
      update => update
      .duration(1200)
      .attr('fill', d => color(d.length));

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