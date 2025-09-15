// FIX: Import HarmCategory and HarmBlockThreshold to use for safety settings.
import { GoogleGenAI, Type, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { QuizQuestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
};

// FIX: Use HarmCategory and HarmBlockThreshold enums for safety settings instead of strings to match the required types.
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];


const systemInstruction = "You are a friendly and engaging storyteller for children under 10. Your tone should be simple, joyful, and full of wonder. Avoid complex words and concepts. Focus on the positive virtues of the characters, like courage, wisdom, and kindness.";

export const generateStory = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { ...generationConfig, systemInstruction, safetySettings },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating story:", error);
    return "Oops! Our storyteller is taking a little nap. Please try again in a moment.";
  }
};

const quizSchema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        description: "An array of 5 easy multiple-choice quiz questions about Hindu deities for children.",
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING, description: "The question text." },
            options: {
              type: Type.ARRAY,
              description: "An array of 4 possible answers.",
              items: { type: Type.STRING }
            },
            answer: { type: Type.STRING, description: "The correct answer, which must be one of the options." }
          },
          required: ["question", "options", "answer"]
        }
      }
    },
    required: ["questions"]
};

export const generateQuiz = async (): Promise<QuizQuestion[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Generate 5 simple multiple-choice questions about Hindu deities like Durga, Lakshmi, and Saraswati, suitable for a 7-year-old child.",
            config: {
                responseMimeType: 'application/json',
                responseSchema: quizSchema,
                systemInstruction: "You are a fun quiz master for kids. Create simple and clear questions.",
                safetySettings,
            },
        });
        const jsonText = response.text.trim();
        const quizData = JSON.parse(jsonText);
        return quizData.questions;
    } catch (error) {
        console.error("Error generating quiz:", error);
        return [];
    }
};

export const generateColoringPage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    }
    return null;
  } catch (error) {
    console.error("Error generating coloring page:", error);
    return null;
  }
};