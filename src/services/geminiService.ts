import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function solveMathProblem(problem: string, classLevel: string, chapter: string, topic?: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `আপনি সোহেল স্যারের ম্যাথ প্রাইভেট প্রোগ্রামের একজন পেশাদার গণিত শিক্ষক।
  একজন ${classLevel}-এর শিক্ষার্থী "${chapter}" অধ্যায়ের ${topic ? `"${topic}" টপিক` : ""} সম্পর্কে প্রশ্ন করছে।
  
  সমস্যা: ${problem}
  
  অনুগ্রহ করে ধাপে ধাপে সমাধান প্রদান করুন।
  সহজ ভাষা ব্যবহার করুন, ব্যবহৃত সূত্রগুলো ব্যাখ্যা করুন এবং আউটপুটটি Markdown ফরম্যাটে দিন।
  গাণিতিক সূত্রের জন্য LaTeX ব্যবহার করুন (যেমন, $x^2 + y^2 = z^2$)।
  পুরো উত্তরটি বাংলা ভাষায় দিন। ব্যাখ্যাটি উৎসাহব্যঞ্জক এবং সহজবোধ্য করুন।`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text;
  } catch (error) {
    console.error("Error solving math problem:", error);
    return "দুঃখিত, এই মুহূর্তে সমস্যাটি সমাধান করা সম্ভব হচ্ছে না। অনুগ্রহ করে পরে আবার চেষ্টা করুন।";
  }
}
