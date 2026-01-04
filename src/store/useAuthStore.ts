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
    // 模拟 API 请求延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // 模拟成功登录后的用户信息
    const mockUser: User = {
      id: 'T-001',
      name: 'Sarah Tan',
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    };

    set({ user: mockUser, isAuthenticated: true });
    localStorage.setItem('tutor_token', 'mock_token_123'); // 模拟 Token 存储
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('tutor_token');
  }
}));