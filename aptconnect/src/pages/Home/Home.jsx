import React from "react";
import Post from "../../components/shared/post.jsx";
import clubDp from "../../assets/images/club_dp.png";
import postImg from "../../assets/images/post.png";
import viewsIcon from "../../assets/icons/views_icon.png";
import likeIcon from "../../assets/icons/like_icon.png";
import saveIcon from "../../assets/icons/save_icon.png";
import commentIcon from "../../assets/icons/comment_icon.png";
import searchIcon from "../../assets/icons/search_icon.png";
import profileIcon from "../../assets/icons/profile_icon.png";

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
  const avatars = [clubDp, clubDp, clubDp, clubDp, clubDp, clubDp, clubDp, clubDp, clubDp];

  return (
    <div className="min-h-screen  bg-white text-slate-900">
      {/* ===== Header: centered search, profile on right ===== */}
      <header className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 relative">
          {/* Centered search */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <img
                src={searchIcon}
                alt="search icon"
                className="absolute left-3 top-2.5 w-4 h-4 opacity-40"
              />
              <input
                type="search"
                placeholder="search clubs"
                className="w-full h-10 pl-10 pr-3 rounded-md bg-[#f7f7f7] border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none"
                aria-label="search clubs"
              />
            </div>
          </div>

          {/* Profile icon on the right */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
            <img
              src={profileIcon}
              alt="profile"
              className="w-6 h-6 object-contain cursor-pointer"
            />
          </div>
        </div>
      </header>

      {/* ===== Centered content column ===== */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      
        {/* stories */}

        <section className="flex justify-start py-4 overflow-y-auto scrollbar-hide  overflow-scroll">
          <div className="flex gap-6 items-center ">
            {avatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`avatar-${i}`}
                className="w-20 h-20 rounded-full object-cover shadow-sm"
                style={{ width: 72, height: 72 }}
              />
            ))}
          </div>
        </section>

        {/* Posts (centered column) */}
        <section className="space-y-10">
          {posts.map((post) => (
          <Post
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
