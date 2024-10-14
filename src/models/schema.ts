import { Timestamp } from "firebase/firestore";

interface Admin {
  id: string;
  role: EAdminRole;
  email: string;
  name: string;
  phone: string;
  currentStatus: AdminStatus;
  statusHistory: AdminStatus[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**** Types ****/

interface AdminStatus {
  status: "pending" | "active" | "inactive";
  date: Timestamp;
}

enum EAdminRole {
  SuperAdmin = "Super Admin",
  Admin = "Admin",
}

export type { Admin };
