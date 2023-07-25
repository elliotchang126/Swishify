export function zoneData(player) {
    let playerData = require(`../../assets/year_stats/${player}-23.json`);

    let playerZones = playerData.reduce((acc, shot) => {
        let key = `${shot.SHOT_ZONE_BASIC}-${shot.SHOT_ZONE_AREA}`;
        if (!acc[key]) {
            acc[key] = {
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
    console.log(playerZones)
    return playerZones;
};


export function drawBarChart(player1, player2) {
    
}