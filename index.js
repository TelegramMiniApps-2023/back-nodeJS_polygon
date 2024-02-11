require('dotenv').config();

const express = require("express"); 
const app = express(); 

app.get("/", (req, res) => { 
    res.send("Express on Vercel"); 
}); 

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
});

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text == '/start') {
        await bot.sendMessage(chatId, '💱 Инициализация 💵 ', {
            reply_markup: {
                inline_keyboard: [
                     [{text: 'start here ⭐', switch_inline_query: webAppUrl}]
                ]
            }
        });
    }
});


// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; 

    
    bot.sendMessage(chatId, resp);
});