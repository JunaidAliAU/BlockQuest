import { createContext, useContext, useState, useCallback } from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [isDark] = useState(true);

  const toggleTheme = useCallback(() => {
    // Reserved for future light mode support
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
