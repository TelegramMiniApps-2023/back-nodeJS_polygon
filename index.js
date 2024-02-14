require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text == "/start") {
    await bot.sendMessage(chatId, "💱 Кнопка под текстом (inline) 💵", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Open web app", web_app: { url: webAppUrl } }],
        ],
      },
    });
    // await bot.sendMessage(chatId, "💱 Нижняя кнопка (keyboard) 💵", {
    //   reply_markup: {
    //     keyboard: [[{ text: "Open web app", web_app: { url: webAppUrl } }]],
    //   },
    // });
  }
});

// Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const resp = match[1];

//   bot.sendMessage(chatId, resp);
// });

// const PORT = process.env.PORT || 3000;
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const webhookUrl = "https://back-node-js-polygon.vercel.app/";
bot.setWebHook(webhookUrl);
