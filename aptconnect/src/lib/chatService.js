import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    serverTimestamp,
    arrayUnion,
    query,
    where,
    orderBy,
    addDoc,
    increment,
    getDocs,
    deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Creates a direct chat between two users if it doesn't exist.
 * Returns the chatId.
 */
export const createOrGetDirectChat = async (currentUserId, otherUserId) => {
    // Deterministic Chat ID: sorted user IDs
    // STRICTLY FOLLOWING SCHEMA: chatId = sorted user IDs
    const sortedIds = [currentUserId, otherUserId].sort();
    const chatId = `${sortedIds[0]}_${sortedIds[1]}`;

    try {
        const chatRef = doc(db, "chats", chatId);
        const chatSnap = await getDoc(chatRef);

        if (!chatSnap.exists()) {
            // Create new chat document
            await setDoc(chatRef, {
                type: "private",
                members: sortedIds, // Also storing members sorted for consistency
                createdAt: serverTimestamp(),
                lastMessage: null,
            });

            // Update userChats for both users
            const userChatData = {
                updatedAt: serverTimestamp(),
                unreadCount: 0,
                lastMessage: null,
            };

            await setDoc(doc(db, "users", currentUserId, "userChats", chatId), userChatData);
            await setDoc(doc(db, "users", otherUserId, "userChats", chatId), userChatData);
        }

        return chatId;
    } catch (error) {
        console.error("Error creating chat:", error);
        throw error;
    }
};

/**
 * Sends a message to a chat and updates last message/unread counts.
 */
export const sendMessage = async (chatId, senderId, text, mediaUrl = null, mediaType = null) => {
    try {
        const messagesRef = collection(db, "chats", chatId, "messages");

        const newMessage = {
            senderId,
            text,
            mediaUrl,
            mediaType,
            createdAt: serverTimestamp(),
            seenBy: [senderId],
        };

        await addDoc(messagesRef, newMessage);

        const lastMessage = {
            text: text || (mediaUrl ? "Attachment" : ""),
            senderId,
            timestamp: serverTimestamp(),
        };

        // Update Chat Document
        await updateDoc(doc(db, "chats", chatId), {
            lastMessage,
        });

        // Update User Chats (increment unread for others)
        const chatSnap = await getDoc(doc(db, "chats", chatId));
        if (chatSnap.exists()) {
            const members = chatSnap.data().members;

            for (const memberId of members) {
                const userChatRef = doc(db, "users", memberId, "userChats", chatId);

                const updateData = {
                    lastMessage,
                    updatedAt: serverTimestamp(),
                };

                // Increment unread count for everyone except sender
                if (memberId !== senderId) {
                    updateData.unreadCount = increment(1);
                }

                // Use setDoc with merge to ensure it exists
                await setDoc(userChatRef, updateData, { merge: true });
            }
        }
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

/**
 * Subscribes to the current user's chat list.
 */
export const subscribeToUserChats = (userId, callback) => {
    const userChatsRef = collection(db, "users", userId, "userChats");
    const q = query(userChatsRef);

    return onSnapshot(q, async (snapshot) => {
        const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const chatDetailsPromises = chats.map(async (chat) => {
            const chatDoc = await getDoc(doc(db, "chats", chat.id));
            if (chatDoc.exists()) {
                const chatData = chatDoc.data();
                // Identify the other user
                const otherUserId = chatData.members.find(id => id !== userId);

                let otherUser = null;
                if (otherUserId) {
                    const userSnap = await getDoc(doc(db, "users", otherUserId));
                    if (userSnap.exists()) {
                        otherUser = {
                            uid: otherUserId,
                            ...userSnap.data(),
                            displayName: userSnap.data().displayName || userSnap.data().name
                        };
                    }
                }

                return {
                    ...chat,
                    ...chatData,
                    otherUser,
                };
            }
            return chat;
        });

        const resolvedChats = await Promise.all(chatDetailsPromises);
        resolvedChats.sort((a, b) => b.updatedAt?.toMillis() - a.updatedAt?.toMillis());

        callback(resolvedChats);
    });
};

/**
 * Subscribes to messages in a specific chat.
 */
export const subscribeToChatMessages = (chatId, callback) => {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(messages);
    });
};

/**
 * Creates a group chat for a club.
 */
