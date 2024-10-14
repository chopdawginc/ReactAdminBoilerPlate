import { Admin } from "@models/schema";
import { FirestoreError } from "firebase/firestore";
import { firestore } from "@libs/firebase/firebase";
import { COLLECTIONS } from "@constants/dbCollections";
import { getDocumentById } from "@utils/index";

class Profile {
  getUserById = async (params: {
    uid: string;
    dataCallback: (data: Admin) => void;
    errorCallback: (error: FirestoreError) => void;
  }): Promise<{ data: Admin; unsubscribe: () => void }> => {
    const { uid, dataCallback, errorCallback } = params;

    return getDocumentById<Admin>(firestore, COLLECTIONS.ADMINS, uid, dataCallback, errorCallback);
  };
}

const ProfileService = new Profile();

export { ProfileService };
