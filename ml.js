// Simple ML model for user interaction data analysis

class SimpleML {
    constructor() {
        this.interactionData = [];
    }

    // Load interaction data from a local file (for demonstration, we're using a static array)
    loadInteractionData() {
        this.interactionData = [
            { username: "Guest", message: "Hello", response: "Hi! How can I help you today?" },
            { username: "Guest", message: "What is your name?", response: "I'm an AI friend!" },
            // Add more interaction data for a comprehensive dataset
        ];
    }

    // Preprocess interaction data (convert to lowercase, remove punctuation)
    preprocessData(data) {
        return data.map(entry => {
            return {
                username: entry.username.toLowerCase(),
                message: entry.message.toLowerCase().replace(/[^a-z0-9\s]/g, ''),
                response: entry.response.toLowerCase().replace(/[^a-z0-9\s]/g, '')
            };
        });
    }

    // Train a simple ML model (for demonstration, we're using a basic keyword matching approach)
    trainModel(data) {
        // In a real scenario, you would use a more complex ML model
        this.model = {};
        data.forEach(entry => {
            const words = entry.message.split(' ');
            words.forEach(word => {
                if (!this.model[word]) {
                    this.model[word] = [];
                }
                this.model[word].push(entry.response);
            });
        });
    }

    // Generate a response based on the trained model
    generateResponse(message) {
        const words = message.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ');
        let responses = [];
        words.forEach(word => {
            if (this.model[word]) {
                responses = responses.concat(this.model[word]);
            }
        });
        if (responses.length === 0) {
            return "I'm not sure what you mean. Can you please elaborate?";
        }
        // Return a random response from the matched responses
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize and use the SimpleML class
const ml = new SimpleML();
ml.loadInteractionData();
const preprocessedData = ml.preprocessData(ml.interactionData);
ml.trainModel(preprocessedData);

// Example usage
const userMessage = "What is your name?";
const mlResponse = ml.generateResponse(userMessage);
console.log(mlResponse); // Output: "I'm an AI friend!"

// Export SimpleML class for use in other scripts
export { SimpleML };