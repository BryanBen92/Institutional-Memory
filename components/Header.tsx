import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
      <h2 className="font-display text-xl font-bold text-white">{title}</h2>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative group w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            className="block w-full h-10 bg-surface border border-border rounded-lg pl-10 pr-12 text-sm text-white placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Search knowledge base..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center h-5 px-1.5 text-[10px] font-medium text-text-secondary bg-surface-light rounded border border-border">⌘ K</kbd>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/notifications')}
            className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:bg-surface-light hover:text-white transition-colors relative"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:bg-surface-light hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[22px]">help</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;