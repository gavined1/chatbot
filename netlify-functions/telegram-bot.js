require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const nlp = require('compromise');
const stringSimilarity = require('string-similarity');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token);

// Load dataset
const dataset = JSON.parse(fs.readFileSync('data.json', 'utf8'));

function normalizeInput(input) {
    const doc = nlp(input.toLowerCase()).normalize({
        whitespace: true,
        punctuation: true
    }).out('text');
    return doc;
}

function findResponse(userMessage) {
    const normalizedMessage = normalizeInput(userMessage);
    let bestMatch = {
        score: 0,
        response: "Sorry, I didn't understand that. Can you please rephrase?"
    };

    for (const item of dataset) {
        const inputVariants = Array.isArray(item.input) ? item.input : [item.input];

        for (const variant of inputVariants) {
            const score = stringSimilarity.compareTwoStrings(normalizedMessage, normalizeInput(variant));
            if (score > bestMatch.score) {
                bestMatch.score = score;
                bestMatch.response = Array.isArray(item.response) ?
                    item.response[Math.floor(Math.random() * item.response.length)] :
                    item.response;
            }
        }
    }

    return bestMatch.response;
}

exports.handler = async (event) => {
    try {
        if (event.httpMethod === 'POST') {
            const {
                body
            } = event;
            const update = JSON.parse(body);

            if (update.message) {
                const chatId = update.message.chat.id;
                const userMessage = update.message.text;
                const chatType = update.message.chat.type;

                if (!userMessage || userMessage.startsWith('/')) return;

                let responseText = '';

                if (chatType === 'private' || chatType === 'group' || chatType === 'supergroup') {
                    responseText = findResponse(userMessage);
                    await bot.sendMessage(chatId, responseText);
                } else if (chatType === 'channel') {
                    await bot.sendMessage(chatId, "I'm currently not set up to respond in channels.");
                }

                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'Success'
                    }),
                };
            }
        }

        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Bad Request'
            }),
        };
    } catch (error) {
        console.error('Error handling webhook:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error'
            }),
        };
    }
};