// require("dotenv").config();
// const express = require("express");
// const TelegramBot = require("node-telegram-bot-api");

// const app = express();
// const PORT = 3000;
// app.use(express.json());

// const token = process.env.TELEGRAM_BOT_TOKEN;
// const webAppUrl = process.env.WEB_APP_URL;
// const domenUrl = process.env.VERCEL_URL;
// // const domenUrl = "https://3665-213-230-114-32.ngrok-free.app";
// const webhookPath = "/api";
// const webhookUrl = domenUrl + webhookPath;

// const bot = new TelegramBot(token);
// bot.setWebHook(webhookUrl);

// app.post(webhookPath, (req, res) => {
//   bot.processUpdate(req.body);
//   res.sendStatus(200);
// });

// app.get("/", (req, res) => {
//   res.send("Express on Vercel");
// });

// bot.on("message", async (msg) => {
//   const chatId = msg?.chat?.id;
//   const text = msg?.text;

//   try {
//     if (text == "/start") {
//       await bot.sendMessage(chatId, "💱 Кнопка под текстом (inline) 💵", {
//         reply_markup: {
//           inline_keyboard: [
//             [{ text: "Open web app", web_app: { url: webAppUrl } }],
//           ],
//         },
//       });
//     }

//     if (text == "/start@abdsh_test_bot") {
//       try {
//         await bot.sendMessage(chatId, "💱 Кнопка под текстом (inline) 💵", {
//           reply_markup: {
//             inline_keyboard: [
//               [{ text: "Open web app", web_app: { url: webAppUrl } }],
//             ],
//           },
//         });
//       } catch (error) {
//         await bot.sendMessage(
//           chatId,
//           "Я пока не научился обрабатывать запрос с группы :("
//         );
//       }
//     }

//     if (text == "/start@abdsh_test_bot") {
//       try {
//         await bot.pinChatMessage(chatId, msg.message_id, {
//           disable_notification: true,
//         });
//       } catch (error) {
//         await bot.sendMessage(
//           chatId,
//           "Нужно добавить бота в администраторы группы..."
//         );
//       }
//     }
//   } catch (error) {
//     console.error("Ошибка обработки сообщения:", error);
//   }
// });

// bot.on("inline_query", async (msg) => {
//   console.log(msg);
//   const results = [
//     {
//       type: "article",
//       id: "1",
//       title: "Какой-то текст команда №1",
//       input_message_content: { message_text: "Выполнена команда №1" },
//     },
//     {
//       type: "article",
//       id: "2",
//       title: "Какой-то текст команда №2",
//       input_message_content: { message_text: "Выполнена команда №2" },
//     },
//   ];
//   try {
//     await bot.answerInlineQuery(msg.id, JSON.stringify(results));
//   } catch (error) {
//     console.error("Ошибка обработки сообщения:", error);
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = 3000;

app.use(express.json());

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const domenUrl = process.env.VERCEL_URL;
const webhookPath = "/api";
const webhookUrl = domenUrl + webhookPath;

const bot = new TelegramBot(token);
bot.setWebHook(webhookUrl);

app.post(webhookPath, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
