import React, { useState, useRef, useEffect } from 'react';
import { documentService } from '../services/documents';
import { Document } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete?: (documents: Document[]) => void;
}

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUploadComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
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

  const clearCompleted = () => {
    setUploads(prev => prev.filter(u => u.status !== 'complete'));
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return 'description';
    if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) return 'article';
    if (fileName.endsWith('.txt')) return 'description';
    return 'file_present';
  };

  if (!isOpen) return null;

  const activeUploads = uploads.filter(u => u.status !== 'complete');
  const completedUploads = uploads.filter(u => u.status === 'complete');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <h2 className="text-2xl font-bold text-white">Upload Documents</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {uploads.length === 0 ? (
            // Empty state
            <div
              className={`relative flex flex-col items-center gap-6 rounded-xl border-2 border-dashed ${
                dragActive ? 'border-primary bg-primary/5' : 'border-border bg-surface/50'
              } px-6 py-16 transition-all`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl">
                  cloud_upload
                </span>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white">Drag and drop files here</p>
                <p className="text-sm text-text-secondary mt-1">
                  or click to browse (Max 50MB per file)
                </p>
              </div>
              <button
                onClick={handleSelectFiles}
                className="px-6 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg transition-colors"
              >
                Select Files
              </button>
            </div>
          ) : (
            <>
              {/* Active uploads */}
              {activeUploads.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3">
                    Processing ({activeUploads.length})
                  </h3>
                  <div className="space-y-3">
                    {activeUploads.map(upload => (
                      <div key={upload.id} className="bg-surface border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="material-symbols-outlined text-primary shrink-0">
                              {getFileIcon(upload.file.name)}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white truncate">
                                {upload.file.name}
                              </p>
                              <p className="text-xs text-text-secondary">
                                {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeUpload(upload.id)}
                            className="text-text-secondary hover:text-white transition-colors shrink-0"
                            disabled={upload.status === 'uploading'}
                          >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                          </button>
                        </div>

                        {upload.status === 'error' ? (
                          <div className="text-xs text-red-400 font-medium">
                            {upload.error || 'Upload failed'}
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex-1 h-2 bg-surface-light rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all duration-300 rounded-full"
                                  style={{ width: `${Math.min(upload.progress, 100)}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-white whitespace-nowrap">
                                {Math.round(Math.min(upload.progress, 100))}%
                              </span>
                            </div>
                            <p className="text-xs text-text-secondary">
                              {upload.status === 'uploading'
                                ? 'Uploading and processing...'
                                : 'Pending'}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed uploads */}
              {completedUploads.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider">
                      Completed ({completedUploads.length})
                    </h3>
                    <button
                      onClick={clearCompleted}
                      className="text-xs text-primary hover:text-white transition-colors font-medium"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-2">
                    {completedUploads.map(upload => (
                      <div key={upload.id} className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="material-symbols-outlined text-green-500 shrink-0">
                            check_circle
                          </span>
                          <p className="text-sm font-medium text-white truncate">
                            {upload.file.name}
                          </p>
                        </div>
                        <button
                          onClick={() => removeUpload(upload.id)}
                          className="text-green-500/60 hover:text-green-500 transition-colors shrink-0 ml-2"
                        >
                          <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add more button */}
              <button
                onClick={handleSelectFiles}
                className="w-full py-2 border border-dashed border-border hover:border-primary rounded-lg text-primary font-medium text-sm transition-colors"
              >
                + Add More Files
              </button>
            </>
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

        {/* Footer */}
        <div className="border-t border-border p-4 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white hover:bg-surface-light rounded-lg transition-colors font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
