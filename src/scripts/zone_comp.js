export function zoneData(player) {
    let playerData = require(`../../assets/year_stats/${player}-23.json`);

    let playerZones = playerData.reduce((acc, shot) => {
        let key = `${shot.SHOT_ZONE_BASIC}`;
        if (!acc[key]) {
            acc[key] = {
                SHOT_ZONE_BASIC: shot.SHOT_ZONE_BASIC,
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
    // console.log(Object.values(playerZones))
    return Object.values(playerZones);
};


export function drawBarChart(player1, player2) {
    player1 = zoneData(player1);
    player2 = zoneData(player2);

    const zones = ["Above the Break 3", "Backcourt", "In The Paint (Non-RA)", "Left Corner 3", "Mid-Range", "Restricted Area", "Right Corner 3"];

    player1 = zones.map(zone => {
        const player1Zones = player1.find(data => data.SHOT_ZONE_BASIC === zone);
        return player1Zones ? player1Zones : {SHOT_ZONE_BASIC: zone, FG_PCT: 0}
    });

    player2 = zones.map(zone => {
        const player2Zones = player2.find(data => data.SHOT_ZONE_BASIC === zone);
        return player2Zones ? player2Zones : {SHOT_ZONE_BASIC: zone, FG_PCT: 0}
    });

    const width = 600;
    const height = 600;
    const margin = {top: 20, right: 20, bottom: 110, left: 50};

    const svg = d3.select(".shot-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "lightgray")
            .attr("stroke", "black")
            .attr("stroke-width", 4)
            .attr("opacity", 0.7);

        const x = d3.scaleBand()  // divides range evenly between eles of the domain
            .domain(player1.map( d => d.SHOT_ZONE_BASIC ))
            .range([margin.left, width - margin.right])
            .paddingInner(0.3)
            .paddingOuter(0.2); 

        const x1 = d3.scaleBand()
            .domain([player1, player2])
            .rangeRound([0, x.bandwidth()]) // bandwith finds the width of each band
            .paddingInner(0.2)
            .paddingOuter(0.3);

        const y = d3.scaleLinear()   //linear scale between inp and output
            //domain is the input bounds
            .domain([0, Math.max(d3.max(player1, d => d.FG_PCT), d3.max(player2, d => d.FG_PCT))]).nice()
            //range is the output bounds
            .range([height - margin.bottom, margin.top]);

            // appending x axis
        svg.append('g')
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(x)) // built in method to create the axes
            .selectAll("text")
            .attr("transform", "translate(-10,0) rotate(-45)")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("text-anchor", "end");

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y))  // buit in method to create the axis
            .style("font-size", "12px")
            .style("font-weight", "bold");
        

        //appending player1 data to the graph
        svg.append("g")
            .selectAll("rect")
            .data(player1)
            .enter()
            .append("rect")
            .attr("x", d => x(d.SHOT_ZONE_BASIC))
            .attr("y", d => y(0))
            .attr("width", x1.bandwidth())
            .attr("height", 0)
            .style("stroke", "black")
            .attr("fill", "green")
            .transition()
                .duration(1300)
                .attr("y", d => y(d.FG_PCT))
                .attr("height", d => y(0) - y(d.FG_PCT));

        //appending player2 data to the graph    
        svg.append("g")
            .selectAll("rect")
            .data(player2)
            .enter()
            .append("rect")
            .attr("x", d => x(d.SHOT_ZONE_BASIC) + x1.bandwidth())
            .attr("y", d => y(0))
            .attr("width", x1.bandwidth())
            .attr("height", 0)
            .style("stroke", "black")
            .attr("fill", "red")
            .transition()
                .duration(1500)
                .attr("y", d => y(d.FG_PCT))
                .attr("height", d => y(0) - y(d.FG_PCT));

    return svg
}