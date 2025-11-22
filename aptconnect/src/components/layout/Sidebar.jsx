// Sidebar.jsx (Refactored)

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";

// Components
import TooltipPortal from "../ui/Tooltip";
import SidebarItem from "./Sidebar/SidebarItem";
import SidebarProfile from "./Sidebar/SidebarProfile";

// Constants & Assets
import { EXPLORE_LINKS, UTILITY_LINKS } from "../../constants/navigation";
import logoIcon from "../../assets/logos/logo.png";
import logo2Icon from "../../assets/icons/logo.png";
import clubIcon from "../../assets/icons/members_icon.png";

// Helper for conditional class names
const clsx = (...classes) => classes.filter(Boolean).join(' ');

// Image Fallback Handler
const imgOnError = (e, txt = "X", size = 24) => {
  e.target.onerror = null;
  e.target.src = `https://placehold.co/${size}x${size}/cccccc/000000?text=${txt}`;
};

export default function Sidebar({ collapsed, bottomBar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // State Management
  const [menuOpen, setMenuOpen] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "", placement: "right" });
  const [myClubs, setMyClubs] = useState([]);
  const [myClubsLoading, setMyClubsLoading] = useState(false);

  // Derived State
  const isSidebarSmall = collapsed;
  const asideWidthClass = isSidebarSmall ? "w-20" : "w-80";

  // Tooltip Logic
  const showTooltip = (evt, text, placement = "right") => {
    if (!evt?.currentTarget && !evt?.target) return;
    const el = evt.currentTarget || evt.target;
    const rect = el.getBoundingClientRect();

    const elementHref = el.getAttribute('href');
    const isCurrentlyActive = elementHref && (elementHref === location.pathname);

    if (isSidebarSmall && isCurrentlyActive) {
      return hideTooltip();
    }

    if (placement === "top") {
      setTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text, placement });
    } else {
      setTooltip({ visible: true, x: rect.right + 6, y: rect.top + rect.height / 2, text, placement });
    }
  };
  const hideTooltip = () => setTooltip({ visible: false, x: 0, y: 0, text: "", placement: "right" });

  // Fetch User Clubs
  useEffect(() => {
    if (!user?.uid) {
      setMyClubs([]);
      setMyClubsLoading(false);
      return;
    }

    setMyClubsLoading(true);
    const clubsQuery = query(collection(db, "clubs"), where("members", "array-contains", user.uid));
    const unsubscribe = onSnapshot(
      clubsQuery,
      (snapshot) => {
        const results = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name || "Untitled club",
            image: data.profileURL || clubIcon,
          };
        });
        setMyClubs(results);
        setMyClubsLoading(false);
      },
      (error) => {
        console.error("Failed to load user clubs", error);
        setMyClubs([]);
        setMyClubsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  // Mobile Bottom Bar Render
  if (bottomBar) {
    const bottomItems = EXPLORE_LINKS.slice(0, 5);
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

  // Desktop Sidebar Render
  return (
    <>
      <aside
        className={clsx(
          "fixed top-0 left-0 border-r border-slate-300 h-screen bg-white flex flex-col z-50 transition-[width] duration-300 ease-in-out overflow-visible",
          asideWidthClass
        )}
        onClick={(e) => e.stopPropagation()}
        aria-expanded={!isSidebarSmall}
      >
        {/* Header */}
        <div className={clsx(
          "flex items-center h-16 border-b border-slate-300",
          isSidebarSmall ? "justify-center px-2" : "justify-between px-4"
        )}>
          <div>
            {!isSidebarSmall && <img src={logoIcon} alt="logo" className="object-contain w-28 h-8" onError={(e) => imgOnError(e, "AC")} />}
          </div>
          <div className={clsx("flex items-center", isSidebarSmall ? "justify-center w-full" : "")}>
            {isSidebarSmall ? (
              <img src={logo2Icon || logoIcon} alt="mini logo" className="w-6 h-6 object-contain" onError={(e) => imgOnError(e, "L", 24)} />
            ) : (
              <div className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className={clsx(
          "flex-1 overflow-y-auto py-4 scrollbar-hide overflow-visible",
          isSidebarSmall ? "px-0" : "px-2"
        )}>
          {/* Explore Section */}
          <div className="px-2">
            <h3 className={clsx(
              isSidebarSmall ? "text-xs text-slate-600 text-center mt-3 ml-0" : "mb-3 text-sm font-medium text-slate-600"
            )}>
              Explore
            </h3>
            <div className={clsx("space-y-0", isSidebarSmall ? "space-y-2" : "space-y-0")}>
              {EXPLORE_LINKS.map((link, idx) => (
                <SidebarItem
                  key={`${link.label}-${idx}`}
                  {...link}
                  isSidebarSmall={isSidebarSmall}
                  onMouseEnter={(e) => isSidebarSmall && showTooltip(e, link.label, "right")}
                  onMouseLeave={hideTooltip}
                  onFocus={(e) => isSidebarSmall && showTooltip(e, link.label, "right")}
                  onBlur={hideTooltip}
                />
              ))}
            </div>
          </div>

          {/* My Clubs Section */}
          <div className="mt-6 px-2">
            <h3 className={clsx(
              isSidebarSmall ? "text-xs text-slate-600 text-center mt-3 ml-0" : "mb-3 text-sm font-medium text-slate-600"
            )}>
              My clubs
            </h3>
            <div className={clsx("space-y-0", isSidebarSmall ? "space-y-2" : "space-y-0")}>
              {/* Create Club Button */}
              <button
                onClick={() => navigate("/create-club")}
                className={clsx(
                  "flex items-center text-indigo-600 hover:bg-indigo-50 transition-colors rounded-md mb-2",
                  isSidebarSmall ? "justify-center w-10 h-10 mx-auto" : "w-full px-3 py-2 space-x-3"
                )}
                title="Create a Club"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-indigo-600">
                  <Plus size={14} strokeWidth={3} />
                </div>
                {!isSidebarSmall && <span className="text-sm font-semibold">Create Club</span>}
              </button>
              {myClubsLoading && (
                <div className={clsx(
                  "text-xs text-slate-400",
                  isSidebarSmall ? "text-center w-full py-3" : "px-3 py-2"
                )}>
                  Loading your clubs...
                </div>
              )}

              {!myClubsLoading && myClubs.length === 0 && (
                <button
                  type="button"
                  onClick={() => navigate("/explore")}
                  className={clsx(
                    "text-xs text-slate-500 border border-dashed border-slate-300 rounded-md",
                    "hover:border-slate-400 hover:text-slate-700 transition",
                    isSidebarSmall ? "w-12 h-12 mx-auto flex items-center justify-center" : "w-full py-2 px-3 text-left"
                  )}
                >
                  {isSidebarSmall ? "+" : "Join a club to see it here"}
                </button>
              )}

              {myClubs.map((club) => (
                <SidebarItem
                  key={club.id}
                  to={`/club/${club.id}`}
                  label={club.name}
                  icon={club.image || clubIcon}
                  isSidebarSmall={isSidebarSmall}
                  onMouseEnter={(e) => isSidebarSmall && showTooltip(e, club.name, "right")}
                  onMouseLeave={hideTooltip}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="flex-none border-t border-slate-300 bg-white">
          {!isSidebarSmall && (
            <div className="px-2 py-3">
              {UTILITY_LINKS.map((item, idx) => (
                <SidebarItem
                  key={`${item.label}-${idx}`}
                  {...item}
                  isSidebarSmall={isSidebarSmall}
                />
              ))}
            </div>
          )}

          {/* Profile Section */}
          <div className="sticky bottom-0 bg-white py-3 px-2">
            <SidebarProfile
              user={user}
              isSidebarSmall={isSidebarSmall}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              logout={logout}
              showTooltip={showTooltip}
              hideTooltip={hideTooltip}
            />
          </div>
        </div>
      </aside>

      <TooltipPortal data={tooltip} />
    </>
  );
}