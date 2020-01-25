const TelegramBot = require("node-telegram-bot-api");
const { getCats } = require("./cats");
const { getGames } = require("./football");
const { getNews } = require("./news");
const { getCurrency } = require("./currency");
const { getMovies } = require("./movies");
const { getCinema } = require("./cinema");
const { getSurf } = require("./surf");
const config = require("./config");

//bot block
let TOKEN = process.env.TOKEN || config.token;
let location;
const bot = new TelegramBot(TOKEN, { polling: true });

const inline_keyboard = [
  [
    {
      text: "играй музю",
      callback_data: "audio"
    },
    {
      text: "покажи кота",
      callback_data: "cats"
    }
  ],
  [
    {
      text: "посмотреть шо там по лиге чемпиков",
      callback_data: "CLGame"
    }
  ],
  [
    {
      text: "посмотреть шо по новостям",
      callback_data: "news"
    }
  ],
  [
    {
      text: "Поговорить",
      callback_data: "talk"
    }
  ],
  [
    {
      text: "Покажи шо в кино",
      callback_data: "loc"
    }
  ],
  [
    {
      text: "Шо там surfing? ",
      callback_data: "surf"
    }
  ]
];
bot.on("polling_error", err => console.log(err));
/// ON LOCATION
bot.on("location", msg => {
  location = msg.location;
  let region = "US";
  if (msg.from.language_code !== "en") {
    region = "UA";
  }
  getMovies(region).then(data => {
    data.map(movie => {
      bot.sendPhoto(
        msg.chat.id,
        `http://image.tmdb.org/t/p/w154${movie.poster_path}`,
        {
          caption: `${movie.title}
        рейтинг: ${movie.vote_average}
        релиз: ${movie.release_date}`
        }
      );
    });
  });
  setTimeout(() => {
    bot.sendMessage(msg.chat.id, "найти тебе кинотеатры рядом?", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "да, покаши шо тут рядом", callback_data: "cinemas" },
            { text: "не, дядя, ненадо", callback_data: "close" }
          ]
        ]
      }
    });
  }, 2000);
});
/// ON MESSAGE
bot.on("text", msg => {
  const id = msg.chat.id;
  //   console.log(msg);
  if (msg.text.includes("курс")) {
    getCurrency().then(currency => {
      bot.sendMessage(
        id,
        "💳ищу курсик такой шоб тебе понравился, по Привату🏦"
      );
      setTimeout(() => {
        currency.map(cur => {
          bot.sendMessage(
            id,
            `💲${cur.base_ccy} - ${cur.ccy}💰
                 покупка ${cur.buy}
                 продажа ${cur.sale} `
          );
        });
      }, 1500);
    });
  } else if (msg.text.includes("жизнь")) {
    setTimeout(() => {
      bot.sendMessage(
        id,
        "🚬 я пока не готов за жизь говорить, но ты помни братишка, я с тобой)",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "шутка",
                  callback_data: "joke"
                }
              ]
            ]
          }
        }
      );
    }, 600);
  } else if (msg.text.includes("всякое")) {
    setTimeout(() => {
      bot.sendMessage(
        id,
        "🚬 ну за всякое можна и поговорить, давай будем вспоминать, знаешь Саню Андреасяна?",
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "да",
                  callback_data: "Andreasyan"
                }
              ]
            ]
          }
        }
      );
    }, 600);
  } else {
    bot.sendMessage(id, "ля шо можем >>💪", {
      reply_markup: { inline_keyboard }
    });
  }
});

