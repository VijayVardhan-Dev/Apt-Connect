import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp,
    limit,
    deleteDoc,
    doc
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Creates a new post.
 * @param {Object} postData - The data for the post.
 * @returns {Promise<string>} - The ID of the created post.
 */
export const createPost = async (postData) => {
    try {
        const postsRef = collection(db, "posts");
        const newPost = {
            ...postData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            likesCount: 0,
            commentsCount: 0,
            views: 0,
            likedBy: [],
            type: "post"
        };
        const docRef = await addDoc(postsRef, newPost);
        return docRef.id;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

/**
 * Gets posts for a specific club.
 * @param {string} clubId - The ID of the club.
 * @returns {Promise<Array>} - List of posts.
 */
export const getClubPosts = async (clubId) => {
    try {
        const postsRef = collection(db, "posts");
        const q = query(
            postsRef,
            where("clubId", "==", clubId),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching club posts:", error);
        throw error;
    }
};

/**
 * Gets all posts for the home feed.
 * @returns {Promise<Array>} - List of all posts.
 */
export const getAllPosts = async () => {
    try {
        const postsRef = collection(db, "posts");
        const q = query(
            postsRef,
            orderBy("createdAt", "desc"),
            limit(50)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching all posts:", error);
        throw error;
    }
};

/**
 * Deletes a post.
 * @param {string} postId - The ID of the post to delete.
 */
export const deletePost = async (postId) => {
    try {
        await deleteDoc(doc(db, "posts", postId));
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};
/**
 * Gets posts created by a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - List of posts.
 */
export const getUserPosts = async (userId) => {
    try {
        const postsRef = collection(db, "posts");
        const q = query(
            postsRef,
            where("creatorId", "==", userId),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching user posts:", error);
        throw error;
    }
};
