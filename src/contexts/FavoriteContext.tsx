import {
  useCallback,
  useState,
  type ReactNode,
} from "react";
import { FavoriteContext } from "./AppContexts";
import { useToast } from "./AppHooks";

const getInitialFavorites = (): number[] => {
  try {
    const savedFavorites: unknown = JSON.parse(
      localStorage.getItem("eventflow_favorites") || "[]",
    );
    if (
      Array.isArray(savedFavorites) &&
      savedFavorites.every(
        (eventId) => Number.isInteger(eventId) && eventId > 0,
      )
    ) {
      return savedFavorites;
    }

    console.error("Saved EventFlow favorites have an invalid format.");
  } catch (error) {
    console.error("Could not read saved EventFlow favorites.", error);
  }
  return [];
};

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(getInitialFavorites);
  const { showToast } = useToast();

  const toggleFavorite = useCallback(
    (eventId: number) => {
      const isFavorite = favoriteIds.includes(eventId);
      const updatedFavorites = isFavorite
        ? favoriteIds.filter((id) => id !== eventId)
        : [...favoriteIds, eventId];

      try {
        localStorage.setItem(
          "eventflow_favorites",
          JSON.stringify(updatedFavorites),
        );
        setFavoriteIds(updatedFavorites);
        showToast(
          isFavorite ? "Removed from your favorites." : "Event added to your favorites.",
          "success",
        );
      } catch (error) {
        console.error("Could not save EventFlow favorites.", error);
        setFavoriteIds(updatedFavorites);
        showToast("Favorite updated, but it could not be saved.", "error");
      }
    },
    [favoriteIds, showToast],
  );

  return (
    <FavoriteContext.Provider value={{ favoriteIds, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}
