import { fetchRepoData, fetchRepoStructure } from "@/lib/github";
import { generateReadme } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { repoUrl } = await req.json();

    if (!repoUrl) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 1. Sabay nating kunin ang Data at Structure
    const [packageData, repoStructure] = await Promise.all([
      fetchRepoData(repoUrl),
      fetchRepoStructure(repoUrl)
    ]);

    // 2. Prepare data for AI (Kahit walang package.json, gagana pa rin)
    const repoName = repoUrl.split("/").pop() || "Project";
    const techStack = packageData 
      ? Object.keys(packageData.dependencies || {}).join(", ") 
      : "Unknown (Check file structure)";
    
    const description = packageData?.description || "A project discovered via file structure analysis.";

    // 3. Mas malupit na Prompt (Dito mo ipapasa ang structure)
    const enhancedPrompt = `
      Project Name: ${repoName}
      Tech Stack: ${techStack}
      Description: ${description}

      File Structure:
      ${repoStructure}

      Instruction: 
      Analyze the file structure above to understand the project's purpose. 
      Generate a professional README.md. If the structure looks like a Next.js app, include specific Next.js setup. 
      If you see components like 'Auth' or 'Cart', list them as key features.
    `;

    // 4. Generate README using Gemini
    const readmeContent = await generateReadme(repoName, techStack, enhancedPrompt);

    return NextResponse.json({ readme: readmeContent });
    
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}