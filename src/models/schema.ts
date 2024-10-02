import { DocumentReference, Timestamp } from "firebase/firestore";
import {
  ESongStatus,
  EProfileDesiredOutcome,
  EProfileCommitment,
  EProfileExerciseType,
  EProfilePace,
  EProfileWavelength,
  EAppContentType,
  EAppContentSubType,
  EAdminRole,
} from "models/types";

interface User {
  id: string;

  name: string;
  email: string;
  phone: string;
  notificationSettings: UserNotificationSetting;
  reminder: UserReminder;
  stripeCustomerId: string;
  profile: UserProfile;
  status: UserStatus;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface WorkoutSession {
  id: string;
  userId: DocumentReference; // Ref to User

  feelingBefore: number;
  feelingAfter: number;
  startedAt: Timestamp;
  finishedAt: Timestamp;
  duration: number; // Minutes
}

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

interface BlissTip {
  id: string;
  content: string;
  createdBy: DocumentReference; // Ref to Admin
  createdAt: Timestamp;
}

interface AppContent {
  id: string;

  type: EAppContentType;
  subType: EAppContentSubType;
  content: string;

  createdBy: DocumentReference; // Ref to Admin
  updatedBy: DocumentReference; // Ref to Admin
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface Song {
  id: string;
  duration: number; // minutes
  bpm: string;
  provider: DocumentReference; // Ref to Provider
  status: ESongStatus;
  timesPlayed: number;
  timesSkipped: number;
  createdBy: DocumentReference; // Ref to Admin
  createdAt: Timestamp;
  updatedAt: Timestamp;

  title: string;
}

interface Provider {
  id: string;
  name: string;

  createdBy: DocumentReference; // Ref to Admin
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**** Types ****/

interface AdminStatus {
  status: "pending" | "active" | "inactive";
  date: Timestamp;
}

interface UserNotificationSetting {
  receiveSms: boolean;
  receiveMarketing: boolean;
}

interface UserReminder {
  day: string;
  time: string;
  isEnabled: boolean;
}

interface UserProfile {
  desiredOutcome: EProfileDesiredOutcome;
  commitment: EProfileCommitment;
  exerciseType: EProfileExerciseType;
  pace: EProfilePace;
  wavelength: EProfileWavelength;
}

interface UserStatus {
  status: "active" | "inactive" | "deleted";
  date: Timestamp;
}

export { User, WorkoutSession, AppContent, BlissTip, Admin, Song, Provider };
