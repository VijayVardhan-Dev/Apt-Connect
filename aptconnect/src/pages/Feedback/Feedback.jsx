import React, { useState } from "react";
import { Star, ArrowRight } from "lucide-react";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [comments, setComments] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comments.trim() === "") return;

    // Simulate submit
    setIsSubmitted(true);
    setTimeout(() => {
      setRating(0);
      setCategory("");
      setComments("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="max-w-2xl mx-auto px-6 pt-12">
        
        {/* Minimal Header */}
        <header className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            Feedback
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            We value your input. Let us know how we can improve.
          </p>
        </header>

        {isSubmitted ? (
          <div className="py-4 text-sm font-medium text-black border-l-2 border-black pl-4 animate-in fade-in slide-in-from-left-1 duration-300">
            Thanks for your feedback. We've received it.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Rating Section */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <button
                    key={starIndex}
                    type="button"
                    onClick={() => setRating(starIndex)}
                    className="focus:outline-none group transition-transform active:scale-95"
                  >
                    <Star
                      size={24}
                      strokeWidth={1.5}
                      className={`transition-all duration-200 ${
                        starIndex <= rating
                          ? "fill-black text-black"
                          : "fill-transparent text-gray-300 group-hover:text-gray-500"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 h-4">
                {rating > 0 && `${rating} out of 5 stars`}
              </p>
            </div>

            {/* Category Section */}
            <div className="space-y-3">
              <label 
                htmlFor="category" 
                className="block text-xs font-bold uppercase tracking-widest text-gray-400"
              >
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-transparent border-b border-gray-200 py-3 pr-8 text-sm text-black focus:outline-none focus:border-black rounded-none cursor-pointer"
                >
                  <option value="" disabled>Select a topic</option>
                  <option value="ui_ux">Design & UX</option>
                  <option value="performance">Performance</option>
                  <option value="bug_report">Bug Report</option>
                  <option value="feature_request">Feature Request</option>
                  <option value="other">Other</option>
                </select>
                {/* Custom arrow for consistent minimal look */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                   <span className="text-xs">▼</span>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-3">
              <label 
                htmlFor="comments" 
                className="block text-xs font-bold uppercase tracking-widest text-gray-400"
              >
                Comments
              </label>
              <textarea
                id="comments"
                rows="4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Tell us about your experience..."
                className="w-full bg-transparent border border-gray-200 p-4 text-sm text-black placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors resize-none rounded-sm"
              />
            </div>

            {/* Minimal Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={rating === 0 || comments.trim() === ""}
                className={`
                  flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200
                  ${
                    rating > 0 && comments.trim() !== ""
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                Submit Feedback
                {rating > 0 && comments.trim() !== "" && (
                  <ArrowRight size={16} />
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}