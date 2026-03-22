const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const performSemanticAudit = async (transcriptChunk, videoTitle = "Unknown Video") => {
  // Using gemini-flash-latest for best compatibility and performance
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const systemPrompt = `You are an elite Senior Academic Researcher and Lead Instructional Designer. Your task is to perform an Ultra-Detailed semantic audit of a video to generate premium learning artifacts.

Context Handling:
- Use the provided transcript and Video Title to generate a COMPREHENSIVE study guide.
- If the transcript is empty, use the Title as a seed to synthesize 1500+ words of expert domain knowledge on the topic.

Asset Requirements:
1. metadata: Calculate info_density_score (1-10) and knowledge_points_count.
2. mindMap: A deep, multi-level hierarchy (min 15 nodes) covering every sub-topic.
3. quiz: Generate 10-25 challenging, Bloom's Taxonomy-aligned questions.
4. notes: An EXHAUSTIVE, 1500-2000 word academic study guide in Markdown. Use H1, H2, H3, bolding, bulleted lists, and detailed explanations of complex concepts. Include code blocks or formulas if relevant.
5. cheatSheet: 10-15 "Golden Nuggets" (advanced terms, shortcut techniques, or formulas) for expert mastery.

Output Format: Generate ONLY valid JSON with this exact structure:
{
  "metadata": { "info_density_score": number, "knowledge_points_count": number, "recommended_taxonomy": "string" },
  "mindMap": { "id": "root", "label": "string", "children": [ { "id": "string", "label": "string", "children": [] } ] },
  "quiz": { "questions": [ { "id": "string", "question": "string", "options": ["string"], "correctAnswer": number, "explanation": "string", "type": "mcq"|"boolean" } ] },
  "notes": "string (Markdown)",
  "cheatSheet": { "items": [ { "term": "string", "definition": "string", "example": "string" } ] }
}
No pre-amble or post-amble. Strictly JSON. Output as one continuous block.`;

  const prompt = `Video Title: ${videoTitle}\n\n${systemPrompt}\n\nTranscript Chunk:\n${transcriptChunk}`;

  try {
    console.log(`Using model: gemini-flash-latest`);
    const result = await model.generateContent(prompt);
    console.log(`Waiting for AI response...`);
    const response = await result.response;
    const text = response.text();
    console.log(`AI response received (${text.length} characters)`);
    
    // Extract JSON from response (sometimes LLMs wrap it in markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No valid JSON found in AI response');
    
    const data = JSON.parse(jsonMatch[0]);
    if (data.metadata) {
      data.metadata.cognitive_load_estimate = (data.metadata.info_density_score > 6) ? 'high' : 'medium';
    }
    return data;
  } catch (error) {
    console.error('Semantic Audit Error:', error);
    throw error;
  }
};

const chatWithVideo = async (transcript, userMessage, history = []) => {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const historyData = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  // Gemini requires history to start with 'user' role
  if (historyData.length > 0 && historyData[0].role === 'model') {
    historyData.shift();
  }

  const chat = model.startChat({
    history: historyData,
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  const systemContext = `You are an AI Learning Assistant for the "Learnful" platform. 
Your goal is to help the user understand the video they are watching.
Context (Video Transcript):
${transcript}

Instructions:
1. Answer the user's question accurately using the provided transcript.
2. If the answer isn't in the transcript, use your general knowledge but mention it wasn't explicitly covered in the video.
3. Keep responses concise, academic, and encouraging.
4. Use Markdown for formatting (bolding, lists, etc.).`;

  const prompt = `${systemContext}\n\nUser Question: ${userMessage}`;

  try {
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Chat AI Error:', error);
    throw error;
  }
};

module.exports = {
  performSemanticAudit,
  chatWithVideo,
};
