export function zoneChart() {
    
    let svg = d3.select(".shot-chart")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);
  
  // Define a D3 path generator
//   let path = d3.path();
  
// //   Draw the first parallel line
//   path.moveTo(100, 100);  // Move the pen to the starting point of the first line
//   path.lineTo(300, 100);  // Draw a line to this point
  
//   // Draw the first arc connecting the first line to the second line
//   // We're drawing a clockwise arc with radius 50
//   path.arcTo(350, 150, 300, 200, 50);
  
//   // Draw the second parallel line
//   path.lineTo(100, 200);  // Draw a line to this point
  
//   // Draw the second arc connecting the second line back to the first line
//   // We're drawing a counter-clockwise arc with radius 50
//   path.arcTo(50, 150, 100, 100, 50);
  
//   // Close the path
//   path.closePath();
  
//   // Append the path to the SVG
//   svg.append("path")
//     .attr("d", path.toString())
//     .attr("stroke", "black")
//     .attr("fill", "green");

}