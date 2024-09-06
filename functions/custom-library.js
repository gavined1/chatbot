// functions/custom-library.js

/**
 * A sample function that processes text.
 * @param {string} text - The text to process.
 * @returns {string} - The processed text.
 */
function processText(text) {
    // Sample processing: reverse the text and add a suffix
    const reversedText = text.split('').reverse().join('');
    return `${reversedText}`;
}

// Export the function for use in other files
module.exports = {
    processText
};