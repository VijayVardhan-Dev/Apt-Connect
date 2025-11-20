// src/pages/Explore/Explore.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import ClubCard from "../../components/ui/ClubCard";
import { Loader2 } from "lucide-react";

const categories = [
  "Dance",
  "Music",
  "Robotics",
  "Design",
  "Photography",
  "Sports",
  "Coding",
  "Drama",
  "Art",
  "Volunteer",
];

export default function Explore() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const q = query(collection(db, "clubs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const clubsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Map fields for ClubCard
            title: data.name,
            image: data.profileURL || "https://placehold.co/318x159",
            author: data.category || "General",
            category: data.category || "General",
            tagline: data.tagline || data.description || "No description available",
          };
        });
        setClubs(clubsData);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? club.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  const topThree = filteredClubs.slice(0, 3);
  const recommended = filteredClubs.slice(3);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* HEADER */}
      <header className="w-full h-16 flex justify-center items-center gap-6">
        <div className="flex items-center gap-3">
          <img
            src="src/assets/icons/arrow_icon.png"
            alt="Back"
            className="w-6 h-5 cursor-pointer hover:opacity-80 transition"
            onClick={() => navigate("/home")}
          />
          <h1 className="text-xl font-normal text-slate-800">Explore</h1>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <img
              src="src/assets/icons/search_icon.png"
              alt="Search Icon"
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-500"
            />
            <input
              type="search"
              placeholder="search clubs"
              className="w-full h-10 pl-10 pr-4 rounded-md bg-neutral-100 border border-stone-300 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-bordercolor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="w-8" />
      </header>

      {searchTerm ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-6">Search Results</h2>
          {filteredClubs.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredClubs.map((club) => (
                <ClubCard
                  key={club.id}
                  club={club}
                  onClick={() => navigate(`/club/${club.id}`, { state: { club } })}
                />
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center text-gray-500">
              <p>No clubs found matching "{searchTerm}".</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* CATEGORIES */}
          <div className="mt-6">
            <button 
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </button>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c === selectedCategory ? null : c)}
                  className={`py-1.5 px-3 border rounded-md text-xs transition hover:shadow-sm ${
                    selectedCategory === c
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-slate-300 text-slate-700 bg-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* TOP CLUBS */}
          {topThree.length > 0 && (
            <Section title="Top Clubs" linkText="View all">
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {topThree.map((club) => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    onClick={() => navigate(`/club/${club.id}`, { state: { club } })}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* RECOMMENDED */}
          {recommended.length > 0 && (
            <Section title="Recommended" linkText="View all" className="mt-12 mb-16">
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {recommended.map((club) => (
                  <ClubCard
                    key={club.id}
                    club={club}
                    onClick={() => navigate(`/club/${club.id}`, { state: { club } })}
                  />
                ))}
              </div>
            </Section>
          )}

          {filteredClubs.length === 0 && (
            <div className="mt-12 text-center text-gray-500">
              <p>No clubs found matching your criteria.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

/* Section Wrapper */
function Section({ title, children, linkText, onLinkClick, className = "" }) {
  return (
    <div className={`mt-8 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="bg-blue-600 rounded-md px-3 py-1.5">
          <span className="text-white text-xs font-medium">{title}</span>
        </div>

        {linkText && (
          <button
            onClick={onLinkClick}
            className="text-blue-600 text-xs hover:underline"
          >
            {linkText}
          </button>
        )}
      </div>

      {children}
    </div>
  );
}
