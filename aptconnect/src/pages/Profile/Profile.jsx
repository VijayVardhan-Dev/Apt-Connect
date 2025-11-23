import React, { useState, useEffect } from "react";
import {
  Edit,
  Mail,
  Phone,
  MapPin,
  Camera,
  X,
  Loader2,
  Save,
  GraduationCap,
  Calendar,
  Hash,
  Globe,
  Plus,
  Users
} from "lucide-react";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import useAuth from "../../hooks/useAuth";
import { handleUpload } from "../../lib/upload";
import { useNavigate } from "react-router-dom";

const clsx = (...classes) => classes.filter(Boolean).join(" ");

const TABS = ["Clubs", "About", "Skills"];

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Clubs");

  // User Clubs
  const [userClubs, setUserClubs] = useState([]);
  const [loadingClubs, setLoadingClubs] = useState(false);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Tag Inputs
  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setEditForm({
              ...data,
              skills: data.skills || [],
              interests: data.interests || []
            });
          } else {
            const initialData = {
              name: user.displayName || "User",
              email: user.email,
              photoURL: user.photoURL,
              title: "Member",
              location: "Not specified",
              bio: "",
              college: "",
              department: "",
              year: "",
              skills: [],
              interests: [],
              contact: {
                phone: "",
                website: "",
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

  // Fetch Clubs when "Clubs" tab is active
  useEffect(() => {
    if (activeTab === "Clubs" && user?.uid) {
      const fetchClubs = async () => {
        setLoadingClubs(true);
        try {
          const q = query(collection(db, "clubs"), where("members", "array-contains", user.uid));
          const snapshot = await getDocs(q);
          const clubs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUserClubs(clubs);
        } catch (error) {
          console.error("Failed to fetch user clubs", error);
        } finally {
          setLoadingClubs(false);
        }
      };
      fetchClubs();
    }
  }, [activeTab, user]);

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

  // Tag Management
  const addTag = (type, value) => {
    if (!value.trim()) return;
    const list = editForm[type] || [];
    if (!list.includes(value.trim())) {
      setEditForm(prev => ({ ...prev, [type]: [...list, value.trim()] }));
    }
    if (type === "skills") setSkillInput("");
    if (type === "interests") setInterestInput("");
  };

  const removeTag = (type, tagToRemove) => {
    setEditForm(prev => ({
      ...prev,
      [type]: (prev[type] || []).filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      let photoURL = userData.photoURL;

      if (newProfilePic) {
        photoURL = await handleUpload(newProfilePic);
      }

      // Capture pending tags that haven't been added yet
      const currentSkills = [...(editForm.skills || [])];
      if (skillInput.trim() && !currentSkills.includes(skillInput.trim())) {
        currentSkills.push(skillInput.trim());
      }

      const currentInterests = [...(editForm.interests || [])];
      if (interestInput.trim() && !currentInterests.includes(interestInput.trim())) {
        currentInterests.push(interestInput.trim());
      }

      const updatedData = {
        ...editForm,
        skills: currentSkills,
        interests: currentInterests,
        photoURL,
        updatedAt: new Date(),
      };

      await setDoc(doc(db, "users", user.uid), updatedData, { merge: true });
      setUserData(updatedData);

      // Clear inputs
      setSkillInput("");
      setInterestInput("");

      setIsEditing(false);
      setNewProfilePic(null);
      setPreviewPic(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- RENDERERS ---

  const renderClubs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Joined Clubs</h3>
        <span className="text-sm text-gray-500">{userClubs.length} Clubs</span>
      </div>

      {loadingClubs ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : userClubs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500">You haven't joined any clubs yet.</p>
          <button
            onClick={() => navigate("/explore")}
            className="mt-4 text-indigo-600 font-medium hover:underline"
          >
            Explore Clubs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userClubs.map(club => (
            <div
              key={club.id}
              onClick={() => navigate(`/club/${club.id}`, { state: { club } })}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                <img
                  src={club.profileURL || club.logo || "https://placehold.co/100x100"}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 truncate">{club.name}</h4>
                <p className="text-xs text-gray-500 truncate">{club.category || "Club"}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                  <Users size={12} />
                  <span>{club.members?.length || 0} Members</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAbout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        {/* Bio */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">About Me</h4>
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {userData?.bio || "No bio added yet."}
          </p>
        </div>

        {/* Education */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <GraduationCap size={16} /> Education
          </h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">{userData?.college || "College not set"}</p>
                <p className="text-sm text-gray-500">{userData?.department} • {userData?.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Phone size={16} /> Contact
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={18} className="text-gray-400" />
              <span>{userData?.email}</span>
            </div>
            {userData?.contact?.phone && (
              <div className="flex items-center gap-3 text-gray-700">
                <Phone size={18} className="text-gray-400" />
                <span>{userData?.contact?.phone}</span>
              </div>
            )}
            {userData?.contact?.website && (
              <div className="flex items-center gap-3 text-gray-700">
                <Globe size={18} className="text-gray-400" />
                <a href={userData.contact.website} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                  {userData.contact.website}
                </a>
              </div>
            )}
            {userData?.location && (
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin size={18} className="text-gray-400" />
                <span>{userData?.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-8">
      {/* Skills */}
      <div>
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Hash size={16} /> Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {userData?.skills?.length > 0 ? (
            userData.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No skills added.</p>
          )}
        </div>
      </div>

      {/* Interests */}
      <div>
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Calendar size={16} /> Interests
        </h4>
        <div className="flex flex-wrap gap-2">
          {userData?.interests?.length > 0 ? (
            userData.interests.map((interest, i) => (
              <span key={i} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium">
                {interest}
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No interests added.</p>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        {/* Header Section (Minimalist) */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          {/* Avatar (Large Rounded Square) */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden bg-gray-100 shrink-0 shadow-sm">
            <img
              src={userData?.photoURL || `https://placehold.co/200x200/e2e8f0/475569?text=${userData?.name?.charAt(0)}`}
              alt={userData?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{userData?.name}</h1>
                <p className="text-lg text-gray-500 font-medium">{userData?.title || "Member"}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 bg-gray-900 text-white rounded-full font-medium text-sm hover:bg-gray-800 transition shadow-lg shadow-gray-200"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
              {userData?.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {userData.location}
                </span>
              )}
              {userData?.college && (
                <span className="flex items-center gap-1">
                  <GraduationCap size={14} /> {userData.college}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 border-t border-gray-100 pt-6">
              <div className="text-center md:text-left">
                <span className="block text-xl font-bold text-gray-900">{userClubs.length}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Clubs</span>
              </div>
              <div className="text-center md:text-left">
                <span className="block text-xl font-bold text-gray-900">0</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Following</span>
              </div>
              <div className="text-center md:text-left">
                <span className="block text-xl font-bold text-gray-900">0</span>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "pb-4 text-sm font-medium transition-all relative",
                  activeTab === tab
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {activeTab === "Clubs" && renderClubs()}
          {activeTab === "About" && renderAbout()}
          {activeTab === "Skills" && renderSkills()}
        </div>

      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-8 flex-1 overflow-y-auto">
              {/* Identity Section (Icon & Name) */}
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Photo */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="w-24 h-24 rounded-[2rem] bg-gray-100 overflow-hidden relative group cursor-pointer border border-gray-200">
                    <img
                      src={previewPic || userData?.photoURL || "https://placehold.co/100x100"}
                      alt="Preview"
                      className="w-full h-full object-cover transition group-hover:opacity-75"
                    />
                    <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20 cursor-pointer">
                      <Camera className="text-white" size={24} />
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                  <span className="text-xs text-indigo-600 font-medium">Change Icon</span>
                </div>

                {/* Name & Basic Info */}
                <div className="flex-1 w-full space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Display Name</label>
                    <input
                      type="text"
                      value={editForm.name || ""}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Title / Role</label>
                      <input
                        type="text"
                        value={editForm.title || ""}
                        onChange={(e) => handleEditChange("title", e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                        placeholder="e.g. Member"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Location</label>
                      <input
                        type="text"
                        value={editForm.location || ""}
                        onChange={(e) => handleEditChange("location", e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                        placeholder="e.g. New York"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">About</h4>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Bio</label>
                <textarea
                  rows="4"
                  value={editForm.bio || ""}
                  onChange={(e) => handleEditChange("bio", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition resize-none"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              {/* Education Section */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Education</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">College Name</label>
                    <input
                      type="text"
                      value={editForm.college || ""}
                      onChange={(e) => handleEditChange("college", e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Department</label>
                    <input
                      type="text"
                      value={editForm.department || ""}
                      onChange={(e) => handleEditChange("department", e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Year</label>
                    <input
                      type="text"
                      value={editForm.year || ""}
                      onChange={(e) => handleEditChange("year", e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Skills & Interests Section */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Skills & Interests</h4>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Skills (Press Enter)</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(editForm.skills || []).map(skill => (
                      <span key={skill} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1">
                        {skill}
                        <X size={14} className="cursor-pointer hover:text-indigo-900" onClick={() => removeTag("skills", skill)} />
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag("skills", skillInput);
                        }
                      }}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="Add a skill..."
                    />
                    <button onClick={() => addTag("skills", skillInput)} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Interests (Press Enter)</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(editForm.interests || []).map(interest => (
                      <span key={interest} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm flex items-center gap-1">
                        {interest}
                        <X size={14} className="cursor-pointer hover:text-pink-900" onClick={() => removeTag("interests", interest)} />
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag("interests", interestInput);
                        }
                      }}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="Add an interest..."
                    />
                    <button onClick={() => addTag("interests", interestInput)} className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-3 sticky bottom-0">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="px-8 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-gray-200"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={20} />}
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
