import React, { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase";
import useAuth from "../../hooks/useAuth";
import MembersModal from "../../components/club/MembersModal";
import { createGroupChat, getClubChats, deleteGroupChat } from "../../lib/chatService";
import { createPost, getClubPosts, deletePost } from "../../lib/postService";

// Components
import ClubHeader from "../../components/club/ClubHeader";
import ClubTabs from "../../components/club/ClubTabs";
import ClubEvents from "../../components/club/ClubEvents";
import ClubPosts from "../../components/club/ClubPosts";
import CreateEventModal from "../../components/club/CreateEventModal";
import CreatePostModal from "../../components/club/CreatePostModal";

const ClubPage = () => {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const location = useLocation();
  const { user } = useAuth();

  // --- 1. LOGIC & STATE ---
  const [club, setClub] = useState(location.state?.club || null);
  const [loading, setLoading] = useState(!location.state?.club);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("events");
  const [joining, setJoining] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  // Group Chat (Events) State
  const [clubChats, setClubChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState(null);

  // Posts State
  const [clubPosts, setClubPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);

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

  const isAdmin = useMemo(() => {
    if (!user || !club?.admins) return false;
    return club.admins.includes(user.uid);
  }, [user, club]);

  // Fetch Club Data
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

  // Fetch Club Chats (Events)
  useEffect(() => {
    if (activeTab === "events" && clubId) {
      const fetchChats = async () => {
        setLoadingChats(true);
        try {
          const chats = await getClubChats(clubId);
          setClubChats(chats);
        } catch (error) {
          console.error("Failed to fetch club chats", error);
        } finally {
          setLoadingChats(false);
        }
      };
      fetchChats();
    }
  }, [activeTab, clubId]);

  // Fetch Club Posts
  useEffect(() => {
    if (activeTab === "posts" && clubId) {
      const fetchPosts = async () => {
        setLoadingPosts(true);
        try {
          const posts = await getClubPosts(clubId);
          setClubPosts(posts);
        } catch (error) {
          console.error("Failed to fetch club posts", error);
        } finally {
          setLoadingPosts(false);
        }
      };
      fetchPosts();
    }
  }, [activeTab, clubId]);

  // Membership Logic
  const handleMembershipToggle = async () => {
    if (!user) {
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

  // Create Event (Group Chat) Logic
  const handleCreateEvent = async (name, desc) => {
    if (!club) return;

    setCreatingEvent(true);
    try {
      await createGroupChat(
        club.id,
        name,
        desc,
        user.uid,
        club.members || [], // Add all current members
        club.profileURL // Use club avatar as default group avatar
      );

      // Refresh list
      const chats = await getClubChats(club.id);
      setClubChats(chats);

      setShowCreateEvent(false);
    } catch (error) {
      console.error("Failed to create event", error);
      alert("Failed to create event");
    } finally {
      setCreatingEvent(false);
    }
  };

  const handleDeleteEvent = async (e, chatId) => {
    e.stopPropagation(); // Prevent opening chat
    if (!window.confirm("Are you sure you want to delete this event? This cannot be undone.")) return;

    setDeletingEvent(chatId);
    try {
      await deleteGroupChat(chatId);
      // Refresh list
      const chats = await getClubChats(club.id);
      setClubChats(chats);
    } catch (error) {
      console.error("Failed to delete event", error);
      alert("Failed to delete event");
    } finally {
      setDeletingEvent(null);
    }
  };

  const handleJoinChat = (chatId) => {
    navigate("/chat", { state: { selectedChatId: chatId } });
  };

  // Delete Post Logic
  const handleDeletePost = async (postId) => {
    // Optimistic update
    setClubPosts(prev => prev.filter(p => p.id !== postId));
    // Actual delete is handled inside Post component or we can do it here if we want to be strict
    // But Post component calls deletePost service. 
    // Wait, Post component calls deletePost service AND calls onDelete prop.
    // So we just need to update local state here.
  };

  // Create Post Logic
  const handleCreatePost = async ({ title, content, imageURL, videoURL, imageFile, videoFile }) => {
    if (!club || !user) return;

    setCreatingPost(true);
    try {
      let finalImageURL = imageURL;
      let finalVideoURL = videoURL;

      // Upload Image if selected
      if (imageFile) {
        const imageRef = ref(storage, `posts/images/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        finalImageURL = await getDownloadURL(imageRef);
      }

      // Upload Video if selected
      if (videoFile) {
        const videoRef = ref(storage, `posts/videos/${Date.now()}_${videoFile.name}`);
        await uploadBytes(videoRef, videoFile);
        finalVideoURL = await getDownloadURL(videoRef);
      }

      const postData = {
        title,
        content,
        imageURL: finalImageURL,
        videoURL: finalVideoURL,
        clubId: club.id,
        authorId: user.uid,
      };

      await createPost(postData);

      // Refresh list
      const posts = await getClubPosts(club.id);
      setClubPosts(posts);

      setShowCreatePost(false);
    } catch (error) {
      console.error("Failed to create post", error);
      alert("Failed to create post");
    } finally {
      setCreatingPost(false);
    }
  };

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

  // --- 3. UI ---
  return (
    <div className="flex bg-white min-h-screen w-full relative">
      <div className="flex-1 px-12 py-6">

        <ClubHeader
          club={club}
          isMember={isMember}
          joining={joining}
          membersCount={membersCount}
          onJoin={handleMembershipToggle}
          onShowMembers={() => setShowMembers(true)}
        />

        <ClubTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {activeTab === "events" && (
          <ClubEvents
            chats={clubChats}
            loading={loadingChats}
            isAdmin={isAdmin}
            onJoinChat={handleJoinChat}
            onDeleteEvent={handleDeleteEvent}
            deletingEvent={deletingEvent}
            onCreateClick={() => setShowCreateEvent(true)}
          />
        )}

        {activeTab === "posts" && (
          <ClubPosts
            posts={clubPosts}
            loading={loadingPosts}
            isMember={isMember}
            currentUser={user}
            isAdmin={isAdmin}
            onDeletePost={handleDeletePost}
            onCreateClick={() => setShowCreatePost(true)}
          />
        )}

        {activeTab === "projects" && (
          <div className="text-gray-500 text-sm text-center mt-10">
            Projects will be displayed here soon.
          </div>
        )}
      </div>

      {/* Members Modal */}
      {showMembers && (
        <MembersModal
          memberIds={club.members}
          onClose={() => setShowMembers(false)}
        />
      )}

      {/* Create Event Modal */}
      {showCreateEvent && (
        <CreateEventModal
          onClose={() => setShowCreateEvent(false)}
          onSubmit={handleCreateEvent}
          loading={creatingEvent}
        />
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
          loading={creatingPost}
        />
      )}
    </div>
  );
};

export default ClubPage;
