import {
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export class BaseService<T> {
  public collectionRef;

  constructor(private firestore: Firestore, private collectionName: string) {
    this.collectionRef = collection(firestore, collectionName);
  }

  async create(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await setDoc(docRef, data, { merge: true });
  }

  async read(id: string): Promise<T | null> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }
    return docSnap.data() as T;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await updateDoc(docRef, data);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await deleteDoc(docRef);
  }

  async list(): Promise<T[]> {
    const querySnapshot = await getDocs(this.collectionRef);
    return querySnapshot.docs.map((doc) => doc.data() as T);
  }
}
