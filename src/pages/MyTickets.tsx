import React, { useEffect, useState } from "react";
import { Ticket, MapPin, Calendar, Layers } from "lucide-react";

export default function MyTickets() {
  const [tickets, setTickets] = useState<any[]>([]);

  // books tikcket from local storage
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("my_tickets") || "[]");
    setTickets(savedTickets);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        My Booked Tickets
      </h1>
      <p className="text-gray-500 mb-8">
        View and manage your upcoming events tickets here.
      </p>

      {tickets.length > 0 ? (
        <div className="flex flex-col gap-6">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row items-center border-gray-100"
            >
              <img
                src={t.image}
                alt={t.eventTitle}
                className="w-full md:w-44 h-32 object-cover"
              />
              <div className="p-5 flex-grow w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1..5">
                  <h3 className="font-bold text-gray-800 text-lg line-clamp-1">
                    {t.eventTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3..5 h-3..5" /> {t.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3..5 h-3..5" /> {t.location}
                  </div>
                </div>
                <div className="flex sm:flex-col sm:items-end justify-between items-center border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50">
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded inline-flex items-center gap-1">
                    <Ticket className="w-3 h-3" /> Qty: {t.qty}
                  </span>
                  <span className="font-black text-indigo-600 text-lg sm:mt-2">
                    LKR {t.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-dashed rounded-2xl border-gray-200 flex flex-col items-center justify-center p-6">
          <Ticket className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium text-sm">
            You haven't booked any tickets yet.
          </p>
        </div>
      )}
    </div>
  );
}
