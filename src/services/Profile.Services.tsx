import { firebaseError, firestore } from "libs/firebase/@firebase";
import { COLLECTIONS, ERRORS } from "constant";
import { Admin } from "models/schema";
import { getDocumentById, subscribeToCollection } from "utils/firebaseUtils";
import { doc, FirestoreError, getDoc } from "firebase/firestore";
import axios, { AxiosResponse } from "axios";
import { CustomError } from "utils/CustomError";

interface UpdatePasswordResponse {
  data: any;
}
interface UpdateEmailResponse {
  data: any;
}

class Profile {
  getUserById = async (params: {
    uid: string;
    dataCallback: (data: Admin) => void;
    errorCallback: (error: FirestoreError) => void;
  }): Promise<{ data: Admin; unsubscribe: () => void }> => {
    const { uid, dataCallback, errorCallback } = params;

    return getDocumentById<Admin>(firestore, COLLECTIONS.ADMINS, uid, dataCallback, errorCallback);
  };

  updateUserPassword = ({
    userId,
    newPassword,
  }: {
    userId: string;
    newPassword: string;
  }): Promise<UpdatePasswordResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<UpdatePasswordResponse> = await axios.post(
          "https://update-user-password-rekmjjk74q-uc.a.run.app",
          {
            userId,
            newPassword,
          }
        );
        resolve(response.data.data);
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        }
        reject(ERRORS.UNKNOWN_ERROR);
      }
    });
  };

  updateUserEmail = ({
    userId,
    newEmail,
  }: {
    userId: string;
    newEmail: string;
  }): Promise<UpdateEmailResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<UpdateEmailResponse> = await axios.post(
          "https://update-user-email-rekmjjk74q-uc.a.run.app",
          {
            userId,
            newEmail,
          }
        );
        resolve(response.data.data);
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        }
        reject(ERRORS.UNKNOWN_ERROR);
      }
    });
  };

  // Admin
  verifyUID = ({ uid }: { uid: string }): Promise<Admin> => {
    return new Promise(async (resolve, reject) => {
      try {
        const adminRef = doc(firestore, COLLECTIONS.ADMINS, uid);
        const adminDoc = await getDoc(adminRef);

        if (!adminDoc.exists()) {
          throw new CustomError({
            code: "admin-not-found",
            message: "Admin not found!",
          });
        }

        const adminData = adminDoc.data();
        if (adminData.currentStatus?.status !== "pending") {
          throw new CustomError({
            code: "admin-status-invalid",
            message: "Admin status is not pending!",
          });
        }
        resolve(adminDoc.data() as Admin);
      } catch (error: any) {
        if (error instanceof CustomError) {
          reject(error.toJSON());
        } else if (error.code) {
          reject({
            code: error.code,
            message: error.message,
          });
        } else {
          reject(ERRORS.UNKNOWN_ERROR);
        }
      }
    });
  };

  adminSetPassword = ({
    userId,
    newPassword,
  }: {
    userId: string;
    newPassword: string;
  }): Promise<UpdatePasswordResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<UpdatePasswordResponse> = await axios.post(
          "https://admin-set-password-rekmjjk74q-uc.a.run.app",
          {
            userId,
            newPassword,
          }
        );
        resolve(response.data.data);
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        }
        reject(ERRORS.UNKNOWN_ERROR);
      }
    });
  };

  // OTP
  sendOTP = ({ phone }: { phone: string }): Promise<UpdatePasswordResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<UpdatePasswordResponse> = await axios.post(
          "https://send-otp-rekmjjk74q-uc.a.run.app",
          {
            phone,
          }
        );
        resolve(response.data.data);
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        }
        reject(ERRORS.UNKNOWN_ERROR);
      }
    });
  };

  verifyOTP = ({ phone, otp }: { phone: string; otp: string }): Promise<UpdatePasswordResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response: AxiosResponse<UpdatePasswordResponse> = await axios.post(
          "https://send-otp-rekmjjk74q-uc.a.run.app",
          {
            phone,
            otp,
          }
        );
        resolve(response.data.data);
      } catch (error: any) {
        if (error.response) {
          reject(error.response.data);
        }
        reject(ERRORS.UNKNOWN_ERROR);
      }
    });
  };
}

const ProfileService = new Profile();

export { ProfileService };
