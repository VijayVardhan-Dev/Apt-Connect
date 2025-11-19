// src/pages/Chat.jsx

import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ChatListPanel from "../../components/ui/ChatsList";
import ConversationPanel from "../../components/ui/Conversation";

const initialChats = [
  {
    id: 1,
    name: "BORA GUNA",
    handle: "GUNA_77",
    lastMessage: "Your note",
    time: "just now",
    active: true,
    dp: "DP_1",
    type: "message",
  },
  {
    id: 10,
    name: "BORA GUNA",
    handle: "GUNA_77",
    lastMessage: "Your note",
    time: "just now",
    active: true,
    dp: "DP_10",
    type: "message",
  },
  {
    id: 2,
    name: "MVS PRANNAV",
    handle: "PRANNAV_M",
    lastMessage: "Broo",
    time: "7w",
    active: false,
    dp: "DP_2",
    type: "message",
  },
  {
    id: 3,
    name: "Yeswanth_L",
    handle: "YESW_L",
    lastMessage: "Active 16m ago",
    time: "16m",
    active: true,
    dp: "DP_3",
    type: "message",
  },
  {
    id: 4,
    name: "MR. TEJ 777",
    handle: "TEJ_777",
    lastMessage: "Reacted...",
    time: "10w",
    active: false,
    dp: "DP_4",
    type: "request",
  },
  {
    id: 5,
    name: "Kumar REDDY's",
    handle: "KUMAR_R",
    lastMessage: "Message unavailable",
    time: "11w",
    active: false,
    dp: "DP_5",
    type: "message",
  },
  {
    id: 6,
    name: "Quantumhero_vijay",
    handle: "QUANTUM_V",
    lastMessage: "sent an attachment",
    time: "12w",
    active: true,
    dp: "DP_6",
    type: "request",
  },
];

const CHAT_LAYOUT_BREAKPOINT = 768;
const clsx = (...classes) => classes.filter(Boolean).join(" ");

export default function Chat() {
  const navigate = useNavigate();

  const [selectedChat, setSelectedChat] = useState(initialChats[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("message");
  const [viewMode, setViewMode] = useState("list");

  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth <= CHAT_LAYOUT_BREAKPOINT,
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= CHAT_LAYOUT_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleBackToChatList = () => {
    setViewMode("list");
  };

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
    if (window.innerWidth <= CHAT_LAYOUT_BREAKPOINT) {
      setViewMode("conversation");
    }
  };

  const renderAvatar = (user, sizeClass = "w-12 h-12") => (
    <div
      className={`${sizeClass} rounded-full bg-gray-400 flex items-center justify-center text-white text-lg font-bold border-2 border-transparent shrink-0`}
    >
      {user.name.charAt(0)}
    </div>
  );

  const filteredChats = useMemo(() => {
    const typeFiltered = initialChats.filter((chat) => chat.type === activeTab);

    if (!searchTerm) {
      return typeFiltered;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    return typeFiltered.filter(
      (chat) =>
        chat.name.toLowerCase().includes(lowerCaseSearch) ||
        chat.handle.toLowerCase().includes(lowerCaseSearch),
    );
  }, [searchTerm, activeTab]);

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-900">
      {/* 1. CHAT LIST PANEL (Left) */}
      {(!isMobileView || viewMode === "list") && (
        <div
          className={clsx(
            isMobileView ? "w-full" : "md:w-[40%] lg:w-[35%]",
            "flex flex-col border-r border-gray-200 bg-white",
          )}
        >
          <ChatListPanel
            initialChats={initialChats}
            filteredChats={filteredChats}
            selectedChat={selectedChat}
            setSelectedChat={handleChatSelection}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            renderAvatar={renderAvatar}
            isMobileView={isMobileView}
          />
        </div>
      )}

      {/* 2. CONVERSATION PANEL (Right) */}
      {(!isMobileView || viewMode === "conversation") && (
        <div
          className={clsx(
            isMobileView ? "w-full" : " flex-1",
            " flex flex-col bg-white h-full",
          )}
        >
          <ConversationPanel
            selectedChat={selectedChat}
            renderAvatar={renderAvatar}
            isMobileView={isMobileView}
            onBack={handleBackToChatList}
          />
        </div>
      )}
    </div>
  );
}
