import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { Link } from "react-router-dom";

// local menu icon for header (no SVG)
import menuIcon from "../../assets/icons/3dots_icon.png";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between z-40 relative">
        <div className="text-xl font-bold">My App Dashboard</div>

        {/* Menu Button to Open Sidebar */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          aria-label="Open sidebar"
        >
          <img src={menuIcon} alt="menu" className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-6">Welcome!</h2>
        <p className="text-gray-600">
          This is the main content of your home page. The sidebar will overlay this content when opened.
        </p>

        <Link to="/profile" className="text-indigo-600 underline mt-4 block">
          Go to Profile
        </Link>
      </main>

      {/* Conditional Sidebar + Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex"
          onClick={closeSidebar}
        >
          <Sidebar onClose={closeSidebar} />
        </div>
      )}
    </div>
  );
}
