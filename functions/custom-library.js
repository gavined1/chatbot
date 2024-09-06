const nlp = require('compromise');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// Load your data
const data = require('./data');

// Create a new instance of the natural classifier
const classifier = new natural.BayesClassifier();

// Train the classifier with your data
data.forEach(entry => {
    entry.input.forEach(input => {
        classifier.addDocument(input, entry.response);
    });
});
classifier.train();

function processText(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Tokenize the user message
    const tokens = tokenizer.tokenize(lowerCaseMessage);
    console.log("Tokens:", tokens); // Debugging

    // Use compromise to process text
    const doc = nlp(lowerCaseMessage);
    const normalizedMessage = doc.normalize().out('text');
    console.log("Normalized Message:", normalizedMessage); // Debugging

    // Use the natural classifier to predict a response
    const classified = classifier.classify(normalizedMessage);

    // Return a random response from the classified results
    const responses = data.flatMap(entry => entry.response);
    const response = responses[Math.floor(Math.random() * responses.length)];

    return response;
}

module.exports = {
    processText
};