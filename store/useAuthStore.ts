import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/types/user';

interface AuthStore extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Usando uma versão modificada para evitar problemas de atualização infinita com React 19
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: (user) => {
        // Usando estrutura mais segura para fazer updates
        set((state) => ({
          ...state,
          user,
          isAuthenticated: true
        }));
      },
      logout: () => {
        set((state) => ({
          ...state,
          user: null,
          isAuthenticated: false
        }));
      },
      updateUser: (userData) => 
        set((state) => ({
          ...state,
          user: state.user ? { ...state.user, ...userData } : null
        }))
    }),
    {
      name: 'auth-storage',
      // Configuração para melhorar compatibilidade e performance
      skipHydration: true,
    }
  )
);
