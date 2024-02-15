require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
const PORT = 3000;
const webAppUrl = process.env.WEB_APP_URL;
const domenUrl = process.env.VERCEL_URL;

const bot = new TelegramBot(token);
bot.setWebHook(`${domenUrl}/bot${token}`);
const app = express();
app.use(express.json());

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/env", (req, res) => {
  const environmentData = {
    port: PORT,
    webAppUrl: webAppUrl,
    telegramBotToken: token,
  };
  res.json(environmentData);
});

app.get("/webhook", (req, res) => {
  const webhookInfo = bot.getWebHookInfo();
  res.json(webhookInfo);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  console.log(msg);

  if (text == "/start") {
    await bot.sendMessage(chatId, "💱 Кнопка под текстом (inline) 💵", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Open web app", web_app: { url: webAppUrl } }],
        ],
      },
    });
  }

  // if (text == "pin") {
  //   await bot.pinChatMessage(chatId, msg.message_id, {
  //     disable_notification: true,
  //   });
  // }

  // if (text == "/start@abdsh_test_bot") {
  //   await bot.sendMessage(chatId, "💱 Кнопка под текстом (inline) 💵", {
  //     reply_markup: {
  //       inline_keyboard: [[{ text: "Open web app" }]],
  //     },
  //   });
  // }
});

bot.on("inline_query", async (msg) => {
  console.log(msg);
  const results = [
    {
      type: "article",
      id: "1",
      title: "RESULT 1",
      input_message_content: { message_text: "TEXT 1" },
    },
    {
      type: "article",
      id: "2",
      title: "RESULT 2",
      input_message_content: { message_text: "TEXT 2" },
    },
  ];
  await bot.answerInlineQuery(msg.id, JSON.stringify(results));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
