export function zoneData(player) {
    let playerData = require(`../../assets/year_stats/${player}-23.json`);

    let playerZones = playerData.reduce((acc, shot) => {
        let key = `${shot.SHOT_ZONE_BASIC}-${shot.SHOT_ZONE_AREA}`;
        if (!acc[key]) {
            acc[key] = {
                ZONE: key,
                SHOT_ZONE_BASIC: shot.SHOT_ZONE_BASIC,
                SHOT_ZONE_AREA: shot.SHOT_ZONE_AREA,
                FGA: 0,
                FGM: 0
            }
        }
        acc[key].FGA += shot.SHOT_ATTEMPTED_FLAG;
        if (shot.SHOT_MADE_FLAG === 1) {
            acc[key].FGM += shot.SHOT_MADE_FLAG;
        }
        return acc;
    }, {});

    for (let zone in playerZones) {
        let fgm = playerZones[zone].FGM;
        let fga = playerZones[zone].FGA;
        playerZones[zone].FG_PCT = parseFloat((fgm / fga).toFixed(3));
    }
    console.log(Object.values(playerZones))
    return Object.values(playerZones);
};


export function drawBarChart(dataset1, dataset2) {
    dataset1 = zoneData(dataset1);
    dataset2 = zoneData(dataset2);

    const width = 600;
    const height = 600;
    const margin = {top: 20, right: 20, bottom: 200, left: 120};

    const svg = d3.select(".shot-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const x = d3.scaleBand()
        .domain(dataset1.map(function(d) { return d.ZONE; }))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    const x1 = d3.scaleBand()
        .domain(['dataset1', 'dataset2'])
        .rangeRound([0, x.bandwidth()])
        .padding(0.05);

    const y = d3.scaleLinear()
        .domain([0, Math.max(d3.max(dataset1, function(d) { return d.FG_PCT; }), d3.max(dataset2, function(d) { return d.FG_PCT; }))]).nice()
        .range([height - margin.bottom, margin.top]);

    svg.append("g")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(y));

    svg.append("g")
        .selectAll("rect")
        .data(dataset1)
        .enter().append("rect")
            .attr("x", function(d) { return x(d.ZONE); })
            .attr("y", function(d) { return y(d.FG_PCT); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return y(0) - y(d.FG_PCT); })
            .attr("fill", "#69b3a2");

    svg.append("g")
        .selectAll("rect")
        .data(dataset2)
        .enter().append("rect")
            .attr("x", function(d) { return x(d.ZONE) + x1.bandwidth(); }) // Shift bars to the right
            .attr("y", function(d) { return y(d.FG_PCT); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return y(0) - y(d.FG_PCT); })
            .attr("fill", "#3498db"); // Change color for second dataset
}