"use client";

import { useState } from "react";
import InputForm from "@/components/InputForm";
import Preview from "@/components/Preview";

export default function Home() {
  const [generatedReadme, setGeneratedReadme] = useState("");

  return (
    <main className="min-h-screen flex flex-col items-center p-8 sm:p-24 bg-background text-foreground transition-colors duration-300">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center gap-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Docu<span className="text-blue-600">Mint</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-150 mx-auto">
            Generate professional, high-quality README files for your GitHub projects in seconds using Gemini AI.
          </p>
        </div>
        
        {/* Main Interface */}
        <div className="w-full flex flex-col items-center gap-6">
          <InputForm onGenerate={(readme) => setGeneratedReadme(readme)} />
          
          {/* Preview Section - lalabas lang kapag may content na */}
          {generatedReadme && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Preview content={generatedReadme} />
            </div>
          )}
        </div>

        {/* Footer/Note */}
        {!generatedReadme && (
          <div className="mt-12 text-zinc-500 text-xs">
            Built with Next.js 15 + Gemini 1.5 Flash
          </div>
        )}
      </div>
    </main>
  );
}