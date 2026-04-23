import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, ArrowRight, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate finding account and sending reset link via mailto for prototype
    const subject = `Password Reset Request - tbakh.ma`;
    const body = `Please reset the password for the account associated with: ${email}.
    
(This is an automated request from the Forgot Password flow)`;

    const mailtoLink = `mailto:omaaaaagh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    
    alert("Password reset request sent! We will send you an email with further instructions.");
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex text-gray-900 relative items-center justify-center p-4 bg-gray-50 selection:bg-brand-primary selection:text-gray-900">
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary mb-6 shadow-sm hover:scale-105 transition-transform">
            <ChefHat className="w-8 h-8 text-gray-900" />
          </Link>
          <h1 className="text-3xl font-black mb-2 tracking-tight">Reset Password</h1>
          <p className="text-gray-500 font-medium">Enter your email and we'll send you a link to reset your password.</p>
        </div>

        <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <form className="space-y-5" onSubmit={handleReset}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Email Address</label>
              <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="user@example.com" />
            </div>

            <button type="submit" className="w-full bg-brand-primary text-gray-900 shadow-[0_4px_14px_rgba(255,204,0,0.4)] font-black py-4 rounded-2xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2">
              Send Reset Request <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center mt-8">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
