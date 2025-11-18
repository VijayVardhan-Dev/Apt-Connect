// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import ClubImageScroll from "../../components/ui/ClubImageScroll";
import arrowIcon from "../../assets/icons/arrow_icon.png";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email.trim(), form.password);
      // Set displayName locally and in Firebase user profile
      await updateProfile(userCred.user, { displayName: form.name });

      const userDocRef = doc(db, "users", userCred.user.uid);
      await setDoc(userDocRef, {
        name: form.name,
        email: form.email,
        createdAt: serverTimestamp(),
      });

      navigate("/home", { replace: true });
    } catch (err) {
      const code = err?.code || "";
      if (code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please login.");
      } else if (code === "auth/weak-password") {
        setError("Password is too weak. Use at least 6 characters.");
      } else {
        setError(err.message || "Failed to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;
      if (!fbUser) throw new Error("Google did not return a user.");

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
        await setDoc(userDocRef, { lastLogin: serverTimestamp() }, { merge: true });
      }

      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Google sign-up error:", err);
      setError(err?.message || "Failed to sign up with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full shadow-lg overflow-hidden bg-white flex flex-col md:flex-row h-[min(100vh,900px)]">
        <div className="hidden md:block md:w-1/2 h-full bg-white border-r border-gray-100">
          <ClubImageScroll />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white overflow-y-auto">
          <form onSubmit={handleSignUp} className="max-w-[550px] w-full mx-auto space-y-4">
            <div className="mb-6 flex items-center gap-4">
              <button type="button" aria-label="Back" onClick={() => window.history.back()} className="p-1 rounded-md hover:bg-gray-100 transition">
                <img src={arrowIcon} alt="back" className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-semibold text-slate-900">Sign Up</h1>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm text-zinc-600 mb-1">Full Name</label>
              <input id="name" name="name" type="text" required placeholder="John Doe" value={form.name} onChange={handleChange} className="w-full h-12 px-3 rounded-lg border border-neutral-200 focus:border-slate-800 focus:ring-0 text-sm bg-transparent" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-zinc-600 mb-1">Email</label>
              <input id="email" name="email" type="email" required placeholder="name@example.com" value={form.email} onChange={handleChange} className="w-full h-12 px-3 rounded-lg border border-neutral-200 focus:border-slate-800 focus:ring-0 text-sm bg-transparent" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-zinc-600 mb-1">Password</label>
              <input id="password" name="password" type="password" required placeholder="Create a password" value={form.password} onChange={handleChange} className="w-full h-12 px-3 rounded-lg border border-neutral-200 focus:border-slate-800 focus:ring-0 text-sm bg-transparent" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-zinc-600 mb-1">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" required placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} className="w-full h-12 px-3 rounded-lg border border-neutral-200 focus:border-slate-800 focus:ring-0 text-sm bg-transparent" />
            </div>

            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

            <div className="pt-2">
              <button type="submit" disabled={loading} className="w-full h-11 flex items-center justify-center bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 active:scale-95 transition disabled:bg-slate-500">
                {loading ? "Please wait..." : "Sign Up"}
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="flex-1 h-px bg-neutral-200" />
              <div className="text-xs text-neutral-600">Or</div>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <div>
              <button type="button" onClick={handleGoogle} disabled={loading} className="w-full h-11 flex items-center justify-center bg-white border border-neutral-200 text-sm font-semibold rounded-full hover:bg-neutral-50 active:scale-95 transition disabled:bg-slate-200">
                Sign up with Google
              </button>
            </div>

            <div className="text-center text-sm text-zinc-600">
              Already have an account? <Link to="/login" className="text-slate-800 font-semibold underline">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
