import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;

export const initializeGemini = (apiKey: string) => {
  if (!apiKey.trim()) {
    throw new Error('API key is required');
  }
  genAI = new GoogleGenerativeAI(apiKey);
};

export const generateResponse = async (prompt: string): Promise<string> => {
  if (!genAI) {
    throw new Error('Gemini API not initialized');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    
    if (!result.response) {
      throw new Error('Empty response from Gemini API');
    }

    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty text response from Gemini API');
    }

    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate response');
  }
};