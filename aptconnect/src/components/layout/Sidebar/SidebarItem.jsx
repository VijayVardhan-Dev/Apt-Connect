import React from "react";
import { NavLink } from "react-router-dom";

// Helper for conditional class names
const clsx = (...classes) => classes.filter(Boolean).join(' ');

// Image fallback handler
const imgOnError = (e, txt = "X") => {
    e.target.onerror = null;
    e.target.src = `https://placehold.co/24x24/cccccc/000000?text=${txt}`;
};

export default function SidebarItem({
    to,
    icon,
    label,
    isSidebarSmall,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur
}) {
    return (
        <NavLink
            to={to || "#"}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
            className={({ isActive }) =>
                clsx(
                    "relative group flex gap-2 rounded transition-colors w-full min-w-0",
                    isSidebarSmall ? "flex-col items-center py-3 px-0" : "items-center py-2 px-3",
                    isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-indigo-50"
                )
            }
        >
            <div className={isSidebarSmall ? "justify-center w-full" : ""}>
                <img
                    src={icon}
                    alt={label}
                    className="w-5 h-5 shrink-0 object-contain block mx-auto"
                    onError={(e) => imgOnError(e, "I")}
                />
            </div>
            <span className={isSidebarSmall ? "hidden" : "ml-2"}>{label}</span>
        </NavLink>
    );
}
