import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import MagicBento from "../../components/ui/MagicBento";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-row  bg-gray-50 overflow-hidden">
  
<div className="flex-1/2">
<MagicBento 
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
/>
</div>
<div className="flex-1/2 flex flex-col items-center justify-center">
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow w-80 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full rounded" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full rounded" />
        <button className="w-full bg-primary text-white py-2 rounded">Login</button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </div>
    </div>
    </div>
  );
};

export default Login;
