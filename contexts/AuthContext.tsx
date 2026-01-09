import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string; role: string } | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Check local storage for persistence or default to false
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('instimem_auth') === 'true';
  });
  
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(() => {
     const stored = localStorage.getItem('instimem_user');
     return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string) => {
    setIsAuthenticated(true);
    const mockUser = { name: 'Alex Rivera', email, role: 'Admin' };
    setUser(mockUser);
    localStorage.setItem('instimem_auth', 'true');
    localStorage.setItem('instimem_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('instimem_auth');
    localStorage.removeItem('instimem_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};