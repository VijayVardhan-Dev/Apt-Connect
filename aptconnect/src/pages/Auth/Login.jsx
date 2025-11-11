// src/pages/Auth/Login.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import arrowIcon from "../../assets/icons/arrow_icon.png";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // UI-only: navigate to dashboard (replace with real sign-in later)
    navigate("/");
  };

  const handleGoogle = () => {
    // Placeholder for Google sign-in UI flow
    alert("UI-only: Google sign-in placeholder");
  };

  return (
    <div className="w-full min-h-screen relative bg-white overflow-hidden">
      {/* Right panel (form area) */}
      <div className="absolute right-0 top-0 w-[660px] h-full outline outline-1 outline-offset-[-1px] outline-gray-200">
        {/* Email input (visual) */}
        <div className="absolute left-[140px] top-[386px] w-96 h-12 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-800 flex items-center px-3">
          <input
            aria-label="email"
            placeholder="Alice"
            className="w-full bg-transparent text-sm text-slate-800 focus:outline-none"
          />
        </div>

        {/* Password input (visual) */}
        <div className="absolute left-[140px] top-[472px] w-96 h-12 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-800 flex items-center px-3">
          <input
            aria-label="password"
            placeholder="Eshlea"
            type="password"
            className="w-full bg-transparent text-sm text-slate-800 focus:outline-none"
          />
        </div>

        {/* --- Sign Up (white pill) --> Link to /register */}
        <Link
          to="/Register"
          className="absolute left-[144px] top-[638px] w-96 h-11 flex items-center justify-center bg-white rounded-full outline outline-1 outline-offset-[-1px] outline-slate-300 hover:bg-slate-50 active:scale-95 transition"
          aria-label="Sign Up"
        >
          <span className="text-slate-800 text-sm font-bold leading-5">Sign Up</span>
        </Link>

        {/* Login (dark pill) */}
        <button
          onClick={handleLogin}
          className="absolute left-[144px] top-[552px] w-96 h-11 flex items-center justify-center bg-slate-800 rounded-full outline outline-1 outline-offset-[-1px] outline-slate-300 hover:bg-slate-700 active:scale-95 transition"
          aria-label="Login"
        >
          <span className="text-white text-sm font-bold leading-5">Login</span>
        </button>

        {/* Login with Google */}
        <button
          onClick={handleGoogle}
          className="absolute left-[144px] top-[692px] w-96 h-11 flex items-center justify-center bg-slate-800 rounded-full outline outline-1 outline-offset-[-1px] outline-slate-300 hover:bg-slate-700 active:scale-95 transition"
          aria-label="Login with Google"
        >
          <span className="text-white text-sm font-bold leading-5">Login in with Google</span>
        </button>

        {/* "Or" separator */}
        <div className="absolute left-[170px] top-[612px] w-80 h-4">
          <div className="absolute left-0 top-[7.5px] w-36 h-px border-t border-neutral-800" />
          <div className="absolute left-[178.67px] top-[7.5px] w-36 h-px border-t border-neutral-800" />
          <div className="absolute left-[153.33px] top-0 text-neutral-800 text-xs">Or</div>
        </div>

        {/* Labels and text */}
        <div className="absolute left-[136px] top-[288px] text-slate-900 text-4xl font-normal leading-8">Login</div>
        <div className="absolute left-[140px] top-[358px] text-zinc-600 text-base leading-4">Email</div>
        <div className="absolute left-[140px] top-[449px] text-zinc-600 text-base leading-4">Password</div>
        <div className="absolute left-[446px] top-[449px] text-slate-800 text-base leading-4"><button className="underline">Forgot ?</button></div>

        {/* Arrow icon (top-left of right panel) */}
        <img
          src={arrowIcon}
          alt="back"
          className="w-7 h-7 absolute left-[52px] top-[19px] object-contain"
        />
      </div>

      {/* Left visual tile area */}
      <div className="absolute left-0 top-0 w-[780px] h-full bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* The grid of decorative tiles (placeholders) */}
        <div className="absolute left-0 top-0 w-64 h-56 overflow-hidden">
          <div className="w-64 h-56 bg-neutral-200" />
        </div>

        <div className="absolute left-[281.33px] top-0 w-56 h-56 bg-neutral-200 rounded-2xl" />

        <div className="absolute left-[531px] top-0 w-64 h-96 overflow-hidden">
          <div className="w-64 h-96 bg-neutral-200" />
        </div>

        <div className="absolute left-0 top-[242px] w-56 h-80 overflow-hidden">
          <div className="w-56 h-80 bg-neutral-200" />
        </div>

        <div className="absolute left-[252px] top-[242px] w-60 h-[500px] overflow-hidden">
          <div className="w-60 h-[500px] bg-neutral-200" />
        </div>

        <div className="absolute left-0 top-[588px] w-56 h-60 bg-neutral-200 rounded-2xl" />

        <div className="absolute left-[531px] top-[470px] w-64 h-64 rounded-tl-3xl rounded-bl-3xl overflow-hidden">
          <div className="w-64 h-64 bg-neutral-200" />
        </div>

        <div className="absolute left-0 top-[853px] w-56 h-64 overflow-hidden">
          <div className="w-56 h-64 bg-neutral-200" />
        </div>

        <div className="absolute left-[252px] top-[770px] w-60 h-64 overflow-hidden">
          <div className="w-60 h-64 bg-neutral-200" />
        </div>

        <div className="absolute left-[531px] top-[770px] w-64 h-64 overflow-hidden">
          <div className="w-64 h-64 bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
