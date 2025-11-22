import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getUserStories } from "../../lib/storyService";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import StoryViewer from "./StoryViewer";
import StoryUpload from "./StoryUpload";

export default function StoryRail() {
    const { user } = useAuth();
    const [stories, setStories] = useState([]); // Array of { clubId, clubName, clubLogo, stories: [] }
    const [loading, setLoading] = useState(true);

    // State for View/Upload
    const [viewingStoryGroup, setViewingStoryGroup] = useState(null); // The group currently being viewed
    const [showUpload, setShowUpload] = useState(false);

    // Admin Clubs (for upload)
    const [adminClubs, setAdminClubs] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Fetch Stories
                const userStories = await getUserStories(user.uid);
                setStories(userStories);

                // 2. Fetch Admin Clubs (for "Add Story" button)
                // Query clubs where admins array contains user.uid
                const q = query(collection(db, "clubs"), where("admins", "array-contains", user.uid));
                const snapshot = await getDocs(q);
                const clubs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAdminClubs(clubs);

            } catch (error) {
                console.error("Failed to load stories/clubs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleStoryClick = (group) => {
        setViewingStoryGroup(group);
    };

    const handleUploadSuccess = () => {
        // Refresh stories
        if (user) {
            getUserStories(user.uid).then(setStories);
        }
    };

    if (!user) return null;

    return (
        <section className="flex justify-start py-4 overflow-x-auto scrollbar-hide px-4">
            <div className="flex gap-4 items-center">

                {/* Add Story Button (Only if admin of at least one club) */}
                {adminClubs.length > 0 && (
                    <div className="flex flex-col items-center gap-1 cursor-pointer shrink-0" onClick={() => setShowUpload(true)}>
                        <div className="relative w-[70px] h-[70px]">
                            <div className="w-full h-full rounded-full border-2 border-dashed border-gray-300 p-[2px] flex items-center justify-center hover:bg-gray-50 transition-colors">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Me" className="w-full h-full rounded-full object-cover opacity-50" />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gray-100" />
                                )}
                            </div>
                            <div className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-1 border-2 border-white">
                                <Plus size={14} strokeWidth={3} />
                            </div>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Add Story</span>
                    </div>
                )}

                {/* Story Items */}
                {loading ? (
                    // Skeletons
                    [...Array(5)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 shrink-0 animate-pulse">
                            <div className="w-[70px] h-[70px] rounded-full bg-gray-200" />
                            <div className="w-12 h-3 bg-gray-200 rounded" />
                        </div>
                    ))
                ) : (
                    stories.map((group) => (
                        <div
                            key={group.clubId}
                            className="flex flex-col items-center gap-1 cursor-pointer shrink-0 group"
                            onClick={() => handleStoryClick(group)}
                        >
                            <div className="w-[74px] h-[74px] rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px] hover:scale-105 transition-transform">
                                <div className="w-full h-full rounded-full border-2 border-white bg-white overflow-hidden">
                                    {group.clubLogo ? (
                                        <img src={group.clubLogo} alt={group.clubName} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 font-bold text-xl">
                                            {group.clubName.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <span className="text-xs text-gray-900 font-medium max-w-[74px] truncate text-center">
                                {group.clubName}
                            </span>
                        </div>
                    ))
                )}

                {!loading && stories.length === 0 && adminClubs.length === 0 && (
                    <div className="text-sm text-gray-400 italic px-2">
                        No stories yet
                    </div>
                )}

            </div>

            {/* Story Viewer Overlay */}
            {viewingStoryGroup && (
                <StoryViewer
                    stories={viewingStoryGroup.stories}
                    onClose={() => setViewingStoryGroup(null)}
                />
            )}

            {/* Upload Modal */}
            {showUpload && (
                <StoryUpload
                    clubs={adminClubs}
                    currentUser={user}
                    onClose={() => setShowUpload(false)}
                    onUploadSuccess={handleUploadSuccess}
                />
            )}
        </section>
    );
}
