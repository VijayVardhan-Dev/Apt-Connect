// src/pages/Chat.jsx

import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { subscribeToUserChats } from "../../lib/chatService";

import ChatListPanel from "../../components/ui/ChatsList";
import ConversationPanel from "../../components/ui/Conversation";

const CHAT_LAYOUT_BREAKPOINT = 768;
const clsx = (...classes) => classes.filter(Boolean).join(" ");

export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("message"); // 'message' | 'request'
  const [viewMode, setViewMode] = useState("list");

  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth <= CHAT_LAYOUT_BREAKPOINT
  );

  // Handle Window Resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= CHAT_LAYOUT_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Subscribe to Chats
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToUserChats(user.uid, (updatedChats) => {
      setChats(updatedChats);
    });

    return () => unsubscribe();
  }, [user]);

  // Handle Initial Selection from Navigation State (e.g. from Club Members)
  useEffect(() => {
    if (location.state?.chatId && chats.length > 0) {
      const chatToSelect = chats.find((c) => c.id === location.state.chatId);
      if (chatToSelect) {
        setSelectedChat(chatToSelect);
        if (isMobileView) setViewMode("conversation");
        // Clear state so it doesn't re-select on refresh/updates unnecessarily
        // navigate(location.pathname, { replace: true, state: {} });
      }
    } else if (!selectedChat && chats.length > 0 && !isMobileView) {
      // Select first chat on desktop if nothing selected
      setSelectedChat(chats[0]);
    }
  }, [location.state, chats, isMobileView, selectedChat]); // Added selectedChat to deps to avoid override if user selected something else? No, logic needs care.
  // Actually, we only want to react to location.state changes or initial load.
  // The above effect might run too often. Let's refine.

  useEffect(() => {
    if (location.state?.chatId && chats.length > 0) {
      const targetChat = chats.find(c => c.id === location.state.chatId);
      if (targetChat) {
        setSelectedChat(targetChat);
        if (window.innerWidth <= CHAT_LAYOUT_BREAKPOINT) {
          setViewMode("conversation");
        }
      }
    }
  }, [location.state, chats]);


  const handleBackToChatList = () => {
    setViewMode("list");
    setSelectedChat(null);
  };

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
    if (isMobileView) {
      setViewMode("conversation");
    }
  };

  const renderAvatar = (chat, sizeClass = "w-12 h-12") => {
    const otherUser = chat.otherUser;
    const name = otherUser?.displayName || chat.name || "User";
    const photoURL = otherUser?.photoURL || chat.avatar;

    return (
      <div className={`${sizeClass} rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0 border border-gray-100`}>
        {photoURL ? (
          <img src={photoURL} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 font-bold text-lg">{name.charAt(0).toUpperCase()}</span>
        )}
      </div>
    );
  };

  const filteredChats = useMemo(() => {
    // Filter by tab (assuming 'type' or some logic, for now we treat all as messages unless we add 'request' logic)
    // The schema has 'type': 'private' | 'group'.
    // We can map 'private' to 'message' tab for now.
    // Or just show all for now.

    let filtered = chats;

    // Search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(chat => {
        const name = chat.otherUser?.displayName || chat.name || "";
        return name.toLowerCase().includes(lower);
      });
    }

    return filtered;
  }, [chats, searchTerm, activeTab]);

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-900">
      {/* 1. CHAT LIST PANEL (Left) */}
      {(!isMobileView || viewMode === "list") && (
        <div
          className={clsx(
            isMobileView ? "w-full" : "md:w-[40%] lg:w-[35%]",
            "flex flex-col border-r border-gray-200 bg-white"
          )}
        >
          <ChatListPanel
            initialChats={[]} // Not used anymore
            filteredChats={filteredChats}
            selectedChat={selectedChat}
            setSelectedChat={handleChatSelection}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            renderAvatar={renderAvatar}
            isMobileView={isMobileView}
            currentUser={user}
          />
        </div>
      )}

      {/* 2. CONVERSATION PANEL (Right) */}
      {(!isMobileView || viewMode === "conversation") && (
        <div
          className={clsx(
            isMobileView ? "w-full" : " flex-1",
            " flex flex-col bg-white h-full"
          )}
        >
          <ConversationPanel
            selectedChat={selectedChat}
            renderAvatar={renderAvatar}
            isMobileView={isMobileView}
            onBack={handleBackToChatList}
            currentUser={user}
          />
        </div>
      )}
    </div>
  );
}

