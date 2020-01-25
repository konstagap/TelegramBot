const axios = require("axios");
const config = require("./config");

async function getMovies(region) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env
      .MOVIEKEY || config.movieKey}&language=en-US&page=1&region=${region}`
  );

  return data.results;
}

module.exports.getMovies = getMovies;
