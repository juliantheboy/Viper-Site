import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

// UI is currently disabled, but logic is ready
export class ViperAIService {
  private ai: GoogleGenAI;
  private modelId: string = 'gemini-3-pro-preview';

  constructor() {
    // Requires API key from env
    const apiKey = process.env.API_KEY || '';
    this.ai = new GoogleGenAI({ apiKey });
  }

  async askViper(query: string): Promise<string> {
    if (!process.env.API_KEY) return "AI Module Offline: Missing API Key.";

    try {
        const context = `You are 'Viper AI', a tactical support assistant for Viper Cheats. 
        We sell elite gaming software. 
        Available Products: ${PRODUCTS.map(p => `${p.name} (${p.status})`).join(', ')}.
        Tone: Brief, tactical, cyberpunk.
        User Query: ${query}`;

        const response = await this.ai.models.generateContent({
            model: this.modelId,
            contents: context,
            config: {
              thinkingConfig: {
                thinkingBudget: 32768
              }
            }
        });
        
        return response.text || "Command unclear.";
    } catch (e) {
        console.error("AI Error", e);
        return "Connection intercepted. Try again.";
    }
  }
}