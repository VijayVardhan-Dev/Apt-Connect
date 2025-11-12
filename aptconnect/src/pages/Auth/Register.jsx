// src/pages/Auth/Register.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ClubImageScroll from "../../components/ui/ClubImageScroll"; // Same component as Login
import arrowIcon from "../../assets/icons/arrow_icon.png";

export default function Register() {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // UI-only: navigate to home (replace with real logic later)
    navigate("/");
  };

  const handleGoogle = () => {
    alert("UI-only: Google sign-up placeholder");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Card container: responsive split (Same as Login) */}
      <div className="w-full shadow-lg overflow-hidden bg-white flex flex-col md:flex-row h-[min(100vh,900px)]">
        
        {/* Left Visual: ClubImageScroll (Hidden on mobile, 50% on desktop) */}
        <div className="hidden md:block md:w-1/2 h-full bg-white border-r border-gray-100">
          <ClubImageScroll />
        </div>

        {/* Right Form Panel */}
        {/* Added overflow-y-auto to handle smaller screens since Register forms are longer */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white overflow-y-auto">
          
          <form onSubmit={handleSignUp} className="max-w-[550px] w-full mx-auto space-y-4">
            
            {/* Header & Back Button */}
            <div className="mb-6 flex items-center gap-4">
              <button
                type="button"
                aria-label="Back"
                onClick={() => navigate(-1)}
                className="p-1 rounded-md hover:bg-gray-100 transition"
              >
                <img src={arrowIcon} alt="back" className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-semibold text-slate-900">Sign Up</h1>
            </div>

            <p className="text-sm text-zinc-600 mb-6">
              Create an account to start your nightlife experience.
            </p>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm text-zinc-600 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="w-full h-12 px-3 rounded-lg border border-neutral-200 focus:border-slate-800 focus:ring-0 text-sm bg-transparent"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm text-zinc-600 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Create a password"
                className="w-full h-12 px-3 rounded-lg border border-neutral-200 focus:border-slate-800 focus:ring-0 text-sm bg-transparent"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-zinc-600 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
                className="w-full h-12 px-3 rounded-lg border border-neutral-200 focus:border-slate-800 focus:ring-0 text-sm bg-transparent"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-11 flex items-center justify-center bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 active:scale-95 transition"
              >
                Sign Up
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="flex-1 h-px bg-neutral-200" />
              <div className="text-xs text-neutral-600">Or</div>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            {/* Google Button */}
            <div>
              <button
                type="button"
                onClick={handleGoogle}
                className="w-full h-11 flex items-center justify-center bg-white border border-neutral-200 text-sm font-semibold rounded-full hover:bg-neutral-50 active:scale-95 transition"
              >
                Sign up with Google
              </button>
            </div>

            {/* Link to Login */}
            <div className="text-center text-sm text-zinc-600">
              Already have an account?{" "}
              <Link to="/Login" className="text-slate-800 font-semibold underline">
                Login
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}