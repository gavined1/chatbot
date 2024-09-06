require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const nlp = require('compromise');
const stringSimilarity = require('string-similarity');
const dataset = require('./data.js'); // Import the dataset from data.js

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {
    polling: true
});

// Function to process user messages
const processMessage = (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

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

    // Send the response back to the user
    bot.sendMessage(chatId, bestResponse);
};

// Listen for any kind of message
bot.on('message', (msg) => {
    processMessage(msg);
});

console.log('Bot is running...');