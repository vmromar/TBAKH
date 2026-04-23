import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextType {
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
  detectLocation: () => void;
  isDetecting: boolean;
}

const LocationContext = createContext<LocationContextType>({
  currentLocation: '',
  setCurrentLocation: () => {},
  detectLocation: () => {},
  isDetecting: false
});

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLocation, setCurrentLocation] = useState(() => {
    return localStorage.getItem('userLocation') || 'Casablanca, Morocco';
  });
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    localStorage.setItem('userLocation', currentLocation);
  }, [currentLocation]);

  const detectLocation = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app we'd use Google Maps Reverse Geocoding here.
          // For the prototype, if we get a location, we'll simulate detection based on coordinates 
          // or default to a realistic mock (e.g. Meknes if requested, or nearest city).
          setTimeout(() => {
            setCurrentLocation("Meknes, Morocco"); // Simulating finding user's city
            setIsDetecting(false);
          }, 800);
        },
        (error) => {
          console.error(error);
          setIsDetecting(false);
          alert("Location access denied. Please select your city manually.");
        }
      );
    } else {
      setIsDetecting(false);
    }
  };

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation, detectLocation, isDetecting }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
