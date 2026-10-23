import { useState } from "react";
import { ArrowRight, Calendar, MapPin, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BookedTicket {
  id: number;
  eventTitle: string;
  date: string;
  location: string;
  qty: number;
  totalPrice: number;
  image: string;
}

type TicketTab = "upcoming" | "past";

const isBookedTicket = (value: unknown): value is BookedTicket => {
  if (typeof value !== "object" || value === null) return false;

  const ticket = value as Record<string, unknown>;
  return (
    typeof ticket.id === "number" &&
    typeof ticket.eventTitle === "string" &&
    typeof ticket.date === "string" &&
    Number.isFinite(new Date(`${ticket.date}T00:00:00`).getTime()) &&
    typeof ticket.location === "string" &&
    typeof ticket.qty === "number" &&
    typeof ticket.totalPrice === "number" &&
    typeof ticket.image === "string"
  );
};

const loadTickets = (): { tickets: BookedTicket[]; error: string } => {
  try {
    const storedTickets = localStorage.getItem("my_tickets");
    const savedTickets: unknown = storedTickets ? JSON.parse(storedTickets) : [];

    if (!Array.isArray(savedTickets) || !savedTickets.every(isBookedTicket)) {
      return { tickets: [], error: "Your saved ticket data could not be read." };
    }

    return { tickets: savedTickets, error: "" };
  } catch {
    return {
      tickets: [],
      error: "Your saved tickets could not be loaded from this browser.",
    };
  }
};

const formatEventDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

export default function MyTickets() {
  const [ticketState] = useState(loadTickets);
  const [activeTab, setActiveTab] = useState<TicketTab>("upcoming");
  const { tickets, error: loadError } = ticketState;
  const navigate = useNavigate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const visibleTickets = tickets.filter((ticket) => {
    const isUpcoming =
      new Date(`${ticket.date}T00:00:00`).getTime() >= today.getTime();
    return activeTab === "upcoming" ? isUpcoming : !isUpcoming;
  });

  const tabs: { id: TicketTab; label: string; count: number }[] = [
    {
      id: "upcoming",
      label: "Upcoming Events",
      count: tickets.filter(
        (ticket) =>
          new Date(`${ticket.date}T00:00:00`).getTime() >= today.getTime(),
      ).length,
    },
    {
      id: "past",
      label: "Past Events",
      count: tickets.filter(
        (ticket) =>
          new Date(`${ticket.date}T00:00:00`).getTime() < today.getTime(),
      ).length,
    },
  ];

  return (
    <div className="mx-auto min-h-[60vh] max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9d72b3]">
        Your EventFlow
      </p>
      <h1 className="text-3xl font-extrabold tracking-tight text-[#391053]">
        My tickets
      </h1>
      <p className="mb-8 mt-2 text-sm text-[#5a2675]/70">
        View your upcoming plans and revisit events you have attended.
      </p>

      {loadError ? (
        <p
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700"
        >
          {loadError}
        </p>
      ) : (
        <>
          <div
            role="tablist"
            aria-label="Filter tickets by event date"
            className="mb-6 flex gap-2 border-b border-[#c9a8f1]/30"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tickets-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tickets-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`-mb-px inline-flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] sm:px-4 ${
                  activeTab === tab.id
                    ? "border-[#5a2675] text-[#391053]"
                    : "border-transparent text-[#5a2675]/60 hover:text-[#391053]"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    activeTab === tab.id
                      ? "bg-[#c9a8f1]/25 text-[#5a2675]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div
            id={`tickets-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tickets-tab-${activeTab}`}
            tabIndex={0}
            className="outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3]"
          >
            {visibleTickets.length > 0 ? (
              <div className="flex flex-col gap-5">
                {visibleTickets.map((ticket) => (
                  <article
                    key={ticket.id}
                    className="flex flex-col items-center overflow-hidden rounded-2xl border border-[#c9a8f1]/25 bg-white shadow-sm sm:flex-row"
                  >
                    <img
                      src={ticket.image}
                      alt={ticket.eventTitle}
                      className="h-48 w-full bg-[#c9a8f1]/15 object-cover sm:h-36 sm:w-44"
                    />
                    <div className="flex w-full flex-1 flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
                      <div className="flex min-w-0 flex-col gap-2">
                        <h2 className="line-clamp-1 text-lg font-bold text-[#391053]">
                          {ticket.eventTitle}
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-[#5a2675]/70">
                          <Calendar
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-[#9d72b3]"
                          />
                          {formatEventDate(ticket.date)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#5a2675]/70">
                          <MapPin
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-[#9d72b3]"
                          />
                          <span className="line-clamp-1">{ticket.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-[#c9a8f1]/20 pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#c9a8f1]/20 px-2.5 py-1 text-xs font-bold text-[#5a2675]">
                          <Ticket aria-hidden="true" className="h-3.5 w-3.5" />
                          Qty: {ticket.qty}
                        </span>
                        <span className="text-lg font-black text-[#5a2675]">
                          LKR {ticket.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#c9a8f1]/50 bg-white px-6 py-16 text-center">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c9a8f1]/20 text-[#9d72b3]">
                  <Ticket aria-hidden="true" className="h-7 w-7" />
                </span>
                <h2 className="font-bold text-[#391053]">
                  {activeTab === "upcoming"
                    ? "No upcoming tickets yet"
                    : "No past events yet"}
                </h2>
                <p className="mt-2 max-w-sm text-sm text-[#5a2675]/70">
                  {activeTab === "upcoming"
                    ? "Explore the calendar and find an event you’ll love."
                    : "Your attended events will appear here after their event date."}
                </p>
                {activeTab === "upcoming" && (
                  <button
                    type="button"
                    onClick={() => navigate("/events")}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#5a2675] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2"
                  >
                    Explore events
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
