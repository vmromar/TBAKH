import { useState } from "react";
import { Search, SlidersHorizontal, ChefHat, Sparkles, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { CHEFS } from "../data/mockData";
import ChefCard from "../components/ChefCard";

const CATEGORIES = ["All", "Moroccan", "International", "Baking", "Seafood", "Healthy", "BBQ"];

// Extract unique FULL locations from mockData
const CITIES = Array.from(new Set(CHEFS.map(c => c.location.trim())));

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchCity, setSearchCity] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [sortBy, setSortBy] = useState<'recommended' | 'low' | 'high'>('recommended');
  
  // Search suggestion state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchSuggestions = CITIES.filter(city => city.toLowerCase().includes(searchCity.toLowerCase()));

  const filteredChefs = CHEFS.filter(chef => {
    // City filter
    if (searchCity.trim() !== "") {
      if (!chef.location.toLowerCase().includes(searchCity.toLowerCase())) {
        return false;
      }
    }
    
    // Category filter
    if (activeCategory !== "All") {
      // Find broad match in specialties or about
      const categoryMatch = chef.specialties.some(spec => spec.toLowerCase().includes(activeCategory.toLowerCase())) ||
                            chef.specialties.some(spec => "moroccan international healthy seafood bbq baking".includes(spec.toLowerCase()) ? spec.toLowerCase().includes(activeCategory.toLowerCase()) : false) ||
                            chef.about.toLowerCase().includes(activeCategory.toLowerCase());
      if (!categoryMatch && activeCategory === "Moroccan" && chef.location.includes("Morocco")) { // Fallback for Moroccan since it's common
         // check specialties
         const isMoroccan = chef.specialties.some(s => s.toLowerCase().includes("moroccan") || s.toLowerCase().includes("fassi"));
         if(!isMoroccan) return false;
      } else if (!categoryMatch) {
         return false;
      }
    }
    
    return true;
  }).sort((a, b) => {
    if (sortBy === 'low') return a.priceRange.min - b.priceRange.min;
    if (sortBy === 'high') return b.priceRange.min - a.priceRange.min;
    return b.rating - a.rating; // default recommended
  });

  const displayedChefs = filteredChefs.slice(0, visibleCount);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-24 selection:bg-brand-primary selection:text-gray-900">
      {/* Hero Section */}
      <div className="pt-4 pb-8 flex flex-col items-center relative z-20">
        {/* Animated Slogan in Darija */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 relative"
        >
          <motion.div
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-primary/20 text-yellow-800 rounded-2xl mb-4 font-bold text-sm shadow-sm border border-brand-primary/30"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="tracking-tight uppercase text-[10px]">Njibou a7san Tbakh htal 3andek!</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Chhiwat sda3 rass <br/>
            <span className="text-brand-green">3la 7sabna.</span>
          </h1>
        </motion.div>

        {/* Search Bar for City with Suggestions */}
        <div className="w-full relative">
          <div className="w-full bg-white border border-gray-100 rounded-[32px] p-2 pl-6 flex items-center shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow relative z-20">
            <Search className="w-6 h-6 text-brand-green mb-0.5 shrink-0" />
            <input 
              type="text" 
              value={searchCity}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onChange={(e) => { 
                  setSearchCity(e.target.value); 
                  setVisibleCount(5); 
                  setShowSuggestions(true);
              }}
              placeholder="Search by city... e.g. Casablanca" 
              className="bg-transparent border-none outline-none flex-1 px-4 text-gray-900 placeholder:text-gray-400 font-bold text-[15px]"
            />
            <button className="bg-brand-primary text-gray-900 px-8 py-3.5 rounded-[24px] font-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_14px_rgba(255,204,0,0.3)] hidden sm:block">
              {searchCity.trim() !== '' ? 'Search' : 'Find Chef'}
            </button>
          </div>
          
          {/* SEARCH SUGGESTIONS */}
          {showSuggestions && searchCity.trim() !== '' && searchSuggestions.length > 0 && (
            <div className="absolute top-[80%] left-0 right-0 pt-6 mt-0 bg-white rounded-b-[32px] shadow-[0_15px_30px_rgba(255,204,0,0.15)] border-x border-b border-brand-primary overflow-hidden z-10 p-2 pb-4 animate-in fade-in slide-in-from-top-2">
              {searchSuggestions.map((city, idx) => (
                <div 
                  key={idx} 
                  className="px-4 py-3 bg-white hover:bg-brand-primary/10 rounded-2xl cursor-pointer text-gray-800 font-bold tracking-tight transition-colors flex items-center gap-3 border border-transparent hover:border-brand-primary/30"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent onBlur from firing first
                    setSearchCity(city);
                    setShowSuggestions(false);
                  }}
                >
                  <MapPin className="w-5 h-5 text-brand-primary" />
                  <span className="flex-1 truncate">{city}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filters/Categories */}
      <div className="flex flex-col gap-4 mb-8 relative z-10">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-2 bg-gray-900 text-white rounded-full px-5 py-2.5 whitespace-nowrap shrink-0 font-black shadow-sm text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Menu</span>
            </div>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(5); }}
                className={`rounded-full px-5 py-2.5 whitespace-nowrap text-sm font-bold transition-all shrink-0 shadow-sm ${
                  activeCategory === cat 
                    ? "bg-brand-primary text-gray-900 border border-brand-primary" 
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 hover:border-gray-200"
                }`}
              >
                {cat === "All" && <ChefHat className="w-4 h-4 inline-block mr-2 -translate-y-0.5" />}
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">{filteredChefs.length} Chefs found</span>
              <div className="flex gap-2">
                 <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-gray-100 text-gray-700 text-xs font-bold rounded-lg px-3 py-1.5 outline-none focus:border-brand-primary shadow-sm appearance-none cursor-pointer"
                 >
                    <option value="recommended">Best Rated</option>
                    <option value="low">Lowest Price</option>
                    <option value="high">Highest Price</option>
                 </select>
              </div>
          </div>
      </div>

      {/* Grid - Capsule Stack */}
      <div className="flex flex-col gap-6 relative z-0">
        {displayedChefs.length > 0 ? (
          displayedChefs.map(chef => (
            <ChefCard key={chef.id} chef={chef} />
          ))
        ) : (
           <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-[32px]">
              <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-bold text-gray-900">No chefs found matching your criteria</p>
              <button onClick={() => {setSearchCity(""); setActiveCategory("All");}} className="mt-4 text-brand-green font-bold text-sm hover:underline">Clear Filters</button>
           </div>
        )}
      </div>

      {/* Show More Button */}
      {visibleCount < filteredChefs.length && (
        <div className="mt-10 flex justify-center">
          <button 
            onClick={() => setVisibleCount(prev => prev + 5)}
            className="bg-white border-2 border-brand-green text-brand-green font-black py-4 px-10 rounded-full hover:bg-brand-green hover:text-white transition-all shadow-sm active:scale-95"
          >
            Load More Chefs
          </button>
        </div>
      )}
    </div>
  );
}
