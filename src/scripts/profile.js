// generates the player profile information
export function writeProfile(player) {
    let playerDetails = require(`../../assets/player_profile/${player}.json`)
    let playerStats = require(`../../assets/player_career_stats/${player}.json`)

    const img = d3.select(".profile-image")
        .append("img")
        .attr('src', process.env.NODE_ENV !== "production" ? `./assets/player_headshots/${player}.webp` : `${window.location}/assets/player_headshots/${player}.webp`)
        .attr("width", 300);

    const body = d3.select(".profile-render")
        .append("div")
        .attr("class", "player-info")

        body.append("p")
            .attr("class", "detail")
            .text("Name:");
        body.append("P")
            .text(`${playerDetails[0]["DISPLAY_FIRST_LAST"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Position:");
        body.append("P")
            .text(`${playerDetails[0]["POSITION"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Country:");
        body.append("P")
            .text(`${playerDetails[0]["COUNTRY"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Birth Date:");
        body.append("p")
            .text(`${playerDetails[0]["BIRTHDATE"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("School:");
        body.append("p")
            .text(`${playerDetails[0]["SCHOOL"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Height:");
        body.append("p")
            .text(`${playerDetails[0]["HEIGHT"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Weight:");
        body.append("p")
            .text(`${playerDetails[0]["WEIGHT"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Team Name:");
        body.append("p")
            .text(`${playerDetails[0]["TEAM_NAME"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Jersey Number:");
        body.append("p")
            .text(`${playerDetails[0]["JERSEY"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Draft Year:");
        body.append("p")
            .text(`${playerDetails[0]["DRAFT_YEAR"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Draft Round:");
        body.append("p")
            .text(`${playerDetails[0]["DRAFT_ROUND"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Draft Number:");
        body.append("p")
            .text(`${playerDetails[0]["DRAFT_NUMBER"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Points Per Game:");
        body.append("p")
            .text(`${playerStats[0]["PTS"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Rebounds Per Game:");
        body.append("p")
            .text(`${playerStats[0]["REB"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Assists Per Game:");
        body.append("p")
            .text(`${playerStats[0]["AST"]}`);

        body.append("p")
            .attr("class", "detail")
            .text("Field Goal %:");
        body.append("p")
            .text(`${(playerStats[0]["FG_PCT"] * 100).toFixed(1)}%`);

        body.append("p")
            .attr("class", "detail")
            .text("3 Point %:");
        body.append("p")
            .text(`${(playerStats[0]["FG3_PCT"] * 100).toFixed(1)}%`);

        body.append("p")
            .attr("class", "detail")
            .text("Free Throw %:");
        body.append("p")
            .text(`${(playerStats[0]["FT_PCT"] * 100).toFixed(1)}%`);
}