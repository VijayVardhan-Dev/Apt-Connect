import React, { createContext, useState } from "react";

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  return (
    <ChatContext.Provider value={{ conversations, setConversations }}>
      {children}
    </ChatContext.Provider>
  );
}
