import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
     
      {/* Sidebar */}
      <div className="w-72">
        <Sidebar />
      </div>

      {/* Main workspace */}
      <div className="flex-1 flex px-6 ">
        <main className="flex-1  overflow-y-auto">{children}</main>
      </div>
      
    </div>
  );
};

export default DashboardLayout;