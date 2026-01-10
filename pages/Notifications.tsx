import React from 'react';
import { Notification } from '../types';

const mockNotifications: Notification[] = [
    { id: '1', type: 'alert', title: 'Usage Limit Warning', description: 'You have used 85% of your document storage capacity.', time: '2h ago', read: false },
    { id: '2', type: 'mention', title: 'Mentioned by Sarah', description: 'Sarah Jenkins tagged you in "Q3 Financial Strategy"', time: '4h ago', read: false },
    { id: '3', type: 'document', title: 'Document Processed', description: 'Employee_Handbook_2024.pdf is now available for queries.', time: '1d ago', read: true },
    { id: '4', type: 'system', title: 'System Update', description: 'InstiMem v2.0 is live with improved reasoning capabilities.', time: '2d ago', read: true },
];

const Notifications: React.FC = () => {
  const getIcon = (type: string) => {
      switch(type) {
          case 'alert': return 'warning';
          case 'mention': return 'alternate_email';
          case 'document': return 'description';
          case 'system': return 'system_update';
          default: return 'notifications';
      }
  };

  const getColor = (type: string) => {
      switch(type) {
          case 'alert': return 'text-orange-500 bg-orange-500/10';
          case 'mention': return 'text-primary bg-primary/10';
          case 'document': return 'text-green-500 bg-green-500/10';
          case 'system': return 'text-purple-500 bg-purple-500/10';
          default: return 'text-gray-500 bg-gray-500/10';
      }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-white">Notifications</h1>
            <button className="text-sm font-bold text-primary hover:text-white transition-colors">Mark all as read</button>
        </div>

        <div className="space-y-4">
            {mockNotifications.map((notif) => (
                <div key={notif.id} className={`flex gap-5 p-5 rounded-xl border transition-all ${notif.read ? 'bg-surface border-border opacity-70 hover:opacity-100' : 'bg-surface border-primary/30 shadow-[0_0_15px_rgba(66,85,255,0.05)]'}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getColor(notif.type)}`}>
                        <span className="material-symbols-outlined text-[24px]">{getIcon(notif.type)}</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                            <h3 className={`font-bold ${notif.read ? 'text-gray-300' : 'text-white'}`}>{notif.title}</h3>
                            <span className="text-xs text-text-secondary whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">{notif.description}</p>
                        {!notif.read && (
                            <div className="mt-3 flex gap-3">
                                <button className="text-xs font-bold text-primary hover:underline">View Details</button>
                                <button className="text-xs font-bold text-text-secondary hover:text-white">Dismiss</button>
                            </div>
                        )}
                    </div>
                    {!notif.read && (
                        <div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0"></div>
                    )}
                </div>
            ))}
        </div>

        <div className="mt-8 text-center">
            <button className="px-4 py-2 rounded-lg bg-surface border border-border text-text-secondary text-sm font-medium hover:bg-surface-light hover:text-white transition-colors">
                Load older notifications
            </button>
        </div>
    </div>
  );
};

export default Notifications;