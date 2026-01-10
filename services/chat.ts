import { api } from './api';
import { ChatMessage } from '../types';
import { CONFIG } from '../config';
import { GoogleGenAI } from "@google/genai";

// Fallback direct SDK initialization if backend isn't ready
const apiKey = process.env.API_KEY || ''; 
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
}

export const chatService = {
  sendMessage: async (message: string, history: ChatMessage[]): Promise<ChatMessage> => {
    // 1. Production Mode: Send to Backend (RAG Pipeline)
    if (!CONFIG.IS_DEMO) {
      return api.post<ChatMessage>('/chat/message', { message, history });
    }

    // 2. Demo Mode: Direct Gemini SDK or Mock
    try {
        let textResponse = '';
        let sources: string[] = [];

        if (aiClient) {
            // Use real Gemini if key exists
            const response = await aiClient.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: message, // Simplified for demo
            });
            textResponse = response.text || "No response generated.";
        } else {
            // Pure Mock
            await new Promise(r => setTimeout(r, 1500));
            textResponse = "I'm analyzing your request against the knowledge base. Here is a simulated response because the backend is in DEMO mode and no API Key was found.";
            sources = ['Mock_Policy_Doc.pdf', 'Simulated_Wiki.docx'];
        }

        return {
            id: Date.now().toString(),
            role: 'ai',
            content: textResponse,
            timestamp: new Date(),
            sources: sources.length > 0 ? sources : undefined
        };

    } catch (err) {
        console.error("Chat Error", err);
        return {
            id: Date.now().toString(),
            role: 'ai',
            content: "Sorry, I encountered an error connecting to the knowledge engine.",
            timestamp: new Date()
        };
    }
  }
};