import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string) => {
    // simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // simulate successful login user info
    const mockUser: User = {
      id: 'T-001',
      name: 'Sarah Tan',
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    };

    set({ user: mockUser, isAuthenticated: true });
    localStorage.setItem('tutor_token', 'mock_token_123'); // simulate token storage
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('tutor_token');
  }
}));