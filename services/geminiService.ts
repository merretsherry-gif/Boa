
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialInsights = async (transactions: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are Erica®, the virtual financial assistant for Bank of America. 
      Analyze the user's recent activity: ${JSON.stringify(transactions)}.
      Provide exactly ONE short, encouraging, and highly professional 1-sentence tip.
      The tip should be specific to their spending or suggest a proactive financial step (like eBill setup or Zelle® security).
      Do not use generic greetings. Max 20 words.`,
      config: {
        temperature: 0.7,
        topP: 0.95
      }
    });
    return response.text?.trim() || "Consider setting up eBill for your Verizon account to avoid any late fees this month.";
  } catch (error) {
    console.error("Error fetching Erica insights:", error);
    return "Great job maintaining your Savings balance! You're on track to meet your October goal.";
  }
};
