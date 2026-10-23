import { Heart } from "lucide-react";
import { useFavorites } from "../contexts/AppHooks";

interface FavoriteButtonProps {
  eventId: number;
  eventTitle: string;
}

export default function FavoriteButton({
  eventId,
  eventTitle,
}: FavoriteButtonProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.includes(eventId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(eventId)}
      aria-label={`${isFavorite ? "Remove" : "Add"} ${eventTitle} ${
        isFavorite ? "from" : "to"
      } favorites`}
      aria-pressed={isFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border shadow-md backdrop-blur transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2 ${
        isFavorite
          ? "border-rose-200 bg-white text-rose-500"
          : "border-white/70 bg-white/95 text-[#5a2675] hover:text-rose-500"
      }`}
    >
      <Heart
        aria-hidden="true"
        className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
      />
    </button>
  );
}
