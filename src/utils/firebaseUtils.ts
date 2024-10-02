import {
  collection,
  onSnapshot,
  FirestoreError,
  Firestore,
  Query,
  DocumentData,
  doc,
  DocumentReference,
} from "firebase/firestore";
import { firestore } from "libs/firebase/@firebase";

// Utility function to handle Firestore onSnapshot subscriptions
export const subscribeToCollection = <T extends DocumentData>(
  firestore: Firestore,
  collectionPath: string,
  dataCallback: (data: T[]) => void,
  errorCallback: (error: FirestoreError) => void,
  queryFn?: (ref: Query<T>) => Query<T>
): Promise<{ data: T[]; unsubscribe: () => void }> => {
  return new Promise((resolve, reject) => {
    try {
      let collectionRef = collection(firestore, collectionPath) as Query<T>;

      // Apply optional query if provided
      if (queryFn) {
        collectionRef = queryFn(collectionRef);
      }

      const unsubscribe = onSnapshot(
        collectionRef,
        (snapshot) => {
          const data = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as T)
          );
          dataCallback(data);
          resolve({ data, unsubscribe });
        },
        (error: FirestoreError) => {
          errorCallback(error);
          reject(error);
        }
      );
    } catch (error) {
      errorCallback(error as FirestoreError);
      reject(error);
    }
  });
};

export const getDocumentById = <T extends DocumentData>(
  firestore: Firestore,
  collectionPath: string,
  documentId: string,
  dataCallback: (data: T) => void,
  errorCallback: (error: FirestoreError) => void
): Promise<{ data: T; unsubscribe: () => void }> => {
  return new Promise((resolve, reject) => {
    try {
      const documentRef = doc(firestore, collectionPath, documentId);

      const unsubscribe = onSnapshot(
        documentRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = {
              id: docSnapshot.id,
              ...docSnapshot.data(),
            } as unknown as T;
            dataCallback(data);
            resolve({ data, unsubscribe });
          } else {
            const error = new Error(
              "Document does not exist"
            ) as FirestoreError;
            errorCallback(error);
            reject(error);
          }
        },
        (error: FirestoreError) => {
          errorCallback(error);
          reject(error);
        }
      );
    } catch (error) {
      errorCallback(error as FirestoreError);
      reject(error);
    }
  });
};

// Helper function to get a Firestore document reference
export const getDocumentReference = (
  collection: string,
  id: string
): DocumentReference => {
  return doc(firestore, collection, id);
};
