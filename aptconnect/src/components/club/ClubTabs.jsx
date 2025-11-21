import React from "react";
import { PlusCircle, CalendarDays, Layers } from "lucide-react";

const ClubTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="relative mb-8">
            <div className="flex items-center justify-between border-b pb-3">
                {/* Posts - Left */}
                <div
                    className={`flex items-center gap-2 text-sm font-medium cursor-pointer pl-12 ${activeTab === "posts"
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-gray-500 hover:text-gray-700"
                        } `}
                    onClick={() => setActiveTab("posts")}
                >
                    <PlusCircle size={16} /> Posts
                </div>

                {/* Events - Center */}
                <div
                    className={`flex items-center gap-2 text-sm font-medium cursor-pointer ${activeTab === "events"
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-gray-500 hover:text-gray-700"
                        } `}
                    onClick={() => setActiveTab("events")}
                >
                    <CalendarDays size={16} /> Events
                </div>

                {/* Projects - Right */}
                <div
                    className={`flex items-center gap-2 text-sm font-medium cursor-pointer pr-12 ${activeTab === "projects"
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-gray-500 hover:text-gray-700"
                        } `}
                    onClick={() => setActiveTab("projects")}
                >
                    <Layers size={16} /> Projects
                </div>
            </div>
        </div>
    );
};

export default ClubTabs;
