import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar as CalendarIcon,
  SlidersHorizontal,
} from "lucide-react";
import { eventsData } from "../data/eventsData";

export default function Events() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter and search events based on search term and selected category
  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Explore All Events
      </h1>
      <p className="text-gray-500 mb-8">
        Find and book the best upcoming experiences near you.
      </p>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center mb-10 w-full">
        {/* Search Input */}
        <div className="relative w-full md:flex-grow">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by event name or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 pl-10 pr-4 py-2..5 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <SlidersHorizontal className="w-5 h-5 text-gray-400 hidden md:block" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-48 bg-gray-50 px-3 py-2..5 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 text-sm font-medium text-gray-700 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>

      {/* Events Grid Layout */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-grow flex flex-col">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded w-max mb-3">
                  {event.category}
                </span>
                <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex flex-col gap-2 text-xs text-gray-600 mb-5">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />{" "}
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />{" "}
                    {event.location}
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="font-bold text-gray-800">
                    LKR {event.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => navigate(`/event/${event.id}`)}
                    className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 font-medium">
          No events found matching your search.
        </div>
      )}
    </div>
  );
}
