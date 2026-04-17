"use client";

import ReactMarkdown from "react-markdown";

interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  if (!content) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "README.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center p-4 border-b border-zinc-700 bg-zinc-800/50">
        <div className="flex gap-2 items-center">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-[#ff5f56] rounded-full shadow-sm"></div>
            <div className="w-3 h-3 bg-[#ffbd2e] rounded-full shadow-sm"></div>
            <div className="w-3 h-3 bg-[#27c93f] rounded-full shadow-sm"></div>
          </div>
          <span className="ml-4 text-xs font-bold text-zinc-500 tracking-widest uppercase">README.md Preview</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            DOWNLOAD .MD
          </button>

          <button
            onClick={handleCopy}
            className="text-xs font-bold bg-zinc-700 hover:bg-zinc-600 text-zinc-100 py-2 px-4 rounded-lg border border-zinc-600 transition-all active:bg-zinc-500"
          >
            COPY
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-8 prose prose-invert prose-blue max-w-none h-150 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}