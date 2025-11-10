import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold text-primary">APT Connect</h1>
      <div className="flex gap-4 text-sm font-medium">
        <a href="/home" className="hover:text-primary">
          Home
        </a>
        <a href="/explore" className="hover:text-primary">
          Explore
        </a>
        <a href="/showcase" className="hover:text-primary">
          Showcase
        </a>
        <a
          href="/login"
          className="hover:bg-primary hover:text-white px-3 py-1 rounded"
        >
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
