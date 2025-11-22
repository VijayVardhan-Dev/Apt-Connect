import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  User,
  Briefcase,
  Camera,
  X,
  Loader2,
  Save
} from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import useAuth from "../../hooks/useAuth";
import { handleUpload } from "../../lib/upload";

const clsx = (...classes) => classes.filter(Boolean).join(" ");

const TABS = ["Personal", "Contact", "Education", "Skills", "Work"];

const ProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Personal");

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            setEditForm(docSnap.data());
          } else {
            // Fallback if user doc doesn't exist (shouldn't happen usually)
            const initialData = {
              name: user.displayName || "User",
              email: user.email,
              photoURL: user.photoURL,
              title: "Member",
              location: "Not specified",
              bio: "No bio yet.",
              personal: {
                dob: "",
                age: "",
                bloodGroup: "",
                gender: "",
                languages: "",
              },
              contact: {
                phone: "",
                address: "",
              }
            };
            setUserData(initialData);
            setEditForm(initialData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditChange = (field, value, section = null) => {
    if (section) {
      setEditForm(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setEditForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      let photoURL = userData.photoURL;

      if (newProfilePic) {
        photoURL = await handleUpload(newProfilePic);
      }

      const updatedData = {
        ...editForm,
        photoURL,
      };

      // Use setDoc with merge: true to create the document if it doesn't exist
      await setDoc(doc(db, "users", user.uid), updatedData, { merge: true });
      setUserData(updatedData);
      setIsEditing(false);
      setNewProfilePic(null);
      setPreviewPic(null);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- Content Render Helpers ---

  const renderPersonalInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <div className="space-y-4">
        <h4 className="text-base font-semibold text-gray-700 border-b pb-2 mb-2">
          Personal Information
        </h4>
        <p className="text-sm">
          Date of Birth: <span className="font-medium">{userData?.personal?.dob || "-"}</span>
        </p>
        <p className="text-sm">
          Age: <span className="font-medium">{userData?.personal?.age || "-"}</span>
        </p>
        <p className="text-sm">
          Blood Group: <span className="font-medium">{userData?.personal?.bloodGroup || "-"}</span>
        </p>
        <p className="text-sm">
          Gender: <span className="font-medium">{userData?.personal?.gender || "-"}</span>
        </p>
        <p className="text-sm">
          Languages Known: <span className="font-medium">{userData?.personal?.languages || "-"}</span>
        </p>
      </div>

      <div className="space-y-6 md:pt-0 pt-6">
        <div className="space-y-4 p-4 rounded-lg bg-gray-100 shadow-sm">
          <h4 className="text-base font-semibold text-gray-700 border-b pb-2 mb-2">
            Bio/Expertise
          </h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {userData?.bio || "No bio added."}
          </p>
        </div>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <h4 className="text-base font-semibold text-gray-700 border-b pb-2">
        Contact Details
      </h4>
      <p className="flex items-center text-sm">
        <Mail size={16} className="mr-3 text-indigo-500" /> Email:{" "}
        <span className="ml-2 font-medium">{userData?.email}</span>
      </p>
      <p className="flex items-center text-sm">
        <Phone size={16} className="mr-3 text-indigo-500" /> Phone:{" "}
        <span className="ml-2 font-medium">{userData?.contact?.phone || "-"}</span>
      </p>
      <p className="flex items-center text-sm">
        <MapPin size={16} className="mr-3 text-indigo-500" /> Address:{" "}
        <span className="ml-2 font-medium">{userData?.contact?.address || "-"}</span>
      </p>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal": return renderPersonalInfo();
      case "Contact": return renderContactInfo();
      default: return <div className="p-4 text-gray-500">Section coming soon...</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold ml-2">My Profile</h2>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden relative mt-16">
          {/* No Banner - Just a colored top bar or spacing */}
          <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

          <div className="relative p-6 pt-0 flex flex-col md:flex-row md:items-end">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-gray-200 absolute -top-14 left-6 shadow-md">
              <img
                src={userData?.photoURL || `https://placehold.co/100x100/A0A0A0/FFFFFF?text=${userData?.name?.charAt(0) || "U"}`}
                alt={userData?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Title */}
            <div className="mt-16 md:mt-4 md:ml-36 mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {userData?.name}
              </h3>
              <p className="text-sm text-gray-600">{userData?.title || "Member"}</p>
              <p className="text-xs text-indigo-600 mt-1">
                {userData?.location || "Location not set"}
              </p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="md:ml-auto mt-4 md:mt-0 flex items-center px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 text-indigo-600 hover:bg-indigo-50 transition"
            >
              <Edit size={16} className="mr-2" /> Edit Profile
            </button>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-100 mt-6 pt-2 pb-2 overflow-x-auto whitespace-nowrap">
            <div className="flex px-6 space-x-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "py-3 text-sm font-semibold transition-colors border-b-2",
                    activeTab === tab
                      ? "text-indigo-600 border-indigo-600"
                      : "text-gray-500 border-transparent hover:border-gray-300",
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile Pic Upload */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200 relative">
                  <img
                    src={previewPic || userData?.photoURL || "https://placehold.co/100x100"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <label className="cursor-pointer bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-100 transition flex items-center gap-2">
                    <Camera size={18} />
                    Change Photo
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Recommended: Square JPG, PNG</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name || ""}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title / Role</label>
                  <input
                    type="text"
                    value={editForm.title || ""}
                    onChange={(e) => handleEditChange("title", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editForm.location || ""}
                    onChange={(e) => handleEditChange("location", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={editForm.contact?.phone || ""}
                    onChange={(e) => handleEditChange("phone", e.target.value, "contact")}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  rows="4"
                  value={editForm.bio || ""}
                  onChange={(e) => handleEditChange("bio", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                ></textarea>
              </div>

              {/* Personal Details Section */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-4">Personal Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="text"
                      placeholder="DD-MMM-YYYY"
                      value={editForm.personal?.dob || ""}
                      onChange={(e) => handleEditChange("dob", e.target.value, "personal")}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={editForm.personal?.gender || ""}
                      onChange={(e) => handleEditChange("gender", e.target.value, "personal")}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                    <input
                      type="text"
                      value={editForm.personal?.languages || ""}
                      onChange={(e) => handleEditChange("languages", e.target.value, "personal")}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={editForm.contact?.address || ""}
                      onChange={(e) => handleEditChange("address", e.target.value, "contact")}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
