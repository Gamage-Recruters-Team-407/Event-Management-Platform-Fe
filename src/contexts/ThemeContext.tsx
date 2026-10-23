import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ThemeContext, type Theme } from "./AppContexts";
import { useToast } from "./AppHooks";

const getInitialTheme = (): Theme => {
  try {
    return localStorage.getItem("eventflow_theme") === "dark" ? "dark" : "light";
  } catch (error) {
    console.error("Could not read the saved EventFlow theme.", error);
    return "light";
  }
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const { showToast } = useToast();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    try {
      localStorage.setItem("eventflow_theme", nextTheme);
      showToast(
        `Switched to ${nextTheme} mode.`,
        "success",
      );
    } catch (error) {
      console.error("Could not save the EventFlow theme preference.", error);
      showToast("Theme changed, but your preference could not be saved.", "error");
    }
  }, [showToast, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
