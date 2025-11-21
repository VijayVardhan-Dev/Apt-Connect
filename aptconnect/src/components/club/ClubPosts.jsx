import React from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import Post from "../ui/Post";

const ClubPosts = ({
    posts,
    loading,
    isMember,
    currentUser,
    isAdmin,
    onDeletePost,
    onCreateClick
}) => {
    return (
        <div className="space-y-6">
            {/* Create Post Button (Members Only) */}
            {isMember && (
                <div className="flex justify-end">
                    <button
                        onClick={onCreateClick}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition text-sm font-medium"
                    >
                        <PlusCircle size={18} />
                        Create Post
                    </button>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No posts yet. Be the first to post!
                </div>
            ) : (
                <div className="space-y-6 max-w-3xl mx-auto">
                    {posts.map((post) => (
                        <Post
                            key={post.id}
                            post={post}
                            currentUser={currentUser}
                            isAdmin={isAdmin}
                            onDelete={onDeletePost}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClubPosts;
