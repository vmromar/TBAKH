import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, ArrowRight, UploadCloud, CheckCircle2, Loader2, FileBadge } from "lucide-react";
import { cn } from "../lib/utils";

export default function Register() {
  const [role, setRole] = useState<'client' | 'chef'>('client');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [idUploaded, setIdUploaded] = useState(false);
  const [idFileName, setIdFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate secure upload and encryption delay
      setTimeout(() => {
        setIdFileName(file.name);
        setIsUploading(false);
        setIdUploaded(true);
      }, 2000);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (role === 'chef') {
      if (!idUploaded) {
        alert("Please upload your National ID or Passport to continue.");
        return;
      }
      // Proceed to create profile step instead of sending right away
      navigate('/create-profile', { state: { name, phone, password, idUploaded, idFileName } });
    } else {
      const subject = `New Client Registration - tbakh.ma`;
      const body = `New Client Registration:
Name: ${name}
Phone/Email: ${phone}
Password: ${password}

(This is an automated signup notification)`;
      
      const mailtoLink = `mailto:omaaaaagh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_blank');
      
      // Clear password 
      setPassword('');
      alert("Account created successfully!");
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex text-gray-900 relative items-center justify-center p-4 py-12 bg-gray-50 selection:bg-brand-primary selection:text-gray-900">
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary mb-6 shadow-sm hover:scale-105 transition-transform">
            <ChefHat className="w-8 h-8 text-gray-900" />
          </Link>
          <h1 className="text-3xl font-black mb-2 tracking-tight">Join tbakh.ma</h1>
          <p className="text-gray-500 font-medium">Create an account to start your culinary journey.</p>
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
          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Full Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="John Doe" />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Email or Phone</label>
              <input required value={phone} onChange={e => setPhone(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="user@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Password</label>
              <input required value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="••••••••" />
            </div>

            {role === 'chef' && (
              <div className="space-y-2 pt-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 flex items-center justify-between">
                  <span>Identity Verification</span>
                  {idUploaded && <span className="text-brand-green">Verified</span>}
                </label>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/jpeg,image/png,image/webp,application/pdf" 
                  onChange={handleFileUpload} 
                />
                
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-6 text-center transition-all relative overflow-hidden",
                    isUploading ? "border-brand-green/30 bg-brand-green/5" :
                    idUploaded ? "border-brand-green bg-brand-green/5 cursor-default" :
                    "border-gray-200 hover:border-brand-green/50 bg-gray-50 cursor-pointer"
                  )}
                  onClick={() => !idUploaded && !isUploading && fileInputRef.current?.click()}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-2">
                      <Loader2 className="w-8 h-8 text-brand-green animate-spin" />
                      <span className="text-sm font-bold text-gray-700">Encrypting & Uploading ID...</span>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div className="bg-brand-green h-1.5 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  ) : idUploaded ? (
                    <div className="flex flex-col items-center gap-2 text-brand-green relative z-10">
                      <div className="bg-white rounded-full p-2 shadow-sm mb-1">
                        <CheckCircle2 className="w-8 h-8 text-brand-green" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">ID Uploaded Successfully</span>
                      <span className="text-xs font-semibold text-gray-500 bg-white/60 px-3 py-1 rounded-full truncate max-w-[200px] border border-gray-100">{idFileName}</span>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIdUploaded(false);
                          setIdFileName('');
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="text-[10px] uppercase tracking-wider font-bold text-red-500 hover:text-red-600 mt-2 hover:underline"
                      >
                        Remove & Re-upload
                      </button>
                    </div>
                  ) : (
                     <div className="flex flex-col items-center gap-2 text-gray-500 group">
                      <div className="bg-white rounded-full p-3 shadow-sm mb-1 group-hover:scale-110 transition-transform">
                        <FileBadge className="w-6 h-6 text-gray-600" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">Upload National ID or Passport</span>
                      <span className="text-xs font-semibold text-gray-400">Click to browse securely</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 bg-gray-100 px-2 py-0.5 rounded">JPEG, PNG, PDF</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-brand-primary text-gray-900 font-black shadow-[0_4px_14px_rgba(255,204,0,0.4)] py-4 rounded-2xl mt-6 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2">
              {role === 'chef' ? 'Continue to Build Profile' : 'Create Account'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 font-medium mt-8">
            Already have an account? <Link to="/login" className="text-brand-green hover:text-yellow-600 font-bold transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
