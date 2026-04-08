import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateReadme(repoName: string, techStack: string, description: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert Technical Writer. Generate a professional README.md for:
      Project Name: ${repoName}
      Tech Stack: ${techStack}
      Description: ${description}

      The README should include:
      - Catchy Title with an emoji
      - Key Features
      - Installation Guide (npm install)
      - Usage
      - Modern Badges
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    const err = error as Error;
    console.error("Gemini Error:", err.message);
    return "Error generating README content.";
  }
}