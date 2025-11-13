// Sidebar.jsx (Complete Code with Final Icon Swap)

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

// Helper for conditional class names
const clsx = (...classes) => classes.filter(Boolean).join(' ');

// local assets (make sure these exist in src/assets/... with exact names/casing)
import logoIcon from "../../assets/logos/logo.png";
import toggleMenuIcon from "../../assets/icons/menu.png"; // <-- NEW ICON FOR COLLAPSED STATE
import logo2Icon from "../../assets/icons/logo.png";
import homeIcon from "../../assets/icons/Home.png";
import exploreIcon from "../../assets/icons/Explore.png";
import showcaseIcon from "../../assets/icons/Showcase.png";
import chatsIcon from "../../assets/icons/Chats.png";
import notifyIcon from "../../assets/icons/Notification.png";
import clubIcon from "../../assets/icons/members_icon.png";
import feedbackIcon from "../../assets/icons/feedback_icon.png";
import helpIcon from "../../assets/icons/help_icon.png";
import userIcon from "../../assets/icons/profile_icon.png"; // <-- ICON FOR EXPANDED STATE
import settingsIcon from "../../assets/icons/settings.png";

/* ---------------- Tooltip Portal ---------------- */
function TooltipPortal({ data }) {
  if (!data?.visible) return null;
  const { x, y, text, placement } = data;
  
  const style = {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    pointerEvents: "none",
    zIndex: 9999,
    // Use the dynamic transform property
    transform: placement === "top" ? "translate(-50%, -110%)" : "translate(0, -50%)",
  };

  // Using Tailwind classes for the bubble style
  const bubbleClasses = clsx(
    "bg-gray-800 text-white px-2 py-1.5 text-xs rounded-lg whitespace-nowrap shadow-xl"
  );

  return createPortal(
    <div style={style} role="tooltip" aria-hidden={!data.visible}>
      <div className={bubbleClasses}>{text}</div>
    </div>,
    document.body
  );
}

