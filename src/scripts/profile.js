

export function writeProfile(player) {
    const generalDetails = ["DISPLAY_FIRST_LAST","POSITION","COUNTRY","BIRTHDATE","SCHOOL","HEIGHT","WEIGHT","TEAM_NAME","JERSEY","DRAFT_YEAR","DRAFT_ROUND", "DRAFT_NUMBER"];
    const careerStats = ["PTS","REB","AST","FG_PCT","FG3_PCT","FT_PCT"]
    
    let playerDetails = require(`../assets/player_profile/${player}.json`)
    let playerStats = require(`../assets/player_career_stats/${player}.json`)

    const body = d3.select(".profile-render")
    .append("body")
    .attr("width", 400)
    .attr("height", 500);

    generalDetails.forEach((ele, i) => {
        body.append("p")
            .attr("class", "player-profile")
            .text(`${ele}`, `${playerDetails[0][detail]}`)
    });
}