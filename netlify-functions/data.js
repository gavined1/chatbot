// netlify-functions/data.js
module.exports = [{
        "input": ["wassup gavin", "what's up gavin", "wassup gvin", "what's up gvin", "wassup g'vin", "what's up g'vin", "hello gavin", "helloo gavin", "hellooo gavin", "helo gavin", "hi gavin", "hii gavin", "hiii gavin", "hello gvin", "helloo gvin", "hellooo gvin", "helo gvin", "hi gvin", "hii gvin", "hiii gvin", "hello g'vin", "helloo g'vin", "hellooo g'vin", "helo g'vin", "hi g'vin", "hii g'vin", "hiii g'vin"],
        "response": [
            "Gavin is currently unavailable, but I am his assistant. How can I assist you today?",
            "Gavin is a bit busy at the moment, but I’m here to help. What can I do for you?",
            "Gavin is not available right now, but I can assist you in his place. How can I help?",
            "Gavin is occupied at the moment, but I’m here to assist. How may I be of service?"
        ]
    },
    {
        "input": ["Gavin", "gavin", "gvin", "g'vin"],
        "response": [
            "Gavin is currently unavailable, but I am his assistant. How can I assist you today?",
            "Gavin is a bit busy at the moment, but I’m here to help. What can I do for you?",
            "Gavin is not available right now, but I can assist you in his place. How can I help?",
            "Gavin is occupied at the moment, but I’m here to assist. How may I be of service?"
        ]
    },
    {
        "input": "xhc@#^ 12345 y&*(%",
        "response": [
            "I'm sorry, I didn't quite understand that. Could you please rephrase your question?",
            "That didn't quite make sense to me. Can you try asking in a different way?",
            "I couldn't understand that. Could you please clarify what you mean?",
            "I'm having trouble processing that. Could you provide more details?"
        ]
    },
    {
        "input": "Hey! Just wanted to say hello and see if you're there.",
        "response": [
            "Hello! I'm here. How can I assist you today?",
            "Hey there! I'm available. How can I help you?",
            "Hi! I'm right here. What can I do for you today?",
            "Hey! I’m here to help you with whatever you need."
        ]
    },
    {
        "input": "Blah blah blah, I’m not sure what’s happening.",
        "response": [
            "It sounds like you might be feeling confused. Can you provide more details so I can assist you better?",
            "I sense some confusion. Let's work through it together. What exactly seems off?",
            "I hear you. Sometimes things get confusing. Could you give me more context?",
            "I'm here to help clear things up. Tell me more so I can guide you better."
        ]
    },
    {
        "input": "I need info on the latest tech trends plz :)",
        "response": [
            "Of course! Here are some of the latest trends in technology: AI advancements, blockchain developments, and more.",
            "Sure! AI, blockchain, and quantum computing are some of the latest buzz in tech.",
            "Happy to help! The current tech trends include AI, cybersecurity, and cloud computing.",
            "Tech trends are evolving fast! AI and blockchain are still leading the way."
        ]
    },
    {
        "input": "I don't get it... why is everything so complicated?",
        "response": [
            "It can feel overwhelming sometimes. Let me help break things down for you. What specifically are you finding complicated?",
            "Things do seem complicated at times. Let me know what’s bothering you, and I'll try to simplify it.",
            "You're not alone in feeling that way. Tell me what’s confusing you, and I’ll do my best to help.",
            "It’s normal to feel that way sometimes. Let’s tackle this together—what’s on your mind?"
        ]
    }
];