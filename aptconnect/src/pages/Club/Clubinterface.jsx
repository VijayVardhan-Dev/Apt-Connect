import React, { useState } from "react";
import {
  ArrowLeft,
  Users,
  Zap,
  Calendar,
  Send,
  Heart,
  Eye,
  MessageSquare,
} from "lucide-react";

// --- Data Structure ---
const CLUB_DATA = {
  name: "AI CLUB",
  handle: "creativity meets innovation",
  avatarUrl: "https://placehold.co/100x100/3B82F6/ffffff?text=AI",
  about: "Anyone can express their thoughts freely.",
  ongoingEvents: [
    "Cultural festival - 11/04/2025",
    "Cultural festival - 11/04/2025",
    "Cultural festival - 11/04/2025",
  ],
};

const POSTS = [
  {
    id: 1,
    author: "AI club",
    time: "Posted 3min ago",
    text: "I’ve been struggling with severe headaches for years, but recently I’ve found some relief with thanks to Doc Nightingale AI.! 🎉🙌",
    hashtags: ["#goodbyeheadache", "#nightingalerocks"],
    image: "https://picsum.photos/600/400?random=1",
    views: "5,874",
    likes: "215",
    comments: "11",
  },
  {
    id: 2,
    author: "AI club",
    time: "Posted 1hr ago",
    text: "Exciting news! Our next seminar is on Generative AI deployment.",
    hashtags: ["#seminar", "#ai"],
    image: "https://picsum.photos/600/400?random=2",
    views: "1,200",
    likes: "50",
    comments: "5",
  },
];

export default function ClubHomePage() {
  const [isJoined, setIsJoined] = useState(false);

  const handleAction = (action) => {
    if (action === "join") {
      setIsJoined(true);
      console.log("Joined Club");
    } else if (action === "members") {
      console.log("Viewing members");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 text-gray-900">
      {/* Centered, max-width container for content (Adjusted for feed readability) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* ===== Club Header & Actions ===== */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {/* Top Row: Title and Actions */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                AI
              </div>
              <div>
                <h3 className="text-xl font-bold">{CLUB_DATA.name}</h3>
                <p className="text-sm text-gray-500">{CLUB_DATA.handle}</p>
              </div>
            </div>

            <div className="flex space-x-3 mt-1">
              <button
                onClick={() => handleAction("join")}
                className={`px-4 py-1 text-sm font-semibold rounded-lg transition ${
                  isJoined
                    ? "bg-green-500 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isJoined ? "Joined" : "Join"}
              </button>
              <button
                onClick={() => handleAction("members")}
                className="px-4 py-1 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition flex items-center"
              >
                <Users size={16} className="mr-1" /> Members
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-4 border-t border-gray-100 pt-4">
            <h4 className="text-sm font-semibold">About</h4>
            <p className="text-sm text-gray-600 mt-1">{CLUB_DATA.about}</p>
          </div>

          {/* Ongoing Events */}
          <div className="mt-4 border-t border-gray-100 pt-4">
            <h4 className="text-sm font-semibold flex items-center text-indigo-600">
              <Calendar size={16} className="mr-2" /> Ongoing Events
            </h4>
            <ul className="text-xs text-gray-700 mt-2 space-y-1">
              {CLUB_DATA.ongoingEvents.map((event, index) => (
                <li key={index}>— {event}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== Club Feed Posts ===== */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold">Recent Posts</h3>
          {POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                    AI
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-700">
                  <span className="text-xl leading-none">...</span>
                </button>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 mb-2">{post.text}</p>
              <p className="text-sm space-x-2 mb-3">
                {post.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-indigo-600 font-medium cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </p>

              {/* Post Image */}
              <div className="w-full h-auto overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt="Post visual"
                  className="w-full object-cover"
                />
              </div>

              {/* Post Footer Stats */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-3 border-t border-gray-100 pt-3">
                <span className="flex items-center">
                  <Eye size={16} className="mr-1" /> {post.views}
                </span>
                <span className="flex items-center">
                  <Heart size={16} className="mr-1" /> {post.likes}
                </span>
                <span className="flex items-center">
                  <MessageSquare size={16} className="mr-1" /> {post.comments}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
