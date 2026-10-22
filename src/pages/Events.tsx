import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { eventsData } from "../data/eventsData";

const formatEventDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

export default function Events() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const query = searchTerm.trim().toLowerCase();

  const categories = useMemo(
    () => [...new Set(eventsData.map((event) => event.category))].sort(),
    [],
  );

  const filteredEvents = useMemo(
    () =>
      eventsData.filter((event) => {
        const matchesSearch =
          !query ||
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query) ||
          event.organizer.toLowerCase().includes(query);
        const matchesCategory =
          selectedCategory === "All" || event.category === selectedCategory;
        const matchesDate = !selectedDate || event.date === selectedDate;

        return matchesSearch && matchesCategory && matchesDate;
      }),
    [query, selectedCategory, selectedDate],
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedDate("");
  };

  const hasFilters =
    searchTerm.trim() !== "" || selectedCategory !== "All" || selectedDate !== "";

  return (
    <div className="min-h-screen bg-[#c9a8f1]/[0.08]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="mb-8 sm:mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9d72b3]">
            Make room for something memorable
          </p>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#391053] sm:text-4xl">
                Explore events
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#5a2675]/70 sm:text-base">
                Discover inspiring experiences, meet your people, and find your
                next favorite event.
              </p>
            </div>
            <p className="shrink-0 text-sm font-semibold text-[#5a2675]/70">
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "event" : "events"} to explore
            </p>
          </div>
        </header>

        <section
          aria-label="Search and filter events"
          className="mb-8 rounded-2xl border border-[#c9a8f1]/30 bg-white p-3 shadow-[0_12px_35px_rgba(57,16,83,0.06)] sm:p-4"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px_200px_auto] md:items-center">
            <label className="relative block">
              <span className="sr-only">Search events by name, venue, or category</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9d72b3]"
              />
              <input
                type="search"
                placeholder="Search name, venue, category, or organizer..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#c9a8f1]/35 bg-[#c9a8f1]/[0.08] pl-12 pr-4 text-sm text-[#391053] outline-none transition placeholder:text-[#5a2675]/45 focus:border-[#9d72b3] focus:bg-white focus:ring-4 focus:ring-[#c9a8f1]/25"
              />
            </label>

            <label className="relative flex h-12 items-center gap-3 rounded-xl border border-[#c9a8f1]/35 bg-[#c9a8f1]/[0.08] px-3 transition focus-within:border-[#9d72b3] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#c9a8f1]/25">
              <SlidersHorizontal
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#9d72b3]"
              />
              <span className="sr-only">Filter by category</span>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-1 text-sm font-semibold text-[#391053] outline-none"
              >
                <option value="All">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <span
                aria-hidden="true"
                className="pointer-events-none text-xs text-[#9d72b3]"
              >
                ▾
              </span>
            </label>

            <label className="relative flex h-12 items-center gap-3 rounded-xl border border-[#c9a8f1]/35 bg-[#c9a8f1]/[0.08] px-3 transition focus-within:border-[#9d72b3] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#c9a8f1]/25">
              <CalendarIcon
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-[#9d72b3]"
              />
              <span className="sr-only">Filter by event date</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#391053] outline-none"
              />
            </label>

            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasFilters}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-[#5a2675] transition hover:bg-[#c9a8f1]/20 hover:text-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          </div>
        </section>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#c9a8f1]/25 bg-white shadow-[0_4px_18px_rgba(57,16,83,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9d72b3]/55 hover:shadow-xl hover:shadow-[#391053]/10 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative h-52 overflow-hidden bg-[#c9a8f1]/20">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#391053]/35 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-lg border border-[#c9a8f1]/40 bg-[#c9a8f1]/90 px-3 py-1.5 text-xs font-bold text-[#391053] shadow-sm backdrop-blur-sm">
                    {event.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="mb-2 line-clamp-1 text-lg font-bold tracking-tight text-[#391053]">
                    {event.title}
                  </h2>
                  <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 text-[#5a2675]/70">
                    {event.description}
                  </p>

                  <div className="mb-5 flex flex-col gap-3 text-sm text-[#5a2675]/80">
                    <div className="flex items-center gap-2.5">
                      <CalendarIcon className="h-4 w-4 shrink-0 text-[#9d72b3]" />
                      <span>{formatEventDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 shrink-0 text-[#9d72b3]" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#c9a8f1]/25 pt-4">
                    <span className="text-lg font-extrabold text-[#391053]">
                      LKR {event.price.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate(`/event/${event.id}`)}
                      className="rounded-xl bg-[#5a2675] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#391053]/15 transition-all hover:-translate-y-0.5 hover:bg-[#391053] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#9d72b3]/45 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c9a8f1]/25 text-[#5a2675]">
              <Search className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-[#391053]">
              No events match those filters
            </h2>
            <p className="mt-2 text-sm text-[#5a2675]/70">
              Try a different search or clear your filters to see all events.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-[#5a2675] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
