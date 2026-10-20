import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, User, ArrowLeft } from "lucide-react";
import { eventsData } from "../data/eventsData";

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find event according to url id
  const event = eventsData.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="text-center py-20 font-semibold text-red-500">
        Event not found!
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-6 sm:p-8">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
            {event.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3 mb-6">
            {event.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-xl border border-gray-100 mb-8">
            <div className="flex flex-col gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-indigo-500" />{" "}
                <strong>Date:</strong> {event.date}
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-indigo-500" />{" "}
                <strong>Time:</strong> {event.time}
              </div>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-indigo-500" />{" "}
                <strong>Venue:</strong> {event.location}
              </div>
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-indigo-500" />{" "}
                <strong>Organizer:</strong> {event.organizer}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              About This Event
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {event.description}
            </p>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">
                Ticket Price
              </span>
              <span className="text-2xl font-black text-gray-800">
                LKR {event.price.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => navigate(`/book/${event.id}`)}
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-100"
            >
              Book Tickets Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
