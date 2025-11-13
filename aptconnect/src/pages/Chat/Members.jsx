// src/pages/MembersList.jsx
import React from "react";

const members = [
  { id: 1, name: "classical", role: "Role", avatar: "src/assets/images/dp.png" },
  { id: 2, name: "classical", role: "Role", avatar: "src/assets/images/dp.png" },
  { id: 3, name: "classical", role: "Role", avatar: "src/assets/images/dp.png" },
  { id: 4, name: "classical", role: "Role", avatar: "src/assets/images/dp.png" },
];

function MemberRow({ member }) {
  return (
    <li className="flex items-center justify-between py-2">
      {/* left: avatar + text */}
      <div className="flex items-center gap-3 pl-45">
        <img
          src={member.avatar}
          alt={`${member.name} avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="text-slate-700 text-sm font-medium">{member.name}</div>
          <div className="text-slate-500 text-xs">{member.role}</div>
        </div>
      </div>

      {/* right: chat button */}
      <button
        type="button"
        className="bg-blue-600 text-white text-[10px] px-3 py-1  rounded-md hover:bg-blue-700 active:scale-95 transition mr-45"
        aria-label={`Chat with ${member.name}`}
      >
        chat
      </button>
    </li>
  );
}

export default function MembersList() {
  return (
    <div className="max-w-[1300px] mx-auto bg-white min-h-screen">
      {/* Header */}
      <header className="flex items-center gap-3 h-16 border-b border-slate-200 px-4">
        {/* simple back arrow */}
        <button
          type="button"
          className="p-1 rounded-full hover:bg-slate-100"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <svg
            className="w-4 h-4 text-slate-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 18l-6-6 6-6"
            />
          </svg>
        </button>

        <div className="text-black text-m font-medium ">69 Members</div>
      </header>

      {/* Members list */}
      <main className="p-4">
        <ul className="space-y-3">
          {members.map((m) => (
            <MemberRow key={m.id} member={m} />
          ))}
        </ul>
      </main>
    </div>
  );
}
