import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 text-center text-sm text-gray-500 bg-white border-t">
      © {new Date().getFullYear()} APT Connect. All rights reserved.
    </footer>
  );
};

export default Footer;
