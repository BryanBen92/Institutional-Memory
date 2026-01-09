import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { icon: 'dashboard', label: 'Dashboard', path: '/' },
  { icon: 'description', label: 'Documents', path: '/documents' },
  { icon: 'chat', label: 'AI Chat', path: '/chat' },
  { icon: 'group', label: 'Team', path: '/team' },
  { icon: 'cloud_upload', label: 'Uploads', path: '/uploads' },
  { icon: 'settings', label: 'Settings', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-background border-r border-border flex flex-col h-screen shrink-0 sticky top-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-[20px]">database</span>
        </div>
        <div>
          <h1 className="font-display font-bold text-lg leading-tight">InstiMem</h1>
          <p className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Enterprise Plan</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <p className="px-4 py-2 text-xs font-bold text-text-secondary uppercase tracking-widest">Menu</p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-surface-light hover:text-white'
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] ${isActive ? 'filled' : ''}`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(66,85,255,0.8)]" />
              )}
            </NavLink>
          );
        })}
        
        <div className="mt-8">
           <p className="px-4 py-2 text-xs font-bold text-text-secondary uppercase tracking-widest">Workspaces</p>
           <div className="px-4 py-2 flex items-center gap-3 text-text-secondary hover:text-white cursor-pointer transition-colors">
             <div className="w-2 h-2 rounded-full bg-purple-500"></div>
             <span className="text-sm">Engineering</span>
           </div>
           <div className="px-4 py-2 flex items-center gap-3 text-text-secondary hover:text-white cursor-pointer transition-colors">
             <div className="w-2 h-2 rounded-full bg-green-500"></div>
             <span className="text-sm">Marketing</span>
           </div>
           <div className="px-4 py-2 flex items-center gap-3 text-text-secondary hover:text-white cursor-pointer transition-colors">
             <div className="w-2 h-2 rounded-full bg-orange-500"></div>
             <span className="text-sm">Legal</span>
           </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-light cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden">
             <img src="https://picsum.photos/id/64/200/200" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">Alex Rivera</p>
            <p className="text-xs text-text-secondary truncate">alex@instimem.ai</p>
          </div>
          <span className="material-symbols-outlined text-text-secondary text-[20px]">more_vert</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;