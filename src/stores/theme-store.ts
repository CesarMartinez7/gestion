import { create } from 'zustand';


interface ThemeStore {
  theme: 'light' | 'dark'; 
  toggleTheme: () => void; 
}


const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light', 
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    });
  },
}));

export default useThemeStore;
