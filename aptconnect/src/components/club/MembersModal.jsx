// components/club/MembersModal.jsx

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { X, Loader2, User, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { createOrGetDirectChat } from "../../lib/chatService";

export default function MembersModal({ memberIds, onClose }) {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();
    const [startingChat, setStartingChat] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            if (!memberIds || memberIds.length === 0) {
                setLoading(false);
                return;
            }

            try {
                const memberPromises = memberIds.map(async (uid) => {
                    try {
                        const userDoc = await getDoc(doc(db, "users", uid));
                        if (userDoc.exists()) {
                            return { id: userDoc.id, ...userDoc.data() };
                        }
                        return null;
                    } catch (e) {
                        console.error(`Failed to fetch user ${uid}`, e);
                        return null;
                    }
                });

                const results = await Promise.all(memberPromises);
                setMembers(results.filter((m) => m !== null));
            } catch (error) {
                console.error("Error fetching members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [memberIds]);

    const handleMessage = async (memberId) => {
        if (!currentUser) return;
        setStartingChat(memberId);
        try {
            const chatId = await createOrGetDirectChat(currentUser.uid, memberId);
            onClose();
            navigate("/chat", { state: { chatId } });
        } catch (error) {
            console.error("Failed to start chat", error);
        } finally {
            setStartingChat(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-900">
                        Club Members ({memberIds?.length || 0})
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 transition text-slate-500 hover:text-slate-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                        </div>
                    ) : members.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            No members found.
                        </div>
                    ) : (
                        <ul className="space-y-1">
                            {members.map((member) => (
                                <li key={member.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 overflow-hidden">
                                            {member.photoURL ? (
                                                <img src={member.photoURL} alt={member.displayName} className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{member.displayName || member.name || "Unknown User"}</p>
                                            <p className="text-xs text-slate-500">{member.email}</p>
                                        </div>
                                    </div>

                                    {currentUser && currentUser.uid !== member.id && (
                                        <button
                                            onClick={() => handleMessage(member.id)}
                                            disabled={startingChat === member.id}
                                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            title="Message"
                                        >
                                            {startingChat === member.id ? (
                                                <Loader2 size={18} className="animate-spin" />
                                            ) : (
                                                <MessageCircle size={18} />
                                            )}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
