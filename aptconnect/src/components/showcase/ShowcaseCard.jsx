import React from "react";
import { Heart, Eye, MessageCircle, Play, ArrowUpRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShowcaseCard = ({ item, type = "post" }) => {
  const navigate = useNavigate();

  // Data Normalization
  const title = item.title || item.caption || item.name || "Untitled";

  // Image Logic - Robust fallback
  let image = "https://via.placeholder.com/400x300?text=No+Image";
  if (type === "post") {
    image = item.imageURL || item.image || item.thumbnail || "https://via.placeholder.com/400x300?text=Post";
  } else if (type === "video") {
    image = item.thumbnailURL || item.thumbnail || "https://via.placeholder.com/400x300?text=Video";
  } else if (type === "club") {
    image = item.profileURL || item.image || "https://via.placeholder.com/400x300?text=Club";
  }

  // Author Logic
  const author = item.author || item.user || { displayName: "Anonymous" };
  const authorName = author.displayName || "Anonymous";
  const authorPhoto = author.photoURL;

  // Stats Logic
  // Handle both array length and count fields
  const likes = item.likesCount !== undefined ? item.likesCount : (item.likes?.length || 0);
  const views = item.views || 0;
  const comments = item.commentsCount !== undefined ? item.commentsCount : (item.comments?.length || 0);
  const members = item.membersCount !== undefined ? item.membersCount : (item.members?.length || 0);

  const handleClick = () => {
    if (type === "club") {
      navigate(`/club/${item.id}`);
    } else if (item.clubId) {
      navigate(`/club/${item.clubId}`);
    } else {
      navigate(`/post/${item.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative w-full h-full rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gray-100"
    >
      {/* Image Background - Full Card */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Error"; }}
      />

      {/* Gradient Overlay - Minimal, only at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />

      {/* Content Container */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">

        {/* Top Section: Type Badge & Action Icon */}
        <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10">
            {type}
          </span>
          <div className="bg-white text-black p-2 rounded-full shadow-lg">
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Bottom Section: Title & Stats */}
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-white font-bold text-xl leading-tight line-clamp-2 mb-3 drop-shadow-md">
            {title}
          </h3>

          {/* Minimal Stats Row */}
          <div className="flex items-center gap-4 text-white/80 text-xs font-medium">
            {type === "club" ? (
              <div className="flex items-center gap-1.5">
                <Users size={14} />
                <span>{members} members</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1.5">
                  <Heart size={14} className={likes > 0 ? "text-rose-400 fill-rose-400" : ""} />
                  <span>{likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye size={14} />
                  <span>{views}</span>
                </div>
              </>
            )}

            {/* Author Avatar (Small) */}
            <div className="ml-auto flex items-center gap-2">
              {authorPhoto ? (
                <img src={authorPhoto} alt={authorName} className="w-5 h-5 rounded-full border border-white/50 object-cover" />
              ) : null}
              <span className="truncate max-w-[80px]">{authorName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
