require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const nlp = require('compromise');
const stringSimilarity = require('string-similarity');
const dataset = require('./data.js'); // Import the dataset from data.js

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {
    polling: true
}); // Enable polling to receive updates

// Function to find the best response from the dataset
function findBestResponse(input) {
    // Normalize and process the input with NLP
    const normalizedInput = nlp(input).normalize().out('text');

    // Extract just the texts (patterns) from the dataset
    const patterns = dataset.map(item => item.pattern);

    // Find the closest matching pattern using string similarity
    const bestMatch = stringSimilarity.findBestMatch(normalizedInput, patterns);

    // Get the best match response
    const responseIndex = bestMatch.bestMatchIndex;
    return dataset[responseIndex]?.response || "Sorry, I didn't understand that.";
}

// Listen for incoming messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;

    // Find the best response
    const response = findBestResponse(userMessage);

    // Send the response to the user
    bot.sendMessage(chatId, response);
});

console.log('Bot is up and running...');