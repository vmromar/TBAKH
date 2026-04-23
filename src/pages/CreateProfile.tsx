import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ChefHat, ArrowRight, ArrowLeft } from "lucide-react";

export default function CreateProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  // Default to empty strings if approached directly without state
  const { name = '', phone = '', password = '', idUploaded = false, idFileName = '' } = location.state || {};

  const [city, setCity] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [minPrice, setMinPrice] = useState('1000');
  const [maxPrice, setMaxPrice] = useState('5000');
  const [about, setAbout] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct payload
    const subject = `New Chef Partner Profile Registration!`;
    const body = `New Chef Partner Profile!
Name: ${name || 'N/A'}
Phone/Email: ${phone || 'N/A'}
Password: ${password || 'N/A'}
ID Verified: ${idUploaded ? 'Yes' : 'No'}
File Uploaded: ${idFileName || 'N/A'}

-- Profile Info --
City: ${city}
Specialties: ${specialties}
Pricing: ${minPrice} - ${maxPrice} MAD
About: ${about}`;

    // 1. Send silent WhatsApp message via wa.me protocol (Wait for tab sequence)
    const whatsappMessage = encodeURIComponent(body);
    window.open(`https://wa.me/212619003275?text=${whatsappMessage}`, '_blank');
    
    // 2. Queue Email submission using setTimeout (to not block the WhatsApp tab)
    setTimeout(() => {
        const mailtoLink = `mailto:omaaaaagh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink, '_self'); // Use _self for mailto in setTimeout to prevent popup blockers
        
        // 3. Clear queue and verify
        setTimeout(() => {
          alert("Profile info sent! We'll review and publish your profile soon.");
          navigate('/');
        }, 800);
    }, 500);
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
              <button type="submit" className="w-full bg-brand-primary text-gray-900 font-black shadow-[0_4px_14px_rgba(255,204,0,0.4)] py-4 rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-2">
                Launch My Profile <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
