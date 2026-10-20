import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Calendar } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Click*/}
          <Link
            to="/"
            className="flex items-center gap-2 text-indigo-600 font-bold text-xl cursor-pointer"
          >
            <Calendar className="w-6 h-6" />
            <span>
              Event<span className="text-gray-800">Flow</span>
            </span>
          </Link>

          {/* Desktop Menu*/}
          <div className="hidden md:flex items-center gap-6 font-medium text-gray-600">
            <Link
              to="/"
              className="hover:text-indigo-600 cursor-pointer transition"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="hover:text-indigo-600 cursor-pointer transition"
            >
              Events
            </Link>
            <Link
              to="/my-tickets"
              className="hover:text-indigo-600 cursor-pointer transition"
            >
              My Tickets
            </Link>
            <button
              onClick={() => navigate("/events")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button*/}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu one again*/}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 flex flex-col gap-4 font-medium text-gray-600 shadow-inner">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-indigo-600 cursor-pointer py-1"
          >
            Home
          </Link>
          <Link
            to="/events"
            onClick={() => setIsOpen(false)}
            className="hover:text-indigo-600 cursor-pointer py-1"
          >
            Events
          </Link>
          <Link
            to="/my-tickets"
            onClick={() => setIsOpen(false)}
            className="hover:text-indigo-600 cursor-pointer py-1"
          >
            My Tickets
          </Link>
          <button
            onClick={() => {
              navigate("/events");
              setIsOpen(false);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
