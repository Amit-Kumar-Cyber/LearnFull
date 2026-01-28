const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateNotes = async (transcript) => {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful teaching assistant. Create concise, structured, and easy-to-read study notes in Markdown format based on the provided video transcript. Use headers, bullet points, and bold text for emphasis." },
            { role: "user", content: transcript }
        ],
        model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
};

const generateQuiz = async (transcript) => {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a quiz generator. Generate a JSON array of 5 multiple-choice questions based on the transcript. Each object should have: 'question', 'options' (array of 4 strings), 'correctAnswer' (index 0-3), and 'explanation'." },
            { role: "user", content: transcript }
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content);
};

module.exports = { generateNotes, generateQuiz };
