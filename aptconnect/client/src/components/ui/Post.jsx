import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Trash2, Loader2, Heart, MessageCircle, Eye, Send } from 'lucide-react';
import { deletePost } from '../../lib/postService';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, increment, collection, addDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

// Default Icons (Fallbacks)
import clubDp from "../../assets/images/club.png";
import postImg from "../../assets/images/profile.jpg";

const Post = ({ post, currentUser, isAdmin, onDelete }) => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Data State
  const [authorName, setAuthorName] = useState("Club Member");
  const [authorPhoto, setAuthorPhoto] = useState(clubDp);
  const [clubName, setClubName] = useState("");

  // Interaction State
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const {
    id = "",
    authorId = "",
    title = "",
    content = "",
    createdAt = null,
    imageURL = "",
    videoURL = "",
    likedBy = [],
    clubId = "",
  } = post || {};

  // Initialize state from props
  useEffect(() => {
    if (post) {
      setLikesCount(post.likesCount || 0);
      setCommentsCount(post.commentsCount || 0);
      setViewsCount(post.views || 0);
      setIsLiked(post.likedBy?.includes(currentUser?.uid));
    }
  }, [post, currentUser?.uid]);

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

  // Handle Likes
  const handleLike = async () => {
    if (!currentUser) return;

    const postRef = doc(db, "posts", id);
    const newIsLiked = !isLiked;

    // Optimistic update
    setIsLiked(newIsLiked);
    setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1);

    try {
      if (newIsLiked) {
        await updateDoc(postRef, {
          likesCount: increment(1),
          likedBy: arrayUnion(currentUser.uid)
        });
      } else {
        await updateDoc(postRef, {
          likesCount: increment(-1),
          likedBy: arrayRemove(currentUser.uid)
        });
      }
    } catch (error) {
      console.error("Error updating like:", error);
      // Revert on error
      setIsLiked(!newIsLiked);
      setLikesCount(prev => newIsLiked ? prev - 1 : prev + 1);
    }
  };

  // Handle Comments
  useEffect(() => {
    if (showComments && id) {
      const q = query(
        collection(db, "comments"),
        where("postId", "==", id)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const commentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Client-side sort
        commentsData.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
          return dateB - dateA; // Descending
        });
        setComments(commentsData);
      }, (error) => {
        console.error("Error fetching comments:", error);
      });

      return () => unsubscribe();
    }
  }, [showComments, id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    setCommentLoading(true);
    try {
      // Add comment to collection
      await addDoc(collection(db, "comments"), {
        postId: id,
        authorId: currentUser.uid,
        content: newComment.trim(),
        createdAt: new Date(),
        authorName: currentUser.displayName || currentUser.name || "User",
        authorPhoto: currentUser.photoURL || null
      });

      // Update post comments count
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        commentsCount: increment(1)
      });

      setCommentsCount(prev => prev + 1);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setCommentLoading(false);
    }
  };

  // Increment Views (Once per session/mount)
  useEffect(() => {
    if (!id || !currentUser) return;

    const storageKey = `viewedPosts_${currentUser.uid}`;
    const viewedPosts = sessionStorage.getItem(storageKey);
    const viewedPostsArray = viewedPosts ? JSON.parse(viewedPosts) : [];

    if (!viewedPostsArray.includes(id)) {
      const incrementView = async () => {
        try {
          console.log(`Incrementing view for post ${id} by user ${currentUser.uid}`);
          const postRef = doc(db, "posts", id);
          await updateDoc(postRef, {
            views: increment(1)
          });
          setViewsCount(prev => prev + 1);

          // Mark as viewed
          viewedPostsArray.push(id);
          sessionStorage.setItem(storageKey, JSON.stringify(viewedPostsArray));
        } catch (error) {
          console.error("Error incrementing view:", error);
        }
      };
      incrementView();
    } else {
      console.log(`Post ${id} already viewed by user ${currentUser.uid} in this session`);
    }
  }, [id, currentUser]);

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
          <img
            src={authorPhoto}
            alt="author"
            className="w-12 h-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition"
            onClick={() => navigate(`/profile/${authorId}`)}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="text-base font-semibold text-slate-900 cursor-pointer hover:underline"
                  onClick={() => navigate(`/profile/${authorId}`)}
                >
                  {authorName}
                </div>
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
          {/* Footer icons */}
          <div className="pt-2 pb-2 border-t border-gray-50 mt-2">
            <div className="flex items-center justify-between text-sm text-neutral-600 px-2">
              <div className="flex items-center gap-6">
                {/* Views */}
                <div className="flex items-center gap-2" title={`${viewsCount} views`}>
                  <Eye className="w-5 h-5 text-gray-400" />
                  <div className="text-xs font-medium">{viewsCount}</div>
                </div>

                {/* Likes */}
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition-colors ${isLiked ? 'text-rose-600' : 'hover:text-rose-600'}`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <div className="text-xs font-medium">{likesCount}</div>
                </button>

                {/* Comments */}
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <div className="text-xs font-medium">{commentsCount}</div>
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-4 animate-in slide-in-from-top-2 duration-200">
              {/* Comment Input */}
              <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
                <img
                  src={currentUser?.photoURL || "https://placehold.co/32x32?text=U"}
                  alt="Current user"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pr-10"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || commentLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 disabled:opacity-50 hover:text-indigo-700 p-1"
                  >
                    {commentLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {comments.length === 0 ? (
                  <p className="text-center text-gray-400 text-xs py-4">No comments yet. Be the first!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 items-start">
                      <img
                        src={comment.authorPhoto || "https://placehold.co/32x32?text=U"}
                        alt={comment.authorName}
                        className="w-8 h-8 rounded-full object-cover mt-1"
                      />
                      <div className="flex-1 bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-xs font-semibold text-gray-900">{comment.authorName}</span>
                          <span className="text-[10px] text-gray-400">
                            {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleDateString() : 'Just now'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default Post;