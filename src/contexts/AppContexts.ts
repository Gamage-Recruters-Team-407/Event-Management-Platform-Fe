import { createContext } from "react";

export type ToastType = "success" | "error";

export interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface FavoriteContextValue {
  favoriteIds: number[];
  toggleFavorite: (eventId: number) => void;
}

export const FavoriteContext =
  createContext<FavoriteContextValue | null>(null);
