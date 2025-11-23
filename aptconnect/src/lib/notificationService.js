import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    updateDoc,
    doc,
    serverTimestamp,
    deleteDoc
} from "firebase/firestore";
import { db } from "./firebase";

export const NOTIFICATION_TYPES = {
    MENTION: "mention",
    CLUB_UPDATE: "club_update",
    REACTION: "reaction",
    COMMENT: "comment",
    FOLLOW: "follow",
    MESSAGE: "message"
};

export const createNotification = async (targetUserId, { type, source, content, link = "", chatId = null }) => {
    try {
        const notificationsRef = collection(db, "users", targetUserId, "notifications");
        await addDoc(notificationsRef, {
            type,
            source, // { id, name, photoURL }
            content,
            link,
            chatId, // Store chatId for navigation
            isRead: false,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error creating notification:", error);
        throw error;
    }
};

export const getUserNotifications = async (userId) => {
    try {
        const notificationsRef = collection(db, "users", userId, "notifications");
        const q = query(notificationsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

export const markNotificationAsRead = async (userId, notificationId) => {
    try {
        const notificationRef = doc(db, "users", userId, "notifications", notificationId);
        await updateDoc(notificationRef, {
            isRead: true
        });
    } catch (error) {
        console.error("Error marking notification as read:", error);
        throw error;
    }
};

export const clearNotifications = async (userId) => {
    try {
        const notificationsRef = collection(db, "users", userId, "notifications");
        const snapshot = await getDocs(notificationsRef);

        // Batch delete would be better for many docs, but simple loop for now
        const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
    } catch (error) {
        console.error("Error clearing notifications:", error);
        throw error;
    }
};
