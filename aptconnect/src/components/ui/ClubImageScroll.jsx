import React from "react";

// 1. The Infinite Scroll Component
const ClubImageScroll = () => {
  // Placeholder images (Club/Party/Nightlife theme)
  // You can replace these URLs with your local assets
  const images = [
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1574391884720-2e41ca213d75?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=800",
  ];

  // Helper to shuffle or pick images for different columns
  // This ensures columns don't look identical
  const getColumnImages = (offset) => {
    return [...images.slice(offset), ...images.slice(0, offset)];
  };

  const buildItems = (imgSet, repeat = 2) => {
    const items = [];
    for (let r = 0; r < repeat; r++) {
      imgSet.forEach((src, i) => {
        // Randomize heights slightly for "masonry" feel, or keep uniform
        // Here we alternate between two aspect ratios
        const isTall = (i + r) % 3 === 0; 
        items.push(
          <div
            key={`${r}-${i}`}
            className={`relative rounded-xl overflow-hidden mb-4 shadow-lg w-full shrink-0 ${
              isTall ? "h-64" : "h-40"
            }`}
          >
            <img
              src={src}
              alt="Club vibe"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        );
      });
    }
    return items;
  };

  return (
    <div className="h-full w-full bg-white overflow-hidden relative grid grid-cols-3 gap-4">
      {/* CSS Animations */}
      <style>{`
        /* Increased times for slower speed (60s, 80s, 70s) */
        .col-left  { --speed: 60s; }
        .col-mid   { --speed: 80s; }
        .col-right { --speed: 70s; }

        @keyframes scroll-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }

        .scroller-inner {
          display: flex;
          flex-direction: column;
          will-change: transform;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .col-left  .scroller-inner { animation-name: scroll-up; animation-duration: var(--speed); }
        .col-mid   .scroller-inner { animation-name: scroll-down; animation-duration: var(--speed); }
        .col-right .scroller-inner { animation-name: scroll-up; animation-duration: var(--speed); }
        
        .fade-mask {
            background: linear-gradient(to bottom, rgba(0,0,0,1), transparent 10%, transparent 90%, rgba(0,0,0,1));
        }
      `}</style>

      {/* Left Column */}
      <div className="h-full col-left relative overflow-hidden">
        <div className="scroller-inner">
          {buildItems(getColumnImages(0), 4)}
        </div>
      </div>

      {/* Middle Column */}
      <div className="h-full col-mid relative overflow-hidden pt-12">
        <div className="scroller-inner">
          {buildItems(getColumnImages(3), 4)}
        </div>
      </div>

      {/* Right Column */}
      <div className="h-full col-right relative overflow-hidden">
        <div className="scroller-inner">
          {buildItems(getColumnImages(6), 4)}
        </div>
      </div>

      {/* Overlay to fade edges (optional) */}
      <div className="fade-mask absolute inset-0 pointer-events-none z-10" />
    </div>
  );
};

export default ClubImageScroll;