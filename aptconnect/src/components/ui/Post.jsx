import React, { useState, useEffect } from 'react';
import { MoreVertical, Trash2, Loader2 } from 'lucide-react';
import { deletePost } from '../../lib/postService';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

// Default Icons (Fallbacks)
import clubDp from "../../assets/images/club_dp.png";
import postImg from "../../assets/images/post.png";
import viewsIcon from "../../assets/icons/views_icon.png";
import likeIcon from "../../assets/icons/like_icon.png";
import saveIcon from "../../assets/icons/save_icon.png";
import commentIcon from "../../assets/icons/comment_icon.png";

const Post = ({ post, onLike, onSave, onComment, currentUser, isAdmin, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Data State
  const [authorName, setAuthorName] = useState("Club Member");
  const [authorPhoto, setAuthorPhoto] = useState(clubDp);
  const [clubName, setClubName] = useState("");

  const {
    id = "",
    authorId = "",
    title = "",
    content = "",
    createdAt = null,
    imageURL = "",
    videoURL = "",
    likesCount = 0,
    commentsCount = 0,
    views = 0,
    clubId = "",
    // Fallbacks or passed props
    saveIcon: saveIconProp = saveIcon,
    likeIcon: likeIconProp = likeIcon,
    commentIcon: commentIconProp = commentIcon,
    viewsIcon: viewsIconProp = viewsIcon,
  } = post || {};

  // Fetch User and Club Details
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Author
      if (authorId) {
        try {
          const userSnap = await getDoc(doc(db, "users", authorId));
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setAuthorName(userData.name || userData.displayName || "Club Member");
            setAuthorPhoto(userData.photoURL || clubDp);
          }
        } catch (error) {
          console.error("Error fetching author", error);
        }
      }

      // Fetch Club
      if (clubId) {
        try {
          const clubSnap = await getDoc(doc(db, "clubs", clubId));
          if (clubSnap.exists()) {
            setClubName(clubSnap.data().name || "");
          }
        } catch (error) {
          console.error("Error fetching club", error);
        }
      }
    };

    fetchData();
  }, [authorId, clubId]);

  // Map dynamic data to UI expectations
  const text = content;
  const image = imageURL || postImg;

  // Format time
  const time = createdAt?.toDate
    ? createdAt.toDate().toLocaleDateString() + " " + createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "Just now";

  const hashtags = [];

  const isAuthor = currentUser?.uid === authorId;
  const canDelete = isAdmin || isAuthor;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setDeleting(true);
    try {
      await deletePost(id);
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error("Failed to delete post", error);
      alert("Failed to delete post");
    } finally {
      setDeleting(false);
      setShowOptions(false);
    }
  };

  return (
    <>
      <article
        aria-labelledby={`post-${id}-title`}
        className="overflow-hidden w-full max-w-[640px] mx-auto mb-6"
      >
        <header className="flex items-start gap-3 px-4 py-3">
          <img src={authorPhoto} alt="author" className="w-12 h-12 rounded-full object-cover" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-semibold  text-slate-900">{authorName}</div>
                {clubName && <div className="text-xs font-medium text-indigo-600">{clubName}</div>}
                <div className="text-xs text-slate-500">{time}</div>
              </div>

              {/* Options Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="text-zinc-400 hover:text-zinc-600 p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <MoreVertical size={20} />
                </button>

                {showOptions && canDelete && (
                  <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg border border-gray-100 py-1 z-10 w-32">
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 pb-4">
          <p className="text-slate-600 text-sm leading-6 pt-1 whitespace-pre-wrap">{text}</p>

          {hashtags.length > 0 && (
            <div className="pt-3 pb-2">
              <button className="text-sky-500 font-semibold text-sm">
                {hashtags.map((tag, index) => (
                  <span key={index} className="mr-2">
                    #{tag}
                  </span>
                ))}
              </button>
            </div>
          )}

          {/* Image aligned to left under text */}
          {imageURL && (
            <div className="pb-4 pt-3">
              <img
                src={image}
                alt="post-media"
                className="rounded-md w-full h-auto" // Removed object-cover and max-height to show full image
              />
            </div>
          )}

          {videoURL && (
            <div className="pb-4 pt-3">
              <video controls className="rounded-md w-full max-h-[500px]">
                <source src={videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Footer icons */}
          <div className="pt-2 pb-2 border-t border-gray-50 mt-2">
            <div className="flex items-center gap-6 text-sm text-neutral-600 px-2">
              <div className="flex items-center gap-2">
                <img src={viewsIconProp} alt="views" className="w-4 h-4 object-contain" />
                <div className="text-xs">{views}</div>
              </div>

              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                <img src={likeIconProp} onClick={onLike} alt="likes" className="w-4 h-4 object-contain" />
                <div className="text-xs text-rose-600">{likesCount}</div>
              </div>

              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                <img src={commentIconProp} onClick={onComment} alt="comments" className="w-4 h-4 object-contain" />
                <div className="text-xs">{commentsCount}</div>
              </div>

              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                <img src={saveIconProp} onClick={onSave} alt="save" className="w-4 h-4 object-contain" />
                <div className="text-xs">Save</div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Post;