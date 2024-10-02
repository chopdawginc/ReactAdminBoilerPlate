import { auth, firebaseError, firestore } from "libs/firebase/@firebase";
import { ERRORS } from "constant";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";

import { throwFirebaseException } from "utils";
import { CustomError } from "utils/CustomError";
import axios from "axios";

type LoginValues = {
  email: string;
  password: string;
};

type EmailValue = {
  email: string;
};

class Auth {
  login = async (values: LoginValues = { email: "", password: "" }): Promise<string> => {
    const { email, password } = values;

    return new Promise<string>(async (resolve, reject) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        resolve("User signed in successfully!");
      } catch (error: any) {
        if (error instanceof firebaseError) {
          reject({
            code: error.code,
            message: throwFirebaseException(error.code),
          });
        } else if (error instanceof CustomError) {
          reject(error.toJSON());
        } else {
          reject(ERRORS.UNKNOWN_ERROR);
        }
      }
    });
  };

  logOut = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await signOut(auth);
        resolve("signed out!");
      } catch (error) {
        reject("sign out failed");
      }
    });
  };

  getUserByEmail = async ({ email }: EmailValue) => {
    return new Promise(async (resolve, reject) => {
      try {
        const functionUrl = "https://get-user-by-email-rekmjjk74q-uc.a.run.app";

        const requestData = {
          email: email,
        };

        const response = await axios.post(functionUrl, requestData);

        resolve(response.data.data);
      } catch (error: any) {
        if (error.response.data) {
          reject(error.response.data);
        } else {
          reject(ERRORS.UNKNOWN_ERROR);
        }
      }
    });
  };
}

const AuthService = new Auth();

export { AuthService };
