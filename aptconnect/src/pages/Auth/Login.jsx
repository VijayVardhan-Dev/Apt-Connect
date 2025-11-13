import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import ClubImageScroll from "../../components/ui/ClubImageScroll"; 
import arrowIcon from "../../assets/icons/arrow_icon.png";

export default function Login() {
  const navigate = useNavigate();

  // Firebase authentication state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // redirect after successful login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  const handleGoogle = () => {
    alert("UI-only: Google sign-in placeholder");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full shadow-lg overflow-hidden bg-white flex flex-col md:flex-row h-[min(100vh,900px)]">
        {/* Left Part */}
        <div className="hidden md:block md:w-1/2 h-full bg-white">
          <ClubImageScroll />
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <form
            onSubmit={handleLogin}
            className="max-w-[550px] w-full mx-auto space-y-4"
          >
            <div className="mb-6 flex items-center gap-4">
              <button
                type="button"
                aria-label="Back"
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
              <label
                htmlFor="email"
                className="block text-sm text-zinc-600 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-3 rounded-lg border border-neutral-200 focus:border-slate-800 focus:ring-0 text-sm bg-transparent"
                aria-label="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-zinc-600 mb-1"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm text-slate-800 underline"
                >
                  Forgot?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-3 rounded-lg border border-neutral-200 focus:border-slate-800 focus:ring-0 text-sm bg-transparent"
                aria-label="password"
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}

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
              <Link
                to="/Register"
                className="text-slate-800 font-semibold underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
