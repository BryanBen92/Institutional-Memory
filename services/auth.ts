import { api } from './api';
import { User, UserRole } from '../types';
import { CONFIG } from '../config';

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    if (CONFIG.IS_DEMO) {
      // Mock Response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: '1',
              name: 'Alex Rivera',
              email: email,
              role: UserRole.ADMIN,
              avatar: 'https://picsum.photos/id/64/200/200'
            },
            token: 'mock-jwt-token-' + Date.now()
          });
        }, 800);
      });
    }
    return api.post<AuthResponse>('/auth/login', { email, password });
  },

  signup: async (data: { name: string; email: string; company: string; password: string }): Promise<AuthResponse> => {
    if (CONFIG.IS_DEMO) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: '2',
              name: data.name,
              email: data.email,
              role: UserRole.ADMIN,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}`
            },
            token: 'mock-jwt-token-' + Date.now()
          });
        }, 1000);
      });
    }
    return api.post<AuthResponse>('/auth/register', data);
  },

  getCurrentUser: async (): Promise<User> => {
    if (CONFIG.IS_DEMO) {
       const stored = localStorage.getItem('instimem_user');
       return stored ? JSON.parse(stored) : null;
    }
    return api.get<User>('/auth/me');
  }
};