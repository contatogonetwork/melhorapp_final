import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  currentTab: string;
  isMobile: boolean;
  currentPage: number; // Adicionado para rastrear a página atual
  selectedEventId: string | null; // Adicionado para rastrear o evento selecionado
}

interface UIStore extends UIState {
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setCurrentTab: (tab: string) => void;
  setIsMobile: (isMobile: boolean) => void;
  setCurrentPage: (page: number) => void; // Novo método para definir a página atual
  setSelectedEventId: (eventId: string | null) => void; // Novo método para definir o evento selecionado
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({      theme: 'system',
      sidebarOpen: true,
      currentTab: 'dashboard',
      isMobile: false,
      currentPage: 0, // 0 = Dashboard, 1 = Eventos, 2 = Equipe, 3 = Briefing, etc.
      selectedEventId: null, // Evento selecionado inicialmente nulo
      
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
      })),      setCurrentPage: (page) => set((state) => ({
        ...state,
        currentPage: page
      })),
      
      setSelectedEventId: (eventId) => set((state) => ({
        ...state,
        selectedEventId: eventId
      })),
    }),
    {
      name: 'ui-storage',
      skipHydration: true,
    }
  )
);
