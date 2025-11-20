import React, { useEffect, useMemo, useState } from "react";
import { 
  CalendarDays, 
  Layers, 
  PlusCircle, 
  ArrowLeft, 
  Loader2, 
  Users 
} from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import useAuth from "../../hooks/useAuth"; // <--- RESTORED EXACT IMPORT

const ClubPage = () => {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const location = useLocation();
  const { user } = useAuth();

  // --- 1. LOGIC & STATE (From your working code) ---
  const [club, setClub] = useState(location.state?.club || null);
  const [loading, setLoading] = useState(!location.state?.club);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("events"); // Default to events per UI
  const [joining, setJoining] = useState(false);

  // Derived State
  const membersCount = useMemo(() => {
    if (!club) return 0;
    if (typeof club.membersCount === "number") return club.membersCount;
    return club.members?.length || 0;
  }, [club]);

  const isMember = useMemo(() => {
    if (!user || !club?.members) return false;
    return club.members.includes(user.uid);
  }, [user, club]);

  // Fetch Data
  useEffect(() => {
    let active = true;
    const fetchClub = async () => {
      if (club) {
          setLoading(false);
          return;
      }

      setLoading(true);
      setError("");
      try {
        const ref = doc(db, "clubs", clubId);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          throw new Error("Club not found");
        }
        if (active) {
          setClub({ id: snap.id, ...snap.data() });
        }
      } catch (err) {
        console.error("Failed to load club", err);
        if (active) setError(err.message || "Unable to load club details");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchClub();
    return () => {
      active = false;
    };
  }, [clubId, club]);

  // Membership Logic
  const handleMembershipToggle = async () => {
    if (!user) {
      // Handle login redirect or alert
      alert("Please login to join");
      return;
    }
    if (!club) return;

    setJoining(true);
    const clubRef = doc(db, "clubs", club.id);
    const alreadyMember = isMember;

    try {
      await updateDoc(clubRef, {
        members: alreadyMember ? arrayRemove(user.uid) : arrayUnion(user.uid),
        membersCount: increment(alreadyMember ? -1 : 1),
      });

      setClub((prev) => {
        if (!prev) return prev;
        const nextMembers = alreadyMember
          ? (prev.members || []).filter((id) => id !== user.uid)
          : [...(prev.members || []), user.uid];
        
        const baseCount = typeof prev.membersCount === "number" 
            ? prev.membersCount 
            : prev.members?.length || 0;

        return {
          ...prev,
          members: nextMembers,
          membersCount: Math.max(0, baseCount + (alreadyMember ? -1 : 1)),
        };
      });
    } catch (err) {
      console.error("Failed to update membership", err);
      alert("Could not update membership");
    } finally {
      setJoining(false);
    }
  };

  // UI Static Data
  const events = [
    {
      id: 1,
      title: "classical",
      desc: "Traditional dam",
      date: "27-10-2025",
      time: "02:35",
      img: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?w=200",
    },
    {
      id: 2,
      title: "folk dance",
      desc: "Energetic rural style",
      date: "29-10-2025",
      time: "04:15",
      img: "https://images.unsplash.com/photo-1554384645-13eab165c24b?w=200",
    },
    {
      id: 3,
      title: "kathak",
      desc: "Elegant performance",
      date: "31-10-2025",
      time: "06:00",
      img: "https://images.unsplash.com/photo-1520975918318-3e49ae35554a?w=200",
    },
  ];

  // --- 2. RENDER HELPERS ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-white gap-4">
        <p className="text-gray-500">{error || "Club not found"}</p>
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  // --- 3. UI (Strictly from your second code block) ---
  return (
    <div className="flex bg-white min-h-screen w-full">
      <div className="flex-1 px-12 py-6">
        {/* Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition mb-4"
          title="Go back"
        >
          <ArrowLeft size={22} />
        </button>

        {/* Club header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-6">
            <img
              src={club.profileURL || "https://placehold.co/160x160/e2e8f0/334155?text=Club"}
              alt={club.name}
              className="w-24 h-24 rounded-full object-cover border border-gray-100"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {club.name}
              </h2>
              <p className="text-sm text-gray-500">
                {club.tagline || "No tagline available"}
              </p>
            </div>
          </div>

          {/* Member / Join Button Area */}
          <button 
            onClick={handleMembershipToggle}
            disabled={joining}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition cursor-pointer ${
                isMember 
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100" 
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
            title={isMember ? "Leave Club" : "Join Club"}
          >
            {joining ? (
               <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
               <Users className="w-5 h-5" />
            )}
            <span className="font-medium text-sm">{membersCount}</span>
            <span className="text-xs opacity-70 ml-1 hidden sm:inline">
                {isMember ? "Joined" : "Join"}
            </span>
          </button>
        </div>

        {/* About Section */}
        <div className="mb-10">
          <h3 className="text-gray-700 font-medium mb-2">About</h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
            {club.description || "No description provided yet."}
          </p>
        </div>

        {/* Tabs Section */}
        <div className="relative mb-8">
          <div className="flex items-center justify-between border-b pb-3">
            {/* Posts - Left */}
            <div
              className={`flex items-center gap-2 text-sm font-medium cursor-pointer pl-12 ${
                activeTab === "posts"
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              <PlusCircle size={16} /> posts
            </div>

            {/* Events - Center */}
            <div
              className={`flex items-center gap-2 text-sm font-medium cursor-pointer ${
                activeTab === "events"
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("events")}
            >
              <CalendarDays size={16} /> Events
            </div>

            {/* Projects - Right */}
            <div
              className={`flex items-center gap-2 text-sm font-medium cursor-pointer pr-12 ${
                activeTab === "projects"
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("projects")}
            >
              <Layers size={16} /> projects
            </div>
          </div>
        </div>

        {/* EVENTS SECTION */}
        {activeTab === "events" && (
          <div className="space-y-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-gray-800 font-medium">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-500">{event.desc}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {event.date} • {event.time}
                    </p>
                  </div>
                </div>

                <button className="bg-blue-600 text-white text-sm px-5 py-1.5 rounded-md hover:bg-blue-700 transition">
                  Join
                </button>
              </div>
            ))}
          </div>
        )}

        {/* POSTS Placeholder */}
        {activeTab === "posts" && (
          <div className="text-gray-500 text-sm text-center mt-10">
            Posts will appear here soon.
          </div>
        )}

        {/* PROJECTS Placeholder */}
        {activeTab === "projects" && (
          <div className="text-gray-500 text-sm text-center mt-10">
            Projects will be displayed here soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubPage;