import {
  doc,
  query,
  where,
  Query,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
  orderBy,
  deleteDoc,
  Firestore,
  onSnapshot,
  collection,
  DocumentData,
  FirestoreError,
  serverTimestamp,
  DocumentReference,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firestore, storage } from "../appServices/AuthService";

// Collection functions
export const fetchCollectionData = async <T>(collectionName: string): Promise<T[]> => {
  const data: T[] = [];
  const colRef = collection(firestore, collectionName);
  const querySnapshot = await getDocs(query(colRef, orderBy("createdAt", "desc")));

  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      data.push({ ...doc.data() } as T);
    } else {
      console.log("No document found!");
    }
  });

  return data;
};

export const fetchCollectionDataWithoutOrder = async <T>(collectionName: string): Promise<T[]> => {
  const data: T[] = [];
  const colRef = collection(firestore, collectionName);
  const querySnapshot = await getDocs(colRef);

  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      data.push({ ...doc.data() } as T);
    } else {
      console.log("No document found!");
    }
  });

  return data;
};

export const fetchCollectionDataWithCondition = async <T>(
  collectionName: string,
  key: string,
  id: string
): Promise<T[]> => {
  const data: T[] = [];
  const colRef = collection(firestore, collectionName);
  const q = query(colRef, where(key, "==", id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return data;
  }

  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      data.push({ ...doc.data(), doc_id: doc.id } as T);
    } else {
      console.log("No document found!");
    }
  });

  return data;
};

// Document functions
export const fetchDocumentData = async <T>(
  collectionName: string,
  docId: string
): Promise<T | null> => {
  let found: T | null = null;
  const docRef = doc(firestore, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    found = { ...docSnap.data(), doc_id: docSnap.id } as T;
  }

  return found;
};

export const addDocument = async <T>(
  collectionName: string,
  jsonObject: T
): Promise<string | null> => {
  try {
    const colRef = collection(firestore, collectionName);
    const docRef = await addDoc(colRef, { ...jsonObject, createdAt: serverTimestamp() });
    return docRef.id;
  } catch (error) {
    console.error("Error writing document: ", error);
    return null;
  }
};

export const updateDocument = async <T>(
  collectionName: string,
  docId: string,
  jsonObject: Partial<T>,
  merge = true
): Promise<void> => {
  const docRef = doc(firestore, collectionName, docId);
  try {
    await setDoc(docRef, jsonObject, { merge });
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export const deleteDocument = async (collectionName: string, docId: string): Promise<void> => {
  const docRef = doc(firestore, collectionName, docId);
  await deleteDoc(docRef);
};

// SubCollections functions
export const saveDataInSubCollection = async <T>(
  collectionName: string,
  docId: string,
  subCollectionName: string,
  jsonObject: DocumentData
): Promise<string | null> => {
  const subColRef = collection(firestore, collectionName, docId, subCollectionName);
  try {
    const docRef = await addDoc(subColRef, jsonObject);
    return docRef.id;
  } catch (error) {
    console.error("Error writing to subcollection: ", error);
    return null;
  }
};

export const getSubCollectionData = async <T>(
  collectionName: string,
  docId: string,
  subCollectionName: string
): Promise<T[]> => {
  const data: T[] = [];
  const subColRef = collection(firestore, collectionName, docId, subCollectionName);
  const querySnapshot = await getDocs(subColRef);

  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      data.push({ ...doc.data() } as T);
    }
  });

  return data;
};

// Function to handle Firestore onSnapshot subscriptions
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

      if (queryFn) {
        collectionRef = queryFn(collectionRef);
      }

      const unsubscribe = onSnapshot(
        collectionRef,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
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

export const subscribeToDocument = <T extends DocumentData>(
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
            const error = new Error("Document does not exist") as FirestoreError;
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
export const getDocumentReference = (collection: string, id: string): DocumentReference => {
  return doc(firestore, collection, id);
};

export const getDocumentByReference = async <T>(
  docRef: DocumentReference<DocumentData>
): Promise<T | null> => {
  try {
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data() as T;
    } else {
      console.log("No document found at this reference.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document by reference:", error);
    return null;
  }
};

// Storage functions
export const uploadFileToFirebase = (
  file: File,
  path: string,
  onProgress: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const storageRef = ref(storage, path);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          reject(`Upload failed: ${error.message}`);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error: any) {
            reject(`Failed to retrieve download URL: ${error.message}`);
          }
        }
      );
    } catch (error: any) {
      reject(`Failed to start upload: ${error.message}`);
    }
  });
};

// Deserialize/Serialize data
export const converter = <T>() => ({
  fromFirestore: (snapshot: QueryDocumentSnapshot): T => {
    const data = snapshot.data() as T;
    return data;
  },
  toFirestore: (data: T): T => {
    return data;
  },
});
