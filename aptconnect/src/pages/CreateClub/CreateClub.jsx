import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Plus, X, Loader2, Image as ImageIcon } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { handleUpload } from "../../lib/upload";
import useAuth from "../../hooks/useAuth";

const CreateClub = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profilePic, setProfilePic] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  
  // New State for Banner & Tagline
  const [bannerPic, setBannerPic] = useState(null);
  const [bannerFileToUpload, setBannerFileToUpload] = useState(null);
  
  const [clubName, setClubName] = useState("");
  const [tagline, setTagline] = useState("");
  
  const [category, setCategory] = useState("");
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [bio, setBio] = useState("");
  const [requirements, setRequirements] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      setFileToUpload(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerPic(URL.createObjectURL(file));
      setBannerFileToUpload(file);
    }
  };

  const handleAddRequirement = () => {
    if (requirements[requirements.length - 1].trim() !== "") {
      setRequirements([...requirements, ""]);
    }
  };

  const handleRequirementChange = (idx, value) => {
    const newReqs = [...requirements];
    newReqs[idx] = value;
    setRequirements(newReqs);
  };
  
  const handleRemoveRequirement = (idx) => {
    setRequirements(requirements.filter((_, i) => i !== idx));
  };

  const handleCategoryChange = (value) => {
    if (value === "other") {
        setIsOtherCategory(true);
        setCategory("");
    } else {
        setIsOtherCategory(false);
        setCategory(value);
    }
  };

  const isFormValid =
    clubName.trim() !== "" && category.trim() !== "" && bio.trim() !== "";

  const handleCreate = async () => {
    if (!isFormValid || isSubmitting) return;
    
    if (!user) {
      alert("You must be logged in to create a club.");
      return;
    }

    setIsSubmitting(true);
    try {
      let profileURL = "";
      if (fileToUpload) {
        profileURL = await handleUpload(fileToUpload);
      }

      let bannerURL = "";
      if (bannerFileToUpload) {
        bannerURL = await handleUpload(bannerFileToUpload);
      }

      const clubData = {
        name: clubName,
        tagline: tagline,
        category: category,
        description: bio,
        requirements: requirements.filter(r => r.trim() !== ""),
        profileURL: profileURL,
        bannerURL: bannerURL,
        admins: [user.uid],
        members: [user.uid],
        membersCount: 1,
        stories: [],
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "clubs"), clubData);

      alert(`✅ Club "${clubName}" created successfully!`);
      navigate("/home");
    } catch (error) {
      console.error("Error creating club:", error);
      alert("Failed to create club. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
        {/* Header - Full Width */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Create a New Club</h2>
          <div className="flex items-center gap-4">
             <button 
                onClick={() => navigate(-1)} 
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!isFormValid || isSubmitting}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition flex items-center ${
                  isFormValid && !isSubmitting
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Club"
                )}
              </button>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto p-6 pb-20">
            {/* Banner Upload */}
            <div className="mb-8">
                <label className="block w-full aspect-[3/1] rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 hover:border-indigo-500 transition-colors cursor-pointer overflow-hidden relative group">
                    {bannerPic ? (
                        <img src={bannerPic} alt="Banner" className="w-full h-full object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <ImageIcon className="w-12 h-12 mb-2 group-hover:text-indigo-500 transition-colors" />
                            <span className="text-sm font-medium group-hover:text-indigo-500 transition-colors">Upload Banner Image</span>
                        </div>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
                </label>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column: Profile Pic */}
                <div className="flex-shrink-0">
                     <label htmlFor="profilePic" className="cursor-pointer relative group flex flex-col items-center">
                        {profilePic ? (
                          <img
                            src={profilePic}
                            alt="Club Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors">
                            <Camera className="w-10 h-10 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                          </div>
                        )}
                        <input
                          id="profilePic"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <p className="text-xs font-medium text-indigo-600 mt-2 hover:text-indigo-700">
                          {profilePic ? "Change Logo" : "Upload Logo"}
                        </p>
                      </label>
                </div>

                {/* Right Column: Form Fields */}
                <div className="flex-1 space-y-6">
                    {/* Club Name */}
                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">Club Name</label>
                      <input
                        type="text"
                        placeholder="e.g. AI Enthusiasts"
                        className="w-full border-b border-gray-200 focus:border-indigo-500 py-2 text-lg font-medium bg-transparent outline-none transition-colors placeholder-gray-300"
                        value={clubName}
                        onChange={(e) => setClubName(e.target.value)}
                      />
                    </div>

                    {/* Tagline */}
                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">Tagline</label>
                      <input
                        type="text"
                        placeholder="A short catchphrase for your club"
                        className="w-full border-b border-gray-200 focus:border-indigo-500 py-2 text-base bg-transparent outline-none transition-colors placeholder-gray-300"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">Category</label>
                      {!isOtherCategory ? (
                          <select
                            className="w-full border-b border-gray-200 focus:border-indigo-500 py-2 text-base bg-transparent outline-none transition-colors"
                            value={category}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                          >
                            <option value="" disabled>Select a Category</option>
                            <option value="sports">Sports</option>
                            <option value="technical">Technical</option>
                            <option value="arts">Arts</option>
                            <option value="cultural">Cultural</option>
                            <option value="other">Others...</option>
                          </select>
                      ) : (
                          <div className="flex gap-2 items-end">
                            <input
                              type="text"
                              placeholder="Enter custom category"
                              className="w-full border-b border-gray-200 focus:border-indigo-500 py-2 text-base bg-transparent outline-none transition-colors"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              autoFocus
                            />
                            <button 
                              onClick={() => setIsOtherCategory(false)}
                              className="text-xs text-gray-500 hover:text-gray-700 mb-2"
                            >
                              Cancel
                            </button>
                          </div>
                      )}
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">Description</label>
                      <textarea
                        placeholder="What is this club about?"
                        className="w-full border border-gray-200 rounded-lg p-4 text-sm h-40 resize-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition placeholder-gray-300 outline-none bg-gray-50"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Requirements */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-gray-700 font-medium text-sm">
                          Requirements <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleAddRequirement}
                          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" /> Add
                        </button>
                      </div>
                      <div className="space-y-3">
                        {requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center gap-2 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-focus-within:bg-indigo-500 transition-colors"></div>
                            <input
                              type="text"
                              value={req}
                              placeholder={`Requirement ${idx + 1}`}
                              onChange={(e) => handleRequirementChange(idx, e.target.value)}
                              className="w-full border-b border-gray-200 focus:border-indigo-500 py-2 text-sm bg-transparent outline-none transition-colors"
                            />
                            {requirements.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveRequirement(idx)}
                                className="p-2 text-gray-300 hover:text-red-500 transition"
                                aria-label="Remove requirement"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CreateClub;
