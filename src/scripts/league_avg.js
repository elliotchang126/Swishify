import { zoneData } from "./zone_comp";

function leagueAverage() {
    let league = require("../../assets/league_average.json");
    // inject. creates object with that groups the FGA and FGM by shot zone basic
    let leagueZones = league.reduce((acc, shot) => {
        let key = `${shot.SHOT_ZONE_BASIC}`
        if (!acc[key]) {
            acc[key] = {
                SHOT_ZONE_BASIC: shot.SHOT_ZONE_BASIC,
                FGA: 0,
                FGM: 0
            }
        }
        acc[key].FGA += shot.FGA;
        acc[key].FGM += shot.FGM;
        return acc;
    }, {});
    for (let zone in leagueZones) {
        let fgm = leagueZones[zone].FGM;
        let fga = leagueZones[zone].FGA;
        leagueZones[zone].FG_PCT = parseFloat((fgm / fga).toFixed(3));
    }
    return Object.values(leagueZones)   // not sure why but it was given an error before when i was just returning leagueZones
}

export function drawEfficiencyChart(player1) {
    const player1Info = require(`../../assets/player_profile/${player1}.json`);
    // for legend later
    const players = [{name: player1Info[0].DISPLAY_FIRST_LAST, color: "green"}, {name: "League Average", color: 'red'}];
    player1 = zoneData(player1);
    let player2 = leagueAverage()
    
    // define zones. not all players had a backcourt value
    const zones = ["Above the Break 3", "Backcourt", "In The Paint (Non-RA)", "Left Corner 3", "Mid-Range", "Restricted Area", "Right Corner 3"];
    
    // if zone does not exist for player, reassign player var with fg_pct = 0 in zones that are falsey
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
            .attr("opacity", .9);
        
            // set the x axis
        const x = d3.scaleBand()
            .domain(player1.map( d => d.SHOT_ZONE_BASIC )) // zones are the domain
            .range([margin.left, width - margin.right]) // starts at margin, ends at start of margin right
            .paddingInner(0.3)      // padding between bars
            .paddingOuter(0.2); 

            // sets positions for player1 and player2 on x axis
        const x1 = d3.scaleBand()
            .domain([player1, player2])
            .rangeRound([0, x.bandwidth()]) // sets range to x's width
            .paddingInner(0.2)      //padding between bars
            .paddingOuter(0.3);

            // sets up y axis, 0 to max value of either player. nice makes it end on round values
        const y = d3.scaleLinear()
            .domain([0, Math.max(d3.max(player1, d => d.FG_PCT), d3.max(player2, d => d.FG_PCT))]).nice()
            .range([height - margin.bottom, margin.top]); // range of y axis

            // adds x axis to svg
        svg.append('g') // g is for grouping related elements
            .attr('transform', `translate(0, ${height - margin.bottom})`) //places at chart bottom, before the margin
            .call(d3.axisBottom(x))  // creates axis using x var. built in.
            .selectAll("text")
            .attr("transform", "translate(-10,0) rotate(-45)") // too long rip
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .style("text-anchor", "end");

            // adds y axis to svg
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(20).tickFormat(d3.format(".0%"))) // add more ticks. 20 ticks for every 5%
            .style("font-size", "12px")
            .style("font-weight", "bold");
        
            // adds the bars for player1
        svg.append("g")
            .selectAll("rect")
            .data(player1)
            .enter()
            .append("rect")
            .attr("x", d => x(d.SHOT_ZONE_BASIC))  // places at the x for zone
            .attr("y", d => y(0))   // starts at 0
            .attr("width", x1.bandwidth())
            .attr("height", 0)
            .style("stroke", "black")
            .attr("fill", "green")
            .transition()
                .duration(1300)
                .attr("y", d => y(d.FG_PCT))    // fills to height for transition
                .attr("height", d => y(0) - y(d.FG_PCT));

                // adds the bars for player2
        svg.append("g")
            .selectAll("rect")
            .data(player2)
            .enter()
            .append("rect")
            .attr("x", d => x(d.SHOT_ZONE_BASIC) + x1.bandwidth()) //positions to right of player 1
            .attr("y", d => y(0))
            .attr("width", x1.bandwidth())
            .attr("height", 0)
            .style("stroke", "black")
            .attr("fill", "red")
            .transition()
                .duration(1500)
                .attr("y", d => y(d.FG_PCT))
                .attr("height", d => y(0) - y(d.FG_PCT));

        let legend = svg.selectAll("legend")
            .data(players)
            .enter()
            .append('g')
            .attr('class', 'bar-legend')
            .attr("transform", (d, i) => `translate(0, ${i * 20})`); //moves position
    
        legend.append("rect")
            .attr("x", width - 25)
            .attr("y", 4)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", d => d.color)    // fills box with player color
            .style("stroke", "black")
        
        legend.append("text")
            .attr("x", width - 30)
            .attr("y", 12)
            .attr("class", "bar-legend-text")
            .attr("dy", "0.35em") //  makes font adjust based on size
            .style("text-anchor", "end")
            .text(d => d.name); //sets player name for legend

    return svg
}