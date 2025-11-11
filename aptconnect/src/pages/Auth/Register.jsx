import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCred.user, { displayName: form.name });
      await setDoc(doc(db, "users", userCred.user.uid), {
        name: form.name,
        email: form.email,
        createdAt: new Date(),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow w-80 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Create Account</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full rounded" />
        <button className="w-full bg-primary text-white py-2 rounded">Sign Up</button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
