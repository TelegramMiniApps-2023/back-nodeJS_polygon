require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const webhookPath = "/api";

const bot = new TelegramBot(token);
const webhookUrl = `https://back-node-js-polygon.vercel.app${webhookPath}`;
bot.setWebHook(webhookUrl);

app.post(webhookPath, (req, res) => {
  const updates = req.body;
  bot.processUpdate(updates);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

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
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
