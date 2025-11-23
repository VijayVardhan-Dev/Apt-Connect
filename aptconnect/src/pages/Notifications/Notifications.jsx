import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MessageSquare,
  Heart,
  Users,
  AtSign,
  Search,
  Bell,
  Loader2
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getUserNotifications, createNotification, clearNotifications, NOTIFICATION_TYPES } from "../../lib/notificationService";
import { formatTimeAgo } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

export default function NotificationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNotifications = async () => {
    if (user?.uid) {
      try {
        const data = await getUserNotifications(user.uid);
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const handleClearAll = async () => {
    if (!user) return;
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      try {
        await clearNotifications(user.uid);
        setNotifications([]);
      } catch (error) {
        console.error("Failed to clear notifications", error);
      }
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.MENTION:
        return { icon: AtSign, color: "text-indigo-600", bg: "bg-indigo-100" };
      case NOTIFICATION_TYPES.CLUB_UPDATE:
        return { icon: Users, color: "text-green-600", bg: "bg-green-100" };
      case NOTIFICATION_TYPES.REACTION:
        return { icon: Heart, color: "text-red-600", bg: "bg-red-100" };
      case NOTIFICATION_TYPES.COMMENT:
        return { icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-100" };
      case NOTIFICATION_TYPES.MESSAGE:
        return { icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-100" };
      default:
        return { icon: Bell, color: "text-gray-600", bg: "bg-gray-100" };
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch = notif.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.source?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "All") return matchesSearch;
    if (activeTab === "Mentions") return matchesSearch && notif.type === NOTIFICATION_TYPES.MENTION;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white py-8 text-gray-900">
      {/* ===== Centering Container ===== */}
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold">Notifications</h2>
          </div>

          {/* Clear All Button */}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-md hover:bg-red-50 transition"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Search and Tabs */}
        <div className="flex flex-col mb-6">
          {/* Search Input */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search notifications"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              className={`font-semibold transition-colors pb-1 ${activeTab === "All"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "hover:text-gray-900"
                }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("Mentions")}
              className={`font-semibold transition-colors pb-1 ${activeTab === "Mentions"
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
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            </div>
          ) : filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const { icon: IconComponent, color, bg } = getIcon(notif.type);
              const timeAgo = notif.createdAt?.toDate ? formatTimeAgo(notif.createdAt.toDate()) : "Just now";

              return (
                <div
                  key={notif.id}
                  className={`flex items-start p-3 rounded-lg transition border border-gray-200 cursor-pointer ${notif.isRead ? 'bg-white' : 'bg-indigo-50/50 hover:bg-indigo-50'}`}
                  onClick={() => {
                    if (notif.chatId) {
                      navigate("/chat", { state: { chatId: notif.chatId } });
                    } else if (notif.link) {
                      navigate(notif.link);
                    }
                  }}
                >
                  {/* Icon Indicator */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${bg} ${color}`}
                  >
                    <IconComponent size={18} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-sm leading-snug">
                      <span className="font-semibold text-gray-900">
                        {notif.source?.name || "Someone"}
                      </span>{" "}
                      <span className="text-gray-700">{notif.content}</span>
                    </p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {timeAgo}
                    </span>
                  </div>

                  {!notif.isRead && (
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2"></div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 pt-8">
              No notifications found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
