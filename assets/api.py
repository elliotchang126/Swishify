import numpy as np
import pandas as pd
import json

#nba_api
from nba_api.stats.static import players
from nba_api.stats.endpoints import shotchartdetail
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import playerprofilev2

#player shot chart detail
def get_player_shotchartdetail(player_name, season_id):
    nba_players = players.get_players()
    player_dict = [player for player in nba_players if player['full_name'] == player_name][0]
    
    #career data
    career = playercareerstats.PlayerCareerStats(player_id=player_dict['id'])
    career_data = career.get_data_frames()[0]
    
    team_id = career_data[career_data['SEASON_ID'] == season_id]['TEAM_ID']

    shotchartlist = shotchartdetail.ShotChartDetail(team_id=team_id,
                                                    player_id=player_dict['id'],
                                                    season_type_all_star='Regular Season',
                                                    season_nullable=season_id,
                                                    context_measure_simple="FGA").get_data_frames()[0]

    # list = shotchartlist.to_dict(orient='records')
    # json_data = json.dumps(list)
    # print(json_data) 
    # print(shotchartlist)

# profile = playerprofilev2.PlayerProfileV2(per_mode36="PerGame", player_id="1628983", league_id_nullable="00").get_data_frames()[1]
# player_prof = profile.to_dict(orient='records')
# profile_json = json.dumps(player_prof)
# print(profile_json)

desc = commonplayerinfo.CommonPlayerInfo(player_id="1628369").get_data_frames()[0]
player_desc = desc.to_dict(orient='records')
desc_json = json.dumps(player_desc)
print(desc_json)

# if __name__ == "__main__":
#     get_player_shotchartdetail("Domantas Sabonis", "2022-23")

# career = playercareerstats.PlayerCareerStats(player_id='203999')
# career.get_data_frames()[0]
# print(career.get_json())
