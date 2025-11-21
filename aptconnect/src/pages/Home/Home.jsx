import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Loader2 } from "lucide-react";

// Components
import Post from "../../components/ui/Post";
import StoryRail from "../../components/home/StoryRail";

// Service
import { getAllPosts } from "../../lib/postService";
import useAuth from "../../hooks/useAuth";

// Helper for conditional class names
const clsx = (...classes) => classes.filter(Boolean).join(' ');

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreateClick = () => {
    navigate("/create-club");
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 relative">

      {/* ===== Centered content column (Feed) ===== */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">

        {/* Create Button */}
        <div className="w-full flex justify-end -mt-2">
          <button
            onClick={handleCreateClick}
            className={clsx(
              "flex items-center shadow-md hover:bg-gray-50 transition duration-150",
              "bg-white text-gray-900 border border-slate-200 rounded-full",
              "px-4 py-2 space-x-2"
            )}
            aria-label="Create new post or club"
          >
            <Plus className="w-5 h-5 stroke-2" />
            <span className="text-base font-semibold">Create</span>
          </button>
        </div>

        {/* Stories Section */}
        <StoryRail />

        {/* Posts Feed */}
        <section className="space-y-10">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No posts yet. Join a club and start posting!
            </div>
          ) : (
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                currentUser={user}
                onDelete={handleDeletePost}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}