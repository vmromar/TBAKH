import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ChefHat, Search, User, Heart, MapPin, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import { useLocationContext } from "../context/LocationContext";
import LocationModal from "./LocationModal";

export default function Layout() {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { currentLocation } = useLocationContext();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/create-profile' || location.pathname === '/forgot-password';

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Desktop Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between py-2">
          
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-primary flex items-center justify-center shadow-[0_0_15px_rgba(255,204,0,0.5)]">
                <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 drop-shadow-sm" />
              </div>
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-brand-green hidden sm:block">TBAKH</span>
            </Link>
            
            <div className="h-8 w-[1px] bg-gray-200 hidden sm:block"></div>

            {/* Location Selector (Glovo Style) */}
            <div 
              className="flex flex-col cursor-pointer group hover:bg-gray-50 px-2 py-1 rounded-xl transition-colors"
              onClick={() => setIsLocationModalOpen(true)}
            >
               <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Delivery To</span>
               <div className="flex items-center gap-1.5 text-brand-green group-hover:text-yellow-600 transition-colors">
                 <div className="bg-brand-green rounded-full p-0.5 shrink-0">
                    <MapPin className="w-3 h-3 text-white fill-current" />
                 </div>
                 <span className="text-sm border-b-2 border-transparent group-hover:border-yellow-600 font-black truncate max-w-[120px] sm:max-w-[200px]">{currentLocation.split(',')[0]}</span>
                 <ChevronDown className="w-4 h-4 shrink-0" />
               </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-brand-green transition-colors">Explore</Link>
            <Link to="/favorites" className="text-sm font-semibold text-gray-600 hover:text-brand-green transition-colors">Saved</Link>
            <div className="h-4 w-[1px] bg-gray-200"></div>
            
            {loading ? (
                <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            ) : user ? (
                <Link to="/personal" className="text-sm font-bold text-gray-900 hover:text-brand-green transition-colors flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  My Account
                </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-brand-green transition-colors">Sign In</Link>
                <Link to="/register" className="text-sm font-bold bg-brand-primary text-gray-900 px-6 py-2.5 rounded-full hover:bg-yellow-400 transition-colors shadow-sm">
                  Join as Chef
                </Link>
              </>
            )}
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-24 md:pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Branding Column */}
            <div className="md:col-span-4 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center shadow-[0_0_15px_rgba(255,204,0,0.4)]">
                  <ChefHat className="w-6 h-6 text-gray-900" />
                </div>
                <span className="text-3xl font-black tracking-tighter text-gray-900">TBAKH</span>
              </div>
              <p className="text-gray-500 font-medium mb-4 pr-4">
                The premier marketplace connecting discerning clients with professional chefs across Morocco.
              </p>
              <span className="inline-block text-[10px] uppercase font-black text-gray-400 tracking-widest border border-gray-100 bg-gray-50 self-start px-3 py-1.5 rounded-full">
                We were the first in Morocco
              </span>
            </div>
            
            {/* Newsletter Column */}
            <div className="md:col-span-5 flex flex-col justify-center">
              <h3 className="text-sm font-black tracking-widest uppercase text-gray-900 mb-4">Stay updated</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thanks for subscribing to our newsletter!");
                }}
                className="flex items-center"
              >
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email" 
                  className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-l-xl focus:ring-brand-green focus:border-brand-green block w-full outline-none px-4 py-3.5 transition-colors font-medium"
                />
                <button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white rounded-r-xl px-6 py-3.5 text-sm font-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-sm border border-gray-900">
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-2 font-medium">Get the latest chef additions and culinary offers directly in your inbox.</p>
            </div>

            {/* Links Column */}
            <div className="md:col-span-3 flex flex-col md:items-end">
              <h3 className="text-sm font-black tracking-widest uppercase text-gray-900 mb-4 md:text-right">Links</h3>
              <div className="flex flex-col gap-3 font-semibold text-gray-500 md:items-end">
                <Link to="/about" className="hover:text-brand-green transition-colors w-fit">About Us</Link>
                <Link to="/faq" className="hover:text-brand-green transition-colors w-fit">FAQ</Link>
                <Link to="/terms" className="hover:text-brand-green transition-colors w-fit">Terms</Link>
                <Link to="/privacy" className="hover:text-brand-green transition-colors w-fit">Privacy</Link>
                <a href="https://instagram.com/tbakh.ma" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-brand-green hover:text-gray-900 transition-colors bg-brand-green/10 px-3 py-1.5 rounded-lg w-fit mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold">@tbakh.ma</span>
                </a>
              </div>
            </div>
            
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-gray-400">
              © {new Date().getFullYear()} TBAKH. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-6 py-3 flex justify-between items-center pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <Link to="/" className={cn("flex flex-col items-center gap-1", location.pathname === '/' ? "text-brand-green" : "text-gray-400")}>
          <Search className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold">Explore</span>
        </Link>
        <Link to="/favorites" className={cn("flex flex-col items-center gap-1", location.pathname === '/favorites' ? "text-brand-green" : "text-gray-400")}>
          <Heart className="w-6 h-6" />
          <span className="text-[10px] uppercase font-bold">Saved</span>
        </Link>
        
        {loading ? (
             <div className="flex flex-col items-center gap-1 text-gray-400">
               <Loader2 className="w-6 h-6 animate-spin" />
               <span className="text-[10px] uppercase font-bold">Profile</span>
             </div>
        ) : user ? (
           <Link to="/personal" className={cn("flex flex-col items-center gap-1", location.pathname === '/personal' ? "text-brand-green" : "text-gray-400")}>
            <div className="relative">
              <User className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-primary border-2 border-white rounded-full"></div>
            </div>
            <span className="text-[10px] uppercase font-bold">Profile</span>
          </Link>
        ) : (
          <Link to="/login" className={cn("flex flex-col items-center gap-1", location.pathname === '/login' ? "text-brand-green" : "text-gray-400")}>
            <User className="w-6 h-6" />
            <span className="text-[10px] uppercase font-bold">Sign In</span>
          </Link>
        )}
      </nav>

      {/* Global Location Modal */}
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
    </div>
  );
}
