// src/pages/Explore/Explore.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

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
      {/* ===== HEADER ===== */}
      <header className="w-full h-20 border-b border-slate-300 flex items-center gap-6 bg-white">
        {/* Left: back + title */}
        <div className="flex items-center gap-3">
          <img
            src="src/assets/icons/arrow_icon.png"
            alt="Back"
            className="w-8 h-5 cursor-pointer hover:opacity-80 transition"
            onClick={() => navigate("/")}
          />
          <h1 className="text-xl font-normal text-slate-800">Explore</h1>
        </div>

        {/* Centered search */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <img
              src="src/assets/icons/search_icon.png"
              alt="Search Icon"
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-500"
            />
            <input
              type="search"
              placeholder="search clubs"
              className="w-full h-12 pl-10 pr-4 rounded-md bg-neutral-100 border border-stone-300 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* optional right area (spacer) */}
        <div className="w-8" />
      </header>

      {/* ===== CATEGORIES ===== */}
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

      {/* ===== TOP CLUBS ===== */}
      <Section title="Top Clubs" linkText="View all">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-start">
          {topThree.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Section>

      {/* ===== RECOMMENDED ===== */}
      <Section title="Recommended" linkText="View all" className="mt-12 mb-16">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-start">
          {recommended.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Section>
    </section>
  );
}

/* Reusable Section wrapper */
function Section({ title, children, linkText, onLinkClick, className = "" }) {
  return (
    <div className={`mt-8 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 rounded-md px-3 py-1.5">
            <span className="text-white text-xs font-medium">{title}</span>
          </div>
        </div>

        {linkText && (
          <button onClick={onLinkClick} className="text-blue-600 text-xs hover:underline">
            {linkText}
          </button>
        )}
      </div>

      {children}
    </div>
  );
}

/* Card component */
function ProjectCard({ project }) {
  return (
    <article className="w-80 bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900">{project.title}</h3>
        <p className="mt-2 text-sm text-neutral-500">by {project.author}</p>
        <p className="mt-3 text-sm text-neutral-600 line-clamp-2">{project.tagline}</p>

        <div className="mt-4">
          <button
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="button"
          >
            View Club
          </button>
        </div>
      </div>
    </article>
  );
}
