require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = 3000;

app.use(express.json());

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, { polling: true });

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const inline_query_id = msg.inline_query_id;
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
