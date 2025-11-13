import React from "react";

/**
 * Minimal neutral card for a post or idea.
 * No heavy background, subtle border and spacing.
 */
const PostCard = ({ post }) => {
  const dateLabel = post?.createdAt?.toDate
    ? post.createdAt.toDate().toLocaleDateString()
    : "";

  return (
    <article className="group bg-white p-5 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
      <header className="flex items-start justify-between mb-3 gap-3">
        <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 flex-1">
          {post?.title || post?.content?.slice(0, 60) || "Untitled"}
        </h3>
        <time className="text-xs text-gray-400 font-medium whitespace-nowrap">{dateLabel}</time>
      </header>

      {post?.content && (
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{post.content}</p>
      )}

      {post?.imageURL && (
        <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-50">
          <img 
            src={post.imageURL} 
            alt="" 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
      )}

      <footer className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {post?.views ?? 0}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {post?.likesCount ?? (post?.likes?.length ?? 0)}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {post?.commentsCount ?? 0}
          </span>
        </div>
        {post?.clubId && (
          <div className="text-xs text-gray-400 font-medium truncate max-w-[100px]">
            {post.clubId}
          </div>
        )}
      </footer>
    </article>
  );
};

export default PostCard;
