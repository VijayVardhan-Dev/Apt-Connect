import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp,
    Timestamp,
    doc,
    getDoc
} from "firebase/firestore";
import { db } from "./firebase";
import { uploadToCloudinary } from "./upload";

/**
 * Creates a new story for a club.
 */
export const createStory = async (clubId, file, caption, creatorId) => {
    try {
        // 1. Upload image
        const mediaUrl = await uploadToCloudinary(file);

        // 2. Get Club Details for denormalization
        const clubRef = doc(db, "clubs", clubId);
        const clubSnap = await getDoc(clubRef);

        if (!clubSnap.exists()) throw new Error("Club not found");
        const clubData = clubSnap.data();

        // 3. Create Story Document
        const storyData = {
            clubId,
            clubName: clubData.name,
            clubLogo: clubData.profileURL || clubData.logo || null,
            creatorId,
            mediaUrl,
            caption: caption || "",
            createdAt: serverTimestamp(),
            expiresAt: Timestamp.fromMillis(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        };

        await addDoc(collection(db, "stories"), storyData);
        return true;
    } catch (error) {
        console.error("Error creating story:", error);
        throw error;
    }
};

/**
 * Fetches active stories for a user based on their club memberships.
 * Returns stories grouped by club.
 */
export const getUserStories = async (userId) => {
    try {
        // 1. Get User's Clubs (joined & owned)
        // Ideally, we should have a 'memberships' collection or array in user doc.
        // For now, we'll query clubs where members array contains userId OR admins array contains userId.
        // Note: Firestore 'array-contains' only works on one field at a time.
        // We might need two queries or rely on a 'myClubs' list if available.

        // Let's assume we can get the list of club IDs the user is part of.
        // If not readily available, we might need to fetch all clubs and filter (inefficient) 
        // or rely on the user's 'joinedClubs' field if it exists.

        // Checking user doc structure from previous context... 
        // It seems we don't have a definitive list of joined clubs in user doc yet.
        // But we can query clubs where 'members' array-contains userId.

        const clubsRef = collection(db, "clubs");
        const q = query(clubsRef, where("members", "array-contains", userId));
        const snapshot = await getDocs(q);

        const clubIds = snapshot.docs.map(doc => doc.id);

        if (clubIds.length === 0) return [];

        // 2. Fetch active stories for these clubs
        // Firestore 'in' query is limited to 10 items. 
        // If user is in >10 clubs, we need to batch or fetch all active stories and filter.
        // For scalability, fetching all active stories (globally) might be too much.
        // Let's do batches of 10 for now.

        const now = Timestamp.now();
        const storiesRef = collection(db, "stories");

        let allStories = [];

        // Batching logic
        for (let i = 0; i < clubIds.length; i += 10) {
            const batch = clubIds.slice(i, i + 10);
            const storyQ = query(
                storiesRef,
                where("clubId", "in", batch),
                where("expiresAt", ">", now),
                orderBy("expiresAt", "asc") // Required for inequality filter
            );

            const storySnap = await getDocs(storyQ);
            allStories = [...allStories, ...storySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))];
        }

        // 3. Group by Club
        const groupedStories = allStories.reduce((acc, story) => {
            if (!acc[story.clubId]) {
                acc[story.clubId] = {
                    clubId: story.clubId,
                    clubName: story.clubName,
                    clubLogo: story.clubLogo,
                    stories: []
                };
            }
            acc[story.clubId].stories.push(story);
            return acc;
        }, {});

        // Sort stories within each club by createdAt
        Object.values(groupedStories).forEach(group => {
            group.stories.sort((a, b) => a.createdAt?.toMillis() - b.createdAt?.toMillis());
        });

        return Object.values(groupedStories);

    } catch (error) {
        console.error("Error fetching stories:", error);
        return [];
    }
};
