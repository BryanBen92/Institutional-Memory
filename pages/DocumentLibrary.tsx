import React from 'react';
import { Document } from '../types';

const documents: Document[] = [
  { id: '1', title: 'Q3 Financial Strategy Report', type: 'PDF', date: '2h ago', author: 'Sarah Jenkins', tag: 'Finance', tagColor: 'blue', thumbnail: 'https://picsum.photos/id/10/400/250' },
  { id: '2', title: 'API Integration Documentation', type: 'LINK', date: 'Syncing...', author: 'System', tag: 'Technical', tagColor: 'purple', thumbnail: 'https://picsum.photos/id/20/400/250' },
  { id: '3', title: 'Employee Onboarding Manual', type: 'DOCX', date: 'Oct 12, 2023', author: 'HR Dept', tag: 'HR', tagColor: 'green', thumbnail: 'https://picsum.photos/id/30/400/250' },
  { id: '4', title: 'Brand Style Guide 2024', type: 'PNG', date: 'Yesterday', author: 'Design Team', tag: 'Marketing', tagColor: 'orange', thumbnail: 'https://picsum.photos/id/40/400/250' },
  { id: '5', title: 'Security Protocol v4', type: 'PDF', date: '3d ago', author: 'IT Security', tag: 'Security', tagColor: 'red', thumbnail: 'https://picsum.photos/id/50/400/250' },
  { id: '6', title: 'Q4 Sales Targets', type: 'DOCX', date: '1w ago', author: 'Sales VP', tag: 'Sales', tagColor: 'blue', thumbnail: 'https://picsum.photos/id/60/400/250' },
  { id: '7', title: 'Engineering Roadmap', type: 'PDF', date: '2w ago', author: 'CTO', tag: 'Engineering', tagColor: 'purple', thumbnail: 'https://picsum.photos/id/70/400/250' },
  { id: '8', title: 'Customer Feedback Logs', type: 'DOCX', date: '2d ago', author: 'Support', tag: 'Support', tagColor: 'green', thumbnail: 'https://picsum.photos/id/80/400/250' },
];

const DocumentLibrary: React.FC = () => {
  return (
    <div className="flex h-full">
        {/* Filters Sidebar */}
        <div className="w-64 border-r border-border p-6 hidden xl:block overflow-y-auto">
            <div className="space-y-1 mb-8">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                    <span className="text-sm font-bold">All Documents</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-surface-light hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">history</span>
                    <span className="text-sm font-medium">Recent Activity</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-surface-light hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">star</span>
                    <span className="text-sm font-medium">Starred</span>
                </button>
            </div>

            <div className="mb-8">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-3 px-3">Workspaces</h3>
                <div className="space-y-1">
                    {['Engineering', 'Product Strategy', 'Legal & Compliance', 'Human Resources'].map(ws => (
                        <label key={ws} className="flex items-center gap-3 px-3 py-1.5 cursor-pointer group hover:bg-surface-light rounded-lg transition-colors">
                            <input type="checkbox" className="rounded border-border bg-surface text-primary focus:ring-primary" defaultChecked />
                            <span className="text-sm text-gray-300 group-hover:text-white">{ws}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-3 px-3">AI Topics</h3>
                <div className="flex flex-wrap gap-2 px-3">
                    {['AI Research', 'Market Data', 'Budgeting', 'Onboarding', 'Legal'].map(topic => (
                        <span key={topic} className="px-2 py-1 rounded bg-surface border border-border text-xs text-text-secondary hover:border-primary hover:text-primary cursor-pointer transition-colors">
                            {topic}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="mt-auto p-4 bg-primary/10 border border-primary/20 rounded-xl">
                <p className="text-xs font-bold text-primary mb-2">Knowledge Capacity</p>
                <div className="h-1.5 w-full bg-surface-light rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-primary" style={{ width: '60%' }}></div>
                </div>
                <p className="text-[10px] text-text-secondary uppercase font-bold">1.2GB of 2.0GB Used</p>
            </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Document Library</h2>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <span>Sort by:</span>
                        <select className="bg-transparent border-none text-white font-medium focus:ring-0 cursor-pointer">
                            <option>Last Modified</option>
                            <option>Name</option>
                            <option>Relevance</option>
                        </select>
                    </div>
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">upload_file</span>
                        Upload Document
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {documents.map((doc) => (
                    <div key={doc.id} className="group relative flex flex-col bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all">
                        <div className="relative aspect-video bg-surface-light overflow-hidden">
                            <img src={doc.thumbnail} alt={doc.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-50"></div>
                            
                            <div className="absolute top-2 right-2">
                                <span className="px-2 py-0.5 rounded bg-background/90 text-[10px] font-bold text-white border border-border uppercase tracking-wider backdrop-blur-sm">
                                    {doc.type}
                                </span>
                            </div>

                            {/* Hover Actions */}
                            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/40 backdrop-blur-sm">
                                <button className="p-2 bg-white rounded-full text-background hover:scale-110 transition-transform"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                                <button className="p-2 bg-white rounded-full text-background hover:scale-110 transition-transform"><span className="material-symbols-outlined text-[20px]">chat</span></button>
                            </div>
                        </div>
                        
                        <div className="p-4 flex flex-col gap-3">
                            <div>
                                <h3 className="text-sm font-bold text-white truncate mb-1" title={doc.title}>{doc.title}</h3>
                                <p className="text-xs text-text-secondary flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">person</span> {doc.author} • {doc.date}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full bg-${doc.tagColor}-500/10 text-${doc.tagColor}-400 border border-${doc.tagColor}-500/20 font-medium`}>
                                    {doc.tag}
                                </span>
                                {doc.id === '1' && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">Verified</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default DocumentLibrary;