import React from 'react';
import { ActivityLog, User } from '../types';

const mockActivity: ActivityLog[] = [
    { id: '1', action: 'Uploaded document', target: 'Q3_Financial_Summary.pdf', timestamp: '2 hours ago', icon: 'upload_file' },
    { id: '2', action: 'Created query', target: '"Summarize budget changes"', timestamp: '4 hours ago', icon: 'chat' },
    { id: '3', action: 'Updated settings', target: 'Security Preferences', timestamp: '1 day ago', icon: 'settings' },
    { id: '4', action: 'Invited member', target: 'Sarah Jenkins', timestamp: '2 days ago', icon: 'person_add' },
];

const Profile: React.FC = () => {
  // Mock User Data
  const user: User = {
      id: '1',
      name: 'Alex Rivera',
      email: 'alex.rivera@instimem.ai',
      role: 'Admin' as any,
      avatar: 'https://picsum.photos/id/64/200/200',
      department: 'Engineering',
      location: 'San Francisco, CA',
      joinedDate: 'Oct 2023'
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-full overflow-y-auto">
        {/* Header Hero */}
        <div className="relative mb-24">
            <div className="h-48 bg-gradient-to-r from-primary to-purple-600 rounded-2xl w-full absolute top-0 z-0 opacity-20"></div>
            <div className="h-48 rounded-2xl w-full border border-white/5 absolute top-0 z-0"></div>
            
            <div className="relative z-10 pt-28 px-10 flex items-end gap-6">
                <div className="w-32 h-32 rounded-full border-4 border-background bg-surface overflow-hidden shadow-2xl">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="mb-2 flex-1 flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white">{user.name}</h1>
                        <p className="text-text-secondary">{user.email} • {user.role}</p>
                    </div>
                    <button className="mb-2 px-4 py-2 bg-surface border border-border rounded-lg text-white font-bold text-sm hover:bg-surface-light transition-colors">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Details */}
            <div className="space-y-6">
                <div className="bg-surface border border-border rounded-xl p-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">About</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="material-symbols-outlined text-text-secondary">business</span>
                            <span className="text-gray-300">{user.department}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="material-symbols-outlined text-text-secondary">location_on</span>
                            <span className="text-gray-300">{user.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="material-symbols-outlined text-text-secondary">calendar_month</span>
                            <span className="text-gray-300">Joined {user.joinedDate}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-surface border border-border rounded-xl p-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-background rounded-lg border border-border">
                            <span className="block text-2xl font-bold text-primary">142</span>
                            <span className="text-xs text-text-secondary">Queries</span>
                        </div>
                        <div className="text-center p-3 bg-background rounded-lg border border-border">
                            <span className="block text-2xl font-bold text-green-500">28</span>
                            <span className="text-xs text-text-secondary">Uploads</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Activity */}
            <div className="lg:col-span-2">
                <div className="bg-surface border border-border rounded-xl p-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Recent Activity</h3>
                    <div className="space-y-8">
                        {mockActivity.map((log, index) => (
                            <div key={log.id} className="relative flex gap-4">
                                {index !== mockActivity.length - 1 && (
                                    <div className="absolute top-10 left-5 bottom-[-32px] w-0.5 bg-border"></div>
                                )}
                                <div className="w-10 h-10 rounded-full bg-surface-light border border-border flex items-center justify-center shrink-0 z-10">
                                    <span className="material-symbols-outlined text-text-secondary text-[20px]">{log.icon}</span>
                                </div>
                                <div>
                                    <p className="text-white text-sm">
                                        <span className="font-semibold">{log.action}</span>
                                        <span className="text-text-secondary"> - </span>
                                        <span className="text-primary">{log.target}</span>
                                    </p>
                                    <p className="text-xs text-text-secondary mt-1">{log.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 bg-surface-light hover:bg-white/10 text-sm font-bold text-text-secondary rounded-lg transition-colors border border-border">
                        View Full History
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Profile;