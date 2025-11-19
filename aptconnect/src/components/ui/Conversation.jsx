// components/ui/Conversation.jsx

import React, { useState, useEffect, useRef } from "react";
import { Phone, Video, Info, ArrowLeft } from "lucide-react";

const MessageBubble = ({ text, time, isMine, isStoryMention }) => (
  <div className={isMine ? "flex justify-end" : "flex justify-start"}>
    <div className="flex flex-col max-w-xs md:max-w-md">
      {isStoryMention && (
        <div className="text-xs italic text-gray-500 mb-1">
          Mentioned you in their story
        </div>
      )}
      <div
        className={
          isMine
            ? "bg-indigo-600 text-white rounded-xl py-2 px-4 rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-xl py-2 px-4 rounded-bl-none"
        }
      >
        {text}
      </div>
      <span
        className={
          isMine
            ? "text-xs text-gray-500 mt-1 text-right"
            : "text-xs text-gray-500 mt-1 text-left"
        }
      >
        {time}
      </span>
    </div>
  </div>
);

const Conversation = ({ selectedChat, renderAvatar, isMobileView, onBack }) => {
  const [messageText, setMessageText] = useState("");

  const conversationData = [
    {
      text: "alwaysdeva_ mentioned you in their story",
      time: "22 Aug 2025, 00:37",
      isMine: false,
      isStoryMention: true,
    },
    {
      text: "フ乇モ∀尺 sent an attachment.",
      time: "22 Aug 2025, 01:58",
      isMine: true,
      isStoryMention: false,
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "22 Aug 2025, 09:50",
      isMine: false,
      isStoryMention: false,
    },
    {
      text: "Mentioned you in their story",
      time: "22 Aug 2025, 09:50",
      isMine: false,
      isStoryMention: true,
    },
  ];

  if (!selectedChat)
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-white text-gray-500">
        Select a chat to begin.
      </div>
    );

  // --- Dynamic Positioning State ---
  const [fixedInputStyle, setFixedInputStyle] = useState({});
  const conversationRef = useRef(null);

  // Breakpoints for sidebar visibility
  const DESKTOP_SPLIT_BREAKPOINT = 768;
  const SIDEBAR_WIDTH = 320; // Corresponds to w-80 sidebar width

  useEffect(() => {
    const updateFixedPosition = () => {
      if (conversationRef.current) {
        const rect = conversationRef.current.getBoundingClientRect();
        const width = window.innerWidth;
        const IS_SPLIT_VIEW = width > DESKTOP_SPLIT_BREAKPOINT;

        if (IS_SPLIT_VIEW) {
          // Desktop Split View: Anchors correctly to the left of the conversation panel
          setFixedInputStyle({
            width: `${rect.width}px`,
            left: `${rect.left}px`,
            bottom: "0",
            position: "fixed",
            zIndex: 20,
          });
        } else {
          // Mobile/Tablet Full View: Fixed to viewport edge, lifted by 64px
          setFixedInputStyle({
            width: "100%",
            left: "0",
            bottom: "64px", // Clears the external mobile bottom bar
            position: "fixed",
            zIndex: 20,
          });
        }
      }
    };

    // Recalculate on mount, resize, and parent layout change
    updateFixedPosition();
    window.addEventListener("resize", updateFixedPosition);
    return () => window.removeEventListener("resize", updateFixedPosition);
  }, [isMobileView, selectedChat]);

  // Cleanup: Ensure the style is reset when the component is removed
  useEffect(() => {
    return () => {
      // Clean up the fixed style when the component unmounts
      document.body.style.overflow = "";
    };
  }, []);

  return (
    // Assign the ref to the main panel div
    <div
      ref={conversationRef}
      className="flex flex-col flex-1 bg-white h-full relative"
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 shrink-0">
        <div className="flex items-center space-x-3">
          {isMobileView && (
            <button
              onClick={onBack}
              className="text-gray-700 hover:text-indigo-600 p-1 rounded-md"
              aria-label="Back to messages"
            >
              <ArrowLeft size={22} />
            </button>
          )}

          {renderAvatar(selectedChat, "w-10 h-10")}
          <span className="text-lg font-semibold text-gray-900">
            {selectedChat.name}
          </span>
        </div>

        <div className="flex space-x-4 text-gray-500">
          <Phone size={22} className="cursor-pointer hover:text-gray-700" />
          <Video size={22} className="cursor-pointer hover:text-gray-700" />
          <Info size={22} className="cursor-pointer hover:text-gray-700" />
        </div>
      </div>

      {/* Chat Bubbles Area (SCROLLING, takes flex-1) */}
      {/* Conditional padding to clear the fixed bar below */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${
          isMobileView ? "pb-24" : "pb-20"
        }`}
      >
        {conversationData.map((msg, index) => (
          <MessageBubble key={index} {...msg} />
        ))}

        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden mb-3">
            <img
              src="https://picsum.photos/100/100"
              alt="Large DP"
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-xl font-semibold text-gray-900">
            {selectedChat.name}
          </span>
          <span className="text-gray-600 text-sm">@{selectedChat.handle}</span>
          <button className="mt-3 px-3 py-1 text-sm font-semibold rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition">
            View Profile
          </button>
        </div>
      </div>

      {/* 🛑 MESSAGE INPUT BAR (FINAL FIXED VIEWPORT ANCHOR) 🛑 */}
      <div
        className="p-4 border-t border-gray-200 bg-white z-20"
        style={fixedInputStyle} // Apply dynamic width and position
      >
        <div className="flex items-center bg-gray-100 rounded-full p-2 border border-gray-300">
          <span className="text-gray-500 text-2xl px-1 cursor-pointer">+</span>
          <input
            type="text"
            placeholder="Message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1 bg-transparent text-gray-900 border-none focus:outline-none focus:ring-0 placeholder-gray-500 p-1 ml-2"
          />
          <button className="text-indigo-600 font-semibold px-3 hover:text-indigo-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
