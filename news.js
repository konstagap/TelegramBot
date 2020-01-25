const cheerio = require("cheerio");
const axios = require("axios");

async function getNews() {
  const { data } = await axios.get("https://kiev.vgorode.ua/news/");

  const $ = cheerio.load(data);

  const results = [];

  $("article").each(function(i, element) {
    const title = $(element)
      .children(".title")
      .children("a")
      .text();

    const link = $(element)
      .children(".title")
      .children("a")
      .attr("href");

    const img = $(element)
      .children(".img")
      .children("a")
      .children("img")
      .attr("data-href");

    results.push({ img: img, title: title, link: link });
  });
  return results;
}

module.exports.getNews = getNews;
