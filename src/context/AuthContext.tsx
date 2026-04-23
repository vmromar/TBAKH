import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface User {
  uid: string;
  email: string;
  role: 'client' | 'chef';
  identifier: string; // Keep for backward compatibility 
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateUserContext: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  updateUserContext: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Manual override method for when creating a profile just after registration
  const updateUserContext = (newUser: User) => {
     setUser(newUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch user metadata from Firestore to get their role
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          let role: 'client' | 'chef' = 'client';
          
          if (userDoc.exists()) {
            role = userDoc.data().role || 'client';
          }
          
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            role,
            identifier: firebaseUser.email || ''
          });
        } catch (error) {
          console.error("Error fetching user role:", error);
          // Fallback
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            role: 'client',
            identifier: firebaseUser.email || ''
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, updateUserContext }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
