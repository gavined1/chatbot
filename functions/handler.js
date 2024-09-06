const TelegramBot = require('node-telegram-bot-api');
const {
    processText
} = require('./custom-library');

const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(telegramToken);

exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);

        // Handle different types of updates
        if (body.message) {
            // Standard message update
            const chatId = body.message.chat.id;
            const userMessage = body.message.text;

            // Process the user's message
            const reply = processText(userMessage);

            // Send the response back to the user
            await bot.sendMessage(chatId, reply);
        } else if (body.business_message) {
            // Handle business_message updates
            console.log('Business message:', body.business_message);

            // Optionally, you can send a response or take some action based on the business message
        } else if (body.edited_business_message) {
            // Handle edited_business_message updates
            console.log('Edited business message:', body.edited_business_message);
        } else if (body.deleted_business_message) {
            // Handle deleted_business_message updates
            console.log('Deleted business message:', body.deleted_business_message);
        } else if (body.business_connection) {
            // Handle BusinessConnection updates
            const connection = body.business_connection;
            console.log('Business connection:', connection);

            // Check if the bot can reply
            if (connection.can_reply) {
                console.log('Bot can reply on behalf of the business account');
            }
        }

        // Return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'Update processed'
            }),
        };
    } catch (error) {
        console.error('Error handling update:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to process update'
            }),
        };
    }
};