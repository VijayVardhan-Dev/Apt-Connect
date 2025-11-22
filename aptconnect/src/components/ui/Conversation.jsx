import React, { useState, useEffect, useRef } from "react";
import { Phone, Video, Info, ArrowLeft, Send, Paperclip, Image as ImageIcon, MoreVertical } from "lucide-react";
import { subscribeToChatMessages, sendMessage, clearChatHistory, deleteChatFromList } from "../../lib/chatService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const MessageBubble = ({ text, mediaUrl, time, isMine, senderName }) => (
  <div className={isMine ? "flex justify-end" : "flex justify-start"}>
    <div className="flex flex-col max-w-xs md:max-w-md">
      {!isMine && senderName && (
        <span className="text-xs text-gray-500 mb-1 ml-1">{senderName}</span>
      )}
      <div
        className={
          isMine
            ? "bg-indigo-600 text-white rounded-xl py-2 px-4 rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-xl py-2 px-4 rounded-bl-none"
        }
      >
        {mediaUrl && (
          <img src={mediaUrl} alt="Attachment" className="max-w-full rounded-lg mb-2" />
        )}
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

const Conversation = ({ selectedChat, renderAvatar, isMobileView, onBack, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);
  const [memberProfiles, setMemberProfiles] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  // --- Dynamic Positioning State ---
  const [fixedInputStyle, setFixedInputStyle] = useState({});
  const conversationRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Breakpoints for sidebar visibility
  const DESKTOP_SPLIT_BREAKPOINT = 768;
  const BOTTOM_BAR_BREAKPOINT = 700;

  const [hasBottomBar, setHasBottomBar] = useState(false);

  useEffect(() => {
    const updateFixedPosition = () => {
      if (conversationRef.current) {
        const rect = conversationRef.current.getBoundingClientRect();
        const width = window.innerWidth;
        const IS_SPLIT_VIEW = width > DESKTOP_SPLIT_BREAKPOINT;
        const showBottomBar = width <= BOTTOM_BAR_BREAKPOINT;

        setHasBottomBar(showBottomBar);

        if (IS_SPLIT_VIEW) {
          setFixedInputStyle({
            width: `${rect.width}px`,
            left: `${rect.left}px`,
            bottom: "0",
            position: "fixed",
            zIndex: 20,
          });
        } else {
          // Mobile View (<= 768px)
          if (showBottomBar) {
            // <= 700px: Bottom bar visible, Sidebar hidden
            setFixedInputStyle({
              width: "100%",
              left: "0",
              bottom: "64px",
              position: "fixed",
              zIndex: 20,
            });
          } else {
            // 700px < width <= 768px: Sidebar visible (collapsed), Bottom bar hidden
            // Sidebar width is w-20 (5rem = 80px)
            setFixedInputStyle({
              width: "calc(100% - 80px)",
              left: "80px",
              bottom: "0",
              position: "fixed",
              zIndex: 20,
            });
          }
        }
      }
    };

    updateFixedPosition();
    window.addEventListener("resize", updateFixedPosition);
    return () => window.removeEventListener("resize", updateFixedPosition);
  }, [isMobileView, selectedChat]);

  // Subscribe to Messages
  useEffect(() => {
    if (!selectedChat?.id) return;

    const unsubscribe = subscribeToChatMessages(selectedChat.id, (msgs) => {
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedChat?.id]);

  // Fetch Member Profiles for Group Chats
  useEffect(() => {
    if (selectedChat?.type === 'group' && selectedChat.members) {
      const fetchProfiles = async () => {
        const profiles = {};
        // Check which profiles we already have or need
        // For simplicity, fetch all for now (optimize later with cache)
        const promises = selectedChat.members.map(async (memberId) => {
          if (memberId === currentUser?.uid) return; // Don't need own name usually, but good to have
          try {
            const userDoc = await getDoc(doc(db, "users", memberId));
            if (userDoc.exists()) {
              profiles[memberId] = userDoc.data();
            }
          } catch (e) {
            console.error("Error fetching member profile", e);
          }
        });
        await Promise.all(promises);
        setMemberProfiles(profiles);
      };
      fetchProfiles();
    }
  }, [selectedChat, currentUser]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const textToSend = messageText.trim();
    if (!textToSend || !currentUser || !selectedChat) return;

    setSending(true);
    setMessageText(""); // Optimistic clear
    try {
      await sendMessage(selectedChat.id, currentUser.uid, textToSend);
    } catch (error) {
      console.error("Failed to send message", error);
      setMessageText(textToSend); // Restore on failure
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const handleClearChat = async () => {
    if (!selectedChat) return;
    if (window.confirm("Are you sure you want to clear the chat history? This cannot be undone.")) {
      try {
        await clearChatHistory(selectedChat.id);
        setShowMenu(false);
      } catch (error) {
        console.error("Failed to clear chat", error);
        alert("Failed to clear chat");
      }
    }
  };

  const handleDeleteChat = async () => {
    if (!selectedChat || !currentUser) return;
    if (window.confirm("Are you sure you want to delete this chat from your list?")) {
      try {
        await deleteChatFromList(currentUser.uid, selectedChat.id);
        setShowMenu(false);
        if (onBack) onBack(); // Go back to list
      } catch (error) {
        console.error("Failed to delete chat", error);
        alert("Failed to delete chat");
      }
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!selectedChat)
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-white text-gray-500">
        Select a chat to begin.
      </div>
    );

  const otherUser = selectedChat.otherUser;
  const chatName = selectedChat.type === 'group'
    ? selectedChat.name
    : (otherUser?.displayName || selectedChat.name || "Chat");
  const chatHandle = otherUser?.email || "Group"; // Using email as handle for now

  return (
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
            {chatName}
          </span>
        </div>

        <div className="flex space-x-4 text-gray-500">
          <Phone size={22} className="cursor-pointer hover:text-gray-700" />
          <Video size={22} className="cursor-pointer hover:text-gray-700" />
          <Info size={22} className="cursor-pointer hover:text-gray-700" />

          <div className="relative">
            <MoreVertical
              size={22}
              className="cursor-pointer hover:text-gray-700"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button
                  onClick={handleClearChat}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Clear Chat History
                </button>
                <button
                  onClick={handleDeleteChat}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete Chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Bubbles Area */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${hasBottomBar ? "pb-40" : (isMobileView ? "pb-24" : "pb-20")
          }`}
      >
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUser?.uid;
          const senderName = !isMine && selectedChat.type === 'group'
            ? memberProfiles[msg.senderId]?.displayName || "Unknown"
            : null;

          return (
            <MessageBubble
              key={msg.id}
              text={msg.text}
              mediaUrl={msg.mediaUrl}
              time={formatTime(msg.createdAt)}
              isMine={isMine}
              senderName={senderName}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* MESSAGE INPUT BAR */}
      <div
        className="p-4 border-t border-gray-200 bg-white z-20"
        style={fixedInputStyle}
      >
        <div className="flex items-center bg-gray-100 rounded-full p-2 border border-gray-300">
          <button className="text-gray-500 p-2 hover:text-gray-700">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            placeholder="Message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-900 border-none focus:outline-none focus:ring-0 placeholder-gray-500 p-1 ml-2"
          />
          <button
            onClick={handleSend}
            disabled={sending || !messageText.trim()}
            className={`text-indigo-600 font-semibold px-3 hover:text-indigo-700 ${sending ? 'opacity-50' : ''}`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;

