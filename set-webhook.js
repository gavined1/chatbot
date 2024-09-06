require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token);

const url = process.env.APP_URL || 'https://magenta-vacherin-fcf7f7.netlify.app';
bot.setWebHook(`${url}/.netlify/functions/telegram-bot`);

console.log('Webhook has been set.');