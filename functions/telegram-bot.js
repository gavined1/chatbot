const TelegramBot = require('node-telegram-bot-api');
const {
    processText
} = require('./custom-library');

const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(telegramToken);

exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);

        if (body.business_message) {
            // Handle business_message updates
            console.log('Business message:', body.business_message);
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

        // Send a response if needed
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