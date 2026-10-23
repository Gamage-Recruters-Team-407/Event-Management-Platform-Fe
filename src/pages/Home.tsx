import {
  ArrowRight,
  Briefcase,
  Code,
  MapPin,
  Music,
  Ticket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { eventsData } from "../data/eventsData";
import heroImg from "../assets/hero.jpg";
import FavoriteButton from "../components/FavoriteButton";
import HomeEventCard from "../components/HomeEventCard";

const categories = [
  { name: "Technology", icon: Code },
  { name: "Music", icon: Music },
  { name: "Business", icon: Briefcase },
];

const formatEventDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

export default function Home() {
  const navigate = useNavigate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvent = eventsData
    .filter(
      (event) => new Date(`${event.date}T00:00:00`).getTime() >= today.getTime(),
    )
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <div className="w-full pb-20 bg-gray-50/50">
      {/* 2. Hero Section background*/}
      <section
        className="text-white py-28 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2, 0, 46, 0.85), rgba(129, 58, 243, 0.85)), url(${heroImg})`,
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block backdrop-blur-sm">
            Simplify Your Event Experience
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Discover & Book <br />
            Unforgettable Events
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto font-light">
            Find the best tech conferences, live music festivals, and premium
            business exhibitions happening around you.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="bg-white text-indigo-600 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-indigo-950/40 inline-flex items-center gap-2 group transform hover:-translate-y-0.5"
          >
            Explore Events
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="absolute bottom-0 right-[10%] hidden h-28 w-px bg-gradient-to-b from-[#c9a8f1]/0 via-[#c9a8f1]/60 to-[#c9a8f1]/0 lg:block" />
      </section>

      {upcomingEvent && (
        <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9d72b3]">
              Coming up next
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#391053] sm:text-3xl">
              Your next unforgettable event
            </h2>
          </div>
          <article className="grid overflow-hidden rounded-3xl border border-[#c9a8f1]/30 bg-white shadow-sm md:grid-cols-2">
            <div className="relative min-h-64 overflow-hidden bg-[#c9a8f1]/15 md:min-h-80">
              <img
                src={upcomingEvent.image}
                alt={upcomingEvent.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <FavoriteButton
                eventId={upcomingEvent.id}
                eventTitle={upcomingEvent.title}
              />
              <span className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#5a2675] shadow-sm">
                {upcomingEvent.category}
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
              <p className="text-sm font-bold text-[#9d72b3]">
                {formatEventDate(upcomingEvent.date)}
              </p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#391053] sm:text-3xl">
                {upcomingEvent.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#5a2675]/75">
                {upcomingEvent.description}
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#5a2675]/80">
                <MapPin aria-hidden="true" className="h-4 w-4 text-[#9d72b3]" />
                {upcomingEvent.location}
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#c9a8f1]/25 pt-5">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#9d72b3]">
                    Tickets from
                  </span>
                  <span className="text-xl font-extrabold text-[#391053]">
                    LKR {upcomingEvent.price.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/event/${upcomingEvent.id}`)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5a2675] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#391053]/10 transition-all hover:-translate-y-0.5 hover:bg-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2"
                >
                  <Ticket aria-hidden="true" className="h-4 w-4" />
                  Explore event
                </button>
              </div>
            </div>
          </article>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9d72b3]">
              Find your kind of event
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#391053] sm:text-3xl">
              Explore by category
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              type="button"
              onClick={() => navigate("/events")}
              className="group flex items-center gap-5 rounded-2xl border border-[#c9a8f1]/30 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9d72b3]/60 hover:shadow-xl hover:shadow-[#391053]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2 sm:p-6 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#c9a8f1]/20 text-[#5a2675] transition-colors duration-300 group-hover:bg-[#5a2675] group-hover:text-white">
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <span className="flex-1 text-lg font-bold text-[#391053]">
                {name}
              </span>
              <ArrowRight className="h-5 w-5 text-[#9d72b3] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9d72b3]">
              Handpicked for you
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#391053] sm:text-3xl">
              Featured events
            </h2>
          </div>
          <button
            onClick={() => navigate("/events")}
            className="group inline-flex shrink-0 items-center gap-2 rounded-sm pb-1 text-sm font-bold text-[#5a2675] transition-colors hover:text-[#9d72b3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2"
          >
            See all events
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eventsData.map((event) => (
            <HomeEventCard
              key={event.id}
              event={event}
              onView={(eventId) => navigate(`/event/${eventId}`)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#391053] via-[#5a2675] to-[#813af3] px-6 py-10 text-white shadow-xl shadow-[#391053]/15 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:px-14">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#e1c8f5]">
              Make a moment memorable
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Find your next unforgettable event.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/80 sm:text-base">
              From live music to big ideas, there’s something happening for you.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/events")}
            className="relative z-10 mt-7 inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#5a2675] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#f7f0fc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#5a2675] lg:mt-0"
          >
            Explore events
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10"
          />
        </div>
      </section>
    </div>
  );
}
