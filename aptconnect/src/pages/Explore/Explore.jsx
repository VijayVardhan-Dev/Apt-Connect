// src/pages/Explore/Explore.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ClubCard from "../../components/ui/ClubCard";

const projects = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: "AI Sorting Robot",
  author: "Robotics Club",
  tagline: "Automized diagnosis and medical improvement",
  image: "https://placehold.co/318x159",
}));

const categories = [
  "Dance",
  "Music",
  "Robotics",
  "Design",
  "Photography",
  "Sports",
  "Coding",
  "Drama",
  "Art",
  "Volunteer",
];

export default function Explore() {
  const navigate = useNavigate();
  const topThree = projects.slice(0, 3);
  const recommended = projects.slice(3, 9);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* HEADER */}
      <header className="w-full h-16 flex justify-center items-center gap-6">
        <div className="flex items-center gap-3">
          <img
            src="src/assets/icons/arrow_icon.png"
            alt="Back"
            className="w-6 h-5 cursor-pointer hover:opacity-80 transition"
            onClick={() => navigate("/home")}
          />
          <h1 className="text-xl font-normal text-slate-800">Explore</h1>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <img
              src="src/assets/icons/search_icon.png"
              alt="Search Icon"
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-500"
            />
            <input
              type="search"
              placeholder="search clubs"
              className="w-full h-10 pl-10 pr-4 rounded-md bg-neutral-100 border border-stone-300 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-bordercolor"
            />
          </div>
        </div>

        <div className="w-8" />
      </header>

      {/* CATEGORIES */}
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm">
          categories
        </button>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {categories.map((c) => (
            <button
              key={c}
              className="py-1.5 px-3 border border-slate-300 rounded-md text-xs text-slate-700 bg-white hover:shadow-sm"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* TOP CLUBS */}
      <Section title="Top Clubs" linkText="View all">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {topThree.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              onClick={() => navigate(`/club/${club.id}`)}
            />
          ))}
        </div>
      </Section>

      {/* RECOMMENDED */}
      <Section title="Recommended" linkText="View all" className="mt-12 mb-16">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              onClick={() => navigate(`/club/${club.id}`)}
            />
          ))}
        </div>
      </Section>
    </section>
  );
}

/* Section Wrapper */
function Section({ title, children, linkText, onLinkClick, className = "" }) {
  return (
    <div className={`mt-8 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="bg-blue-600 rounded-md px-3 py-1.5">
          <span className="text-white text-xs font-medium">{title}</span>
        </div>

        {linkText && (
          <button
            onClick={onLinkClick}
            className="text-blue-600 text-xs hover:underline"
          >
            {linkText}
          </button>
        )}
      </div>

      {children}
    </div>
  );
}
