import React from "react";
import Post from "../../components/shared/Post.jsx";
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
  const avatars = [postImg,postImg,postImg,postImg,postImg,postImg,postImg,postImg];

  return (
    <div className="min-h-screen  bg-white text-slate-900">
      {/* ===== Header: centered search, profile on right ===== */}
     
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
                className="w-25 h-25 rounded-full object-cover border-3 border-bordercolor p-1"
                style={{ width: 82, height: 82 }}
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
