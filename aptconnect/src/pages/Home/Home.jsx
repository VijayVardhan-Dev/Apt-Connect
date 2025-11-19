import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react"; 
import ClubCreationModal from "/src/components/ui/ClubCreationModal"; 
import Post from "../../components/ui/Post.jsx"; 
import clubDp from "../../assets/images/club_dp.png";
import postImg from "../../assets/images/post.png";
import viewsIcon from "../../assets/icons/views_icon.png";
import likeIcon from "../../assets/icons/like_icon.png";
import saveIcon from "../../assets/icons/save_icon.png";
import commentIcon from "../../assets/icons/comment_icon.png";

// Helper for conditional class names
const clsx = (...classes) => classes.filter(Boolean).join(' ');

// ... posts array (unchanged) ...
const posts = [
  {
    id: 1,
    author: "Ai club",
    time: "Posted 3min ago",
    avatar: clubDp,
    text:
      "I’ve been struggling with severe headaches for years, but recently I’ve found some relief with thanks to Doc Nightingale AI.! 🎉🙌",
    hashtags: ["#goodbyeheadache","#nightingalerocks"],
    image: postImg,
    saveIcon: saveIcon,
    likeIcon: likeIcon,
    commentIcon: commentIcon,
    viewsIcon: viewsIcon,
    views: "5,874",
    likes: "215",
    comments: "11",
  },
  {
    id: 2,
    author: "Ai club",
    time: "Posted 3min ago",
    avatar: clubDp,
    text:
      "I’ve been struggling with severe headaches for years, but recently I’ve found some relief with thanks to Doc Nightingale AI.! 🎉🙌",
    hashtags: ["#goodbyeheadache","#nightingalerocks"],
    image: postImg,
    saveIcon: saveIcon,
    likeIcon: likeIcon,
    commentIcon: commentIcon,
    viewsIcon: viewsIcon,
    views: "5,874",
    likes: "215",
    comments: "11",
  },
  {
    id: 3,
    author: "Ai club",
    time: "Posted 3min ago",
    avatar: clubDp,
    text:
      "I’ve been struggling with severe headaches for years, but recently I’ve found some relief with thanks to Doc Nightingale AI.! 🎉🙌",
    hashtags: ["#goodbyeheadache","#nightingalerocks"],
    image: postImg,
    saveIcon: saveIcon,
    likeIcon: likeIcon,
    commentIcon: commentIcon,
    viewsIcon: viewsIcon,
    views: "5,874",
    likes: "215",
    comments: "11",
  },
];

export default function Home() {
  const avatars = [postImg,postImg,postImg,postImg,postImg,postImg,postImg,postImg];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 850 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 850);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCreateClick = () => {
      setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 relative">
      
      {/* ===== Club Creation Modal ===== */}
      <ClubCreationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
      />

      {/* ===== Centered content column (Feed) ===== */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        
        {/* 💡 CORE FIX: BUTTON PLACED IN NORMAL FLOW (SCROLLS AWAY) */}
        <div className="w-full flex justify-end -mt-2"> 
            <button
                onClick={handleCreateClick} 
                // Removed conditional title rendering
                className={clsx(
                    "flex items-center shadow-md hover:bg-gray-50 transition duration-150",
                    "bg-white text-gray-900 border border-slate-200 rounded-full", 
                    
                    // 💡 MODIFIED: Force button to stay wide with fixed padding/spacing
                    "px-4 py-2 space-x-2" 
                )}
                aria-label="Create new post or club"
            >
                {/* Icon size fixed/non-responsive */}
                <Plus 
                    className="w-5 h-5 stroke-2" 
                />
                {/* 💡 MODIFIED: Span is always rendered, no conditional checks */}
                <span className="text-base font-semibold">
                    Create
                </span>
            </button>
        </div>
        
        {/* stories */}
        <section className="flex justify-start py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 items-center">
            {avatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`avatar-${i}`}
                className="rounded-full object-cover border p-1"
                style={{ width: 82, height: 82 }}
              />
            ))}
          </div>
        </section>

        {/* Posts (centered column) */}
        <section className="space-y-10">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={() => console.log('like')}
              onSave={() => console.log('save')}
              onComment={() => console.log('comment')}
            />
          ))}
        </section>
      </main>
    </div>
  );
}