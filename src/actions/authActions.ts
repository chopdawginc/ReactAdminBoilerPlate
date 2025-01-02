import { ERRORS } from "@constants/errors";
import { User } from "@collections/dbSchema";
import { FirestoreError } from "firebase/firestore";
import { COLLECTIONS } from "@constants/dbCollections";
import { handleFirebaseError } from "@utils/handleFirebaseError";
import { subscribeToDocument } from "../databaseServices/TempService";
import { AuthService, firebaseError, firestore } from "../appServices/AuthService";

const auth = new AuthService();

class Auth {
  login = async (params: { email: string; password: string }) => {
    const { email, password } = params;

    try {
      return await auth.login(email, password);
    } catch (error: any) {
      if (error instanceof firebaseError) {
        throw { code: error.code, message: handleFirebaseError(error.code) };
      }
      throw ERRORS.UNKNOWN_ERROR;
    }
  };

  logout = async () => {
    return await auth.logout();
  };

  getUserById = async (params: {
    uid: string;
    dataCallback: (data: User) => void;
    errorCallback: (error: FirestoreError) => void;
  }): Promise<{ data: User; unsubscribe: () => void }> => {
    const { uid, dataCallback, errorCallback } = params;

    return subscribeToDocument<User>(
      firestore,
      COLLECTIONS.USERS,
      uid,
      dataCallback,
      errorCallback
    );
  };
}

const AuthAction = new Auth();

export { AuthAction };
