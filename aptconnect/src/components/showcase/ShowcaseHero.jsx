import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShowcaseHero = ({ items = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    // Auto-advance slide
    useEffect(() => {
        if (items.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [items.length]);

    if (!items.length) return null;

    const currentItem = items[currentIndex];

    // Data normalization
    const image = currentItem.imageURL || currentItem.image || currentItem.thumbnailURL || 'https://via.placeholder.com/1200x600';
    const title = currentItem.title || currentItem.caption || "Untitled Masterpiece";
    const description = currentItem.content || currentItem.description || "Discover the details of this amazing project.";

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const handleExplore = () => {
        if (currentItem.clubId) {
            navigate(`/club/${currentItem.clubId}`);
        } else {
            navigate(`/post/${currentItem.id}`);
        }
    };

    return (
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden group shadow-2xl">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out transform scale-105 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col items-start justify-end h-full">
                <div className="max-w-3xl space-y-4 animate-fade-in-up">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/10 uppercase tracking-wider">
                        Featured Showcase
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                        {title}
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl line-clamp-2 max-w-2xl drop-shadow-md">
                        {description}
                    </p>

                    <button
                        onClick={handleExplore}
                        className="mt-6 flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Explore Now <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* Navigation Buttons */}
            {items.length > 1 && (
                <div className="absolute bottom-8 right-8 flex gap-3 z-10">
                    <button
                        onClick={handlePrev}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}

            {/* Indicators */}
            <div className="absolute top-8 right-8 flex gap-1.5">
                {items.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShowcaseHero;
