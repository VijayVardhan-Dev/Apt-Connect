import React from "react";

/**
 * Small KPI row — minimal, uses no heavy visuals
 * Accepts stats like {label, value}
 */
const TopStats = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <div 
          key={s.label} 
          className="bg-white p-5 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {s.label}
            </span>
            <span className="text-3xl font-bold text-gray-900 tracking-tight">
              {s.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopStats;
