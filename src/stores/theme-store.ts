import {create}  from 'zustand';

// Definimos el tipo de estado de nuestro store
interface ThemeStore {
  theme: 'light' | 'dark'; // Definimos los posibles valores del tema
  toggleTheme: () => void; // Función para cambiar el tema
}

// Creamos el store utilizando Zustand
const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light', // El valor inicial del tema
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useThemeStore;
