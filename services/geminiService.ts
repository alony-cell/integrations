import { GoogleGenAI, Type } from "@google/genai";
import { INTEGRATIONS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// We create a simplified map of integrations to send to the AI to save tokens/complexity
const integrationMap = INTEGRATIONS.map(i => ({
  id: i.id,
  name: i.name,
  description: i.description,
  tags: i.tags.join(', ')
}));

export const searchIntegrationsWithAI = async (query: string): Promise<string[]> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const prompt = `
      You are an intelligent search assistant for a software integration directory.
      
      The user is looking for integrations based on this query: "${query}"
      
      Here is the list of available integrations:
      ${JSON.stringify(integrationMap)}
      
      Return a JSON object with a single property 'matchIds' which is an array of strings.
      Include the IDs of the integrations that best match the user's intent. 
      If the user asks for a category (like "Accounting"), include all relevant items.
      If the user describes a problem (like "I need to pay employees"), match relevant solutions (like HRIS or Payroll tools).
      Rank them by relevance.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const json = JSON.parse(response.text || '{}');
    return json.matchIds || [];

  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};