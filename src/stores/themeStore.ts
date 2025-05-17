import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? 'dark' 
          : 'light',
      
      toggleTheme: () => 
        set((state) => ({ 
          theme: state.theme === 'light' ? 'dark' : 'light' 
        })),
      
      setTheme: (theme) => 
        set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);