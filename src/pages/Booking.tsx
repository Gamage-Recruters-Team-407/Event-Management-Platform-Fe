import React, { useState } from "react";
import { useNavigate as useNav } from "react-router-dom";
import { CheckCircle2, Ticket } from "lucide-react";
import { eventsData } from "../data/eventsData";

export default function Booking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNav();
  const event = eventsData.find((e) => e.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!event)
    return (
      <div className="text-center py-20 text-red-500">Event not found!</div>
    );

  const total = event.price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return alert("Please fill all fields!");

    // localStorage
    const currentTickets = JSON.parse(
      localStorage.getItem("my_tickets") || "[]",
    );
    const newTicket = {
      id: Date.now(),
      eventTitle: event.title,
      date: event.date,
      location: event.location,
      qty: quantity,
      totalPrice: total,
      image: event.image,
    };
    localStorage.setItem(
      "my_tickets",
      JSON.stringify([...currentTickets, newTicket]),
    );

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Your tickets have been successfully booked. You can view them in the
            'My Tickets' section.
          </p>
          <button
            onClick={() => navigate("/my-tickets")}
            className="w-full bg-indigo-600 text-white font-medium py-2..5 rounded-xl hover:bg-indigo-700 transition"
          >
            Go to My Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2 flex flex-col gap-5"
      >
        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-50 pb-3">
          Attendee Information
        </h2>
        <div className="flex flex-col gap-1..5">
          <label className="text-xs font-bold text-gray-500 uppercase">
            Full Name
          </label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
            placeholder="John Doe"
          />
        </div>
        <div className="flex flex-col gap-1..5">
          <label className="text-xs font-bold text-gray-500 uppercase">
            Email Address
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
            placeholder="john@example.com"
          />
        </div>
        <div className="flex flex-col gap-1..5">
          <label className="text-xs font-bold text-gray-500 uppercase">
            Ticket Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border rounded-md font-bold bg-gray-50"
            >
              -
            </button>
            <span className="font-bold text-lg w-6 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border rounded-md font-bold bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition mt-4"
        >
          Confirm & Pay
        </button>
      </form>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-max flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-50 pb-2">
          Order Summary
        </h2>
        <div className="text-sm">
          <h4 className="font-bold text-gray-700 line-clamp-1">
            {event.title}
          </h4>
          <span className="text-xs text-gray-400">{event.location}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 border-t border-dashed pt-3">
          <span>
            LKR {event.price.toLocaleString()} x {quantity}
          </span>
          <span className="font-medium">LKR {total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-gray-800 border-t pt-3 mt-2">
          <span className="font-bold">Total Price:</span>
          <span className="text-xl font-black text-indigo-600">
            LKR {total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