export const createGroupChat = async (clubId, name, description, adminId, memberIds, avatar = null) => {
    try {
        const chatRef = collection(db, "chats");
        const newChatData = {
            type: "group",
            name,
            description,
            avatar,
            createdBy: adminId,
            admins: [adminId],
            members: memberIds, // All club members
            clubId, // Link to club
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastMessage: null,
        };

        const docRef = await addDoc(chatRef, newChatData);
        const chatId = docRef.id;

        // Update userChats for all members
        const userChatData = {
            updatedAt: serverTimestamp(),
            unreadCount: 0,
            lastMessage: null,
            type: "group",
            name, // Store name for easier display
            clubId,
        };

        // Batch update or individual updates
        // For large clubs, this might be slow. Ideally use Cloud Functions.
        // For now, client-side loop.
        for (const memberId of memberIds) {
            await setDoc(doc(db, "users", memberId, "userChats", chatId), userChatData);
        }

        return chatId;
    } catch (error) {
        console.error("Error creating group chat:", error);
        throw error;
    }
};

/**
 * Deletes a group chat.
 */
export const deleteGroupChat = async (chatId) => {
    try {
        const chatRef = doc(db, "chats", chatId);
        const chatSnap = await getDoc(chatRef);

        if (chatSnap.exists()) {
            const chatData = chatSnap.data();
            const members = chatData.members || [];

            // Delete from all members' userChats
            const deletePromises = members.map(memberId =>
                deleteDoc(doc(db, "users", memberId, "userChats", chatId))
            );
            await Promise.all(deletePromises);

            // Delete the chat document itself
            await deleteDoc(chatRef);
        }
    } catch (error) {
        console.error("Error deleting group chat:", error);
        throw error;
    }
};

/**
 * Clears all messages in a chat.
 */
export const clearChatHistory = async (chatId) => {
    try {
        const messagesRef = collection(db, "chats", chatId, "messages");
        const snapshot = await getDocs(messagesRef);

        const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        const chatRef = doc(db, "chats", chatId);
        await updateDoc(chatRef, {
            lastMessage: null
        });

        const chatSnap = await getDoc(chatRef);
        if (chatSnap.exists()) {
            const members = chatSnap.data().members;

            const updatePromises = members.map(memberId => {
                const userChatRef = doc(db, "users", memberId, "userChats", chatId);
                return updateDoc(userChatRef, {
                    lastMessage: null,
                    unreadCount: 0,
                    updatedAt: serverTimestamp()
                });
            });

            await Promise.all(updatePromises);
        }
    } catch (error) {
        console.error("Error clearing chat history:", error);
        throw error;
    }
};

/**
 * Deletes a chat from the user's chat list.
 */
export const deleteChatFromList = async (userId, chatId) => {
    try {
        const userChatRef = doc(db, "users", userId, "userChats", chatId);
        await deleteDoc(userChatRef);
    } catch (error) {
        console.error("Error deleting chat from list:", error);
        throw error;
    }
};

/**
 * Gets all group chats for a specific club.
 */
export const getClubChats = async (clubId) => {
    try {
        const chatsRef = collection(db, "chats");
        const q = query(
            chatsRef,
            where("clubId", "==", clubId),
            where("type", "==", "group"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching club chats:", error);
        throw error;
    }
};

/**
 * Adds a user to a group chat if they are not already a member.
 */
export const joinGroupChat = async (chatId, userId) => {
    try {
        const chatRef = doc(db, "chats", chatId);
        const chatSnap = await getDoc(chatRef);

        if (!chatSnap.exists()) {
            throw new Error("Chat not found");
        }

        const chatData = chatSnap.data();
        const members = chatData.members || [];

        if (!members.includes(userId)) {
            // Add to chat members
            await updateDoc(chatRef, {
                members: arrayUnion(userId)
            });

            // Add to user's chat list
            const userChatData = {
                updatedAt: serverTimestamp(),
                unreadCount: 0,
                lastMessage: chatData.lastMessage || null,
                type: "group",
                name: chatData.name,
                clubId: chatData.clubId,
                // Add other necessary fields if needed
            };

            await setDoc(doc(db, "users", userId, "userChats", chatId), userChatData);
        }
    } catch (error) {
        console.error("Error joining group chat:", error);
        throw error;
    }
};
