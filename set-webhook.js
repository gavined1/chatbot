require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token);

// Replace this with your Netlify function URL
const webhookUrl = 'https://magenta-vacherin-fcf7f7.netlify.app/.netlify/functions/telegram-bot';

// Set the webhook
bot.setWebHook(webhookUrl).then(() => {
    console.log('Webhook set successfully!');
}).catch(error => {
    console.error('Failed to set webhook:', error);
});