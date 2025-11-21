import React, { useState } from "react";
import { X, Loader2, Image as ImageIcon, Video, Upload } from "lucide-react";

const CreatePostModal = ({ onClose, onSubmit, loading }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content, imageURL, videoURL, imageFile, videoFile });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>

                <h3 className="text-xl font-semibold text-gray-900 mb-6">Create Post</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                            placeholder="Post Title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none h-32 resize-none"
                            placeholder="What's on your mind?"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                            <ImageIcon size={16} /> Image
                        </label>
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                placeholder="Image URL (optional)"
                            />
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">OR</span>
                                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition text-sm text-gray-600">
                                    <Upload size={16} />
                                    {imageFile ? "Change File" : "Upload from Computer"}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setImageFile(e.target.files[0])}
                                    />
                                </label>
                                {imageFile && <span className="text-xs text-green-600 truncate max-w-[150px]">{imageFile.name}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Video Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                            <Video size={16} /> Video
                        </label>
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                value={videoURL}
                                onChange={(e) => setVideoURL(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                placeholder="Video URL (optional)"
                            />
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">OR</span>
                                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition text-sm text-gray-600">
                                    <Upload size={16} />
                                    {videoFile ? "Change File" : "Upload from Computer"}
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={(e) => setVideoFile(e.target.files[0])}
                                    />
                                </label>
                                {videoFile && <span className="text-xs text-green-600 truncate max-w-[150px]">{videoFile.name}</span>}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !title.trim()}
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Posting...
                            </>
                        ) : (
                            "Post"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;
