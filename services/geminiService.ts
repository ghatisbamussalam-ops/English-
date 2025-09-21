
import { GoogleGenAI } from "@google/genai";
import { ANALYSIS_RESPONSE_SCHEMA } from '../constants';
import { Analysis, AnalysisClassification } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzePhrase(phrase: string): Promise<Analysis> {
  const classifications = Object.values(AnalysisClassification).join(", ");
  const prompt = `You are an expert TEFL teacher and curriculum designer. Your task is to take a single English phrase from the user and return a structured JSON object in Arabic. Adhere strictly to the provided JSON schema. All explanations, notes, and descriptions must be in Arabic. Do not return any text outside the JSON object. All examples must be original and not quoted from copyrighted works.

The user's phrase is: "${phrase}"

For the "classification" field, you must choose one of the following values: ${classifications}.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ANALYSIS_RESPONSE_SCHEMA,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    // Ensure the classification value is one of the allowed enum values
    if (!Object.values(AnalysisClassification).includes(parsedJson.classification)) {
        parsedJson.classification = AnalysisClassification.UNKNOWN;
    }

    return parsedJson as Analysis;
  } catch (error) {
    console.error("Error analyzing phrase with Gemini:", error);
    throw new Error("Failed to get a valid analysis from the AI. Please try again.");
  }
}
