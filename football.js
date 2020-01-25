const axios = require("axios");
const config = require("./config");
async function getGames() {
  const { data } = await axios.get(
    "https://api.football-data.org/v2/competitions/CL/matches?status=SCHEDULED",
    {
      headers: { "X-Auth-Token": process.env.FOOTBALLKEY || config.footballKey }
    }
  );
  let games = data.matches;
  games.length = 8;
  return games;
}

module.exports.getGames = getGames;
