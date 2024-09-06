require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const nlp = require('compromise');
const stringSimilarity = require('string-similarity');
const dataset = require('./data.js'); // Import the dataset from data.js

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token);

// Function to process user messages
const processMessage = (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    console.log('Received message:', text);

    // Simple NLP processing
    const doc = nlp(text);
    const keywords = doc.nouns().out('array');

    // Find the best match from the dataset
    let bestMatch = {
        rating: 0
    };
    let bestResponse = "Sorry, I didn't understand that.";

    dataset.forEach(item => {
        item.input.forEach(input => {
            const match = stringSimilarity.compareTwoStrings(text, input);
            if (match > bestMatch.rating) {
                bestMatch = {
                    rating: match,
                    response: item.response
                };
            }
        });
    });

    if (bestMatch.rating > 0.5) {
        const responses = bestMatch.response;
        bestResponse = responses[Math.floor(Math.random() * responses.length)];
    }

    console.log('Sending response:', bestResponse);

    // Send the response back to the user
    bot.sendMessage(chatId, bestResponse);
};

// Handle incoming updates
exports.handler = async (event, context) => {
    try {
        console.log('Received event:', event);
        const body = JSON.parse(event.body);
        console.log('Parsed body:', body);
        bot.processUpdate(body);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Update processed"
            }),
        };
    } catch (error) {
        console.error('Error processing update:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Invalid JSON input"
            }),
        };
    }
};

console.log('Bot is running...');