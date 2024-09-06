const TelegramBot = require('node-telegram-bot-api');
const {
    processText
} = require('./custom-library');

// Replace with your actual Telegram bot token
const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(telegramToken);

exports.handler = async (event, context) => {
    try {
        // Parse the incoming Telegram message
        const body = JSON.parse(event.body);
        const chatId = body.message.chat.id;
        const userMessage = body.message.text;

        // Process the message using the custom library
        const reply = processText(userMessage);

        // Send the response back to the user
        await bot.sendMessage(chatId, reply);

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'Message sent'
            }),
        };
    } catch (error) {
        console.error('Error handling message:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to send message'
            }),
        };
    }
};