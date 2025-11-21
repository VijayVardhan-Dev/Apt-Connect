import React from "react";
import { ArrowLeft, Users, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClubHeader = ({
    club,
    isMember,
    joining,
    membersCount,
    onJoin,
    onShowMembers
}) => {
    const navigate = useNavigate();

    if (!club) return null;

    return (
        <>
            {/* Back Arrow */}
            <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full hover:bg-gray-100 transition mb-4"
                title="Go back"
            >
                <ArrowLeft size={22} />
            </button>

            {/* Club header */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-6">
                    <img
                        src={club.profileURL || "https://placehold.co/160x160/e2e8f0/334155?text=Club"}
                        alt={club.name}
                        className="w-24 h-24 rounded-full object-cover border border-gray-100"
                    />
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {club.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {club.tagline || "No tagline available"}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    {/* Members Button */}
                    <button
                        onClick={onShowMembers}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                        title="View Members"
                    >
                        <Users className="w-4 h-4" />
                        <span className="font-medium text-sm">Members</span>
                    </button>

                    {/* Join Button */}
                    <button
                        onClick={onJoin}
                        disabled={joining}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition cursor-pointer ${isMember
                            ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            } `}
                        title={isMember ? "Leave Club" : "Join Club"}
                    >
                        {joining ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Users className="w-5 h-5" />
                        )}
                        <span className="font-medium text-sm">{membersCount}</span>
                        <span className="text-xs opacity-70 ml-1 hidden sm:inline">
                            {isMember ? "Joined" : "Join"}
                        </span>
                    </button>
                </div>
            </div>

            {/* About Section */}
            <div className="mb-10">
                <h3 className="text-gray-700 font-medium mb-2">About</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    {club.description || "No description provided yet."}
                </p>
            </div>
        </>
    );
};

export default ClubHeader;
