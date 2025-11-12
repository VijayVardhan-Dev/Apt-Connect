// src/pages/Showcase/Showcase.jsx
import React from "react";

const projects = Array.from({ length: 12}).map((_, i) => ({
  id: i + 1,
  title: "AI Sorting Robot",
  author: "Robotics Club",
  tagline: "Automized diagnosis and medical improvement",
  image: "https://placehold.co/318x159",
}));

export default function Showcase() {
  const topThree = projects.slice(0, 3);
  const fewMore = projects.slice(3);

  return (
    <section className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="h-16 flex items-center border-b border-slate-300">
        <img
          src="src/assets/icons/arrow_icon.png"
          alt="icon"
          className="w-10 h-6 pl-4 mr-4 rounded"
        />
        <h2 className="text-xl font-normal">Showcase wall</h2>
      </div>

      {/* Top three clubs */}
      <div className="mt-8 pl-15">
        <h3 className="text-lg font-semibold mb-6 px-2  sm:px-0">
          Top three clubs
        </h3>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {topThree.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      {/* Few more clubs */}
      <div className="mt-12 mb-16 pl-15">
        <h3 className="text-lg font-semibold mb-6 px-2 sm:px-0">
          Few more clubs
        </h3>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {fewMore.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="w-80 bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200">
      <img
        src={project.image}
        alt={`${project.title}`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-neutral-500">by {project.author}</p>
        <p className="mt-3 text-sm text-neutral-500 line-clamp-2">
          {project.tagline}
        </p>
        <div className="mt-4">
          <button
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="button"
          >
            View Project
          </button>
        </div>
      </div>
    </article>
  );
}

export default Showcase