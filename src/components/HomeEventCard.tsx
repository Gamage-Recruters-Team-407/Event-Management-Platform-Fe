import { useState } from "react";
import { Calendar as CalendarIcon, MapPin } from "lucide-react";
import type { EventType } from "../data/eventsData";
import FavoriteButton from "./FavoriteButton";
import { EventCardSkeleton } from "./Skeleton";

interface HomeEventCardProps {
  event: EventType;
  onView: (eventId: number) => void;
}

const formatEventDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

export default function HomeEventCard({ event, onView }: HomeEventCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (isImageLoading) {
    return (
      <div className="relative">
        <img
          src={event.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute h-px w-px opacity-0"
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />
        <EventCardSkeleton />
      </div>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#c9a8f1]/25 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-[#9d72b3]/50 hover:shadow-xl hover:shadow-[#391053]/10 motion-reduce:transform-none motion-reduce:transition-none">
      <div className="relative h-56 overflow-hidden bg-[#c9a8f1]/15">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#391053]/35 to-transparent" />
        <FavoriteButton eventId={event.id} eventTitle={event.title} />
        <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#5a2675] shadow-sm backdrop-blur">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-2 line-clamp-1 text-xl font-bold tracking-tight text-[#391053] transition-colors group-hover:text-[#5a2675]">
          {event.title}
        </h3>
        <p className="mb-5 line-clamp-2 text-sm leading-6 text-[#5a2675]/70">
          {event.description}
        </p>

        <div className="mb-5 mt-auto flex flex-col gap-3 text-sm text-[#5a2675]/80">
          <div className="flex items-center gap-2.5">
            <CalendarIcon className="h-4 w-4 shrink-0 text-[#9d72b3]" />
            <span className="font-medium">{formatEventDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-[#9d72b3]" />
            <span className="line-clamp-1 font-medium">{event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#c9a8f1]/25 pt-4">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#9d72b3]">
              Starting from
            </span>
            <span className="text-lg font-extrabold text-[#391053]">
              LKR {event.price.toLocaleString()}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onView(event.id)}
            className="rounded-xl bg-[#5a2675] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#391053]/10 transition-all hover:-translate-y-0.5 hover:bg-[#391053] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}
