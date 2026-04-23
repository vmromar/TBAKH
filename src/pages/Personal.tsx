import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocationContext } from "../context/LocationContext";
import { CHEFS } from "../data/mockData";
import ChefCard from "../components/ChefCard";
import { MapPin, Compass, LogOut, Loader2, User, ChevronRight, Navigation } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

export default function Personal() {
  const { user, logout } = useAuth();
  const { currentLocation, detectLocation, isDetecting } = useLocationContext();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Extract city from context string (e.g. "Meknes, Morocco" -> "Meknes")
  const currentCity = currentLocation.split(',')[0].trim().toLowerCase();
  
  // Find chefs that match the user's current city
  const suggestedChefs = CHEFS.filter(chef => chef.location.toLowerCase().includes(currentCity));
  // Fallback if no matching chefs found
  const displayedChefs = suggestedChefs.length > 0 ? suggestedChefs.slice(0, 4) : CHEFS.slice(0, 4);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-28 selection:bg-brand-primary selection:text-gray-900">
      
      {/* Header Profile Section */}
      <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-black mb-2 tracking-tight text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Logged in as {user.identifier}</p>
        </div>
        <button 
          onClick={logout} 
          className="flex items-center justify-center p-3 sm:px-6 sm:py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl sm:rounded-2xl font-black text-sm transition-colors shadow-sm"
        >
          <LogOut className="w-5 h-5 sm:w-4 sm:h-4 sm:mr-2" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Location Area Context Map Box */}
      <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-gray-100 mb-10 overflow-hidden relative group">
        <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2 mb-6">
          <MapPin className="w-6 h-6 text-brand-green" />
          Operating Delivery Area
        </h3>
        
        <div className="bg-gray-50 p-6 rounded-[24px] border border-gray-200 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1.5">Map Selected Area</p>
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <p className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{currentLocation}</p>
            </div>
          </div>
          <button 
            onClick={detectLocation}
            disabled={isDetecting}
            className="bg-white border-2 border-brand-green/20 text-brand-green hover:bg-brand-green hover:text-white px-5 py-3 rounded-2xl font-black flex items-center gap-2 transition-colors active:scale-95 shadow-sm text-sm shrink-0"
          >
            <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
            {isDetecting ? 'Detecting GPS...' : 'Precise GPS Locate'}
          </button>
        </div>
        
        {/* Visual map background flair */}
        <div className="absolute right-0 bottom-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none w-64 h-64 translate-x-12 translate-y-24">
            {/* Simple SVG abstract representation of a map grid */}
           <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="#000" strokeWidth="2" strokeDasharray="5,5" d="M10,10 L90,10 L90,90 L10,90 Z" />
              <path fill="none" stroke="#000" strokeWidth="2" d="M30,10 L30,90 M50,10 L50,90 M70,10 L70,90 M10,30 L90,30 M10,50 L90,50 M10,70 L90,70" />
              <circle cx="50" cy="50" r="4" fill="#000" />
           </svg>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center px-2">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Suggested near {currentCity}</h2>
        {suggestedChefs.length === 0 && (
          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">Top Rated Fallback</span>
        )}
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-6">
        {displayedChefs.map((chef) => (
          <ChefCard key={chef.id} chef={chef} />
        ))}
      </div>

      {/* Explore More */}
      <div className="mt-10">
        <Link to="/" className="w-full bg-brand-primary text-gray-900 font-black flex justify-center items-center py-5 rounded-2xl shadow-[0_8px_24px_rgba(255,204,0,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-transform gap-2 text-lg">
          <Compass className="w-6 h-6" />
          Explore Other Locations
        </Link>
      </div>
      
    </div>
  );
}
