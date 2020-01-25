const axios = require("axios");
const config = require("./config");

//cats block
async function getCats() {
  const {
    data
  } = await axios.get(
    "https://api.thecatapi.com/v1/images/search?size=small&limit=10",
    { headers: { "x-api-key": process.env.CATSKEY || config.catsKey } }
  );
  let catsImages = [];
  data.forEach(cat => catsImages.push(cat.url));
  return catsImages;
}

module.exports.getCats = getCats;
