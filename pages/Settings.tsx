import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

type SettingsTab = 'general' | 'security' | 'billing' | 'notifications';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const { logout } = useAuth();

  return (
    <div className="flex h-full">
        {/* Settings Sidebar */}
        <div className="w-64 border-r border-border bg-surface/50 p-4 flex flex-col gap-1 shrink-0">
            <h3 className="px-3 py-2 text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Settings</h3>
            
            <button 
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'general' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-secondary hover:bg-surface-light hover:text-white'}`}
            >
                <span className="material-symbols-outlined">tune</span>
                General
            </button>
            <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'security' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-secondary hover:bg-surface-light hover:text-white'}`}
            >
                <span className="material-symbols-outlined">security</span>
                Security
            </button>
            <button 
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'billing' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-secondary hover:bg-surface-light hover:text-white'}`}
            >
                <span className="material-symbols-outlined">credit_card</span>
                Billing & Plans
            </button>
            <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'notifications' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-secondary hover:bg-surface-light hover:text-white'}`}
            >
                <span className="material-symbols-outlined">notifications</span>
                Notifications
            </button>

            <div className="mt-auto border-t border-border pt-4">
                 <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined">logout</span>
                    Sign Out
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10">
            {activeTab === 'general' && (
                <div className="max-w-2xl space-y-8 animate-fade-in">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">General Settings</h2>
                        <p className="text-text-secondary">Manage your workspace profile and preferences.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-surface border border-border rounded-xl p-6">
                             <label className="block mb-4">
                                <span className="text-sm font-bold text-white mb-2 block">Workspace Name</span>
                                <input type="text" defaultValue="Acme Corp" className="w-full bg-background border border-border rounded-lg p-3 text-white focus:border-primary focus:outline-none" />
                            </label>
                            <label className="block">
                                <span className="text-sm font-bold text-white mb-2 block">Support Email</span>
                                <input type="email" defaultValue="support@acme.com" className="w-full bg-background border border-border rounded-lg p-3 text-white focus:border-primary focus:outline-none" />
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'security' && (
                <div className="max-w-2xl space-y-8 animate-fade-in">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Security</h2>
                        <p className="text-text-secondary">Configure authentication and access controls.</p>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-6 divide-y divide-border">
                         <div className="py-4 flex items-center justify-between">
                             <div>
                                 <h4 className="font-bold text-white">Two-Factor Authentication</h4>
                                 <p className="text-sm text-text-secondary">Add an extra layer of security to your account.</p>
                             </div>
                             <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                         </div>
                         <div className="py-4 flex items-center justify-between">
                             <div>
                                 <h4 className="font-bold text-white">SSO Enforcement</h4>
                                 <p className="text-sm text-text-secondary">Require all members to log in via Google Workspace.</p>
                             </div>
                             <div className="w-12 h-6 bg-surface-light border border-border rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-gray-500 rounded-full"></div></div>
                         </div>
                    </div>
                </div>
            )}

             {activeTab === 'billing' && (
                <div className="max-w-3xl space-y-8 animate-fade-in">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Billing & Plans</h2>
                        <p className="text-text-secondary">Manage your subscription and payment methods.</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary/20 to-purple-600/20 border border-primary/30 rounded-xl p-8 flex items-center justify-between">
                        <div>
                            <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-2 inline-block">CURRENT PLAN</span>
                            <h3 className="text-2xl font-bold text-white">Enterprise Plan</h3>
                            <p className="text-text-secondary mt-1">$499/month • Renews on Nov 1, 2024</p>
                        </div>
                        <button className="px-6 py-3 bg-white text-background font-bold rounded-lg hover:bg-gray-100 transition-colors">Manage Subscription</button>
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h4 className="font-bold text-white mb-4">Payment Methods</h4>
                        <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-background/50">
                            <div className="w-10 h-6 bg-white rounded flex items-center justify-center"><span className="text-black font-bold text-[10px]">VISA</span></div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-white">Visa ending in 4242</p>
                                <p className="text-xs text-text-secondary">Expires 12/25</p>
                            </div>
                            <button className="text-sm text-text-secondary hover:text-white">Edit</button>
                        </div>
                    </div>
                </div>
            )}
             
             {activeTab === 'notifications' && (
                 <div className="max-w-2xl space-y-8 animate-fade-in">
                     <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Notification Preferences</h2>
                        <p className="text-text-secondary">Choose how you want to be alerted.</p>
                    </div>
                    <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
                        {['Email Digest', 'Real-time Alerts', 'Marketing Updates'].map(item => (
                             <div key={item} className="flex items-center justify-between">
                                 <span className="font-bold text-white">{item}</span>
                                 <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                             </div>
                        ))}
                    </div>
                 </div>
             )}
        </div>
    </div>
  );
};

export default Settings;