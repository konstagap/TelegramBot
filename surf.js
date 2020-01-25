var cheerio = require("cheerio");
var axios = require("axios");

function getData(data) {
  var $ = cheerio.load(data);
  const surfHigh = $(
    "#root > div > div > div > div > div.sl-spot-current-conditions-section.sl-spot-current-conditions-section--with-cam.sl-spot-current-conditions-section--with-report.sl-spot-current-conditions-section--free.sl-spot-current-conditions-section--multi-cam > div:nth-child(2) > div.quiver-spot-module.quiver-spot-module--with-cam.quiver-spot-module--multi-cam > div > div.quiver-spot-report__content-wrapper > div.quiver-spot-report__condition-values.quiver-spot-report__condition-values--with-report > div > div.quiver-spot-forecast-summary__wrapper > div:nth-child(1) > div > span"
  ).text();
  const surfDescription = $(
    "#root > div > div > div > div > div.sl-spot-current-conditions-section.sl-spot-current-conditions-section--with-cam.sl-spot-current-conditions-section--with-report.sl-spot-current-conditions-section--free.sl-spot-current-conditions-section--multi-cam > div:nth-child(2) > div.quiver-spot-module.quiver-spot-module--with-cam.quiver-spot-module--multi-cam > div > div.quiver-spot-report__content-wrapper > div.quiver-spot-report__condition-values.quiver-spot-report__condition-values--with-report > div > div.quiver-spot-forecast-summary__wrapper > div:nth-child(1) > div > div.quiver-wave-summary > span"
  ).text();
  const tide = $(
    "#root > div > div > div > div > div.sl-spot-current-conditions-section.sl-spot-current-conditions-section--with-cam.sl-spot-current-conditions-section--with-report.sl-spot-current-conditions-section--free.sl-spot-current-conditions-section--multi-cam > div:nth-child(2) > div.quiver-spot-module.quiver-spot-module--with-cam.quiver-spot-module--multi-cam > div > div.quiver-spot-report__content-wrapper > div.quiver-spot-report__condition-values.quiver-spot-report__condition-values--with-report > div > div.quiver-spot-forecast-summary__wrapper > div:nth-child(2) > div > div.quiver-conditions-stats__stat-reading > span"
  ).text();
  const tideDescription = $(
    "#root > div > div > div > div > div.sl-spot-current-conditions-section.sl-spot-current-conditions-section--with-cam.sl-spot-current-conditions-section--with-report.sl-spot-current-conditions-section--free.sl-spot-current-conditions-section--multi-cam > div:nth-child(2) > div.quiver-spot-module.quiver-spot-module--with-cam.quiver-spot-module--multi-cam > div > div.quiver-spot-report__content-wrapper > div.quiver-spot-report__condition-values.quiver-spot-report__condition-values--with-report > div > div.quiver-spot-forecast-summary__wrapper > div:nth-child(2) > div > span"
  ).text();
  const wind = $(
    "#root > div > div > div > div > div.sl-spot-current-conditions-section.sl-spot-current-conditions-section--with-cam.sl-spot-current-conditions-section--with-report.sl-spot-current-conditions-section--free.sl-spot-current-conditions-section--multi-cam > div:nth-child(2) > div.quiver-spot-module.quiver-spot-module--with-cam.quiver-spot-module--multi-cam > div > div.quiver-spot-report__content-wrapper > div.quiver-spot-report__condition-values.quiver-spot-report__condition-values--with-report > div > div.quiver-spot-forecast-summary__wrapper > div:nth-child(3) > div > div.quiver-conditions-stats__stat-reading > span"
  ).text();
  const windDescription = $(
    "#root > div > div > div > div > div.sl-spot-current-conditions-section.sl-spot-current-conditions-section--with-cam.sl-spot-current-conditions-section--with-report.sl-spot-current-conditions-section--free.sl-spot-current-conditions-section--multi-cam > div:nth-child(2) > div.quiver-spot-module.quiver-spot-module--with-cam.quiver-spot-module--multi-cam > div > div.quiver-spot-report__content-wrapper > div.quiver-spot-report__condition-values.quiver-spot-report__condition-values--with-report > div > div.quiver-spot-forecast-summary__wrapper > div:nth-child(3) > div > span"
  ).text();
  const waterTemp = $(
    "#root > div > div > div > div > div.sl-spot-current-conditions-section.sl-spot-current-conditions-section--with-cam.sl-spot-current-conditions-section--with-report.sl-spot-current-conditions-section--free.sl-spot-current-conditions-section--multi-cam > div:nth-child(2) > div.quiver-spot-module.quiver-spot-module--with-cam.quiver-spot-module--multi-cam > div > div.quiver-spot-report__content-wrapper > div.quiver-spot-report__condition-values.quiver-spot-report__condition-values--with-report > div > div.quiver-wetsuit-recommender > div.quiver-wetsuit-recommender__conditions > div.quiver-water-temp > div"
  ).text();
  const airTemp = $(
    "#root > div > div > div > div > div.sl-spot-current-conditions-section.sl-spot-current-conditions-section--with-cam.sl-spot-current-conditions-section--with-report.sl-spot-current-conditions-section--free.sl-spot-current-conditions-section--multi-cam > div:nth-child(2) > div.quiver-spot-module.quiver-spot-module--with-cam.quiver-spot-module--multi-cam > div > div.quiver-spot-report__content-wrapper > div.quiver-spot-report__condition-values.quiver-spot-report__condition-values--with-report > div > div.quiver-wetsuit-recommender > div.quiver-wetsuit-recommender__conditions > div.quiver-weather-stats > div"
  ).text();
  const generalCondition = $(".quiver-colored-condition-bar").text();
  const shortForcast = $(
    "#root > div > div > div > div > div.sl-spot-current-conditions-section.sl-spot-current-conditions-section--with-cam.sl-spot-current-conditions-section--with-report.sl-spot-current-conditions-section--free.sl-spot-current-conditions-section--multi-cam > div:nth-child(2) > div.quiver-spot-module.quiver-spot-module--with-cam.quiver-spot-module--multi-cam > div > div.quiver-spot-report__content-wrapper > div.quiver-spot-report__report-text > div:nth-child(2) > p:nth-child(2)"
  ).text();
  const placeName = $(
    "#root > div > div > div > div > div.quiver-content-container > div > div.sl-forecast-header__main > h1"
  ).text();

  let result = {
    placeName,
    generalCondition,
    shortForcast,
    airTemp,
    waterTemp,
    wind,
    windDescription,
    tide,
    tideDescription,
    surfHigh,
    surfDescription
  };
  return result;
}

async function getSurf() {
  const scrippsData = await axios.get(
    "https://www.surfline.com/surf-report/scripps/5842041f4e65fad6a7708839"
  );
  const torreyPinesData = await axios.get(
    "https://www.surfline.com/surf-report/torrey-pines-state-beach/584204204e65fad6a7709994"
  );
  const tourmalineData = await axios.get(
    "https://www.surfline.com/surf-report/pacific-beach/5842041f4e65fad6a7708841"
  );

  const scripps = getData(scrippsData.data);
  scripps.link =
    "https://www.surfline.com/surf-report/scripps/5842041f4e65fad6a7708839";
  const tourmaline = getData(tourmalineData.data);
  tourmaline.link =
    "https://www.surfline.com/surf-report/pacific-beach/5842041f4e65fad6a7708841";
  const torreyPines = getData(torreyPinesData.data);
  torreyPines.link =
    "https://www.surfline.com/surf-report/torrey-pines-state-beach/584204204e65fad6a7709994";

  let finalData = [scripps, tourmaline, torreyPines];

  return finalData;
}

module.exports.getSurf = getSurf;
