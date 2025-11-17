import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const ShowcaseContext = createContext(null);

const startOfMonthTimestamp = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return Timestamp.fromDate(start);
};

export const ShowcaseProvider = ({ children }) => {
  const [topViewed, setTopViewed] = useState([]);
  const [topLiked, setTopLiked] = useState([]);
  const [topTrending, setTopTrending] = useState([]);
  const [topClubs, setTopClubs] = useState([]);
  const [topVideos, setTopVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setLoading(true);
      try {
        const start = startOfMonthTimestamp();

        const qTopViewed = query(
          collection(db, "posts"),
          where("createdAt", ">=", start),
          orderBy("views", "desc"),
          limit(6)
        );

        const qTopLiked = query(
          collection(db, "posts"),
          where("createdAt", ">=", start),
          orderBy("likesCount", "desc"),
          limit(6)
        );

        const twoWeeksAgo = Timestamp.fromDate(
          new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        );
        const qTrending = query(
          collection(db, "posts"),
          where("createdAt", ">=", twoWeeksAgo),
          orderBy("views", "desc"),
          limit(8)
        );

        const qTopClubs = query(
          collection(db, "clubs"),
          orderBy("membersCount", "desc"),
          limit(8)
        );

        const qTopVideos = query(
          collection(db, "posts"),
          where("type", "==", "video"),
          where("createdAt", ">=", start),
          orderBy("views", "desc"),
          limit(6)
        );

        const [
          snapTopViewed,
          snapTopLiked,
          snapTrending,
          snapTopClubs,
          snapTopVideos,
        ] = await Promise.all([
          getDocs(qTopViewed),
          getDocs(qTopLiked),
          getDocs(qTrending),
          getDocs(qTopClubs),
          getDocs(qTopVideos),
        ]);

        if (!mounted) return;

        setTopViewed(snapTopViewed.docs.map((d) => ({ id: d.id, ...d.data() })));
        setTopLiked(snapTopLiked.docs.map((d) => ({ id: d.id, ...d.data() })));
        setTopTrending(snapTrending.docs.map((d) => ({ id: d.id, ...d.data() })));
        setTopClubs(snapTopClubs.docs.map((d) => ({ id: d.id, ...d.data() })));
        setTopVideos(snapTopVideos.docs.map((d) => ({ id: d.id, ...d.data() })));
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

  const value = useMemo(
    () => ({
      topViewed,
      topLiked,
      topTrending,
      topClubs,
      topVideos,
      loading,
      error,
    }),
    [topViewed, topLiked, topTrending, topClubs, topVideos, loading, error]
  );

  return <ShowcaseContext.Provider value={value}>{children}</ShowcaseContext.Provider>;
};

export const useShowcaseContext = () => {
  const context = useContext(ShowcaseContext);
  if (!context) {
    throw new Error("useShowcaseContext must be used within a ShowcaseProvider");
  }
  return context;
};
