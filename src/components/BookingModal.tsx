import { useState, useEffect } from "react";
import { X, Calendar as CalendarIcon, MapPin, Users, CheckCircle, Minus, Plus, Loader2 } from "lucide-react";
import { Chef } from "../data/mockData";
import { useBookings } from "../context/BookingsContext";
import { useLocationContext } from "../context/LocationContext";

export default function BookingModal({ chef, isOpen, onClose }: { chef: Chef, isOpen: boolean, onClose: () => void }) {
  const { currentLocation } = useLocationContext();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("50");
  const [eventType, setEventType] = useState("Wedding");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [locationStr, setLocationStr] = useState(currentLocation ? currentLocation.split(',')[0].trim() : "");
  const [priceOffer, setPriceOffer] = useState(chef.priceRange.min);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addBooking } = useBookings();

  // Keep locationStr in sync if currentLocation changes in the background
  useEffect(() => {
    if (currentLocation) {
        setLocationStr(currentLocation.split(',')[0].trim());
    }
  }, [currentLocation]);

  if (!isOpen) return null;

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Add to context so chef can see it in dashboard
    addBooking({
      chefId: chef.id,
      chefName: chef.name,
      clientName: name,
      phone: phone,
      date: date,
      eventType: eventType,
      guests: guests,
      proposedPrice: priceOffer
    });

    // 2. Show loading
    setIsSubmitting(true);
    
    try {
       // Send Email API
       await fetch('/api/send-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             clientName: name,
             email: email,
             phone: phone,
             chefName: chef.name,
             date: date,
             time: time,
             guests: guests,
             location: locationStr
          })
       });
    } catch (err) {
       console.error("Booking email API failed, continuing to whatsapp", err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    // 3. Keep WhatsApp functionality
    const message = `Salam 👋 Tbakh.ma booking:
Client: ${name}
Phone: ${phone}
Chef: ${chef.name}
Date: ${date}
Time: ${time}
People: ${guests}
Location: ${locationStr}`;

    setTimeout(() => {
        setIsSuccess(false);
        onClose();
        window.open(`https://wa.me/212619003275?text=${encodeURIComponent(message)}`, '_blank');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => !isSuccess && onClose()}></div>
      <div className="relative bg-white border border-gray-100 rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[90vh] overflow-y-auto">
        
        {isSuccess ? (
           <div className="p-12 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
               <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle className="w-10 h-10 text-gray-900" />
               </div>
               <h2 className="text-2xl font-black text-gray-900 mb-2">Request Sent!</h2>
               <p className="text-gray-500 font-medium">Opening WhatsApp...</p>
           </div>
        ) : (
            <>
                <div className="sticky top-0 z-10 p-5 border-b border-gray-100 flex justify-between items-center bg-white/90 backdrop-blur-md">
                  <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5 tracking-tight">Book {chef.name}</h2>
                      <p className="text-brand-green font-bold text-xs uppercase tracking-wider">Secure Request</p>
                  </div>
                  <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                      <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleBook} className="p-5 sm:p-6 space-y-5">
                
                {/* Price Negotiation Tool */}
                <div className="bg-gray-50 border border-gray-100 rounded-[24px] p-5 mb-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary opacity-10 rounded-bl-full -z-0 blur-xl"></div>
                    <p className="text-[11px] uppercase tracking-widest font-black text-gray-500 text-center mb-3 relative z-10">Offer Your Price (MAD)</p>
                    <div className="flex items-center justify-center gap-3 sm:gap-6 relative z-10">
                        <button type="button" onClick={() => setPriceOffer(p => Math.max(0, p - 100))} className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-95">
                            <Minus className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                        </button>
                        
                        <div className="flex items-baseline justify-center border-b-2 border-brand-primary pb-1 group">
                          <input required type="number" value={priceOffer} onChange={(e) => setPriceOffer(Number(e.target.value))} className="w-24 sm:w-28 bg-transparent text-center text-3xl sm:text-4xl font-black text-gray-900 outline-none appearance-none" style={{ MozAppearance: 'textfield' }} />
                        </div>
                        
                        <button type="button" onClick={() => setPriceOffer(p => p + 100)} className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-white border-2 border-brand-primary shadow-sm flex items-center justify-center text-gray-900 hover:bg-yellow-100 transition-all active:scale-95">
                            <Plus className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                        </button>
                    </div>
                    <p className="text-center text-xs text-gray-400 font-bold mt-4 relative z-10">Chef's usual range: {chef.priceRange.min} - {chef.priceRange.max} MAD</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-gray-500">Your Name</label>
                    <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-shadow" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-gray-500">Email Address</label>
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-shadow" placeholder="john@example.com" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-gray-500">Phone</label>
                    <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-shadow" placeholder="+212 ..." />
                    </div>
                    <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-gray-500">Location Details</label>
                    <input required type="text" value={locationStr} onChange={e => setLocationStr(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-shadow" placeholder="e.g. Hay Riad, Rabat" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-gray-500">Event Date</label>
                    <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-shadow" />
                    </div>
                    </div>

                    <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-gray-500">Event Time</label>
                    <div className="relative">
                    <input required type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-shadow" />
                    </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-gray-500">Event Type</label>
                    <select value={eventType} onChange={e => setEventType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-shadow appearance-none">
                        <option value="Wedding">Wedding</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Private Dinner">Private Dinner</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                    <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-gray-500">Est. Guests</label>
                    <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input required type="number" value={guests} onChange={e => setGuests(e.target.value)} min="1" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-shadow" />
                    </div>
                    </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full disabled:opacity-70 disabled:hover:scale-100 bg-brand-primary text-gray-900 shadow-[0_4px_14px_rgba(255,204,0,0.4)] font-black text-lg py-4 rounded-xl mt-2 hover:scale-[1.02] active:scale-[0.98] transition-transform flex justify-center items-center gap-2">
                    {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin"/> Processing...</> : "Send Offer & Proceed"}
                </button>
                <p className="text-center text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-2">Cash on Service • No Credit Card Required</p>
                </form>
            </>
        )}
      </div>
    </div>
  );
}
