import React, { useState } from 'react';

const Upload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto">
        <div className="flex flex-col gap-2 mb-10">
            <h1 className="text-4xl font-display font-black text-white">Ingest New Knowledge</h1>
            <p className="text-text-secondary text-base">Upload PDF, DOCX, or TXT files to train your institutional memory and enable AI retrieval.</p>
        </div>

        {/* Upload Zone */}
        <div 
            className={`relative flex flex-col items-center gap-6 rounded-xl border-2 border-dashed ${dragActive ? 'border-primary bg-primary/5' : 'border-border bg-surface/50'} px-6 py-20 transition-all cursor-pointer mb-12`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrag}
        >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-[0_0_20px_rgba(66,85,255,0.15)]">
                <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
            </div>
            <div className="text-center">
                <p className="text-lg font-bold text-white">Drag and drop files here</p>
                <p className="text-sm text-text-secondary mt-1">or click to browse from your computer (Max 50MB per file)</p>
            </div>
            <button className="px-8 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/25 transition-all">
                Select Files
            </button>
        </div>

        {/* Processing List */}
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xl font-bold text-white">Currently Processing</h2>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">3 Files Active</span>
        </div>

        <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex items-center gap-4 bg-surface border border-border rounded-xl p-5 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[24px]">description</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-2">
                        <p className="font-semibold text-white truncate">Q3_Financial_Performance_Analysis.pdf</p>
                        <span className="text-xs text-text-secondary">4.2 MB</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Extracting Text & OCR...</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-xs font-bold text-white">45%</span>
                    </div>
                </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4 bg-surface border border-border rounded-xl p-5 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[24px]">article</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-2">
                        <p className="font-semibold text-white truncate">Standard_Operating_Procedures_v2.docx</p>
                        <span className="text-xs text-text-secondary">1.8 MB</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Generating Vector Embeddings...</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '82%' }}></div>
                        </div>
                        <span className="text-xs font-bold text-white">82%</span>
                    </div>
                </div>
            </div>

            {/* Item 3 (Complete) */}
            <div className="flex items-center gap-4 bg-surface border border-border rounded-xl p-5 shadow-sm opacity-70">
                <div className="w-12 h-12 rounded-lg bg-green-900/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-green-500 text-[24px]">check_circle</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                        <p className="font-semibold text-white truncate line-through decoration-text-secondary">Employee_Handbook_2024.pdf</p>
                        <span className="text-xs text-text-secondary">12.5 MB</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-xs font-bold text-green-500 uppercase tracking-wide">Complete</p>
                        <button className="text-primary text-xs font-bold hover:underline">View in Knowledge Base</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Upload;