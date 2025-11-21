// components/ui/ChatsList.jsx

import React from "react";
import { Search } from "lucide-react";

const ChatsList = ({
  filteredChats,
  selectedChat,
  setSelectedChat,
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  renderAvatar,
  currentUser,
}) => {

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    // Handle Firebase Timestamp
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    // If less than 24 hours, show time
    if (diff < 24 * 60 * 60 * 1000 && now.getDate() === date.getDate()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    // If yesterday
    // ... simple logic for now
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-gray-900">
            Messages
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 placeholder-gray-500 text-gray-900"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        <div className="flex space-x-6 text-sm mt-3 text-gray-900 justify-start pl-4">
          <button
            onClick={() => setActiveTab("message")}
            className={`font-medium transition-colors ${activeTab === "message"
                ? "text-gray-900 font-semibold border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveTab("request")}
            className={`font-medium transition-colors ${activeTab === "request"
                ? "text-gray-900 font-semibold border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Requests
          </button>
        </div>
      </div>

      {/* Chat List Items (Scrolling Area) */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide pb-16 sm:pb-0">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => {
            const otherUser = chat.otherUser;
            const name = otherUser?.displayName || chat.name || "User";
            const lastMsgText = chat.lastMessage?.text || "No messages yet";
            const time = formatTime(chat.lastMessage?.timestamp || chat.updatedAt);
            const isSelected = selectedChat?.id === chat.id;

            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center p-3 rounded-xl cursor-pointer ${isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
              >
                {renderAvatar(chat, "w-12 h-12")}
                <div className="ml-3 truncate flex-1">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-semibold truncate text-gray-900">
                      {name}
                    </p>
                    <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{time}</span>
                  </div>
                  <p
                    className={`text-xs truncate ${chat.unreadCount > 0 ? "font-bold text-gray-900" : "text-gray-500"
                      }`}
                  >
                    {lastMsgText}
                  </p>
                </div>
              </div>
            )
          })
        ) : (
          <p className="text-center text-gray-500 p-4 text-sm">
            No chats found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatsList;