/* ---------------- Sidebar Component ---------------- */
export default function Sidebar({ onClose }) {
  const location = useLocation();

  // responsive triggers
  const [collapsed, setCollapsed] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1000 : false
  );
  const [bottomBar, setBottomBar] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 800 : false
  );

  // collapsed popup & refs
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const profileLinkRef = useRef(null); 

  // tooltip portal state
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "", placement: "right" });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setCollapsed(w <= 1000);
      setBottomBar(w <= 700);
      if (w > 990) setMenuOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // click outside to close popup
  useEffect(() => {
    const onDoc = (e) => {
      if (!menuOpen) return;
      const insideMenu = menuRef.current && menuRef.current.contains(e.target);
      const onProfileBtn = profileLinkRef.current && profileLinkRef.current.contains(e.target); 
      if (!insideMenu && !onProfileBtn) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  const asideWidthClass = collapsed ? "w-20" : "w-80";

  const exploreLinks = [
    { label: "Home", to: "/home", icon: homeIcon },
    { label: "Explore clubs", to: "/explore", icon: exploreIcon },
    { label: "Showcase", to: "/showcase", icon: showcaseIcon },
    { label: "Chats", to: "/chat", icon: chatsIcon },
    { label: "Notifications", to: "/notifications", icon: notifyIcon },
  ];

  const myClubLinks = [
    { label: "Ai club", to: "#", icon: clubIcon },
    { label: "Dance club", to: "#", icon: clubIcon },
    { label: "Apt gang", to: "#", icon: clubIcon },
    { label: "Literature", to: "#", icon: clubIcon },
    { label: "Music club", to: "#", icon: clubIcon },
    { label: "Art club", to: "#", icon: clubIcon },
  ];

  const utilityLinks = [
    { label: "Feedback", to: "/feedback", icon: feedbackIcon }, 
    { label: "Help", to: "/help", icon: helpIcon }, 
  ];

  const imgOnError = (e, txt = "X", size = 24) => {
    e.target.onerror = null;
    e.target.src = `https://placehold.co/${size}x${size}/cccccc/000000?text=${txt}`;
  };

  // tooltip helpers: evt is mouse event; placement 'right' (sidebar) or 'top' (bottom bar)
  const showTooltip = (evt, text, placement = "right") => {
    if (!evt?.currentTarget && !evt?.target) return;
    const el = evt.currentTarget || evt.target;
    const rect = el.getBoundingClientRect();
    if (placement === "top") {
      setTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text, placement });
    } else {
      setTooltip({ visible: true, x: rect.right + 8, y: rect.top + rect.height / 2, text, placement });
    }
  };
  const hideTooltip = () => setTooltip({ visible: false, x: 0, y: 0, text: "", placement: "right" });

  // (Bottom Bar UI remains unchanged)
  if (bottomBar) {
    const bottomItems = exploreLinks.slice(0, 5);
    const itemCount = bottomItems.length;
    const activeIndex = Math.max(0, bottomItems.findIndex((it) => it.to === location.pathname));
    const indicatorWidth = `${100 / itemCount}%`;
    const indicatorTransform = `translateX(${activeIndex * 100}%)`;

    return (
      <>
        <nav className="fixed left-0 right-0 bottom-0 z-50" aria-label="Mobile bottom nav" style={{ WebkitBackdropFilter: "saturate(180%) blur(6px)" }}>
          <div className="bg-white border-t border-slate-200 shadow-sm">
            <div className="max-w-4xl mx-auto relative">
              <div className="absolute left-0 bottom-0 h-0.5 bg-transparent w-full" aria-hidden="true">
                <div
                  className="absolute bottom-0 h-0.5 bg-indigo-600"
                  style={{
                    width: indicatorWidth,
                    transform: indicatorTransform,
                    transition: "transform 260ms cubic-bezier(.2,.9,.2,1), width 260ms ease",
                  }}
                />
              </div>

              <ul className="flex justify-between items-center h-16 px-2">
                {bottomItems.map((item, idx) => (
                  <li key={`${item.label}-${idx}`} className="flex-1 relative">
                    <NavLink
                      to={item.to}
                      onMouseEnter={(e) => showTooltip(e, item.label, "top")}
                      onMouseLeave={hideTooltip}
                      onFocus={(e) => showTooltip(e, item.label, "top")}
                      onBlur={hideTooltip}
                      className={({ isActive }) =>
                        clsx(
                          "group relative flex flex-col items-center justify-center h-full py-1",
                          isActive ? "text-indigo-600" : "text-slate-600"
                        )
                      }
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        className={clsx(
                          "w-5 h-5 object-contain transition-transform duration-150",
                          location.pathname === item.to ? "scale-105" : ""
                        )}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/28x28";
                        }}
                      />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <TooltipPortal data={tooltip} />
      </>
    );
  }

  // ---------- desktop/tablet sidebar ----------
  return (
    <>
      <aside
        className={clsx(
          "fixed top-0 left-0 border-r border-slate-300 h-screen bg-white flex flex-col z-50 transition-[width] duration-300 ease-in-out overflow-visible",
          asideWidthClass
        )}
        onClick={(e) => e.stopPropagation()}
        aria-expanded={!collapsed}
      >
        {/* Header */}
        <div className={clsx(
          "flex items-center h-16 border-b border-slate-300",
          collapsed ? "justify-center px-2" : "justify-between px-4"
        )}>
          <div>
            {!collapsed && <img src={logoIcon} alt="logo" className="object-contain w-28 h-8" onError={(e) => imgOnError(e, "AC")} />}
          </div>

          <div className={clsx("flex items-center", collapsed ? "justify-center w-full" : "")}>
            {collapsed ? (
              // show a small logo when collapsed
              <img src={logo2Icon || logoIcon} alt="mini logo" className="w-6 h-6 object-contain" onError={(e) => imgOnError(e, "L", 24)} />
            ) : (
              <div className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Nav (main content remains unchanged) */}
        <nav className={clsx(
          "flex-1 overflow-y-auto py-4 scrollbar-hide overflow-visible",
          collapsed ? "px-0" : "px-2"
        )}>
          {/* Explore */}
          <div className="px-2">
            <h3 className={clsx(
              collapsed ? "text-xs text-slate-600 text-center mt-3 ml-0" : "mb-3 text-sm font-medium text-slate-600"
            )}>
              Explore
            </h3>

            <div className="space-y-0">
              {exploreLinks.map((link, idx) => (
                <NavLink
                  key={`${link.label}-${idx}`}
                  to={link.to || "#"}
                  onMouseEnter={(e) => collapsed && showTooltip(e, link.label, "right")}
                  onMouseLeave={hideTooltip}
                  onFocus={(e) => collapsed && showTooltip(e, link.label, "right")}
                  onBlur={hideTooltip}
                  className={({ isActive }) =>
                    clsx(
                      "relative group flex gap-2 rounded transition-colors w-full min-w-0",
                      collapsed ? "flex-col items-center py-3 px-0" : "items-center py-2 px-3",
                      isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-indigo-50"
                    )
                  }
                >
                  <div className={collapsed ? "justify-center w-full" : ""}>
                    <img src={link.icon} alt={link.label} className="w-5 h-5 shrink-0 object-contain block mx-auto" onError={(e) => imgOnError(e, "I")} />
                  </div>

                  <span className={collapsed ? "hidden" : "ml-2"}>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* My clubs */}
          <div className="mt-6 px-2">
            <h3 className={clsx(
              collapsed ? "text-xs text-slate-600 text-center mt-3 ml-0" : "mb-3 text-sm font-medium text-slate-600"
            )}>
              My clubs
            </h3>

            <div className="space-y-0">
              {myClubLinks.map((link, idx) => (
                <a
                  key={`${link.label}-${idx}`}
                  href={link.to}
                  onMouseEnter={(e) => collapsed && showTooltip(e, link.label, "right")}
                  onMouseLeave={hideTooltip}
                  className={clsx(
                    "flex gap-2 rounded hover:bg-indigo-50 transition-colors w-full min-w-0",
                    collapsed ? "flex-col items-center py-3 px-0" : "items-center py-2 px-3"
                  )}
                >
                  <div className={collapsed ? "justify-center w-full" : ""}>
                    <img src={link.icon} alt={link.label} className="w-5 h-5 shrink-0 object-contain block mx-auto" onError={(e) => imgOnError(e, "C")} />
                  </div>
                  <span className={collapsed ? "hidden" : "ml-2"}>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="flex-none border-t border-slate-300 bg-white">
          {/* Utility links: visible only when expanded */}
          {!collapsed && (
            <div className="px-2 py-3">
              {utilityLinks.map((item, idx) => (
                <NavLink
                  key={`${item.label}-${idx}`}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 py-2 px-3 rounded transition-colors w-full",
                      "hover:bg-indigo-50",
                      isActive ? "text-indigo-600" : "text-slate-700"
                    )
                  }
                >
                  <img src={item.icon} alt={item.label} className="flex-none w-5 h-5" onError={(e) => imgOnError(e, "U")} />
                  <span className="ml-2">{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}

          {/* bottom row: profile + collapsed trigger (MODIFIED) */}
          <div className="sticky bottom-0 bg-white py-3 px-2">
            {/* When collapsed, this area holds the single icon. When expanded, it holds the profile link and menu button. */}
            <div className={clsx(
                "flex items-center relative",
                collapsed ? "px-0" : "px-3" 
            )}>
              
              {/* Profile Link/Icon Button */}
              <NavLink
                ref={profileLinkRef} // Use the ref here
                to="/profile"
                onClick={(e) => {
                  // If collapsed, prevent default navigation and open the menu
                  if (collapsed) {
                    e.preventDefault(); 
                    setMenuOpen((s) => !s);
                  }
                  // Otherwise, let NavLink handle the navigation to /profile
                }}
                // Tooltip text swaps based on collapsed state
                onMouseEnter={(e) => collapsed && showTooltip(e, "Menu", "right")} 
                onMouseLeave={hideTooltip}
                onFocus={(e) => collapsed && showTooltip(e, "Menu", "right")}
                onBlur={hideTooltip}
                className={({ isActive }) => clsx(
                    "flex items-center gap-3 rounded-lg hover:bg-indigo-50",
                    // Collapsed style (icon only, centered, uses similar padding/margin as main links)
                    collapsed ? "flex-col items-center py-3 px-0 w-full text-slate-300" : 
                    // Expanded style (text + icon, left aligned, mimic nav link padding)
                    "px-3 py-2 w-full text-left",
                    // Active style 
                    isActive && !collapsed ? "bg-indigo-50 text-indigo-600" : "text-slate-300"
                )}
                aria-haspopup={collapsed ? "true" : "false"}
                aria-expanded={menuOpen}
              >
                {/* Icon - SOURCE SWAPPED HERE */}
                <div className={collapsed ? "justify-center w-full" : ""}>
                    <img 
                        // 💡 CORE CHANGE: Use toggleMenuIcon when collapsed, userIcon when expanded
                        src={collapsed ? toggleMenuIcon : userIcon} 
                        alt={collapsed ? "menu" : "profile"} 
                        className="w-5 h-5 shrink-0 object-contain block mx-auto" 
                        onError={(e) => imgOnError(e, collapsed ? "M" : "P", 20)} 
                    />
                </div>
                
                {/* User Name (Hidden when collapsed) */}
                {!collapsed && (
                    <span className="ml-2 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                        John Doe
                    </span>
                )}
              </NavLink>

              {/* Popup menu: shown only when collapsed + menuOpen true */}
              {collapsed && menuOpen && (
               <div
                      ref={menuRef}
                      role="menu"
                      aria-label="Profile menu"
                      className={clsx(
                        "absolute left-full bottom-20 ml-3 w-48 rounded-lg bg-white z-50 text-sm overflow-hidden transform-gpu transition-all duration-150",
                        // --- MODIFIED BORDER AND SHADOW ---
                        "border-2 border-slate-200 shadow-2xl" // Example: 2px light indigo border and a stronger shadow
                      )}
                      style={{ minWidth: 192 }}
                    >
                  <ul className="py-2 border-slate-200">
                    <li>
                      <NavLink to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50">
                        <img src={userIcon} className="w-4 h-4" alt="profile" onError={(e) => imgOnError(e, "P")} />
                        <span>Profile</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50">
                        <img src={settingsIcon} className="w-4 h-4" alt="settings" onError={(e) => imgOnError(e, "S")} />
                        <span>Settings</span>
                      </NavLink>
                    </li>

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

                    <li>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          // TODO: add logout logic
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-3"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                        </svg>
                        <span>Log out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* tooltip portal (shared) */}
      <TooltipPortal data={tooltip} />
    </>
  );
}