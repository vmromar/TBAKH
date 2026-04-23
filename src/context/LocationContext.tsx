import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextType {
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
  detectLocation: () => Promise<void>;
  isDetecting: boolean;
}

const LocationContext = createContext<LocationContextType>({
  currentLocation: '',
  setCurrentLocation: () => {},
  detectLocation: async () => {},
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
    return new Promise<void>((resolve, reject) => {
      setIsDetecting(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
              const data = await res.json();
              
              const city = data.address.city || data.address.town || data.address.village || data.address.state || "Unknown Location";
              const newLocation = `${city}, Morocco`;

              setCurrentLocation(newLocation);
              resolve();
            } catch (err) {
              console.error("Reverse geocoding failed", err);
              alert("Could not determine your city from coordinates. Please select your city manually.");
              reject(err);
            } finally {
              setIsDetecting(false);
            }
          },
          (error) => {
            console.error(error);
            setIsDetecting(false);
            alert("Location access denied or unavailable. Please select your city manually.");
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        setIsDetecting(false);
        alert("Geolocation is not supported by your browser.");
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation, detectLocation, isDetecting }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
