const nlp = require('compromise');
const spacy = require('spacy');

// Load spaCy model
const nlpSpaCy = spacy.load('en_core_web_sm');

function processText(text) {
    // Use compromise for basic text processing
    let doc = nlp(text);
    let response = "I'm not sure how to respond to that.";

    // Use spaCy for more advanced NLP tasks
    const spacyDoc = nlpSpaCy(text);
    const entities = spacyDoc.ents.map(ent => ent.text);

    if (entities.length > 0) {
        // Basic response based on identified entities
        response = `I see you're talking about ${entities.join(', ')}. How can I help with that?`;
    } else {
        // Use compromise for simple intent recognition
        const match = doc.match('hello|hi|hey');
        if (match.found) {
            response = "Hello! How can I assist you today?";
        }
    }

    return response;
}

module.exports = {
    processText
};