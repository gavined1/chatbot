// custom-library.js
const nlp = require('compromise');

const responses = require('./data');

function processText(userMessage) {
    // Use compromise to analyze the message
    let doc = nlp(userMessage);

    // Basic text normalization and analysis
    let normalizedText = doc.text().toLowerCase();

    // Find matching response
    for (const item of responses) {
        for (const input of item.input) {
            if (normalizedText.includes(input.toLowerCase())) {
                // Return a random response from the matched responses
                return item.response[Math.floor(Math.random() * item.response.length)];
            }
        }
    }

    // Default response if no match found
    return "Sorry, I didn't understand that. Can you rephrase?";
}

module.exports = {
    processText
};