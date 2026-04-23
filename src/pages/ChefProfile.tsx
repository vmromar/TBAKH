import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, CheckCircle, ChevronLeft, Calendar as CalendarIcon, MessageCircle, X, ChevronRight } from "lucide-react";
import { CHEFS } from "../data/mockData";
import BookingModal from "../components/BookingModal";
import ChefCard from "../components/ChefCard";
import { useLocationContext } from "../context/LocationContext";

export default function ChefProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const chef = CHEFS.find(c => c.id === id);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const { currentLocation } = useLocationContext();
  const currentCity = currentLocation.split(',')[0].trim().toLowerCase();

  const [reviews, setReviews] = useState(chef?.reviews || []);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!chef) return <div className="p-20 text-center">Chef not found</div>;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;
    const review = {
      author: "You",
      rating: newReviewRating,
      comment: newReviewComment,
      date: "Just now"
    };
    setReviews([review, ...reviews]);
    setNewReviewComment("");
    setNewReviewRating(5);
  };

  // Find other chefs in the same city or user's city
  const suggestedChefs = CHEFS.filter(c => c.id !== chef.id && (
    c.location.toLowerCase().includes(currentCity) || 
    c.location.toLowerCase().includes(chef.location.split(',')[0].trim().toLowerCase())
  )).slice(0, 3);
  
  const finalSuggestions = suggestedChefs.length > 0 ? suggestedChefs : CHEFS.filter(c => c.id !== chef.id).slice(0, 3);

  return (
    <div className="pb-28 bg-gray-50 flex-1 relative font-sans text-gray-900 selection:bg-brand-primary selection:text-gray-900">
      
      {/* Sticky Header - Acts like a Buy Now navbar at the top */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3 pt-safe' : 'bg-transparent py-4 pt-safe'} px-4 md:px-8 flex justify-between items-center`}>
        <button onClick={() => navigate(-1)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isScrolled ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' : 'bg-black/20 text-white shadow-sm backdrop-blur-md hover:bg-black/30'}`}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* The Book Now Button is always visible when scrolled down on mobile and desktop */}
        <div className={`flex items-center gap-3 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <h1 className="font-black text-gray-900 tracking-tight block truncate max-w-[200px]">{chef.name}</h1>
        </div>
      </div>

      {/* Hero Cover */}
      <div className="relative h-[35vh] md:h-[45vh] w-full bg-gray-900 border-b border-gray-100">
        <img src={chef.coverImage} alt={chef.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>
        
        {/* Absolute bottom content in Hero */}
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-4 md:px-8 pb-5 flex flex-col md:flex-row md:items-end gap-5">
          <img src={chef.avatar} alt={chef.name} className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-[6px] border-white object-cover shadow-xl bg-white -mb-8 md:-mb-12 relative z-10" />
          <div className="mb-0 pt-8 md:pt-0">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight drop-shadow-md">{chef.name}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/90 font-bold drop-shadow-sm">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-brand-primary"/> {chef.location.split(',')[0]}</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-brand-primary fill-brand-primary"/> {chef.rating} ({chef.reviewsCount})</span>
              <span className="flex items-center gap-1.5 text-brand-primary"><CheckCircle className="w-4 h-4"/> Platinum Chef</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mt-6 md:mb-10">
        
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 space-y-8">
            <section>
              <h2 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Biography</h2>
              <p className="text-gray-600 leading-[1.8] font-medium text-[15px]">{chef.about}</p>
            </section>

            <hr className="border-gray-100" />

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {chef.specialties.map(spec => (
                  <span key={spec} className="bg-gray-50 border border-gray-100 text-gray-800 font-bold px-5 py-2.5 rounded-full text-sm shadow-sm">
                    {spec}
                  </span>
                ))}
              </div>
            </section>

            <hr className="border-gray-100" />

            <section>
              <h2 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Gallery</h2>
              <div className="grid grid-cols-2 gap-3">
                {chef.gallery.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedImageIndex(i)}
                    className={`rounded-3xl overflow-hidden aspect-square border border-gray-100 cursor-zoom-in ${i === 0 ? 'col-span-2 aspect-[2/1] md:aspect-[24/10] md:col-span-1' : ''}`}
                  >
                    <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 mt-6">
            <h2 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Leave a Review</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                   <Star 
                     key={star} 
                     onClick={() => setNewReviewRating(star)} 
                     className={`w-8 h-8 cursor-pointer transition-colors ${newReviewRating >= star ? 'fill-brand-primary text-brand-primary' : 'text-gray-200'}`} 
                   />
                ))}
              </div>
              <textarea 
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                placeholder="Share your experience with this chef..."
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 outline-none focus:border-brand-green focus:bg-white resize-none"
              />
              <button 
                type="submit" 
                className="bg-gray-900 text-white font-black px-6 py-3 rounded-2xl text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newReviewComment.trim()}
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Reviews Section */}
          <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100">
            <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-gray-400" />
              Client Reviews
            </h2>
            <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center justify-center bg-brand-primary/10 w-16 h-16 rounded-2xl text-brand-green font-black text-3xl">
                 {chef.rating}
              </div>
              <div className="flex flex-col gap-1">
                 <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-brand-primary text-brand-primary" />)}
                 </div>
                 <span className="text-gray-400 font-bold text-xs uppercase tracking-widest pl-1">Based on {reviews.length} verified reviews</span>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review, i) => (
                <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center font-black text-brand-green shadow-sm text-lg">
                            {review.author[0]}
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900">{review.author}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{review.date}</p>
                        </div>
                    </div>
                    <div className="flex gap-0.5 text-brand-primary bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`w-3 h-3 ${idx < Math.round(review.rating) ? 'fill-brand-primary' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed bg-gray-50/50 p-3 rounded-2xl mt-2">&ldquo;{review.comment}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Location Based Suggestions */}
          <div className="pt-8">
            <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight flex items-center gap-2">
               <MapPin className="w-5 h-5 text-brand-green" />
               More Chefs near {currentCity || chef.location.split(',')[0]}
            </h2>
            <div className="flex flex-col gap-4">
               {finalSuggestions.map(sChef => (
                 <ChefCard key={sChef.id} chef={sChef} />
               ))}
            </div>
          </div>

        </div>

        {/* Right Column - Booking Widget */}
        <div className="hidden md:block relative">
          <div className="sticky top-28 bg-white border border-gray-100 rounded-[32px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="border-b border-gray-100 pb-5 mb-5">
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-1">Pricing Guide</p>
              <div className="flex items-baseline gap-1 break-words">
                <span className="text-sm font-bold text-gray-400 mr-1">Starts</span>
                <span className="text-3xl font-black text-gray-900 tracking-tight">{chef.priceRange.min}</span>
                <span className="text-sm font-bold text-gray-900 ml-1">MAD</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-bold text-gray-700">Availability</span>
                </div>
                <span className="text-[10px] uppercase font-black bg-brand-green/10 text-brand-green px-2.5 py-1 rounded-md">Flexible</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary" />
                  <span className="text-sm font-bold text-gray-700">Completed</span>
                </div>
                <span className="text-sm font-black text-gray-900">{chef.eventsCompleted} Events</span>
              </div>
            </div>
            
            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-6">Cash on Service</p>
          </div>
        </div>
        
      </div>

      {/* Global Sticky Booking Footer (Desktop & Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] pointer-events-none pb-safe">
        <div className="bg-white md:bg-white/95 md:backdrop-blur-md border-t border-gray-100 md: border-brand-primary/20 p-4 md:px-6 md:py-4 flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.08)] md:shadow-[0_8px_32px_rgba(255,204,0,0.15)] pointer-events-auto
                        w-full md:w-auto md:max-w-3xl md:mx-auto md:mb-6 md:rounded-2xl md:ring-4 ring-white/50 transition-all">
          <div className="flex-1">
            <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 block">Pricing Starts From</span>
            <span className="font-black text-2xl tracking-tighter text-gray-900">{chef.priceRange.min} MAD</span>
          </div>
          <button onClick={() => setIsBookingModalOpen(true)} className="bg-brand-primary text-gray-900 px-10 py-4 rounded-xl font-black shadow-[0_4px_14px_rgba(255,204,0,0.4)] active:scale-95 hover:scale-105 transition-transform text-lg whitespace-nowrap">
            Book Now
          </button>
        </div>
      </div>

      <BookingModal chef={chef} isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />

      {/* Gallery Zoomer Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-colors z-[110]"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) => (prev! === 0 ? chef.gallery.length - 1 : prev! - 1));
            }}
            className="absolute left-2 sm:left-8 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-colors z-[110]"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div 
            className="w-full max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl relative select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={chef.gallery[selectedImageIndex]} 
              alt="Gallery Zoom" 
              className="w-full h-full object-contain cursor-zoom-out" 
              onClick={() => setSelectedImageIndex(null)}
            />
            
            <div className="absolute bottom-4 left-0 right-0 text-center">
               <span className="bg-black/50 text-white text-xs font-bold px-4 py-1.5 rounded-full backdrop-blur-md">
                 {selectedImageIndex + 1} / {chef.gallery.length}
               </span>
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) => (prev! === chef.gallery.length - 1 ? 0 : prev! + 1));
            }}
            className="absolute right-2 sm:right-8 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-colors z-[110]"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}
