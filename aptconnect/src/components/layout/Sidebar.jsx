import React from "react";

import logo from "../../assets/logos/logo.png";
import feedbackIcon from "../../assets/icons/feedback_icon.png";
import helpIcon from "../../assets/icons/help_icon.png";
import settingsIcon from "../../assets/icons/settings.png";
import closeIcon from "../../assets/icons/cancel_icon.png";
import userIcon from "../../assets/icons/profile_icon.png";
// local icon assets — make sure these exist in your project
// Using placeholders for this example, replace with your actual paths


const Sidebar = ({ isSidebarOpen, onClose }) => {
  const exploreLinks = [
    { label: "Explore clubs", href: "/explore" },
    { label: "Showcase wall", href: "/showcase" },
    { label: "My chats", href: "/chat" },
  ];

  const myClubLinks = [
    { label: "Ai club", href: "#" },
    { label: "Dance club", href: "#" },
    { label: "Apt gang", href: "#" },
    { label: "Literature", href: "#" },
    { label: "Music lovers", href: "#" },
    { label: "Photography", href: "#" },
    { label: "Travel enthusiasts", href: "#" },
    { label: "Foodies", href: "#" },
    { label: "Fitness freaks", href: "#" },
    { label: "Movie buffs", href: "#" },
    { label: "Gaming zone", href: "#" },
    { label: "Art & Craft", href: "#" },
    { label: "Tech talks", href: "#" },
  ];

  const utilityLinks = [
    { label: "Feedback", iconSrc: feedbackIcon, href: "#" },
    { label: "Help", iconSrc: helpIcon, href: "#" },
  ];

  const handleError = (e) => {
    e.target.onerror = null;
    const size = e.target.className.includes('w-6') ? '24' : '20';
    e.target.src = `https://placehold.co/${size}x${size}/cccccc/000000?text=X`;
  };

  return (
    <aside
      className={`fixed top-0 left-0 w-72 h-screen bg-white flex flex-col z-40 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:z-auto`}
      onClick={(e) => e.stopPropagation()} // prevent overlay close when clicking inside
    >
      {/* Header - Removed 'fixed', it's part of the flex-col flow now */}
      <div className="flex-none flex justify-between items-center h-16 px-4 border-b border-slate-300">
        <div className="flex items-center">
          <img
            className="rounded-lg h-10 w-40 object-contain"
            src={logo}
            alt="App Logo"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/160x40/f0f0f0/000000?text=App+Logo"; }}
          />
        </div>

        <button
          className="p-1 rounded-full hover:bg-slate-100 transition-colors lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <img 
            src={closeIcon} 
            alt="Close" 
            className="w-6 h-6" 
            onError={handleError}
          />
        </button>
      </div>

      {/* NAV: scrollable area only */}
      <nav className="flex-1 overflow-y-auto py-6 pl-8 scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 scrollbar-hide">
        <div className="mb-8">
          <h3 className="mb-3 text-base font-medium text-slate-600">Explore</h3>
          {exploreLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-base text-slate-500 hover:bg-indigo-50 hover:text-indigo-700 transition-colors rounded-l-md"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div>
          <h3 className="mb-3 text-base font-medium text-slate-600">My clubs</h3>
          {myClubLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-base text-slate-500 hover:bg-indigo-50 hover:text-indigo-700 transition-colors rounded-l-md"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* FOOTER: non-scrolling (pinned). */}
      <div className="flex-none border-t border-slate-300 bg-white">
        {/* utility links */}
        <div className="px-8 py-3">
          {utilityLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center py-2 text-base text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors rounded-md"
            >
              <img
                src={item.iconSrc}
                alt={`${item.label} Icon`}
                className="w-5 h-5 mr-3 rounded"
                onError={handleError}
              />
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* bottom icons row */}
        <div className="bg-white py-3">
          <div className="px-8 flex items-center gap-x-6">
            <button
              className="p-2 rounded-full hover:bg-indigo-50 transition-colors"
              title="Profile"
              aria-label="Profile"
            >
              <img
                src={userIcon}
                alt="Profile Icon"
                className="w-6 h-6"
                onError={handleError}
              />
            </button>

            <button
              className="p-2 rounded-full hover:bg-indigo-50 transition-colors"
              title="Settings"
              aria-label="Settings"
            >
              <img
                src={settingsIcon}
                alt="Settings Icon"
                className="w-6 h-6"
                onError={handleError}
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;