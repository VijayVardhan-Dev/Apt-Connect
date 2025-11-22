import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const STORY_DURATION = 3000; // 3 seconds

export default function StoryViewer({ stories, initialStoryIndex = 0, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const startTimeRef = useRef(Date.now());
    const pausedTimeRef = useRef(0);
    const animationFrameRef = useRef(null);

    const currentStory = stories[currentIndex];

    useEffect(() => {
        // Reset for new story
        setProgress(0);
        startTimeRef.current = Date.now();
        pausedTimeRef.current = 0;

        const animate = () => {
            if (isPaused) {
                // Update start time to account for pause duration
                startTimeRef.current = Date.now() - pausedTimeRef.current;
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            const elapsed = Date.now() - startTimeRef.current;
            pausedTimeRef.current = elapsed; // Track elapsed time for pause logic

            const newProgress = (elapsed / STORY_DURATION) * 100;

            if (newProgress >= 100) {
                handleNext();
            } else {
                setProgress(newProgress);
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [currentIndex, isPaused]);

    const handleNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else {
            // Restart current story or close? Instagram stays on first story.
            setProgress(0);
            startTimeRef.current = Date.now();
            pausedTimeRef.current = 0;
        }
    };

    const handleTouchStart = () => setIsPaused(true);
    const handleTouchEnd = () => setIsPaused(false);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex]);

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white z-50 p-2"
            >
                <X size={24} />
            </button>

            {/* Main Content */}
            <div
                className="relative w-full max-w-md h-full md:h-[90vh] bg-gray-900 md:rounded-xl overflow-hidden"
                onMouseDown={handleTouchStart}
                onMouseUp={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Progress Bars */}
                <div className="absolute top-4 left-0 right-0 flex gap-1 px-2 z-20">
                    {stories.map((story, idx) => (
                        <div key={story.id} className="h-1 flex-1 bg-gray-600 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-100 ease-linear"
                                style={{
                                    width: idx < currentIndex ? "100%" : idx === currentIndex ? `${progress}%` : "0%"
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="absolute top-8 left-4 z-20 flex items-center gap-2">
                    {currentStory.clubLogo ? (
                        <img src={currentStory.clubLogo} alt={currentStory.clubName} className="w-8 h-8 rounded-full border border-white/50" />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold border border-white/50">
                            {currentStory.clubName?.charAt(0)}
                        </div>
                    )}
                    <span className="text-white font-semibold text-sm shadow-black drop-shadow-md">
                        {currentStory.clubName}
                    </span>
                    <span className="text-gray-300 text-xs ml-2">
                        {/* Time ago logic could go here */}
                    </span>
                </div>

                {/* Image */}
                <img
                    src={currentStory.mediaUrl}
                    alt="Story"
                    className="w-full h-full object-cover"
                />

                {/* Caption */}
                {currentStory.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white text-center pb-12">
                        <p className="text-lg font-medium">{currentStory.caption}</p>
                    </div>
                )}

                {/* Navigation Tap Areas */}
                <div className="absolute inset-0 flex z-10">
                    <div className="w-1/3 h-full" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
                    <div className="w-1/3 h-full" /> {/* Center area for hold-to-pause (handled by parent div) */}
                    <div className="w-1/3 h-full" onClick={(e) => { e.stopPropagation(); handleNext(); }} />
                </div>
            </div>
        </div>
    );
}
