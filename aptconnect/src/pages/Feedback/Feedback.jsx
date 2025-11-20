import React, { useState } from "react";
import { Star, Send } from "lucide-react";

// Helper for conditional classes
const clsx = (...classes) => classes.filter(Boolean).join(" ");

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [comments, setComments] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comments.trim() === "") {
      alert("Please provide a rating and comments.");
      return;
    }

    console.log("Feedback Submitted:", { rating, category, comments });
    setIsSubmitted(true);
    // Reset form after a brief delay for UX
    setTimeout(() => {
      setRating(0);
      setCategory("");
      setComments("");
      setIsSubmitted(false);
    }, 3000);
  };

  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };

  const getStarColor = (starIndex) => {
    return starIndex <= rating ? "text-yellow-400" : "text-gray-300";
  };

  return (
    <div className="min-h-screen bg-white py-8 text-gray-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-poppins ml-4">Provide Feedback</h2>
        </div>

        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            Thank you! Your feedback has been successfully submitted.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-gray-50 p-6 rounded-xl shadow-lg"
        >
          {/* Section 1: Rating */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              1. Rate Your Experience
            </h3>
            <div className="flex justify-start space-x-1">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <Star
                  key={starIndex}
                  size={30}
                  className={clsx(
                    "cursor-pointer transition-colors duration-150",
                    getStarColor(starIndex),
                    rating >= starIndex ? "fill-yellow-400" : "fill-gray-200",
                  )}
                  onClick={() => handleRatingClick(starIndex)}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {rating > 0
                ? `You rated: ${rating} Stars`
                : "Click a star to rate"}
            </p>
          </div>

          {/* Section 2: Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-lg font-semibold mb-3 text-gray-700"
            >
              2. Choose Category (Optional)
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              <option value="" disabled>
                Select a relevant topic
              </option>
              <option value="ui_ux">UI/UX Design</option>
              <option value="performance">Performance/Speed</option>
              <option value="bug_report">Bug Report</option>
              <option value="feature_request">Feature Request</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Section 3: Comments */}
          <div>
            <label
              htmlFor="comments"
              className="block text-lg font-semibold mb-3 text-gray-700"
            >
              3. Your Detailed Comments
            </label>
            <textarea
              id="comments"
              rows="5"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Tell us what you liked or what needs improvement..."
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={clsx(
              "w-full flex items-center justify-center py-3 text-lg font-semibold rounded-lg transition duration-200",
              rating > 0 && comments.trim() !== ""
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed",
            )}
            disabled={rating === 0 || comments.trim() === ""}
          >
            <Send size={20} className="mr-3" />
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
