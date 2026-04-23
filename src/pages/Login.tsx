import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
  const [role, setRole] = useState<'client' | 'chef'>('client');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Let the AuthContext handle state, just navigate
      navigate('/personal');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to login with Google');
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
              {error}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleLogin}>
            <button disabled={isLoading} type="submit" className="w-full bg-white border border-gray-200 text-gray-900 shadow-sm font-black py-4 rounded-2xl hover:bg-gray-50 active:scale-[0.98] transition-all flex justify-center items-center gap-3">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </>}
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
