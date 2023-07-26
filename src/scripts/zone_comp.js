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
    console.log(Object.values(playerZones))
    return Object.values(playerZones);
};


export function drawBarChart(player1, player2) {
    player1 = zoneData(player1);
    player2 = zoneData(player2);

    const zones = ["Above the Break 3", "Backcourt", "In the Paint (Non-RA", "Left Corner 3", "Mid-Range", "Restricted Area", "Right Corner 3"];

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
    const margin = {top: 20, right: 20, bottom: 100, left: 50};

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

        const x = d3.scaleBand()
            .domain(player1.map( d => d.SHOT_ZONE_BASIC ))
            .range([margin.left, width - margin.right])
            .paddingInner(0.3)
            .paddingOuter(0.2); 

        const x1 = d3.scaleBand()
            .domain([player1, player2])
            .rangeRound([0, x.bandwidth()])
            .paddingInner(0.2)
            .paddingOuter(0.3);

        const y = d3.scaleLinear()
            .domain([0, Math.max(d3.max(player1, d => d.FG_PCT), d3.max(player2, d => d.FG_PCT))]).nice()
            .range([height - margin.bottom, margin.top]);

        svg.append('g')
            .attr('transform', "translate(0," + (height - margin.bottom) + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0) rotate(-45)")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("text-anchor", "end");

        svg.append("g")
            .attr("transform", "translate(" + margin.left + ",0)")
            .call(d3.axisLeft(y))
            .style("font-size", "12px")
            .style("font-weight", "bold");
        
        svg.append("g")
            .selectAll("rect")
            .data(player1)
            .enter()
            .append("rect")
            .attr("x", d => x(d.SHOT_ZONE_BASIC))
            .attr("y", d => y(d.FG_PCT))
            .attr("width", x1.bandwidth())
            .attr("height", d => y(0) - y(d.FG_PCT))
            .style("stroke", "black")
            .attr("fill", "green");

        svg.append("g")
            .selectAll("rect")
            .data(player2)
            .enter()
            .append("rect")
            .attr("x", d => x(d.SHOT_ZONE_BASIC) + x1.bandwidth())
            .attr("y", d => y(d.FG_PCT))
            .attr("width", x1.bandwidth())
            .attr("height", d => y(0) - y(d.FG_PCT))
            .style("stroke", "black")
            .attr("fill", "red");

    return svg
}
// export function drawBarChart(player1, player2) {
//     player1 = zoneData(player1);
//     player2 = zoneData(player2);

//     player1 = zones.map(zone => {
    //         const data1 = player1.find(d => d.ZONE === zone);
    //         return data1 ? data1 : {ZONE: zone, FG_PCT: 0 }
    //     })
    
    //     player2 = zones.map(zone => {
        //         const data2 = player2.find(d => d.ZONE === zone);
        //         return data2 ? data2 : {ZONE: zone, FG_PCT: 0 }
        //     })
        
        //     const width = 800;
        //     const height = 600;
        //     const margin = {top: 20, right: 20, bottom: 200, left: 130};
        
        //     const svg = d3.select(".shot-chart")
        //         .append("svg")
        //         .attr("width", width)
        //         .attr("height", height);
        
        //     svg.append("rect")
        //         .attr("width", "100%")
        //         .attr("height", "100%")
        //         .attr("fill", "lightgray")
        //         .style('stroke', "black")
        //         .style("stroke-width", 4)
        //         .attr("opacity", 0.7);
        
        // //* converts data into positions. x is for the x-axis (zones), x1 is like a nested scale to make room for both data sets. y for the field goal %
        
        //     const x = d3.scaleBand()
        //         .domain(player1.map(function(d) { return d.ZONE; }))
        //         .range([margin.left, width - margin.right])
        //         .padding(0.1);
        
        //     const x1 = d3.scaleBand()
        //         .domain(['player1', 'player2'])
        //         .rangeRound([0, x.bandwidth()])
        //         .padding(0.05);
        
        //     const y = d3.scaleLinear()
        // .domain([0, Math.max(d3.max(player1, function(d) { return d.FG_PCT; }), d3.max(player2, function(d) { return d.FG_PCT; }))]).nice()
        //         .range([height - margin.bottom, margin.top]);
        
        // //* sets up the x axis. need to rotate for readability.
        //     svg.append("g")
                // .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        //         .call(d3.axisBottom(x))
        //         .selectAll("text")
        //         .attr("transform", "translate(-10,0)rotate(-45)")
        //         .style("font-size", "12px")
        //         .style("font-weight", "bold")
        //         .style("text-anchor", "end");
        
        // //* sets up the y-axis
        //     svg.append("g")
        //         .attr("transform", "translate(" + margin.left + ",0)")
        //         .call(d3.axisLeft(y))
        //         .style("font-size", "12px")
        //         .style("font-weight", "bold");
        
        
        // //* create the actual data bars. x axis pos, y height. 
        //     svg.append("g")
        //         .selectAll("rect")
        //         .data(player1)
        //         .enter().append("rect")
        //             .attr("x", function(d) { return x(d.ZONE); })
        //             .attr("y", function(d) { return y(d.FG_PCT); })
        //             .attr("width", x1.bandwidth())
        //             .attr("height", function(d) { return y(0) - y(d.FG_PCT); })
        //             .style("stroke", "black")
        //             .attr("fill", "green");
        
        //     svg.append("g")
        //         .selectAll("rect")
        //         .data(player2)
        //         .enter().append("rect")
        //             .attr("x", function(d) { return x(d.ZONE) + x1.bandwidth(); }) // Shift bars to the right
        //             .attr("y", function(d) { return y(d.FG_PCT); })
        //             .attr("width", x1.bandwidth())
        //             .attr("height", function(d) { return y(0) - y(d.FG_PCT); })
        //             .style("stroke", "black")
        //             .attr("fill", "red"); // Change color for second dataset
        // }
        //     const zones = 
        //     ["Above the Break 3-Back Court(BC)",
        //     "Above the Break 3-Center(C)",
        //     "Above the Break 3-Left Side Center(LC)",
        //     "Above the Break 3-Right Side Center(RC)",
        //     "Backcourt-Back Court(BC)",
        //     "In The Paint (Non-RA)-Center(C)",
        //     "In The Paint (Non-RA)-Center(C)",
        //     "In The Paint (Non-RA)-Left Side(L)",
        //     "In The Paint (Non-RA)-Right Side(R)",
        //     "Left Corner 3-Left Side(L)",
        //     "Mid-Range-Center(C)",
        //     "Mid-Range-Center(C)",
        //     "Mid-Range-Left Side Center(LC)",
        //     "Mid-Range-Left Side(L)",
        //     "Mid-Range-Left Side(L)",
        //     "Mid-Range-Right Side Center(RC)",
        //     "Mid-Range-Right Side(R)",
        //     "Mid-Range-Right Side(R)",
        //     "Restricted Area-Center(C)",
        //     "Right Corner 3-Right Side(R)"
        //     ];