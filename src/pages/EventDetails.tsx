import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  User,
} from "lucide-react";
import { eventsData } from "../data/eventsData";

const formatEventDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = eventsData.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <main className="min-h-[60vh] bg-[#c9a8f1]/[0.08] px-4 py-24 text-center">
        <h1 className="text-2xl font-extrabold text-[#391053]">
          Event not found
        </h1>
        <p className="mt-2 text-sm text-[#5a2675]/75">
          This event may have been removed or the link may be incorrect.
        </p>
        <button
          type="button"
          onClick={() => navigate("/events")}
          className="mt-6 rounded-xl bg-[#5a2675] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#391053]/15 transition hover:bg-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2"
        >
          Explore events
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#c9a8f1]/[0.08] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-[#5a2675] transition hover:text-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to events
        </button>

        <article className="overflow-hidden rounded-3xl border border-[#c9a8f1]/35 bg-white shadow-[0_24px_70px_rgba(57,16,83,0.12)]">
          <div className="group relative h-64 overflow-hidden bg-[#391053] sm:h-80 lg:h-[26rem]">
            <img
              src={event.image}
              alt={`${event.title} event cover`}
              fetchPriority="high"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#391053]/90 via-[#391053]/20 to-[#391053]/10" />
            <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-[#391053]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-md sm:left-8 sm:top-8">
              {event.category}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="mb-2 text-sm font-semibold text-white/80">
                {formatEventDate(event.date)}
              </p>
              <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-2xl border border-[#c9a8f1]/30 bg-[#c9a8f1]/[0.10] p-4 sm:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#5a2675] shadow-sm">
                  <Calendar aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9d72b3]">
                    Date
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#391053]">
                    {formatEventDate(event.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-[#c9a8f1]/30 bg-[#c9a8f1]/[0.10] p-4 sm:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#5a2675] shadow-sm">
                  <Clock aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9d72b3]">
                    Time
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#391053]">
                    {event.time}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-[#c9a8f1]/30 bg-[#c9a8f1]/[0.10] p-4 sm:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#5a2675] shadow-sm">
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9d72b3]">
                    Venue
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#391053]">
                    {event.location}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-[#c9a8f1]/30 bg-[#c9a8f1]/[0.10] p-4 sm:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#5a2675] shadow-sm">
                  <User aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9d72b3]">
                    Hosted by
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#391053]">
                    {event.organizer}
                  </p>
                </div>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="text-xl font-extrabold tracking-tight text-[#391053]">
                About this event
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5a2675]/80 sm:text-base">
                {event.description}
              </p>
            </section>

            <div className="mt-8 flex flex-col gap-5 border-t border-[#c9a8f1]/35 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9d72b3]">
                  Ticket price
                </p>
                <p className="mt-1 text-3xl font-black tracking-tight text-[#391053]">
                  LKR {event.price.toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/book/${event.id}`)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#5a2675] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#391053]/20 transition hover:-translate-y-0.5 hover:bg-[#391053] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <Ticket aria-hidden="true" className="h-4 w-4" />
                Book Tickets Now
              </button>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
