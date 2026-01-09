import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Note: API Key must be set in process.env.API_KEY
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateResponse = async (prompt: string, model: string = 'gemini-3-flash-preview') => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Mocking response.");
    return { text: "I can't connect to the AI right now because the API key is missing, but here is a simulated response based on your query." };
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

export const chatWithMemory = async (history: any[], message: string) => {
    // Placeholder for a chat session implementation
    // utilizing ai.chats.create()
    return "This is a mock response from Institutional Memory AI.";
}