import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X, Image, Plus, Loader2 } from "lucide-react";
import { uploadToCloudinary } from "../../lib/upload";
import { createPost } from "../../lib/postService";

const CreatePostModal = ({ onClose, onPostCreated, clubId, currentUser }) => {
    const [postContent, setPostContent] = useState("");
    const [mediaFile, setMediaFile] = useState(null);
    const [isPosting, setIsPosting] = useState(false);

    // Use current user info or fallback
    const USER_INFO = {
        name: currentUser?.displayName || "User",
        handle: currentUser?.email || "Member",
        avatarUrl: currentUser?.photoURL || `https://placehold.co/40x40/5C6BC0/FFFFFF?text=${(currentUser?.displayName || "U").charAt(0)}`,
    };

    const handlePost = async (e) => {
        e.preventDefault();
        if (postContent.trim().length === 0 && !mediaFile) {
            alert("Please add content or media to your post.");
            return;
        }

        setIsPosting(true);
        try {
            let imageURL = "";
            let videoURL = "";

            // Upload Media if exists
            if (mediaFile) {
                const url = await uploadToCloudinary(mediaFile);
                if (mediaFile.type.startsWith("video/")) {
                    videoURL = url;
                } else {
                    imageURL = url;
                }
            }

            const postData = {
                content: postContent,
                imageURL,
                videoURL,
                clubId,
                authorId: currentUser?.uid,
                // Title is omitted as per new UI, service handles it or it's optional
                title: "",
            };

            await createPost(postData);

            if (onPostCreated) {
                onPostCreated(); // Refresh list
            }
            onClose();
        } catch (error) {
            console.error("Failed to create post", error);
            alert("Failed to create post. Please try again.");
        } finally {
            setIsPosting(false);
        }
    };

    const handleMediaChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setMediaFile(e.target.files[0]);
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 transition-opacity"
            onClick={onClose}
        >
            {/* Modal Content Box */}
            <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 
                           transform transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header and Close Button */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Create Post
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition"
                        aria-label="Close post creation"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* User Info Header (Profile and Name) */}
                <div className="flex items-center mt-4 mb-4">
                    <img
                        src={USER_INFO.avatarUrl}
                        alt={USER_INFO.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            {USER_INFO.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {USER_INFO.handle}
                        </p>
                    </div>
                </div>

                {/* Content Input Area */}
                <form onSubmit={handlePost}>
                    <textarea
                        rows="5"
                        placeholder="What do you want to talk about?"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="w-full text-lg resize-none border-none focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-0 mb-4"
                    />

                    {/* Media Preview/Placeholder */}
                    {mediaFile && (
                        <div className="text-sm text-green-600 mb-4 flex items-center justify-between p-2 border border-green-300 rounded-lg bg-green-50">
                            <span className="truncate max-w-[80%]">{mediaFile.name}</span>
                            <button
                                onClick={() => setMediaFile(null)}
                                type="button"
                                className="text-red-500 hover:text-red-700"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}

                    {/* Footer: Media & Post Button */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        {/* Media Upload Icons */}
                        <div className="flex space-x-4">
                            <label
                                htmlFor="media-upload"
                                className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition"
                            >
                                <Image size={24} />
                                <input
                                    id="media-upload"
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleMediaChange}
                                    className="hidden"
                                />
                            </label>
                            {/* Placeholder for other attachments if needed */}
                            {/* <button
                type="button"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition"
              >
                <Plus size={24} />
              </button> */}
                        </div>

                        {/* Post Button */}
                        <button
                            type="submit"
                            disabled={
                                isPosting || (postContent.trim().length === 0 && !mediaFile)
                            }
                            className={`px-6 py-2 text-base font-semibold rounded-full transition duration-300 flex items-center gap-2 ${postContent.trim().length > 0 || mediaFile
                                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {isPosting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                "Post"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default CreatePostModal;
