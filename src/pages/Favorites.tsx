import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { CHEFS } from "../data/mockData";
import ChefCard from "../components/ChefCard";

export default function Favorites() {
  const { favorites } = useFavorites();
  
  const savedChefs = CHEFS.filter(chef => favorites.includes(chef.id));

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Saved Chefs</h1>
        <p className="text-gray-500 font-medium text-sm">Your personal collection of culinary artists.</p>
      </div>

      {savedChefs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-gray-100 border-dashed rounded-[32px] bg-white">
          <Heart className="w-12 h-12 text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No saved chefs yet</h2>
          <p className="text-gray-500 text-sm max-w-sm font-medium">
            Explore our curated list of chefs and tap the heart icon to save them for your future events.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {savedChefs.map(chef => (
            <ChefCard key={chef.id} chef={chef} />
          ))}
        </div>
      )}
    </div>
  );
}
