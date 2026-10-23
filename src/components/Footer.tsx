import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-[#c9a8f1]/25 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link
          to="/"
          aria-label="EventFlow home"
          className="inline-flex w-fit items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-4"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#5a2675] to-[#391053] text-white">
            <Calendar aria-hidden="true" className="h-4 w-4" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-[#391053]">
            Event<span className="text-[#9d72b3]">Flow</span>
          </span>
        </Link>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            to="/events"
            className="text-sm font-medium text-[#5a2675]/75 transition-colors hover:text-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3]"
          >
            Explore events
          </Link>
          <Link
            to="/my-tickets"
            className="text-sm font-medium text-[#5a2675]/75 transition-colors hover:text-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3]"
          >
            My tickets
          </Link>
        </nav>

        <p className="text-sm text-[#5a2675]/65">
          © {new Date().getFullYear()} EventFlow. Make every moment count.
        </p>
      </div>
    </footer>
  );
}
