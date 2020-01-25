const axios = require("axios");
const config = require("./config");

let date = new Date().toISOString();

async function getCinema(lat, lon) {
  const { data } = await axios.get(
    `https://api-gate2.movieglu.com/cinemasNearby/?n=5`,
    {
      headers: {
        client: "MYPA",
        ["x-api-key"]: process.env.CINEMAKEY || config.cinemaKey,
        authorization: "Basic TVlQQTpZQ1JsR2syM3NaT1c=",
        ["api-version"]: "v200",
        territory: "US",
        geolocation: `${lat};${lon}`,
        ["device-datetime"]: date
      }
    }
  );

  return data.cinemas;
}

module.exports.getCinema = getCinema;
