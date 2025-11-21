import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    const links = {
        Platform: ["Features", "Showcase", "Login"],
        Resources: ["About Us", "FAQ", "Blog"],
        Legal: ["Privacy Policy", "Terms of Service", "Contact"],
    };

    return (
        <footer className="bg-indigo-600 text-white pt-16 pb-8 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* Brand */}
                <div>
                    <h3 className="text-xl font-bold mb-4">APT Connect</h3>
                    <p className="text-indigo-100 text-sm leading-relaxed">
                        Connect, Collaborate, Grow. <br />
                        The ultimate platform for college clubs.
                    </p>
                </div>

                {/* Links */}
                {Object.entries(links).map(([category, items]) => (
                    <div key={category}>
                        <h4 className="font-semibold mb-4">{category}</h4>
                        <ul className="space-y-2">
                            {items.map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-indigo-100 hover:text-white text-sm transition">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="max-w-6xl mx-auto border-t border-indigo-500 pt-8 text-center text-indigo-200 text-sm">
                &copy; {new Date().getFullYear()} APT Connect. All rights reserved.
            </div>
        </footer>
    );
}
