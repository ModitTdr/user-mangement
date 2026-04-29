import { createContext } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
