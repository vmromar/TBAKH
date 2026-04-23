import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ChefHat, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { tempRegistrationStore } from "../lib/tempStore";

export default function CreateProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUserContext } = useAuth();
  
  // Default to empty strings if approached directly without state
  const { name = '', email = '', password = '', idUploaded = false, idFileName = '' } = location.state || {};

  const [city, setCity] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [minPrice, setMinPrice] = useState('1000');
  const [maxPrice, setMaxPrice] = useState('5000');
  const [about, setAbout] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Missing account details. Please start over from the registration page.");
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      // 2. Add extra chef data to Firestore
      // We don't create Auth here anymore because it was created in the Register step with Google
      // User is already logged in at this point if they reached this screen, but just in case:
      if (!auth.currentUser) {
         throw new Error("Authentication state lost. Please log in again.");
      }
      
      const user = auth.currentUser;
      
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName || name || '',
        email: user.email || email,
        phone: tempRegistrationStore.phone,
        role: 'chef',
        createdAt: new Date().toISOString(),
        idVerified: idUploaded,
        profile: {
          city,
          specialties: specialties.split(',').map(s => s.trim()).filter(Boolean),
          priceRange: { min: Number(minPrice), max: Number(maxPrice) },
          about
        }
      }, { merge: true });

      // 3. Send email to Admin
      try {
        const formData = new FormData();
        formData.append('name', user.displayName || name || '');
        formData.append('email', user.email || email);
        formData.append('phone', tempRegistrationStore.phone);
        formData.append('city', city);
        formData.append('specialties', specialties);
        
        if (tempRegistrationStore.idFile) {
           formData.append('idCard', tempRegistrationStore.idFile);
        }

        await fetch('/api/send-chef-registration', {
          method: 'POST',
          body: formData
        });
        
        // Clean up store
        tempRegistrationStore.idFile = null;
        tempRegistrationStore.phone = '';

      } catch (emailErr) {
        console.error("Failed to send admin email, but account was created.", emailErr);
      }

      // 4. Set the context manually to ensure immediate redirect
      updateUserContext({
          uid: user.uid,
           email: user.email || '',
           name: user.displayName || name || '',
           role: 'chef',
           identifier: user.email || ''
      });

      // Navigate to dashboard
      navigate('/dashboard');

    } catch (err: any) {
       console.error(err);
       setError(err.message || 'Failed to create chef profile.');
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex text-gray-900 relative p-4 py-8 bg-gray-50 selection:bg-brand-primary selection:text-gray-900">
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Role Selection
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-2">Build Your Chef Profile</h1>
          <p className="text-gray-500 font-medium">Let clients know what makes your food special.</p>
        </div>

        <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold mb-6 border border-red-100 text-center">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">City</label>
                <input required value={city} onChange={e => setCity(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="e.g. Casablanca, Rabat..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Specialties (Comma Separated)</label>
                <input required value={specialties} onChange={e => setSpecialties(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="e.g. Traditional, Seafood, Corporate" />
              </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Event Price Range (MAD)</label>
                <div className="flex items-center gap-4">
                  <input required value={minPrice} onChange={e => setMinPrice(e.target.value)} type="number" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="Min (e.g. 1000)" />
                  <span className="text-gray-400 font-black">-</span>
                  <input required value={maxPrice} onChange={e => setMaxPrice(e.target.value)} type="number" className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="Max (e.g. 5000)" />
                </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">About You</label>
              <textarea required value={about} onChange={e => setAbout(e.target.value)} rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white transition-colors resize-none" placeholder="Tell clients about your culinary background and passion..."></textarea>
            </div>

            <div className="pt-2">
              <button disabled={isSubmitting} type="submit" className="w-full disabled:opacity-70 disabled:hover:scale-100 bg-brand-primary text-gray-900 font-black shadow-[0_4px_14px_rgba(255,204,0,0.4)] py-4 rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-2">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Launch My Profile <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
