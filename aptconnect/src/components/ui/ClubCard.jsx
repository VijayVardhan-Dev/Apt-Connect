// src/components/ClubCard.jsx
import React from "react";

export default function ClubCard({ club, onClick }) {
  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 w-full">
      <div className="relative overflow-hidden h-40 bg-gray-50">
        <img
          src={club.image}
          alt={club.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{club.title}</h3>
        <p className="text-xs text-gray-500 font-medium mb-3">by {club.author}</p>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
          {club.tagline}
        </p>

        <button
          className="w-full px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
          onClick={onClick}
        >
          View Club
        </button>
      </div>
    </article>
  );
}
