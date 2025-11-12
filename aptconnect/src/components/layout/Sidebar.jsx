import React from "react";
import logoIcon from "../../assets/logos/logo.png";

// local icon assets — make sure these exist in your project
import feedbackIcon from "../../assets/icons/feedback_icon.png";
import helpIcon from "../../assets/icons/help_icon.png";
import userIcon from "../../assets/icons/profile_icon.png";
import settingsIcon from "../../assets/icons/settings.png";
import closeIcon from "../../assets/icons/side_bar_toggle_icon.png";

const Sidebar = ({ onClose }) => {
  const exploreLinks = [
    { label: "Explore clubs", href: "#" },
    { label: "Showcase wall", href: "#" },
    { label: "My chats", href: "#" },
    { label: "Notifications", href: "#" },
  ];

  const myClubLinks = [
    { label: "Ai club", href: "#" },
    { label: "Dance club", href: "#" },
    { label: "Apt gang", href: "#" },
    { label: "Literature", href: "#" },
  ];

  const utilityLinks = [
    { label: "Feedback", iconSrc: feedbackIcon, href: "#" },
    { label: "Help", iconSrc: helpIcon, href: "#" },
  ];

  return (
    <aside
      className="w-80 h-full bg-white flex flex-col shadow-2xl overflow-y-auto"
      onClick={(e) => e.stopPropagation()} // prevent overlay close when clicking inside
    >
      {/* Header */}
      <div className="flex justify-between items-center h-16 px-4 border-b border-slate-300">
        <div className="flex items-left">
          <img className="rounded-lg h-13 w-40" src={logoIcon} alt="App Logo" />
        </div>

        <button
          className="p-1 rounded-full hover:bg-slate-100 transition-colors"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <img src={closeIcon} alt="Close" className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="grow py-6 pl-8">
        <div className="mb-8">
          <h3 className="mb-3 text-base font-medium text-slate-600">Explore</h3>
          {exploreLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-2 text-base text-slate-500 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
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
              className="block py-2 text-base text-slate-500 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="py-6 border-t border-slate-300 flex flex-col justify-between flex-1">
        <div>
          {utilityLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center py-2 pl-20 text-base text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              <img
                src={item.iconSrc}
                alt={`${item.label} Icon`}
                className="w-5 h-5 mr-3 rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/20x20/cccccc/000000?text=X";
                }}
              />
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Bottom row: two separate icon buttons */}
        <div className="sticky bottom-0 bg-white py-3">
          <div className="flex justify-between items-center px-10">
            <button
              className="p-2 rounded-full hover:bg-indigo-50 transition-colors"
              title="Profile"
              aria-label="Profile"
            >
              <img
                src={userIcon}
                alt="Profile Icon"
                className="w-6 h-6"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/24x24/cccccc/000000?text=P";
                }}
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
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/24x24/cccccc/000000?text=S";
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
