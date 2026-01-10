import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    <div className="flex h-screen overflow-hidden bg-background text-text">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={getTitle()} />
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;