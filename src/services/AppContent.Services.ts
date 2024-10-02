import { firestore } from "libs/firebase/@firebase";
import { COLLECTIONS, ERRORS } from "constant";
import { Admin, AppContent } from "models/schema";
import { getDocumentById, getDocumentReference, subscribeToCollection } from "utils/firebaseUtils";
import {
  doc,
  onSnapshot,
  DocumentData,
  collection,
  FirestoreError,
  Timestamp,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import axios, { AxiosResponse } from "axios";

interface UpdateAppContentValues {
  docId: string;
  content: string;
  adminId: string;
}

class ApplicationContent {
  updateAppContent = async (values: UpdateAppContentValues): Promise<AppContent | DocumentData> => {
    return new Promise<AppContent | DocumentData>(async (resolve, reject) => {
      try {
        const { content, docId, adminId } = values;

        const data: Partial<AppContent> = {
          content,
          updatedBy: getDocumentReference(COLLECTIONS.ADMINS, adminId),
          updatedAt: Timestamp.now(),
        };

        await updateDoc(doc(firestore, COLLECTIONS.APP_CONTENTS, docId), data);

        const updatedSnapshot = await getDoc(doc(firestore, COLLECTIONS.APP_CONTENTS, docId));

        if (updatedSnapshot.exists()) {
          resolve(updatedSnapshot.data() as AppContent);
        } else {
          reject(new Error("App content not found!"));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  getAppContents = (): Promise<AppContent[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const appContentsCollectionRef = collection(firestore, COLLECTIONS.APP_CONTENTS);

        const querySnapshot = await getDocs(appContentsCollectionRef);

        const contents = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as AppContent)
        );

        resolve(contents);
      } catch (error) {
        reject(error);
      }
    });
  };
}

const ApplicationContentService = new ApplicationContent();

export { ApplicationContentService };
