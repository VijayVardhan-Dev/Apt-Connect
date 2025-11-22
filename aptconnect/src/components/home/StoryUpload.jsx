import React, { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { createStory } from "../../lib/storyService";

export default function StoryUpload({ clubs, onClose, onUploadSuccess, currentUser }) {
    const [selectedClubId, setSelectedClubId] = useState(clubs.length > 0 ? clubs[0].id : "");
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [caption, setCaption] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async () => {
        if (!file || !selectedClubId) return;

        setUploading(true);
        try {
            await createStory(selectedClubId, file, caption, currentUser.uid);
            onUploadSuccess();
            onClose();
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload story. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-900">Add to Story</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {/* Club Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Posting as</label>
                        <select
                            value={selectedClubId}
                            onChange={(e) => setSelectedClubId(e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        >
                            {clubs.map(club => (
                                <option key={club.id} value={club.id}>{club.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Image Upload Area */}
                    <div className="flex justify-center">
                        <div className="relative w-40 h-72 bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                            {previewUrl ? (
                                <>
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => { setFile(null); setPreviewUrl(null); }}
                                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                                    >
                                        <X size={14} />
                                    </button>
                                </>
                            ) : (
                                <label className="cursor-pointer flex flex-col items-center p-4 w-full h-full justify-center text-center">
                                    <ImageIcon size={32} className="text-gray-400 mb-2" />
                                    <span className="text-xs text-gray-500 font-medium">Upload Photo</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                    {/* Caption */}
                    <div>
                        <input
                            type="text"
                            placeholder="Add a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full border-none border-b border-gray-200 focus:ring-0 focus:border-indigo-500 px-0 py-2 text-sm"
                        />
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${!file || uploading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                            }`}
                    >
                        {uploading ? "Posting..." : "Share to Story"}
                    </button>
                </div>
            </div>
        </div>
    );
}
