import useOnSnapshot from "@hooks/useOnSnapshot";
import { User as IUser } from "src/collections/dbSchema";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { AuthAction } from "@actions/authActions";

interface AuthContextState {
  user: IUser | null;
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
    isLoading: userLoading,
    setData,
  } = useOnSnapshot<IUser>({
    onRequestService: AuthAction.getUserById,
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
