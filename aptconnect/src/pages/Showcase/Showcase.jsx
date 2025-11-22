import React from "react";
import { useShowcaseData } from "../../hooks/useShowcaseData";
import ShowcaseHero from "../../components/showcase/ShowcaseHero";
import ShowcaseCard from "../../components/showcase/ShowcaseCard";
import ShowcaseStats from "../../components/showcase/ShowcaseStats";
import { Loader2, Sparkles, TrendingUp, Video, Users } from "lucide-react";

const Showcase = () => {
  const { topViewed, topLiked, topTrending, topClubs, topVideos, stats, loading, error } =
    useShowcaseData();

  // Combine data for Hero Slideshow (e.g. top trending + top liked)
  const heroItems = [...topTrending.slice(0, 3), ...topLiked.slice(0, 2)];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-medium">
        Failed to load showcase data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-16">

        {/* 1. Hero Section */}
        <section>
          <ShowcaseHero items={heroItems} />
          <ShowcaseStats stats={stats} />
        </section>

        {/* 2. Trending Section - Grid Layout */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
              <p className="text-gray-500">What everyone is talking about</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topTrending.slice(0, 6).map((item) => (
              <div key={item.id} className="h-[420px]">
                <ShowcaseCard item={item} type="post" />
              </div>
            ))}
          </div>
        </section>

        {/* 3. Top Liked - Horizontal Scroll for variety, but with new cards */}
        <section className="bg-white -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Community Favorites</h2>
                <p className="text-gray-500">Most loved posts this month</p>
              </div>
            </div>

            <div className="flex overflow-x-auto gap-8 pb-8 -mx-4 px-4 scrollbar-hide snap-x">
              {topLiked.map((item) => (
                <div key={item.id} className="flex-none w-[350px] h-[450px] snap-center">
                  <ShowcaseCard item={item} type="post" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Active Clubs - Grid Layout */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Active Clubs</h2>
              <p className="text-gray-500">Join the conversation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topClubs.slice(0, 3).map((item) => (
              <div key={item.id} className="h-[420px]">
                <ShowcaseCard item={item} type="club" />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Showcase;

