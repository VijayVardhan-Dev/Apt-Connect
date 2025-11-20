import React, { useState } from "react";
import {
  ArrowLeft,
  MessageSquare,
  Heart,
  Users,
  AtSign,
  Settings,
  Search,
} from "lucide-react";

const NOTIFICATION_DATA = [
  {
    id: 1,
    type: "mention",
    source: "Bora Guna",
    content: "mentioned you in a post.",
    time: "3m ago",
    icon: AtSign,
    color: "text-indigo-600",
    group: "All",
  },
  {
    id: 2,
    type: "club_update",
    source: "Ai Club",
    content: 'posted a new announcement: "Upcoming Hackathon".',
    time: "1h ago",
    icon: Users,
    color: "text-green-600",
    group: "All",
  },
  {
    id: 3,
    type: "reaction",
    source: "MVS PRANNAV",
    content: "reacted to your comment with a ❤️.",
    time: "5h ago",
    icon: Heart,
    color: "text-red-600",
    group: "Mentions",
  },
  {
    id: 4,
    type: "mention",
    source: "Yeswanth_L",
    content: "tagged you in a showcase submission.",
    time: "1d ago",
    icon: AtSign,
    color: "text-indigo-600",
    group: "All",
  },
  {
    id: 5,
    type: "comment",
    source: "Kumar REDDY's",
    content: "commented on your post.",
    time: "2d ago",
    icon: MessageSquare,
    color: "text-blue-600",
    group: "Mentions",
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredNotifications = NOTIFICATION_DATA.filter((notif) =>
    activeTab === "All" ? true : notif.group === activeTab,
  );

  return (
    <div className="min-h-screen bg-white py-8 text-gray-900">
      {/* ===== Centering Container ===== */}
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* Header (CLEANED) */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold">Notifications</h2>
          {/* Removed Settings Icon */}
        </div>

        {/* Search and Tabs */}
        <div className="flex flex-col mb-6">
          {/* Search Input (Always full width in this centered container) */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search notifications"
              className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 placeholder-gray-500 text-gray-900"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 text-base text-gray-700">
            <button
              onClick={() => setActiveTab("All")}
              className={`font-semibold transition-colors pb-1 ${
                activeTab === "All"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "hover:text-gray-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("Mentions")}
              className={`font-semibold transition-colors pb-1 ${
                activeTab === "Mentions"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "hover:text-gray-900"
              }`}
            >
              Mentions
            </button>
          </div>
        </div>

        {/* ===== Notifications List ===== */}
        <div className="space-y-4 pt-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const IconComponent = notif.icon;

              return (
                <div
                  key={notif.id}
                  className="flex items-start p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition border border-gray-200 cursor-pointer"
                >
                  {/* Icon Indicator */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${notif.color}`}
                  >
                    <IconComponent size={18} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm leading-snug">
                      <span className="font-semibold text-gray-900">
                        {notif.source}
                      </span>{" "}
                      <span className="text-gray-700">{notif.content}</span>
                    </p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {notif.time}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 pt-8">
              No notifications found for this filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
