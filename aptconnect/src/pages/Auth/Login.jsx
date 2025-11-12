// src/pages/Auth/Login.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ClubImageScroll from "../../components/ui/ClubImageScroll"; // <- adjust path if needed
import arrowIcon from "../../assets/icons/arrow_icon.png";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // UI-only: navigate to dashboard (replace with real sign-in later)
    navigate("/");
  };

    const handleClick = () => {
   
    // UI-only: navigate to dashboard (replace with real sign-in later)
    navigate("/");
  };

  const handleGoogle = () => {
    // Placeholder for Google sign-in UI flow
    alert("UI-only: Google sign-in placeholder");
  };

  return (
    <div className="min-h-screen  bg-gray-50 flex items-center justify-center">
      {/* Card container: responsive split */}
      <div className="w-full   shadow-lg overflow-hidden bg-white flex flex-col md:flex-row h-[min(100vh,900px)]">

        {/* LeftPart */}

        {/* Left visual: three-column infinite scroll
            - md:w-1/2 gives half the width on desktop and up
            - h-full ensures it fills the card height (min-height screen handled by parent) */}
        <div className="hidden md:block md:w-1/2 h-full bg-white">
          <ClubImageScroll/>
        </div>

        {/* Right form panel */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
             
         
          {/* Form (semantic) */}
          <form onSubmit={handleLogin} className="max-w-[550px] w-full mx-auto space-y-4">

          <div className="mb-6 flex items-center gap-4">
            <button
              type="button"
              aria-label="Back"
              // onClick={() => window.history.back()}
              onClick={handleClick}
              className="p-1 rounded-md hover:bg-gray-100 transition"
            >
              <img src={arrowIcon} alt="back" className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
          </div>

          <p className="text-sm text-zinc-600 mb-6">
            Welcome back — enter your credentials to continue.
          </p>

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
                aria-label="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm text-zinc-600 mb-1">
                  Password
                </label>
                <button type="button" className="text-sm text-slate-800 underline">
                  Forgot?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full h-12 px-3 rounded-lg border border-neutral-200 focus:border-slate-800 focus:ring-0 text-sm bg-transparent"
                aria-label="password"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                aria-label="Login"
                className="w-full h-11 flex items-center justify-center bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 active:scale-95 transition"
              >
                Login
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="flex-1 h-px bg-neutral-200" />
              <div className="text-xs text-neutral-600">Or</div>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <div>
              <button
                type="button"
                onClick={handleGoogle}
                aria-label="Login with Google"
                className="w-full h-11 flex items-center justify-center bg-white border border-neutral-200 text-sm font-semibold rounded-full hover:bg-neutral-50 active:scale-95 transition"
              >
                Login with Google
              </button>
            </div>

            <div className="text-center text-sm text-zinc-600">
              Don't have an account?{" "}
              <Link to="/Register" className="text-slate-800 font-semibold underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
