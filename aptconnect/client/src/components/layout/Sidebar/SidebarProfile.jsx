import React, { useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userIcon from "../../../assets/icons/profile_icon.png";
import settingsIcon from "../../../assets/icons/settings.png";
import feedbackIcon from "../../../assets/icons/feedback_icon.png";
import helpIcon from "../../../assets/icons/help_icon.png";
import toggleMenuIcon from "../../../assets/icons/menu.png";

// Helper for conditional class names
const clsx = (...classes) => classes.filter(Boolean).join(' ');

const imgOnError = (e, txt = "X", size = 24) => {
    e.target.onerror = null;
    e.target.src = `https://placehold.co/${size}x${size}/cccccc/000000?text=${txt}`;
};

export default function SidebarProfile({
    user,
    isSidebarSmall,
    menuOpen,
    setMenuOpen,
    logout,
    showTooltip,
    hideTooltip
}) {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const profileLinkRef = useRef(null);

    // Handle Click Outside (Close Collapsed Menu)
    useEffect(() => {
        const onDoc = (e) => {
            if (!menuOpen) return;
            const insideMenu = menuRef.current && menuRef.current.contains(e.target);
            const onProfileBtn = profileLinkRef.current && profileLinkRef.current.contains(e.target);
            if (!insideMenu && !onProfileBtn) setMenuOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, [menuOpen, setMenuOpen]);

    return (
        <div className={clsx(
            "flex items-center relative",
            isSidebarSmall ? "px-0 space-y-2" : "px-3"
        )}>

            {/* Profile Link/Icon Button (Click always opens menu) */}
            <NavLink
                ref={profileLinkRef}
                to="/profile"
                onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen((s) => !s);
                }}
                onMouseEnter={(e) => isSidebarSmall && showTooltip(e, "Menu", "right")}
                onMouseLeave={hideTooltip}
                onFocus={(e) => isSidebarSmall && showTooltip(e, "Menu", "right")}
                onBlur={hideTooltip}
                className={({ isActive }) => clsx(
                    "flex items-center gap-3 rounded-lg hover:bg-indigo-50",
                    isSidebarSmall ? "flex-col items-center py-3 px-0 w-full text-slate-700" :
                        "px-3 py-2 w-full text-left",
                    isActive && !isSidebarSmall ? "bg-indigo-50 text-indigo-600" : "text-slate-700"
                )}
                aria-haspopup={isSidebarSmall ? "true" : "false"}
                aria-expanded={menuOpen}
            >
                <div className={isSidebarSmall ? "justify-center w-full" : ""}>
                    <img
                        src={isSidebarSmall ? toggleMenuIcon : userIcon}
                        alt={isSidebarSmall ? "menu" : "profile"}
                        className="w-5 h-5 shrink-0 object-contain block mx-auto"
                        onError={(e) => imgOnError(e, isSidebarSmall ? "M" : "P", 20)}
                    />
                </div>
                {!isSidebarSmall && (
                    <span className="ml-2 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                        {user?.displayName || "User"}
                    </span>
                )}
            </NavLink>

            {/* Popup menu */}
            {menuOpen && (
                <div
                    ref={menuRef}
                    role="menu"
                    aria-label="Profile menu"
                    className={clsx(
                        "absolute left-full ml-3 w-60 rounded-lg bg-white z-50 text-sm overflow-hidden shadow-2xl border-2 border-indigo-300 transform-gpu transition-all duration-150",
                        "bottom-10"
                    )}
                    style={{ minWidth: 240 }}
                >
                    <ul className="py-2 space-y-1">

                        {/* User Info Header */}
                        <li className="px-4 pt-1 pb-3 mb-1">
                            <NavLink
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center space-x-3 hover:bg-slate-50 p-2 -m-2 rounded-md"
                            >
                                <img src={userIcon} className="w-6 h-6" alt="Profile Icon" onError={(e) => imgOnError(e, "P", 24)} />
                                <span className="text-sm font-medium text-gray-900 truncate">
                                    {user?.email || "boralakshmiprasad0@gmail.com"}
                                </span>
                            </NavLink>
                        </li>

                        <hr className="border-gray-200" />

                        {/* Settings */}
                        <li>
                            <NavLink to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50">
                                <img src={settingsIcon} className="w-4 h-4" alt="settings" onError={(e) => imgOnError(e, "S")} />
                                <span>Settings</span>
                            </NavLink>
                        </li>

                        {/* Feedback and Help (VISIBLE ONLY WHEN COLLAPSED) */}
                        {isSidebarSmall && (
                            <>
                                <li>
                                    <NavLink to="/feedback" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50">
                                        <img src={feedbackIcon} className="w-4 h-4" alt="feedback" onError={(e) => imgOnError(e, "F")} />
                                        <span>Feedback</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/help" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50">
                                        <img src={helpIcon} className="w-4 h-4" alt="help" onError={(e) => imgOnError(e, "H")} />
                                        <span>Help</span>
                                    </NavLink>
                                </li>
                                <hr className="border-gray-200" />
                            </>
                        )}

                        {/* Sign Out */}
                        <li>
                            <button
                                onClick={async () => {
                                    setMenuOpen(false);
                                    await logout();
                                    navigate("/login");
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-3 text-slate-700 hover:text-red-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                </svg>
                                <span>Log out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
