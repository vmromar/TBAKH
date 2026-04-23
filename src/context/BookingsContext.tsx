import { createContext, useContext, useState, ReactNode } from "react";

export type BookingStatus = 'pending' | 'confirmed' | 'declined' | 'countered';

export interface Booking {
  id: string;
  chefId: string;
  chefName: string;
  clientName: string;
  phone: string;
  date: string;
  eventType: string;
  guests: string;
  proposedPrice: number;
  status: BookingStatus;
  createdAt: Date;
}

interface BookingsContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  updateStatus: (id: string, status: BookingStatus) => void;
  updatePrice: (id: string, price: number) => void;
  getChefBookings: (chefId: string) => Booking[];
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

// Initial mock bookings for the chef dashboard
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "b-1",
    chefId: "chef-1",
    chefName: "Chef Amine Alaoui",
    clientName: "Youssef Tazi",
    phone: "+212 612 345 678",
    date: "2026-05-15",
    eventType: "Wedding",
    guests: "150",
    proposedPrice: 4000,
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: "b-2",
    chefId: "chef-1",
    chefName: "Chef Amine Alaoui",
    clientName: "Sofia M.",
    phone: "+212 698 765 432",
    date: "2026-05-20",
    eventType: "Private Dinner",
    guests: "12",
    proposedPrice: 3500,
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
  }
];

export function BookingsProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date(),
    };
    setBookings(prev => [newBooking, ...prev]);

    // Send email notification to the specific chef
    const email = `${bookingData.chefId}@tbakh.ma`;
    const subject = `New Booking Request for ${bookingData.chefName}`;
    const body = `Client Name: ${bookingData.clientName}
Phone: ${bookingData.phone}
Event Date: ${bookingData.date}
Event Type: ${bookingData.eventType}
Guests: ${bookingData.guests}
Proposed Price: ${bookingData.proposedPrice}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const updateStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status } : b)
    );
  };

  const updatePrice = (id: string, price: number) => {
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, proposedPrice: price, status: 'countered' } : b)
    );
  };

  const getChefBookings = (chefId: string) => {
    return bookings.filter(b => b.chefId === chefId);
  };

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, updateStatus, updatePrice, getChefBookings }}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingsContext);
  if (context === undefined) {
    throw new Error("useBookings must be used within a BookingsProvider");
  }
  return context;
}
