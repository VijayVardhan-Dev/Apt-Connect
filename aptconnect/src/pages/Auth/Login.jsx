// src/pages/Auth/Login.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import useAuth from "../../hooks/useAuth";
import ClubImageScroll from "../../components/ui/ClubImageScroll";
import arrowIcon from "../../assets/icons/arrow_icon.png";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const from = location.state?.from?.pathname || "/home";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate(from, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      // Map common firebase errors to friendlier messages
      const code = err?.code || "";
      if (code === "auth/user-not-found" || code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError(err.message || "Failed to sign in.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;
      if (!fbUser) throw new Error("No user returned from Google.");

      const userDocRef = doc(db, "users", fbUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          name: fbUser.displayName || "",
          email: fbUser.email || "",
          photoURL: fbUser.photoURL || "",
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      } else {
        // Merge lastLogin without overwriting existing fields
        await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true });
      }

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err?.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full shadow-lg overflow-hidden bg-white flex flex-col md:flex-row h-[min(100vh,900px)]">
        <div className="hidden md:block md:w-1/2 h-full bg-white">
          <ClubImageScroll />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <form onSubmit={handleLogin} className="max-w-[550px] w-full mx-auto space-y-4">
            <div className="mb-6 flex items-center gap-4">
              <button type="button" aria-label="Back" onClick={handleBack} className="p-1 rounded-md hover:bg-gray-100 transition">
                <img src={arrowIcon} alt="back" className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
            </div>

            <p className="text-sm text-zinc-600 mb-6">Welcome back — enter your credentials to continue.</p>

            <div>
              <label htmlFor="email" className="block text-sm text-zinc-600 mb-1">Email</label>
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
                <label htmlFor="password" className="block text-sm text-zinc-600 mb-1">Password</label>
                <button type="button" className="text-sm text-slate-800 underline">Forgot?</button>
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

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                aria-label="Login"
                disabled={loading}
                className="w-full h-11 flex items-center justify-center bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 active:scale-95 transition disabled:bg-slate-500 disabled:cursor-not-allowed"
              >
                {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Login"}
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
                disabled={loading}
                className="w-full h-11 flex items-center justify-center bg-white border border-neutral-200 text-sm font-semibold rounded-full hover:bg-neutral-50 active:scale-95 transition disabled:bg-slate-200 disabled:cursor-not-allowed"
              >
                {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-800"></div> : "Login with Google"}
              </button>
            </div>

            <div className="text-center text-sm text-zinc-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-slate-800 font-semibold underline">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