bot.on("callback_query", query => {
  const { chat } = query.message;
  const { first_name } = query.from;
  switch (query.data) {
    case "audio":
      bot.sendMessage(chat.id, "loading file....");
      let random = Math.floor(Math.random() * 13);
      bot.sendAudio(
        chat.id,
        `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${random}.mp3`,
        { caption: "this is just to fucking chill!" }
      );
      break;
    case "cats":
      bot.sendMessage(chat.id, "жди, гружу кота, он тежелый");
      getCats().then(catsImages =>
        bot.sendPhoto(
          chat.id,
          catsImages[Math.floor(Math.random() * catsImages.length)],
          {
            caption: `${first_name}, нравиться? нажми еще раз, будет другой`,
            reply_markup: { inline_keyboard }
          }
        )
      );
      break;
    case "CLGame":
      bot.sendMessage(chat.id, "жди,сча какраз сам хотел посмотреть...");
      getGames().then(games => {
        bot.sendMessage(chat.id, `Ближайшие 8 дядя:`);
        setTimeout(() => {
          games.forEach(game => {
            bot.sendMessage(
              chat.id,
              `📅${new Date(game.utcDate).toUTCString()} 
                ⚽ ${game.stage}
                🏳 ${game.homeTeam.name} |  🚩${game.awayTeam.name}`
            );
          });
        }, 2000);
        setTimeout(() => {
          bot.sendMessage(chat.id, `шо дальше? 🚬`, {
            reply_markup: { inline_keyboard }
          });
        }, 4000);
      });
      break;
    case "news":
      bot.sendMessage(chat.id, "Ди-НА-МО! счас подгружу, сек...🏋️");
      getNews().then(news => {
        news.forEach(article => {
          bot.sendPhoto(chat.id, article.img, {
            caption: `${article.title}
                    ${article.link}`
          });
        });
        setTimeout(() => {
          bot.sendMessage(
            chat.id,
            "Новости предоставлены Вгороде Киев, всегда пожалуйста😍... почитай пока, а потом давай ещё нажимай шото ",
            {
              reply_markup: { inline_keyboard }
            }
          );
        }, 3000);
      });
      break;
    case "talk":
      bot.sendMessage(chat.id, "oй...дядя");
      setTimeout(() => {
        bot.sendMessage(chat.id, "🚬");
      }, 2000);
      setTimeout(() => {
        bot.sendMessage(chat.id, "за шо ты хочешь говорить?");
      }, 2400);
      break;
    case "joke":
      setTimeout(() => {
        bot.sendMessage(
          chat.id,
          `🚬"Двое мужчин играют в гольф. Вдруг они видят, что на дороге рядом с полем появляется похоронная процессия. Один из мужчин застывает в момент удара, снимает кепку, закрывает глаза и кланяется. Его друг говорит: "Ничего себе, это самый трогательный жест, который я когда-либо видел. Вы, наверняка, очень добрый человек". Другой отвечает: "Да, мы были женаты 35 лет"`
        );
      }, 1500);
      break;
    case "Andreasyan":
      setTimeout(() => {
        bot.sendMessage(chat.id, `🚬 ну он деректор карочь... =)`);
      }, 1500);
      break;
    case "loc":
      bot.sendMessage(chat.id, "Отправь локацию", {
        reply_markup: {
          one_time_keyboard: true,
          keyboard: [
            [
              {
                text: "location",
                request_location: true
              }
            ]
          ]
        }
      });
      break;
    case "cinemas":
      getCinema(location.latitude, location.longitude).then(data => {
        data.map(cinema => {
          bot.sendMessage(
            chat.id,
            `📽️${cinema.cinema_name}
                          ${cinema.address}, ${cinema.city}
                          
                         может телефон узнает и это будет кликабильно ${cinema.lat}, ${cinema.lng}
                          `
          );
        });
      });
      break;
    case "close":
      bot.sendMessage(chat.id, "понял, не безпокою", {
        reply_markup: {
          remove_keyboard: true
        }
      });
      break;
    case "surf":
      bot.sendMessage(
        chat.id,
        `${first_name}, шо хочешь серфить?..минуту... 🏋️`
      );
      getSurf().then(data => {
        data.map(place => {
          bot.sendMessage(
            chat.id,
            `📢 ${place.placeName}
                🗿${place.generalCondition}
                🌡️ Air: ${place.airTemp} | Water: ${place.waterTemp}
                💨 ${place.wind} ${place.windDescription}
                🌊tide: ${place.tide} ${place.tideDescription}
                🏄‍♂️ surf height: ${place.surfHigh} ${place.surfDescription}
                🌴 webcam: ${place.link}
                `,
            { disable_web_page_preview: true }
          );
        });
      });
      break;
    case "test":
      break;
  }
});
