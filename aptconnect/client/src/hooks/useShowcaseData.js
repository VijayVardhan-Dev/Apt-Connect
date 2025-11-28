// purpose: run multiple Firestore queries in parallel and return structured data
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getCountFromServer,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

/*
  Reasoning:
  - Use server-side ordering where possible for efficiency (views, likesCount, createdAt).
  - "Top of the month" uses createdAt >= startOfMonth.
  - Keep queries small (limits) to avoid large reads.
  - All queries run in parallel to minimize wall-clock time.
*/

const startOfMonthTimestamp = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return Timestamp.fromDate(start);
};

export const useShowcaseData = () => {
  const [topViewed, setTopViewed] = useState([]);
  const [topLiked, setTopLiked] = useState([]);
  const [topTrending, setTopTrending] = useState([]);
  const [topClubs, setTopClubs] = useState([]);
  const [topVideos, setTopVideos] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalClubs: 0, totalPosts: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const start = startOfMonthTimestamp();

    const fetchAll = async () => {
      setLoading(true);
      try {
        // top viewed this month
        const qTopViewed = query(
          collection(db, "posts"),
          where("createdAt", ">=", start),
          orderBy("views", "desc"),
          limit(6)
        );

        // top liked (relies on likesCount field—store counts server-side for performance)
        const qTopLiked = query(
          collection(db, "posts"),
          where("createdAt", ">=", start),
          orderBy("likesCount", "desc"),
          limit(6)
        );

        // trending: fallback — highest views + likes in last 2 weeks
        const twoWeeksAgo = Timestamp.fromDate(
          new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        );
        const qTrending = query(
          collection(db, "posts"),
          where("createdAt", ">=", twoWeeksAgo),
          orderBy("views", "desc"),
          limit(8)
        );

        // top clubs by members (simple)
        const qTopClubs = query(
          collection(db, "clubs"),
          orderBy("membersCount", "desc"), // membersCount should be maintained on club doc
          limit(8)
        );

        // top videos (posts with video flag)
        const qTopVideos = query(
          collection(db, "posts"),
          where("type", "==", "video"),
          where("createdAt", ">=", start),
          orderBy("views", "desc"),
          limit(6)
        );

        // Global Stats Queries
        const qTotalUsers = query(collection(db, "users"));
        const qTotalClubs = query(collection(db, "clubs"));
        const qTotalPosts = query(collection(db, "posts"));

        const [
          snapTopViewed,
          snapTopLiked,
          snapTrending,
          snapTopClubs,
          snapTopVideos,
          snapTotalUsers,
          snapTotalClubs,
          snapTotalPosts,
        ] = await Promise.all([
          getDocs(qTopViewed),
          getDocs(qTopLiked),
          getDocs(qTrending),
          getDocs(qTopClubs),
          getDocs(qTopVideos),
          getCountFromServer(qTotalUsers),
          getCountFromServer(qTotalClubs),
          getCountFromServer(qTotalPosts),
        ]);

        if (!mounted) return;
        setTopViewed(snapTopViewed.docs.map((d) => ({ id: d.id, ...d.data() })));
        setTopLiked(snapTopLiked.docs.map((d) => ({ id: d.id, ...d.data() })));
        setTopTrending(snapTrending.docs.map((d) => ({ id: d.id, ...d.data() })));
        setTopClubs(snapTopClubs.docs.map((d) => ({ id: d.id, ...d.data() })));
        setTopVideos(snapTopVideos.docs.map((d) => ({ id: d.id, ...d.data() })));
        setStats({
          totalUsers: snapTotalUsers.data().count,
          totalClubs: snapTotalClubs.data().count,
          totalPosts: snapTotalPosts.data().count,
        });
        setError(null);
      } catch (err) {
        console.error("Showcase load error:", err);
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    topViewed,
    topLiked,
    topTrending,
    topClubs,
    topVideos,
    stats,
    loading,
    error,
  };
};
