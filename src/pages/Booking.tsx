import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Mail,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Ticket,
  UserRound,
} from "lucide-react";
import { eventsData } from "../data/eventsData";

type TicketType = "Standard" | "VIP";

interface Purchase {
  attendeeName: string;
  email: string;
  ticketType: TicketType;
  quantity: number;
  total: number;
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatEventDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const createTicketId = () => Date.now();

export default function Booking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = eventsData.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState<TicketType>("Standard");
  const [error, setError] = useState("");
  const [purchase, setPurchase] = useState<Purchase | null>(null);

  if (!event) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#c9a8f1]/[0.08] px-4 py-20 text-center">
        <Ticket aria-hidden="true" className="mb-4 h-12 w-12 text-[#9d72b3]" />
        <h1 className="text-2xl font-extrabold text-[#391053]">
          Event not found
        </h1>
        <p className="mt-2 max-w-md text-sm leading-6 text-[#5a2675]/75">
          This event may have been removed or the link may be incorrect.
        </p>
        <button
          type="button"
          onClick={() => navigate("/events")}
          className="mt-6 rounded-xl bg-[#5a2675] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#391053]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2"
        >
          Explore events
        </button>
      </main>
    );
  }

  const total = event.price * quantity;

  const handleSubmit = (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    setError("");

    const attendeeName = name.trim();
    const attendeeEmail = email.trim();
    if (!attendeeName || !attendeeEmail) {
      setError("Enter your full name and email address to continue.");
      return;
    }

    try {
      const storedTickets = localStorage.getItem("my_tickets");
      const currentTickets: unknown = storedTickets
        ? JSON.parse(storedTickets)
        : [];

      if (!Array.isArray(currentTickets)) {
        setError(
          "Your saved ticket data could not be read. Please resolve it before placing this order.",
        );
        return;
      }

      const newTicket = {
        id: createTicketId(),
        eventTitle: event.title,
        date: event.date,
        location: event.location,
        qty: quantity,
        totalPrice: total,
        image: event.image,
        attendeeName,
        email: attendeeEmail,
        ticketType,
      };

      localStorage.setItem(
        "my_tickets",
        JSON.stringify([...currentTickets, newTicket]),
      );
      setPurchase({
        attendeeName,
        email: attendeeEmail,
        ticketType,
        quantity,
        total,
      });
    } catch {
      setError(
        "We couldn't save your booking in this browser. Check your storage settings and try again.",
      );
    }
  };

  if (purchase) {
    return (
      <main
        aria-label="Booking confirmation"
        className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-[#24102f]/90 px-4 py-8 backdrop-blur-md"
      >
        <style>{`
          @keyframes booking-success-appear {
            from { opacity: 0; transform: translateY(18px) scale(.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .booking-success-appear { animation: booking-success-appear 420ms ease-out both; }
          @media (prefers-reduced-motion: reduce) {
            .booking-success-appear { animation: none; }
          }
        `}</style>
        <section
          aria-labelledby="booking-success-title"
          aria-modal="true"
          className="booking-success-appear relative my-auto w-full max-w-xl overflow-hidden rounded-3xl border border-[#c9a8f1]/35 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
          role="dialog"
        >
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#5a2675] via-[#9d72b3] to-[#c9a8f1]" />
          <div className="px-6 pb-8 pt-10 text-center sm:px-10 sm:pb-10 sm:pt-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/70">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                <Check aria-hidden="true" className="h-8 w-8" strokeWidth={3} />
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9d72b3]">
              Your plans are official
            </p>
            <h1
              id="booking-success-title"
              className="mt-2 text-3xl font-extrabold tracking-tight text-[#391053] sm:text-4xl"
            >
              Booking confirmed
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#5a2675]/75">
              You’re all set, {purchase.attendeeName}. Your tickets are saved
              and ready whenever you are.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#c9a8f1]/35 bg-[#c9a8f1]/[0.08] text-left">
              <div className="flex items-center gap-4 border-b border-[#c9a8f1]/30 p-4 sm:p-5">
                <img
                  src={event.image}
                  alt=""
                  className="h-16 w-20 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9d72b3]">
                    {event.category}
                  </span>
                  <h2 className="mt-1 line-clamp-2 text-sm font-bold text-[#391053]">
                    {event.title}
                  </h2>
                  <p className="mt-1 text-xs text-[#5a2675]/70">
                    {formatEventDate(event.date)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 sm:p-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9d72b3]">
                    Ticket type
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#391053]">
                    {purchase.ticketType}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9d72b3]">
                    Tickets
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#391053]">
                    {purchase.quantity}
                  </p>
                </div>
                <div className="col-span-2 flex items-end justify-between border-t border-[#c9a8f1]/30 pt-4">
                  <span className="text-sm font-semibold text-[#5a2675]">
                    Total paid
                  </span>
                  <span className="text-xl font-black text-[#391053]">
                    {formatPrice(purchase.total)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/my-tickets")}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#5a2675] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#391053]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#391053] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2"
            >
              <Ticket aria-hidden="true" className="h-4 w-4" />
              Go to My Tickets
            </button>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#5a2675]/60">
              <ShieldCheck
                aria-hidden="true"
                className="h-4 w-4 text-[#9d72b3]"
              />
              Your booking is saved securely in this browser
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#c9a8f1]/[0.08] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate(`/event/${event.id}`)}
          className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-[#5a2675] transition-all duration-300 hover:text-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to event
        </button>

        <header className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9d72b3]">
            Secure checkout
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#391053] sm:text-4xl">
            Complete your booking
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5a2675]/75 sm:text-base">
            A few details and you’re on your way to an unforgettable event.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)] lg:gap-8">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#c9a8f1]/35 bg-white p-5 shadow-[0_18px_55px_rgba(57,16,83,0.08)] sm:p-8"
          >
            <div className="mb-7 flex items-start gap-4 border-b border-[#c9a8f1]/30 pb-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c9a8f1]/25 text-[#5a2675]">
                <UserRound aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-[#391053]">
                  Attendee information
                </h2>
                <p className="mt-1 text-sm leading-5 text-[#5a2675]/70">
                  Enter the details for your booking.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#391053]">
                  Full name
                </span>
                <span className="relative block">
                  <UserRound
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9d72b3]"
                  />
                  <input
                    autoComplete="name"
                    className="h-12 w-full rounded-xl border border-[#c9a8f1]/55 bg-white py-3 pl-11 pr-4 text-sm text-[#391053] outline-none transition-all duration-300 placeholder:text-[#5a2675]/40 hover:border-[#9d72b3]/70 focus:border-[#9d72b3] focus:ring-4 focus:ring-[#9d72b3]/15"
                    maxLength={100}
                    name="name"
                    onChange={(changeEvent) =>
                      setName(changeEvent.target.value)
                    }
                    placeholder="e.g. Alex Morgan"
                    required
                    type="text"
                    value={name}
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#391053]">
                  Email address
                </span>
                <span className="relative block">
                  <Mail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9d72b3]"
                  />
                  <input
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#c9a8f1]/55 bg-white py-3 pl-11 pr-4 text-sm text-[#391053] outline-none transition-all duration-300 placeholder:text-[#5a2675]/40 hover:border-[#9d72b3]/70 focus:border-[#9d72b3] focus:ring-4 focus:ring-[#9d72b3]/15"
                    maxLength={254}
                    name="email"
                    onChange={(changeEvent) =>
                      setEmail(changeEvent.target.value)
                    }
                    placeholder="you@example.com"
                    required
                    type="email"
                    value={email}
                  />
                </span>
                <span className="mt-2 block text-xs text-[#5a2675]/60">
                  Your booking details will be saved in this browser.
                </span>
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#391053]">
                    Ticket type
                  </span>
                  <select
                    className="h-12 w-full rounded-xl border border-[#c9a8f1]/55 bg-white px-4 text-sm font-medium text-[#391053] outline-none transition-all duration-300 hover:border-[#9d72b3]/70 focus:border-[#9d72b3] focus:ring-4 focus:ring-[#9d72b3]/15"
                    name="ticketType"
                    onChange={(changeEvent) =>
                      setTicketType(
                        changeEvent.target.value === "VIP" ? "VIP" : "Standard",
                      )
                    }
                    value={ticketType}
                  >
                    <option value="Standard">Standard admission</option>
                    <option value="VIP">VIP admission</option>
                  </select>
                  <span className="mt-2 block text-xs text-[#5a2675]/60">
                    Both ticket types use the event’s listed price.
                  </span>
                </label>

                <fieldset>
                  <legend className="mb-2 block text-sm font-semibold text-[#391053]">
                    Number of tickets
                  </legend>
                  <div className="flex h-12 items-center justify-between rounded-xl border border-[#c9a8f1]/55 bg-white p-1.5">
                    <button
                      aria-label="Remove one ticket"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#c9a8f1]/20 text-[#5a2675] transition-all duration-300 hover:bg-[#5a2675] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={quantity <= 1}
                      onClick={() =>
                        setQuantity((currentQuantity) =>
                          Math.max(1, currentQuantity - 1),
                        )
                      }
                      type="button"
                    >
                      <Minus aria-hidden="true" className="h-4 w-4" />
                    </button>
                    <output
                      aria-live="polite"
                      className="min-w-10 text-center text-base font-extrabold text-[#391053]"
                    >
                      {quantity}
                    </output>
                    <button
                      aria-label="Add one ticket"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5a2675] text-white transition-all duration-300 hover:bg-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2"
                      onClick={() =>
                        setQuantity((currentQuantity) => currentQuantity + 1)
                      }
                      type="button"
                    >
                      <Plus aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </div>
                </fieldset>
              </div>

              {error && (
                <p
                  aria-live="assertive"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-5 text-red-800"
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#5a2675] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#391053]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#391053] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2"
              type="submit"
            >
              <CreditCard aria-hidden="true" className="h-4 w-4" />
              Confirm &amp; Purchase
            </button>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#5a2675]/60">
              <ShieldCheck
                aria-hidden="true"
                className="h-4 w-4 text-[#9d72b3]"
              />
              No payment details are required for this demo checkout
            </p>
          </form>

          <aside className="lg:sticky lg:top-8">
            <section className="overflow-hidden rounded-3xl border border-[#c9a8f1]/35 bg-white shadow-[0_18px_55px_rgba(57,16,83,0.10)]">
              <div className="border-b border-[#c9a8f1]/30 px-5 py-5 sm:px-6">
                <h2 className="text-lg font-extrabold tracking-tight text-[#391053]">
                  Order summary
                </h2>
                <p className="mt-1 text-sm text-[#5a2675]/65">
                  Review your event and ticket details.
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <div className="group relative mb-5 h-44 overflow-hidden rounded-2xl bg-[#391053] sm:h-48">
                  <img
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    src={event.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#391053]/90 via-[#391053]/15 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-[#391053]/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
                    {event.category}
                  </span>
                  <h3 className="absolute inset-x-4 bottom-4 line-clamp-2 text-lg font-extrabold leading-snug text-white">
                    {event.title}
                  </h3>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="flex items-start gap-3 text-[#5a2675]/80">
                    <Calendar
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#9d72b3]"
                    />
                    <span>{formatEventDate(event.date)}</span>
                  </p>
                  <p className="flex items-start gap-3 text-[#5a2675]/80">
                    <Clock
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#9d72b3]"
                    />
                    <span>{event.time}</span>
                  </p>
                  <p className="flex items-start gap-3 text-[#5a2675]/80">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#9d72b3]"
                    />
                    <span>{event.location}</span>
                  </p>
                </div>

                <div className="my-5 border-t border-dashed border-[#c9a8f1]/60" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-4 text-[#5a2675]/80">
                    <span>
                      {ticketType} ticket × {quantity}
                    </span>
                    <span className="shrink-0 font-semibold text-[#391053]">
                      {formatPrice(event.price * quantity)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-[#5a2675]/80">
                    <span>Price per ticket</span>
                    <span>{formatPrice(event.price)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-[#c9a8f1]/35 pt-4">
                    <span className="font-bold text-[#391053]">Total</span>
                    <span className="text-2xl font-black tracking-tight text-[#391053]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 bg-[#c9a8f1]/[0.12] px-5 py-3 text-xs font-medium text-[#5a2675]/75">
                <CheckCircle2
                  aria-hidden="true"
                  className="h-4 w-4 text-[#9d72b3]"
                />
                Your total updates automatically
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
// new update
