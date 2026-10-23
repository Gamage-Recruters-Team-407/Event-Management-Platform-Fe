import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Calendar, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-2 text-sm font-semibold transition-colors duration-200 ${
    isActive ? "text-[#391053]" : "text-[#5a2675]/75 hover:text-[#9d72b3]"
  } after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-[#9d72b3] after:transition-transform after:duration-200 ${
    isActive
      ? "after:scale-x-100"
      : "after:scale-x-0 hover:after:scale-x-100"
  }`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#c9a8f1]/25 bg-white/85 shadow-[0_8px_30px_rgba(57,16,83,0.06)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between">
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="EventFlow home"
            className="group flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-4"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5a2675] to-[#391053] text-white shadow-lg shadow-[#391053]/20 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
              <Calendar className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-[#391053]">
              Event<span className="text-[#9d72b3]">Flow</span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/events" className={navLinkClass}>
              Events
            </NavLink>
            <NavLink to="/my-tickets" className={navLinkClass}>
              My Tickets
            </NavLink>
            <ThemeToggle />
            <Link
              to="/events"
              className="rounded-xl bg-[#5a2675] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#391053]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#391053] hover:shadow-lg hover:shadow-[#391053]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
            >
              Get Started
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#391053] transition-colors hover:bg-[#c9a8f1]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3]"
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#c9a8f1]/25 bg-white/95 px-4 pb-5 pt-3 shadow-lg shadow-[#391053]/5 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <NavLink to="/" end onClick={closeMenu} className={navLinkClass}>
              Home
            </NavLink>
            <NavLink
              to="/events"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Events
            </NavLink>
            <NavLink
              to="/my-tickets"
              onClick={closeMenu}
              className={navLinkClass}
            >
              My Tickets
            </NavLink>
            <Link
              to="/events"
              onClick={closeMenu}
              className="mt-3 w-full rounded-xl bg-[#5a2675] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#391053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9d72b3] focus-visible:ring-offset-2"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
