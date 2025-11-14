// components/ClubCreationModal.jsx

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Camera, Plus, X } from "lucide-react";

const ClubCreationModal = ({ isOpen, onClose }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [clubName, setClubName] = useState("");
  const [category, setCategory] = useState("");
  const [isOtherCategory, setIsOtherCategory] = useState(false); // Tracks visibility of custom category input
  const [bio, setBio] = useState("");
  const [requirements, setRequirements] = useState([""]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(URL.createObjectURL(file));
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
        setCategory(""); // Clear category state for custom input
    } else {
        setIsOtherCategory(false);
        setCategory(value);
    }
  };

  const handleCreate = () => {
    if (!isFormValid) return;
    // NOTE: This is where Firebase/API submission logic would go.
    alert(`✅ Club "${clubName}" creation initiated!`);
    onClose(); 
  };

  const isFormValid =
    clubName.trim() !== "" && category.trim() !== "" && bio.trim() !== "";

  return createPortal(
    // 1. BACKDROP: Full screen fixed overlay (70% opacity)
    <div 
    className="fixed inset-0 z-9999 bg-transparent transition-opacity backdrop-blur-sm" 
      onClick={onClose}
    >
      
      {/* 2. MODAL WRAPPER: Positioned near the top-right FAB */}
      <div className="absolute top-16 right-4 p-4"> 
          
          {/* 3. MODAL CONTAINER: The actual form box */}
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-sm max-h-[85vh] overflow-y-auto scrollbar-hide
                       transform transition-transform duration-300 scale-100"
            style={{ width: '380px' }} // Set fixed width for desktop consistency
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header (Title and Close Button) */}
            <div className="flex items-center justify-between mb-6 p-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Club creation</h2>
              <button 
                onClick={onClose} 
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition -mr-2"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Form content container */}
            <div className="p-4 pt-0"> 
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center mb-6">
                  <label htmlFor="profilePic" className="cursor-pointer relative group flex flex-col items-center">
                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt="Club Profile"
                        className="w-24 h-24 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300">
                        <Camera className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                    <input
                      id="profilePic"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <p className="text-sm text-gray-500 mt-2">Add profile pic</p>
                  </label>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    
                    {/* Club Name */}
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Club Name</label>
                      <input
                        type="text"
                        placeholder="Club Name"
                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 transition"
                        value={clubName}
                        onChange={(e) => setClubName(e.target.value)}
                      />
                    </div>

                    {/* Category (CONDITIONAL RENDERING) */}
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Category</label>
                      
                      {!isOtherCategory ? (
                          // Dropdown (Default)
                          <select
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 transition bg-white"
                            value={category}
                            onChange={(e) => handleCategoryChange(e.target.value)} // Use custom handler
                          >
                            <option value="" disabled>Select a Category</option>
                            <option value="sports">Sports</option>
                            <option value="technical">Technical</option>
                            <option value="arts">Arts</option>
                            <option value="cultural">Cultural</option>
                            <option value="other">Others...</option> {/* ADDED OPTION */}
                          </select>
                      ) : (
                          // Text Input (When "Others..." is selected)
                          <input
                            type="text"
                            placeholder="Enter custom category"
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 transition"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          />
                      )}
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Bio</label>
                      <textarea
                        placeholder="Write a short bio about the club..."
                        className="w-full border border-gray-300 rounded-md p-3 text-sm h-20 resize-none focus:ring-2 focus:ring-indigo-500 transition placeholder-gray-400"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Requirements (Optional) */}
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-gray-700 text-sm">
                          Requirements <span className="text-gray-400">(Optional)</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleAddRequirement}
                          className="p-1 rounded-md hover:bg-gray-100"
                          aria-label="Add new requirement field"
                        >
                          <Plus className="w-4 h-4 text-indigo-600" />
                        </button>
                      </div>
                      {requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={req}
                            placeholder="Add requirement"
                            onChange={(e) => handleRequirementChange(idx, e.target.value)}
                            className="w-full border border-gray-300 rounded-l-md p-2 text-sm focus:ring-2 focus:ring-indigo-500"
                          />
                          {requirements.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveRequirement(idx)}
                              className="bg-gray-100 p-2 rounded-r-md border border-gray-300 border-l-0 hover:bg-red-100 transition"
                              aria-label={`Remove requirement ${idx + 1}`}
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                </div>

                {/* Create Button */}
                <button
                  onClick={handleCreate}
                  disabled={!isFormValid}
                  className={`w-full mt-6 py-3 rounded-md text-base font-semibold transition ${
                    isFormValid
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Create Club
                </button>
            </div>
          </div>
      </div>
    </div>,
    document.body
  );
};

export default ClubCreationModal;