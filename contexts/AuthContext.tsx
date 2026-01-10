import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('instimem_token');
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to restore session", error);
          localStorage.removeItem('instimem_token');
          localStorage.removeItem('instimem_user');
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password = 'password') => {
    try {
        const response = await authService.login(email, password);
        localStorage.setItem('instimem_token', response.token);
        // For demo persistence without backend
        localStorage.setItem('instimem_user', JSON.stringify(response.user));
        
        setUser(response.user);
        setIsAuthenticated(true);
    } catch (error) {
        throw error;
    }
  };

  const signup = async (data: any) => {
    try {
        const response = await authService.signup(data);
        localStorage.setItem('instimem_token', response.token);
        localStorage.setItem('instimem_user', JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
    } catch (error) {
        throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('instimem_token');
    localStorage.removeItem('instimem_user');
    window.location.hash = '/';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, isLoading }}>
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