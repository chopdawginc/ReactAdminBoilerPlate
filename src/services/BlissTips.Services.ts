// import axios from 'axios';
import { auth, firebaseError, firestore } from "libs/firebase/@firebase";
import { COLLECTIONS, ERRORS } from "constant";

import {
  doc,
  where,
  query,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
  Timestamp,
  deleteDoc,
  updateDoc,
  collection,
  onSnapshot,
  FirestoreError,
  orderBy,
  Query,
} from "firebase/firestore";
import { throwFirebaseException } from "utils";
import { CustomError } from "utils/CustomError";
import axios from "axios";
import { BlissTip } from "models/schema";
import { getDocumentReference, subscribeToCollection } from "utils/firebaseUtils";

type LoginValues = {
  email: string;
  password: string;
};

type DeleteBlissTipValue = {
  id: string;
};

class BlissTips {
  getBlissTips = async (params: {
    dataCallback: (data: BlissTip[]) => void;
    errorCallback: (error: FirestoreError) => void;
  }): Promise<{ data: BlissTip[]; unsubscribe: () => void }> => {
    const { dataCallback, errorCallback } = params;

    const queryFn = (ref: any) => {
      return query(ref, orderBy("createdAt", "desc")) as Query<BlissTip>;
    };
    return subscribeToCollection<BlissTip>(
      firestore,
      COLLECTIONS.BLISS_TIPS,
      dataCallback,
      errorCallback,
      queryFn
    );
  };

  storeBlissTip = (blissTip: Omit<BlissTip, "id">): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const blissTipsCollectionRef = collection(firestore, COLLECTIONS.BLISS_TIPS);

        const docRef = doc(blissTipsCollectionRef);

        await setDoc(docRef, {
          id: docRef.id,
          content: blissTip.content,
          createdBy: blissTip.createdBy,
          createdAt: blissTip.createdAt,
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  deleteBlissTipById = (props: DeleteBlissTipValue): Promise<void> => {
    const { id } = props || {};
    return new Promise(async (resolve, reject) => {
      try {
        const blissTipDocRef = doc(firestore, COLLECTIONS.BLISS_TIPS, id);

        await deleteDoc(blissTipDocRef);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}

const BlissTipsService = new BlissTips();

export { BlissTipsService };
