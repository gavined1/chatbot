require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const nlp = require('compromise');
const stringSimilarity = require('string-similarity');

// Initialize the Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
    polling: true
});

// Load dataset
const dataset = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Normalize input text to handle cases like "Helloooo"
function normalizeInput(input) {
    // Use compromise to clean and reduce input variations
    const doc = nlp(input.toLowerCase()).normalize({
        whitespace: true,
        punctuation: true
    }).out('text');
    return doc;
}

// Function to find the best response using compromise and string similarity
function findResponse(userMessage) {
    const normalizedMessage = normalizeInput(userMessage);
    let bestMatch = {
        score: 0,
        response: "Sorry, I didn't understand that. Can you please rephrase?"
    };

    for (const item of dataset) {
        const inputVariants = Array.isArray(item.input) ? item.input : [item.input];

        for (const variant of inputVariants) {
            // Calculate similarity score between the normalized input and dataset inputs
            const score = stringSimilarity.compareTwoStrings(normalizedMessage, normalizeInput(variant));

            // Log each comparison for debugging
            console.log(`Comparing "${normalizedMessage}" with "${variant}" - Similarity Score: ${score}`);

            // Update best match if a higher similarity score is found
            if (score > bestMatch.score) {
                bestMatch.score = score;
                bestMatch.response = Array.isArray(item.response) ?
                    item.response[Math.floor(Math.random() * item.response.length)] :
                    item.response;
            }
        }
    }

    console.log(`User Message: "${userMessage}" | Matched Response: "${bestMatch.response}"`);
    return bestMatch.response;
}

// Handle /start command
bot.onText(/\/start/, (msg) => {
    console.log(`Received /start command from ${msg.from.username || 'User'} (${msg.from.id})`);
    bot.sendMessage(msg.chat.id, 'Hello! I am your AI assistant. Ask me anything!');
});

// Handle /manage command in personal chat
bot.onText(/\/manage (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const command = match[1].toLowerCase();

    try {
        switch (command) {
            case 'info':
                const chatInfo = await bot.getChat(chatId);
                bot.sendMessage(chatId, `Chat Info:
                    ID: ${chatInfo.id}
                    Title: ${chatInfo.title || 'N/A'}
                    Type: ${chatInfo.type}
                    Members Count: ${chatInfo.all_members_are_administrators ? 'All members are administrators' : 'Some members are administrators'}`);
                break;

            case 'hello':
                bot.sendMessage(chatId, 'Hi there! How can I assist you today?');
                break;

            default:
                bot.sendMessage(chatId, 'Unknown command. Use /manage info or /manage hello.');
        }
    } catch (error) {
        console.error('Error handling /manage command:', error);
        bot.sendMessage(chatId, 'An error occurred while processing your request.');
    }
});

// Handle incoming messages in personal chat
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text;
    const chatType = msg.chat.type;

    // Skip empty messages and non-text messages
    if (!userMessage || userMessage.startsWith('/')) return;

    console.log(`Received Message: "${userMessage}" from ${msg.from.username || 'User'} (${msg.from.id}) in ${chatType}`);

    // Handle personal chats
    if (chatType === 'private') {
        console.log('Private chat detected.');
        const responseText = findResponse(userMessage);
        bot.sendMessage(chatId, responseText);
    }

    // Handle group chats
    if (chatType === 'group' || chatType === 'supergroup') {
        console.log('Group chat detected.');
        // Optionally check permissions if needed
        const responseText = findResponse(userMessage);
        bot.sendMessage(chatId, responseText);
    }

    // Optionally handle channels
    if (chatType === 'channel') {
        console.log('Channel detected.');
        bot.sendMessage(chatId, "I'm currently not set up to respond in channels.");
    }
});

console.log('Bot is running...');
