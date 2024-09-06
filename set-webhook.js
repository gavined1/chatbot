const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token);

const webhookUrl = 'https://magenta-vacherin-fcf7f7.netlify.app/.netlify/functions/telegram-bot';

bot.setWebHook(webhookUrl).then(() => {
    console.log('Webhook set successfully');
}).catch((error) => {
    console.error('Failed to set webhook:', error);
});