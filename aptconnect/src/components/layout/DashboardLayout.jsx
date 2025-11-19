import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const clsx = (...classes) => {
  return classes.filter(Boolean).join(" ");
}
const DashboardLayout = ({ children }) => {
  // --- State Lifted from Sidebar ---
  // We manage the responsive state here, in the parent layout.
  const [collapsed, setCollapsed] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1000 : false
  );
  const [bottomBar, setBottomBar] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 700 : false
  );

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setCollapsed(w <= 1000);
      setBottomBar(w <= 700);
    };
    
    // Set initial state on mount
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // --- End of Lifted State ---

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
     
      {/* The Sidebar component is now given its state as props. 
        It is 'fixed' and will float over the page.
      */}
      <Sidebar 
        collapsed={collapsed}
        bottomBar={bottomBar}
      />

      {/* This is the new dynamic "spacer" div. 
        Its only job is to take up space and push the main content over.
        Its width perfectly matches the sidebar's width, based on the same state.
      */}
      <div
        aria-hidden="true"
        className={clsx(
          "shrink-0 transition-[width] duration-300 ease-in-out",
          // If it's a bottom bar, spacer is 0.
          // Otherwise, it's w-20 (collapsed) or w-80 (expanded).
          bottomBar ? "w-0" : (collapsed ? "w-20" : "w-80")
        )}
      />

      {/* Main workspace */}
      {/* Added overflow-x-hidden to prevent any horizontal scrollbars */}
      <div className="flex-1 flex flex-col overflow-x-hidden w-full">
        <main className="flex-1 overflow-y-auto w-full">{children}</main>
      </div>
      
    </div>
  );
};

export default DashboardLayout;