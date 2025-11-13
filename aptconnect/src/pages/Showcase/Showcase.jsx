import React from "react";
import SectionHeader from "../../components/layout/SectionHeader";
import TopStats from "../../components/layout/TopStats";
import PostCard from "../../components/layout/PostCard";
import VideoCard from "../../components/layout/VideoCard";
import ClubCard from "../../components/layout/ClubCard";
import { useShowcaseData } from "../../hooks/useShowcaseData";

/**
 * Showcase page – assembles sections and uses small components.
 * Thought process:
 * - Show a short KPI row at top
 * - Then 3 columns / stacked sections depending on screen size:
 *   - Top viewed (card grid)
 *   - Top liked (card grid)
 *   - Trending (smaller grid)
 * - Footer region with top clubs and top videos
 *
 * Keep everything accessible, minimal, and efficient.
 */

const Showcase = () => {
  const { topViewed, topLiked, topTrending, topClubs, topVideos, loading, error } =
    useShowcaseData();

  const stats = [
    { label: "Top views (month)", value: topViewed.length },
    { label: "Top likes (month)", value: topLiked.length },
    { label: "Trending (2w)", value: topTrending.length },
    { label: "Top clubs", value: topClubs.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <SectionHeader
          title="Showcase Wall"
          subtitle="Top achievements and trending ideas this month"
          action={null}
        />

        <TopStats stats={stats} />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-gray-500 font-medium">Loading showcase...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-red-100">
            <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-600 font-medium">Failed to load showcase data.</p>
          </div>
        ) : (
          <>
            {/* Top Viewed */}
            <section>
              <SectionHeader title="Top Viewed" subtitle="Most viewed posts this month" />
              {topViewed.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">No posts yet.</p>
                </div>
              ) : (
                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {topViewed.map((p) => (
                    <div key={p.id} className="flex-none w-80">
                      <PostCard post={p} />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Top Liked */}
            <section>
              <SectionHeader title="Top Liked" subtitle="Most liked posts this month" />
              {topLiked.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <p className="text-sm text-gray-500">No liked posts yet.</p>
                </div>
              ) : (
                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {topLiked.map((p) => (
                    <div key={p.id} className="flex-none w-80">
                      <PostCard post={p} />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Trending */}
            <section>
              <SectionHeader title="Trending Ideas" subtitle="Recent posts gaining traction" />
              {topTrending.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <p className="text-sm text-gray-500">No trending ideas right now.</p>
                </div>
              ) : (
                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {topTrending.map((p) => (
                    <div key={p.id} className="flex-none w-80">
                      <PostCard post={p} />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Top Videos */}
            <section>
              <SectionHeader title="Top Videos" subtitle="Most viewed videos this month" />
              {topVideos.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">No videos yet.</p>
                </div>
              ) : (
                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {topVideos.map((v) => (
                    <div key={v.id} className="flex-none w-72">
                      <VideoCard video={v} />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Top Clubs */}
            <section>
              <SectionHeader title="Top Clubs" subtitle="Most active clubs" />
              {topClubs.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-sm text-gray-500">No clubs yet.</p>
                </div>
              ) : (
                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {topClubs.map((c) => (
                    <div key={c.id} className="flex-none w-64">
                      <ClubCard club={c} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Showcase;
