import React from "react";

/**
 * Minimal section header: title + optional action (link/button)
 * Keeps consistent spacing and typography across sections
 */
const SectionHeader = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{subtitle}</p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default SectionHeader;
