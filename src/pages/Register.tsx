import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, CheckCircle2, Loader2, FileBadge } from "lucide-react";
import { cn } from "../lib/utils";
import { auth, db } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { tempRegistrationStore } from "../lib/tempStore";

export default function Register() {
  const [role, setRole] = useState<'client' | 'chef'>('client');
  const [phone, setPhone] = useState('');
  const [idUploaded, setIdUploaded] = useState(false);
  const [idFileName, setIdFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const { updateUserContext } = useAuth();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Save directly to our temp memory store to pass to the next step
      tempRegistrationStore.idFile = file;
      
      // Simulate secure check
      setTimeout(() => {
        setIdFileName(file.name);
        setIsUploading(false);
        setIdUploaded(true);
      }, 1000);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Save phone to temp store for emails later
    tempRegistrationStore.phone = phone;
    
    if (role === 'chef') {
      if (!idUploaded) {
        setError("Please upload your National ID or Passport to continue.");
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      if (role === 'chef') {
        // Proceed to create profile step with email and google data
        navigate('/create-profile', { state: { name: user.displayName || '', email: user.email || '', idUploaded, idFileName } });
      } else {
        // Store user metadata in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName || '',
          email: user.email || '',
          phone,
          role: 'client',
          createdAt: new Date().toISOString()
        }, { merge: true });

        // Set the context manually to ensure immediate redirect
        updateUserContext({
           uid: user.uid,
           name: user.displayName || '',
           email: user.email || '',
           role: 'client',
           identifier: user.email || ''
        });

        navigate('/personal');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create account with Google.');
    } finally {
      setIsSubmitting(false);
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
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold mb-4 border border-red-100 text-center">
              {error}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Phone Number (Required for booking notifications)</label>
              <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="+212 ..." />
            </div>

            {role === 'chef' && (
              <div className="space-y-2 pt-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 flex items-center justify-between">
                  <span>Identity Verification</span>
                  {idUploaded && <span className="text-brand-green">Attached</span>}
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
                      <span className="text-sm font-bold text-gray-700">Attaching ID...</span>
                    </div>
                  ) : idUploaded ? (
                    <div className="flex flex-col items-center gap-2 text-brand-green relative z-10">
                      <div className="bg-white rounded-full p-2 shadow-sm mb-1">
                        <CheckCircle2 className="w-8 h-8 text-brand-green" />
                      </div>
                      <span className="text-sm font-bold text-gray-900">ID Attached</span>
                      <span className="text-xs font-semibold text-gray-500 bg-white/60 px-3 py-1 rounded-full truncate max-w-[200px] border border-gray-100">{idFileName}</span>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIdUploaded(false);
                          setIdFileName('');
                          tempRegistrationStore.idFile = null;
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

            <button disabled={isSubmitting} type="submit" className="w-full bg-white border border-gray-200 text-gray-900 shadow-sm font-black py-4 rounded-2xl mt-6 hover:bg-gray-50 active:scale-[0.98] transition-all flex justify-center items-center gap-3">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {role === 'chef' ? 'Continue with Google' : 'Create Account with Google'}
              </>}
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
