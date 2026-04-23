import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [role, setRole] = useState<'client' | 'chef'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Let the AuthContext handle state, just navigate
      navigate('/personal');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-gray-900 relative items-center justify-center p-4 bg-gray-50 selection:bg-brand-primary selection:text-gray-900">
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary mb-6 shadow-sm hover:scale-105 transition-transform">
            <ChefHat className="w-8 h-8 text-gray-900" />
          </Link>
          <h1 className="text-3xl font-black mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 font-medium">Sign in to tbakh.ma to manage your account.</p>
        </div>

        <div className="bg-white border border-gray-100 p-2 rounded-full flex mb-6 shadow-sm">
          <button 
            type="button" 
            onClick={() => setRole('client')}
            className={cn("flex-1 py-3 text-sm font-black rounded-full transition-all", role === 'client' ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50")}
          >
            I'm a Client
          </button>
          <button 
            type="button" 
            onClick={() => setRole('chef')}
            className={cn("flex-1 py-3 text-sm font-black rounded-full transition-all", role === 'chef' ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50")}
          >
            I'm a Chef
          </button>
        </div>

        <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold mb-4 border border-red-100 text-center">
              Invalid email or password
            </div>
          )}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Email Address</label>
              <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder={role === 'chef' ? "chef@example.com" : "user@example.com"} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Password</label>
                <Link to="/forgot-password" className="text-[11px] uppercase tracking-wider text-brand-green font-black hover:underline focus:outline-none">Forgot?</Link>
              </div>
              <input value={password} onChange={e => setPassword(e.target.value)} required type="password" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="••••••••" />
            </div>

            <button disabled={isLoading} type="submit" className="w-full disabled:opacity-70 disabled:hover:scale-100 bg-brand-primary text-gray-900 shadow-[0_4px_14px_rgba(255,204,0,0.4)] font-black py-4 rounded-2xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 font-medium mt-8">
            Don't have an account? <Link to="/register" className="text-brand-green hover:text-yellow-600 font-bold transition-colors">Join us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
