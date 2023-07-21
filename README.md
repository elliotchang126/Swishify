# Swishify

## A Shot Chart Visualizer for 2023 All-NBA Players

## Background
Swishify is a data visualizer for All-NBA players for the 2023 season. The purpose is to be able to compare where these top players like to shoot from. It has the following elements:

- Player Profile
- Shot Chart (Field Goals Made and Missed)
- Efficiency to League Average Zone Chart
- Player Comparison Zone Chart

The base functionality of the website is to allow users to view shot data of a player or between players, as well as their profile.

## Functionality & MVPs

Using Swishify, users will be able to view:

1. A player's profile, with details about the player themselves
2. A player's shot chart from the 2022-23 season
3. A zone chart which color codes where a player shot higher than the league average
4. A comparison zone chart which color codes where one player was more effective than the other
5. Toggle between players and charts with buttons and/or dropdowns

Additionally, this project will include:
- An instructions tab to view details on how to utilize the site
- A production README

## Wireframes

<p align="center">
    <img src="assets/homepage.png" alt="show-page" width="800">
</p>

- Instruction tab with details on how to use the site
- Github and Linkedin links on the top right
- On the left, the player information renders information about a player, selected in the player selector box below
- On the right, the shot chart renders a half court with depending on the selectors utilized below. The player 2 box should be greyed out if comparison is not selected

## Technologies, Libraries, and APIs

The project will be implemented with the following technologies:

- The NBA API is used to pull data. Due to being in Python, it is pulled first and stored as a JSON file
- The D3.js library is used to create the shot charts and zones
- Webpack and Babel is used to bundle and transpile the source Javascript code
- NPM is utilized to manage project dependencies

** Implementation Timeline

- **Friday & Weekend**: Complete setup for the project. Pull all the data required from the API. Spend time learning the D3.js libary and get a basic half court rendered to show up on screen. Implement the underlying logic to render the data onto the shot chart. Ideally, the logic for all 3 charts will be completed by Sunday.
- **Monday**: Complete any remaining logic that was not done. Begin the CSS styling to make sure that the site looks presentable.
- **Tuesday**: Continue CSS styling. If managed to complete, ensure that everything works correctly with the styling.
- **Wednesday**: Review everything to make sure that the entire project is implemented correctly and nothing breaks.
- **Thursday**: Deploy to GitHub pages. Rewrite this proposal as a production README.

## Potential Bonuses

Some potential anticipated update this could eventually lead to:
- An additional render of shot selection by game
- Increasing the number of years the data is available in
- Light and Dark mode