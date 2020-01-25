const axios = require("axios");

async function getCurrency() {
  const { data } = await axios.get(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
  );
  return data;
}

module.exports.getCurrency = getCurrency;
