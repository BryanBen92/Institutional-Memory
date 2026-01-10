import React, { useState, useRef, useEffect } from 'react';
import { documentService } from '../services/documents';

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

const Upload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/msword'];
      const validSize = file.size <= 50 * 1024 * 1024; // 50MB
      return validTypes.includes(file.type) && validSize;
    });

    const newUploads: UploadItem[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'pending'
    }));

    setUploads(prev => [...prev, ...newUploads]);
    
    // Auto-upload files
    newUploads.forEach(upload => {
      uploadFile(upload.id, upload.file);
    });
  };

  const uploadFile = async (uploadId: string, file: File) => {
    setUploads(prev =>
      prev.map(u =>
        u.id === uploadId ? { ...u, status: 'uploading', progress: 0 } : u
      )
    );

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploads(prev =>
          prev.map(u =>
            u.id === uploadId && u.progress < 90
              ? { ...u, progress: u.progress + Math.random() * 30 }
              : u
          )
        );
      }, 300);

      // Call the service
      await documentService.upload(file);

      clearInterval(progressInterval);

      setUploads(prev =>
        prev.map(u =>
          u.id === uploadId
            ? { ...u, status: 'complete', progress: 100 }
            : u
        )
      );
    } catch (error) {
      setUploads(prev =>
        prev.map(u =>
          u.id === uploadId
            ? {
                ...u,
                status: 'error',
                error: error instanceof Error ? error.message : 'Upload failed'
              }
            : u
        )
      );
    }
  };

  const handleSelectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeUpload = (uploadId: string) => {
    setUploads(prev => prev.filter(u => u.id !== uploadId));
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return 'description';
    if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) return 'article';
    if (fileName.endsWith('.txt')) return 'description';
    return 'file_present';
  };

  const activeUploads = uploads.filter(u => u.status !== 'complete');
  const completedUploads = uploads.filter(u => u.status === 'complete');
  const processingCount = uploads.filter(u => u.status !== 'complete').length;

  return (
    <div className="p-8 max-w-5xl mx-auto h-full overflow-y-auto">
        <div className="flex flex-col gap-2 mb-10">
            <h1 className="text-4xl font-display font-black text-white">Ingest New Knowledge</h1>
            <p className="text-text-secondary text-base">Upload PDF, DOCX, or TXT files to train your institutional memory and enable AI retrieval.</p>
        </div>

        {/* Upload Zone */}
        {uploads.length === 0 ? (
          <div 
            className={`relative flex flex-col items-center gap-6 rounded-xl border-2 border-dashed ${dragActive ? 'border-primary bg-primary/5' : 'border-border bg-surface/50'} px-6 py-20 transition-all cursor-pointer mb-12`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-[0_0_20px_rgba(66,85,255,0.15)]">
              <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">Drag and drop files here</p>
              <p className="text-sm text-text-secondary mt-1">or click to browse from your computer (Max 50MB per file)</p>
            </div>
            <button 
              onClick={handleSelectFiles}
              className="px-8 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/25 transition-all"
            >
              Select Files
            </button>
          </div>
        ) : null}

        {/* Processing List */}
        {uploads.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-xl font-bold text-white">Upload Status</h2>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                {processingCount} {processingCount === 1 ? 'File' : 'Files'} Processing
              </span>
            </div>

            <div className="space-y-4">
              {/* Active uploads */}
              {activeUploads.map((upload) => (
                <div key={upload.id} className="flex items-center gap-4 bg-surface border border-border rounded-xl p-5 shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[24px]">
                      {getFileIcon(upload.file.name)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold text-white truncate">{upload.file.name}</p>
                      <span className="text-xs text-text-secondary">
                        {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {upload.status === 'error' ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <p className="text-xs font-bold text-red-400 uppercase tracking-wide">
                            {upload.error || 'Upload failed'}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                          <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                            {upload.status === 'uploading' ? 'Uploading & Processing...' : 'Pending'}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(upload.progress, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-white">
                        {Math.round(Math.min(upload.progress, 100))}%
                      </span>
                      <button
                        onClick={() => removeUpload(upload.id)}
                        disabled={upload.status === 'uploading'}
                        className="text-text-secondary hover:text-white transition-colors disabled:opacity-50 ml-2"
                      >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Completed uploads */}
              {completedUploads.map((upload) => (
                <div key={upload.id} className="flex items-center gap-4 bg-surface border border-border rounded-xl p-5 shadow-sm opacity-70">
                  <div className="w-12 h-12 rounded-lg bg-green-900/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-green-500 text-[24px]">check_circle</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <p className="font-semibold text-white truncate line-through decoration-text-secondary">
                        {upload.file.name}
                      </p>
                      <span className="text-xs text-text-secondary">
                        {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs font-bold text-green-500 uppercase tracking-wide">Complete</p>
                      <button
                        onClick={() => removeUpload(upload.id)}
                        className="text-primary text-xs font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add more files button */}
            <div className="mt-6 text-center">
              <button 
                onClick={handleSelectFiles}
                className="px-6 py-2 border border-dashed border-border hover:border-primary rounded-lg text-primary font-medium text-sm transition-colors"
              >
                + Add More Files
              </button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          accept=".pdf,.docx,.doc,.txt"
          className="hidden"
        />
    </div>
  );
};

export default Upload;