import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getTitle = () => {
    switch(location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/documents': return 'Document Library';
      case '/chat': return 'AI Lab';
      case '/settings': return 'Settings';
      case '/uploads': return 'Uploads';
      case '/team': return 'Team Management';
      case '/notifications': return 'Notifications';
      case '/profile': return 'My Profile';
      default: return 'Institutional Memory';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-text w-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={getTitle()} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        <main className="flex-1 overflow-hidden relative w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;