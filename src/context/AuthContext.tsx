import { ProfileService } from "services/Profile.Services";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { Admin } from "models/schema";
import useOnSnapshot from "hooks/useOnSnapshot";

interface UserProfile {
  uid: string;
  name: string;
}

interface AuthContextState {
  user: Admin | null;
  isLoading: boolean;
  userLoading: boolean;
}

interface AuthContextProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const auth = getAuth();

  const {
    onRequest,
    data,
    error,
    isLoading: userLoading,
    setData,
  } = useOnSnapshot({
    onRequestService: ProfileService.getUserById,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          await onRequest({ uid: user.uid });
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
        }
      } else {
        setData(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const currentUser: AuthContextState = {
    user: data,
    isLoading,
    userLoading,
  };

  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContext.Provider");
  }
  return context;
};
