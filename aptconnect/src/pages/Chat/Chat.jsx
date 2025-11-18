import React, { useState, } from "react";
import { ArrowLeft, Search, Phone, Video, Info, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Data Structure (from your MyChats component, simplified for demo)
const initialChats = [
  { id: 1, name: "BORA GUNA", handle: "GUNA_77", lastMessage: "Your note", time: "just now", active: true, dp: 'DP_1' },
  { id: 2, name: "MVS PRANNAV", lastMessage: "Broo", time: "7w", active: false, dp: 'DP_2' },
  { id: 3, name: "Yeswanth_L", lastMessage: "Active 16m ago", time: "16m", active: true, dp: 'DP_3' },
  { id: 4, name: "MR. TEJ 777", lastMessage: "Reacted to your message", time: "10w", active: false, dp: 'DP_4' },
  { id: 5, name: "Kumar REDDY's", lastMessage: "Message unavailable", time: "11w", active: false, dp: 'DP_5' },
  { id: 6, name: "Quantumhero_vijay", lastMessage: "sent an attachment", time: "12w", active: true, dp: 'DP_6' },
];

// Data for the active conversation
const activeUser = initialChats[5]; 

const MessageBubble = ({ text, time, isMine, isStoryMention }) => (
    <div className={isMine ? 'flex justify-end' : 'flex justify-start'}>
        <div className="flex flex-col max-w-xs md:max-w-md">
            {isStoryMention && (
                <div className="text-xs italic text-gray-500 mb-1">
                    Mentioned you in their story
                </div>
            )}
            <div className={isMine ? 'bg-indigo-600 text-white rounded-xl py-2 px-4 rounded-br-none' : 'bg-gray-200 text-gray-900 rounded-xl py-2 px-4 rounded-bl-none'}>
                {text}
            </div>
            <span className={isMine ? 'text-xs text-gray-500 mt-1 text-right' : 'text-xs text-gray-500 mt-1 text-left'}>
                {time}
            </span>
        </div>
    </div>
);


export default function MessagesLayout() {
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState(activeUser);
    const [messageText, setMessageText] = useState('');

    const renderAvatar = (user, sizeClass = "w-12 h-12") => (
        // Avatar rendering uses the same size class for both container and content.
        <div className={`${sizeClass} rounded-full bg-gray-400 flex items-center justify-center text-white text-lg font-bold border-2 border-transparent flex-shrink-0`}>
            {/* Placeholder letter removed for clean circle */}
        </div>
    );

    return (
        // OUTER CONTAINER: White background, text is dark
        <div className="flex h-screen overflow-hidden bg-white text-gray-900"> 
            
            {/* 1. CHAT LIST PANEL (Left, 30% Width on Large Screens) */}
            <div className="flex flex-col w-full md:w-[30%] border-r border-gray-200 bg-white">
                
                {/* Chat List Header (Top Bar) */}
                <div className="flex flex-col p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-gray-900">{initialChats[0].handle}</span> 
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 placeholder-gray-500 text-gray-900"
                        />
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>

                    {/* Requests/Filters (Simulated) */}
                    {/* MODIFIED: Increased space-x-4 to space-x-6 for more gap */}
                    <div className="flex space-x-20 text-sm mt-3 text-gray-900">
                        <span className="font-semibold cursor-pointer ml-5">Messages</span>
                        <span className="text-gray-500 cursor-pointer hover:text-gray-700">Requests</span>
                    </div>
                </div>

                {/* Chat List Items */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide pb-20 sm:pb-0">
                    {initialChats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`flex items-center p-3 rounded-xl cursor-pointer ${
                                selectedChat.id === chat.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                            }`}
                        >
                            {/* Avatar: Use w-12 h-12 for standard chat list size */}
                            {renderAvatar(chat, "w-12 h-12")} 
                            <div className="ml-3 truncate">
                                <p className="text-sm font-semibold truncate text-gray-900">{chat.name}</p>
                                <p className={`text-xs ${chat.active ? 'text-green-600' : 'text-gray-500'}`}>
                                    {chat.lastMessage} · {chat.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. CONVERSATION PANEL (Right, 70% Width) - White background */}
            <div className="flex flex-col flex-1 bg-white">
                
                {/* Conversation Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        {renderAvatar(selectedChat, "w-10 h-10")}
                        <span className="text-lg font-semibold text-gray-900">{selectedChat.name}</span>
                    </div>
                    {/* Action Icons */}
                    <div className="flex space-x-4 text-gray-500">
                        <Phone size={22} className="cursor-pointer hover:text-gray-700" />
                        <Video size={22} className="cursor-pointer hover:text-gray-700" />
                        <Info size={22} className="cursor-pointer hover:text-gray-700" />
                    </div>
                </div>
                
                {/* Chat Bubbles Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Placeholder for conversation history */}
                    <MessageBubble 
                        text="alwaysdeva_ mentioned you in their story" 
                        time="22 Aug 2025, 00:37" 
                        isMine={false} 
                        isStoryMention={true}
                    />
                    <MessageBubble 
                        text="フ乇モ∀尺 sent an attachment." 
                        time="22 Aug 2025, 01:58" 
                        isMine={true} 
                        isStoryMention={false}
                    />
                    <MessageBubble 
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
                        time="22 Aug 2025, 09:50" 
                        isMine={false} 
                        isStoryMention={false}
                    />
                     <MessageBubble 
                        text="Mentioned you in their story" 
                        time="22 Aug 2025, 09:50" 
                        isMine={false} 
                        isStoryMention={true}
                    />
                    
                    {/* Render the large profile/view profile section */}
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden mb-3">
                            {/* Placeholder for the large DP image */}
                            <img src="https://media.licdn.com/dms/image/v2/D5603AQHz6Lbh7LsNag/profile-displayphoto-scale_200_200/B56ZpSo6wCI4AY-/0/1762323051396?e=2147483647&v=beta&t=3-JR1yof2nZeAivQjmfxZ26p8nbtWrBXkvVEXaF8kEA" alt="Large DP" className="object-cover w-full h-full" />
                        </div>
                        <span className="text-xl font-semibold text-gray-900">{activeUser.name}</span>
                        <span className="text-gray-600 text-sm">@{activeUser.handle}</span>
                        <button className="mt-3 px-3 py-1 text-sm font-semibold rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition">
                            View Profile
                        </button>
                    </div>

                </div>
                
                {/* Message Input Bar */}
                <div className="p-4 border-t border-gray-200">
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
        </div>
    );
}