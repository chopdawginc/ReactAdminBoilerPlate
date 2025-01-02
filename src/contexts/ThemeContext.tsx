import { Theme } from "@mui/material";
import { getMuiTheme } from "@styles/theme";
import { ITheme, THEME } from "@constants/theme";
import { ThemeProvider as MuiThemeProvider } from "@emotion/react";
import { createContext, useState, useContext, useEffect, ReactNode } from "react";

export enum Mode {
  LIGHT = "light",
  DARK = "dark",
}

interface ThemeContextType {
  theme: ITheme;
  mode: Mode;
  MuiTheme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme";

const saveThemeToStorage = (mode: Mode) => {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch (error) {
    console.error("Failed to save theme to LocalStorage:", error);
  }
};

const getThemeFromStorage = (): Mode | null => {
  try {
    const savedMode = localStorage.getItem(STORAGE_KEY);
    if (savedMode === Mode.LIGHT || savedMode === Mode.DARK) {
      return savedMode as Mode;
    }
    return null;
  } catch (error) {
    console.error("Failed to load theme from LocalStorage:", error);
    return null;
  }
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(() => Mode.LIGHT);

  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = getThemeFromStorage();
      if (savedTheme) {
        setMode(savedTheme);
      } else {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setMode(systemPrefersDark ? Mode.DARK : Mode.LIGHT);
      }
    };

    initializeTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!getThemeFromStorage()) {
        setMode(e.matches ? Mode.DARK : Mode.LIGHT);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const theme = THEME[mode];

  const toggleTheme = () => {
    const newMode = mode === Mode.DARK ? Mode.LIGHT : Mode.DARK;
    setMode(newMode);
    saveThemeToStorage(newMode);
  };

  const MuiTheme = getMuiTheme(mode, theme);

  return (
    <ThemeContext.Provider value={{ theme, mode, MuiTheme, toggleTheme }}>
      <MuiThemeProvider theme={MuiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
