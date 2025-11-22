import React from "react";
import { PlusCircle, Loader2, MessageCircle, Trash2 } from "lucide-react";

const ClubEvents = ({
    chats,
    loading,
    isAdmin,
    onJoinChat,
    onDeleteEvent,
    deletingEvent,
    onCreateClick
}) => {
    return (
        <div className="space-y-6">
            {/* Admin Create Button */}
            {isAdmin && (
                <div className="flex justify-end">
                    <button
                        onClick={onCreateClick}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition text-sm font-medium"
                    >
                        <PlusCircle size={18} />
                        Create Event
                    </button>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
            ) : chats.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No events (group chats) yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer border border-gray-100 group"
                            onClick={() => onJoinChat(chat.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 overflow-hidden border border-indigo-50">
                                    {chat.avatar ? (
                                        <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <MessageCircle size={24} />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-gray-900 font-medium text-lg">
                                        {chat.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 line-clamp-1">
                                        {chat.description || "No description"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="text-indigo-600 font-medium text-sm hover:underline">
                                    Open Chat
                                </button>
                                {isAdmin && (
                                    <button
                                        onClick={(e) => onDeleteEvent(e, chat.id)}
                                        disabled={deletingEvent === chat.id}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition opacity-0 group-hover:opacity-100"
                                        title="Delete Event"
                                    >
                                        {deletingEvent === chat.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClubEvents;
