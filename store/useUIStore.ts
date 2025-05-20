import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  currentTab: string;
  isMobile: boolean;
}

interface UIStore extends UIState {
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCurrentTab: (tab: string) => void;
  setIsMobile: (isMobile: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'system',
      sidebarOpen: true,
      currentTab: 'dashboard',
      isMobile: false,
      
      // Usando modo seguro para evitar problemas de atualização
      setTheme: (theme) => set((state) => ({ ...state, theme })),
      toggleSidebar: () => set((state) => ({ 
        ...state, 
        sidebarOpen: !state.sidebarOpen 
      })),
      setSidebarOpen: (open) => set((state) => ({ 
        ...state, 
        sidebarOpen: open 
      })),
      setCurrentTab: (tab) => set((state) => ({ 
        ...state, 
        currentTab: tab 
      })),
      setIsMobile: (isMobile) => set((state) => ({ 
        ...state, 
        isMobile 
      })),
    }),
    {
      name: 'ui-storage',
      skipHydration: true,
    }
  )
);
