import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
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
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <SectionHeader
          title="Showcase Wall"
          subtitle="Top achievements and trending ideas this month"
          action={null}
        />

        <TopStats stats={stats} />

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading showcase...</div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">Failed to load showcase data.</div>
        ) : (
          <>
            {/* Top Viewed + Top Liked */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section>
                <SectionHeader title="Top Viewed" subtitle="Most viewed posts this month" />
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topViewed.length === 0 ? (
                    <div className="text-sm text-gray-500">No posts yet.</div>
                  ) : (
                    topViewed.map((p) => <PostCard key={p.id} post={p} />)
                  )}
                </div>
              </section>

              <section>
                <SectionHeader title="Top Liked" subtitle="Most liked posts this month" />
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topLiked.length === 0 ? (
                    <div className="text-sm text-gray-500">No liked posts yet.</div>
                  ) : (
                    topLiked.map((p) => <PostCard key={p.id} post={p} />)
                  )}
                </div>
              </section>
            </div>

            {/* Trending */}
            <section>
              <SectionHeader title="Trending Ideas" subtitle="Recent posts gaining traction" />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topTrending.length === 0 ? (
                  <div className="text-sm text-gray-500">No trending ideas right now.</div>
                ) : (
                  topTrending.map((p) => <PostCard key={p.id} post={p} />)
                )}
              </div>
            </section>

            {/* Bottom row: top videos + top clubs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <SectionHeader title="Top Videos" subtitle="Most viewed videos this month" />
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topVideos.length === 0 ? (
                    <div className="text-sm text-gray-500">No videos yet.</div>
                  ) : (
                    topVideos.map((v) => <VideoCard key={v.id} video={v} />)
                  )}
                </div>
              </div>

              <aside>
                <SectionHeader title="Top Clubs" subtitle="Most active clubs" />
                <div className="mt-4 space-y-3">
                  {topClubs.length === 0 ? (
                    <div className="text-sm text-gray-500">No clubs yet.</div>
                  ) : (
                    topClubs.map((c) => <ClubCard key={c.id} club={c} />)
                  )}
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Showcase;
