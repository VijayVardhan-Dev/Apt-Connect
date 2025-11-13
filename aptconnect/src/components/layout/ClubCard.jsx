import React from "react";
import { Link } from "react-router-dom";

/**
 * Minimal club card: name + category + membersCount
 */
const ClubCard = ({ club }) => {
  return (
    <Link 
      to={`/club/${club.id}`} 
      className="group block bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate group-hover:text-gray-700 transition-colors">
            {club.name}
          </h4>
          <p className="text-xs text-gray-500 font-medium">{club.category}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="font-medium">{club.membersCount ?? (club.members?.length ?? 0)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ClubCard;
