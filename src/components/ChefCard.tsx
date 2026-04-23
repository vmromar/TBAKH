import { Link } from "react-router-dom";
import { Star, MapPin, Heart } from "lucide-react";
import { Chef } from "../data/mockData";
import { useFavorites } from "../context/FavoritesContext";

export default function ChefCard({ chef }: { chef: Chef }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(chef.id);

  return (
    <div className="relative block w-full">
      <Link to={`/chef/${chef.id}`}>
        <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-shadow border border-gray-100 flex flex-row p-3 gap-4 h-40 group">
          <div className="relative w-32 h-full rounded-[24px] overflow-hidden shrink-0">
            <img 
              src={chef.coverImage} 
              alt={chef.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="flex-1 py-1 pr-2 flex flex-col justify-center min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-gray-900 text-lg md:text-xl truncate pr-8">{chef.name}</h3>
            </div>
            
            <p className="text-gray-500 font-medium text-sm truncate">{chef.specialties.join(" • ")}</p>
            
            <div className="flex items-center gap-1 text-gray-400 text-sm mt-1 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{chef.location}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm mt-auto font-bold tracking-tight">
              <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-xl text-gray-700">
                <Star className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
                <span>{chef.rating}</span>
              </div>
              <div className="text-brand-green bg-brand-green/10 px-2 py-1 rounded-xl">
                {chef.priceRange.min} MAD+
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(chef.id);
        }}
        className={`absolute top-5 right-5 p-2 rounded-full transition-colors z-10 
          ${favorited ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:text-red-500'}`}
      >
        <Heart className={`w-5 h-5 ${favorited ? 'fill-red-500' : ''}`} />
      </button>
    </div>
  );
}
