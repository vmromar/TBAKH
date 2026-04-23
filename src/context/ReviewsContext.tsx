import { createContext, useContext, useState, ReactNode } from 'react';
import { CHEFS, Review } from '../data/mockData';

interface ReviewsContextType {
  getReviews: (chefId: string) => Review[];
  addReview: (chefId: string, review: Review) => void;
}

const ReviewsContext = createContext<ReviewsContextType>({
  getReviews: () => [],
  addReview: () => {},
});

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  // Initialize reviews state with existing mock data
  const [reviewsState, setReviewsState] = useState<Record<string, Review[]>>(() => {
    const initialState: Record<string, Review[]> = {};
    CHEFS.forEach(chef => {
      initialState[chef.id] = [...chef.reviews];
    });
    return initialState;
  });

  const getReviews = (chefId: string) => {
    return reviewsState[chefId] || [];
  };

  const addReview = (chefId: string, review: Review) => {
    setReviewsState(prev => {
      const existing = prev[chefId] || [];
      return {
        ...prev,
        [chefId]: [review, ...existing]
      };
    });
  };

  return (
    <ReviewsContext.Provider value={{ getReviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewsContext);
