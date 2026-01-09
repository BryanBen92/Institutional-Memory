import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="flex h-full">
        {/* Settings Sidebar */}
        <div className="w-64 border-r border-border p-6 flex flex-col justify-between shrink-0">
            <div className="space-y-6">
                <div>
                    <h3 className="px-3 text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">Account Settings</h3>
                    <nav className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-bold">
                            <span className="material-symbols-outlined text-[20px]">person</span>
                            Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-light hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">security</span>
                            Security
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-light hover:text-white transition-colors justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[20px]">payments</span>
                                Billing
                            </div>
                            <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold">PRO</span>
                        </button>
                    </nav>
                </div>
                <div>
                    <h3 className="px-3 text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">AI Configuration</h3>
                    <nav className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-light hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                            AI Engine
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:bg-surface-light hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">integration_instructions</span>
                            Integrations
                        </button>
                    </nav>
                </div>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Sign Out
            </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8">
            <div>
                <h1 className="text-4xl font-display font-black text-white tracking-tight">Account Settings</h1>
                <p className="text-text-secondary mt-2">Manage your institutional profile, security protocols, and subscription usage.</p>
            </div>

            {/* Profile Section */}
            <div className="bg-surface border border-border rounded-xl p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-border pb-6 mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-white">Personal Information</h2>
                        <p className="text-sm text-text-secondary">This information will be visible to your team members.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 rounded-lg border border-border text-sm font-semibold hover:bg-surface-light text-white transition-colors">Cancel</button>
                        <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all">Save Changes</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <label className="block">
                            <span className="text-sm font-semibold text-gray-300 block mb-2">Full Name</span>
                            <input type="text" defaultValue="Alex Rivera" className="w-full bg-background border border-border rounded-lg p-3 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-gray-300 block mb-2">Work Email</span>
                            <input type="email" defaultValue="alex.rivera@inst-memory.ai" className="w-full bg-background border border-border rounded-lg p-3 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                        </label>
                        <label className="block">
                            <span className="text-sm font-semibold text-gray-300 block mb-2">Department</span>
                            <select className="w-full bg-background border border-border rounded-lg p-3 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-colors">
                                <option>Core Engineering</option>
                                <option>Product</option>
                                <option>Leadership</option>
                            </select>
                        </label>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-xl bg-background/50">
                        <div className="w-24 h-24 rounded-full bg-surface border border-border mb-4 flex items-center justify-center overflow-hidden relative group cursor-pointer">
                            <img src="https://picsum.photos/id/64/200/200" alt="Avatar" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="material-symbols-outlined text-white">edit</span>
                            </div>
                        </div>
                        <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                            <span className="material-symbols-outlined text-sm">upload</span>
                            Update Avatar
                        </button>
                        <p className="text-[10px] text-text-secondary mt-2 uppercase font-bold">JPG, PNG OR GIF • MAX 5MB</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Security Section */}
                <div className="bg-surface border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                            <span className="material-symbols-outlined">security</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Security & Privacy</h3>
                            <p className="text-xs text-text-secondary">Protect your account credentials.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50">
                            <div>
                                <span className="text-sm font-semibold text-white block">Two-Factor Authentication</span>
                                <span className="text-[11px] text-text-secondary">Currently: Enabled via Authy</span>
                            </div>
                            <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                                <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50">
                            <div>
                                <span className="text-sm font-semibold text-white block">Active Sessions</span>
                                <span className="text-[11px] text-text-secondary">3 devices currently logged in</span>
                            </div>
                            <button className="text-primary text-xs font-bold hover:underline">Manage</button>
                        </div>
                    </div>
                </div>

                {/* AI Config */}
                <div className="bg-surface border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                            <span className="material-symbols-outlined">smart_toy</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-white">AI Engine Config</h3>
                            <p className="text-xs text-text-secondary">Model behavior settings.</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-white">Data Privacy Mode</h4>
                                <p className="text-xs text-text-secondary mt-1">AI responses never leave the institutional VPC.</p>
                            </div>
                            <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                                <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-gray-300 block mb-2">Contextual Window</span>
                            <div className="flex items-center gap-3">
                                <input type="range" className="flex-1 h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
                                <span className="text-xs font-bold text-white">32k</span>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-sm font-bold text-white hover:bg-surface-light transition-colors w-full justify-center">
                            <span className="material-symbols-outlined text-lg">sync</span>
                            Re-index All Knowledge
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Settings;