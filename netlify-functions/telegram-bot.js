require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const nlp = require('compromise');
const stringSimilarity = require('string-similarity');
const dataset = require('./data.js'); // Import the dataset from data.js

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {
    polling: false
}); // Polling disabled in production

// Function to find the best response from the dataset
function findBestResponse(input) {
    const normalizedInput = nlp(input).normalize().out('text');
    const patterns = dataset.map(item => item.pattern);
    const bestMatch = stringSimilarity.findBestMatch(normalizedInput, patterns);
    const responseIndex = bestMatch.bestMatchIndex;
    return dataset[responseIndex]?.response || "Sorry, I didn't understand that.";
}

// This is the function that will handle the incoming updates
async function handleUpdate(update) {
    if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const userMessage = update.message.text;

        const response = findBestResponse(userMessage);
        await bot.sendMessage(chatId, response);
    } else {
        console.error('Invalid update format:', update);
    }
}

// Netlify function to handle the webhook
exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
        try {
            const update = JSON.parse(event.body);
            await handleUpdate(update);

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Update handled successfully"
                }),
            };
        } catch (error) {
            console.error('Error handling update:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Failed to handle update"
                }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({
                error: "Method not allowed"
            }),
        };
    }
};

// Set webhook URL - Run this once or manually as needed
async function setWebhook() {
    const url = `https://magenta-vacherin-fcf7f7.netlify.app/.netlify/functions/telegram-bot`; // Replace with your Netlify function URL
    try {
        await bot.setWebHook(url);
        console.log('Webhook set successfully');
    } catch (error) {
        console.error('Error setting webhook:', error);
    }
}

// Uncomment to set the webhook on start (use carefully)
// setWebhook().catch(console.error);