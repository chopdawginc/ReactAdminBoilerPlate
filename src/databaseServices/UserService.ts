import { User } from "../collections/dbSchema";
import { Firestore, getDocs, query, where } from "firebase/firestore";
import { BaseService } from "./BaseService";

export class UserService extends BaseService<User> {
  constructor(firestore: Firestore) {
    super(firestore, "admins");
  }

  // Add custom operations specific to the User schema
  async findByEmail(email: string): Promise<User | null> {
    const q = query(this.collectionRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as User;
  }
}
