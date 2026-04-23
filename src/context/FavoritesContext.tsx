import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (chefId: string) => void;
  isFavorite: (chefId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cheflik_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites');
      }
    }
  }, []);

  const toggleFavorite = (chefId: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(chefId) 
        ? prev.filter(id => id !== chefId)
        : [...prev, chefId];
        
      localStorage.setItem('cheflik_favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const isFavorite = (chefId: string) => favorites.includes(chefId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
