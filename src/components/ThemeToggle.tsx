import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/AppHooks";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#5a2675] transition-colors hover:bg-[#c9a8f1]/20 hover:text-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3]"
    >
      <Icon
        key={theme}
        aria-hidden="true"
        className="theme-toggle-icon h-5 w-5"
      />
    </button>
  );
}
