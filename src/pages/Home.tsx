import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Music,
  Briefcase,
  MapPin,
  Calendar as CalendarIcon,
  Star,
} from "lucide-react";
import { eventsData } from "../data/eventsData";
// 1. import hero image
import heroImg from "../assets/hero.jpg";

export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { name: "Technology", icon: <Code className="w-6 h-6 text-indigo-600" /> },
    { name: "Music", icon: <Music className="w-6 h-6 text-pink-600" /> },
    { name: "Business", icon: <Briefcase className="w-6 h-6 text-blue-600" /> },
  ];

  return (
    <div className="w-full pb-20 bg-gray-50/50">
      {/* 2. Hero Section background*/}
      <section
        className="text-white py-28 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2, 0, 46, 0.85), rgba(129, 58, 243, 0.85)), url(${heroImg})`,
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block backdrop-blur-sm">
            Simplify Your Event Experience
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Discover & Book <br />
            Unforgettable Events
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto font-light">
            Find the best tech conferences, live music festivals, and premium
            business exhibitions happening around you.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="bg-white text-indigo-600 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-indigo-950/40 inline-flex items-center gap-2 group transform hover:-translate-y-0.5"
          >
            Explore Events
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 3. Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex items-center gap-2 mb-8">
          <Star className="w-5 h-5 text-indigo-600 fill-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Explore by Category
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => navigate("/events")}
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 cursor-pointer flex items-center gap-4 group"
            >
              <div className="p-4 bg-indigo-50/50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                {cat.icon}
              </div>
              <span className="font-bold text-gray-700 text-lg group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-gray-800">Featured Events</h2>
          <button
            onClick={() => navigate("/events")}
            className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm inline-flex items-center gap-1 group"
          >
            See All Events{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventsData &&
            eventsData.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 text-xs font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-xl shadow-sm">
                    {event.category}
                  </span>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-800 text-xl mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-col gap-3 text-sm text-gray-600 mb-6 mt-auto">
                    <div className="flex items-center gap-2.5">
                      <CalendarIcon className="w-4 h-4 text-indigo-500" />{" "}
                      <span className="font-medium text-gray-700">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-indigo-500" />{" "}
                      <span className="font-medium text-gray-700 line-clamp-1">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                        Price Starts From
                      </span>
                      <span className="font-black text-xl text-gray-800">
                        LKR {event.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/event/${event.id}`)}
                      className="text-sm bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-100"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
