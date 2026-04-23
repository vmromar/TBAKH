import { useState } from "react";
import { X, MapPin, Navigation, Search, CheckCircle2 } from "lucide-react";
import { useLocationContext } from "../context/LocationContext";
import { MOROCCAN_CITIES } from "../data/mockData";

export default function LocationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { currentLocation, setCurrentLocation, detectLocation, isDetecting } = useLocationContext();
  const [search, setSearch] = useState("");
  const [justDetected, setJustDetected] = useState(false);

  if (!isOpen) return null;

  const filteredLocations = MOROCCAN_CITIES.filter(loc => loc.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (loc: string) => {
    setCurrentLocation(loc);
    onClose();
  };

  const handleDetect = async () => {
     try {
         await detectLocation();
         setJustDetected(true);
         setTimeout(() => {
             setJustDetected(false);
             onClose();
         }, 1500);
     } catch (e) {
         // errors are alerted in the context
     }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white border border-gray-100 rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto flex flex-col max-h-[85vh]">
        
        <div className="sticky top-0 z-10 p-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Delivery Address</h2>
              <p className="text-gray-500 font-bold text-xs">Where should the chef arrive?</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
              <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto">
          {justDetected ? (
            <div className="mb-6 p-4 bg-brand-green/10 text-brand-green rounded-2xl flex items-center gap-3 border border-brand-green/20">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div className="text-sm">
                 <span className="font-black block">Location Detected</span>
                 <span className="font-medium opacity-90">{currentLocation}</span>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleDetect} 
              disabled={isDetecting}
              className="w-full flex items-center gap-3 bg-brand-primary/10 text-yellow-800 p-4 rounded-2xl mb-6 hover:bg-brand-primary/20 transition-colors border border-brand-primary/20"
            >
              <div className="bg-white p-2 rounded-full shadow-sm text-brand-primary">
                  <Navigation className={`w-5 h-5 ${isDetecting ? 'animate-pulse' : ''}`} />
              </div>
              <div className="text-left flex-1">
                  <span className="block font-black text-sm">{isDetecting ? "Detecting your location..." : "📍 Use my location"}</span>
                  <span className="block text-xs font-bold opacity-70">Automatic GPS detection</span>
              </div>
            </button>
          )}

          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search city..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-bold outline-none focus:border-brand-green"
            />
          </div>

          <div className="space-y-2">
             <h3 className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-3 px-2">Popular Areas</h3>
             {filteredLocations.map((loc) => (
                <button
                  key={loc}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(loc);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${currentLocation === loc ? 'bg-brand-green/10 border border-brand-green/20' : 'hover:bg-gray-50 border border-transparent'}`}
                >
                  <MapPin className={`w-5 h-5 ${currentLocation === loc ? 'text-brand-green' : 'text-gray-400'}`} />
                  <span className={`font-bold text-sm ${currentLocation === loc ? 'text-brand-green' : 'text-gray-700'}`}>{loc}</span>
                </button>
             ))}
             {filteredLocations.length === 0 && (
                 <p className="text-center text-sm font-bold text-gray-400 py-4">No locations found.</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
