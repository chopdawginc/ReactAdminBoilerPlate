import { Dayjs } from "dayjs";
import { Timestamp } from "firebase/firestore";

export interface DateRange {
  from: Dayjs | null;
  to: Dayjs | null;
}

// Dashboard stat.
type SubscriptionType = {
  label: string;
  value: number;
};

type ContentPopularity = {
  label: string;
  value: number;
};

export type CommitmentSurveyResults = {
  name: string;
  value: number;
};

export interface UsersData {
  totalUsers: number;
  usersBySubscriptionType: SubscriptionType[];
  contentPopularity: ContentPopularity[];
  commitmentSurveyResults: CommitmentSurveyResults[];
}

export type ILoginFormType = {
  email: string;
  password?: string;
  isKeepLoggedIn: boolean;
};

export type IForgetPasswordFormType = {
  email: string;
};

export type IAddUserFormType = {
  // Form
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string | "admin" | "moderator";
  // Schema
  lastLoginDate?: Timestamp;
  isActive?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  // Helpers
  id?: string;
};

export type IAddRatesFormType = {
  // Form & Schema
  zipCode?: number;
  area?: string;
  city?: string;
  parentRate?: number;
  sitterRate?: number;
  bookingFee?: number;
  sitterService?: boolean;
  createdAt?: Timestamp;
  // Helpers
  id?: string;
};

export type IAddMessageFormType = {
  date: Date | null;
  message: string;
  audience: {
    sitter: boolean;
    parent: boolean;
    allUsers: boolean;
  };
  medium: {
    text: boolean;
    inApp: boolean;
    email: boolean;
  };
};

export type MessageCenterType = {
  date: any;
  message: string;
  audience: string;
  medium: string;
};

export type IChangePasswordFormType = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export type UserType = {
  email?: string;
  type?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  pictureUrl?: string;
  legalAgreements?: {
    termsOfServices: boolean;
    privacyPolicy: boolean;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  address?: {
    street: string;
    area: string;
    city: string;
    zipCode: number;
  };
  isOnline?: boolean;
  notificationSettings?: {
    bookingReminders: boolean;
    promotionalOffers: boolean;
    updatesAndNews: boolean;
  };
  blockedUsers?: {
    userId: string;
    date: Timestamp;
  }[];
  isBlocked?: boolean;
  blockedBy?: string;
  blockDate?: Timestamp;
  isFastVerified?: boolean;
  about?: string;
  notes?: string;
  createdAt?: Timestamp;
  // Helper
  parentProfile?: ParentUserProfileType;
  sitterProfile?: BabysitterUserProfileType;
  id?: string;
  bookingsCompleted?: number;
  totalPayout?: number;
  totalPayment?: number;
  children?: ChildrenType[];
  bookings?: BookingsType[];
  userRatings?: UserRatings[];
  BabysitterInterview?: BabysitterInterview;
};

export type ParentUserProfileType = {
  userId?: string;
  houseRules?: string[];
  // Helper
  profileId?: string;
};

export type ChildrenType = {
  userId: string;
  name: string;
  pictureUrl: string;
  allergies: string[];
  dateOfBirth: Timestamp;
  createdAt: Timestamp;
  // Helper
  childrenId?: string;
};

export type BabysitterUserProfileType = {
  userId?: string;
  videoUrl?: string;
  jobPreferences?: string[];
  skills?: string[];
  assessments?: SitterAssessments[];
  isBackgroundChecked?: boolean;
  interviewStatus?: "pending" | "conducted" | "canceled" | "rescheduled";
  availabilitySchedule?: Record<
    string,
    {
      isAvailable: boolean;
      start: {
        hour: number;
        minute: number;
      };
      end: {
        hour: number;
        minute: number;
      };
    }
  >;
  onDemandJobsRadius?: number;
  scheduledJobsRadius?: number;
  willDrive?: boolean;
  agePreference?: "infant" | "toddler" | "school-age";
  onBoardedAt?: Timestamp;
  // Helper
  profileId?: string;
};

export type SitterAssessments = {
  question: string;
  answer: string;
  // Helper
  assessmentId?: string;
};

// Bookings
type Coordinates = {
  latitude: number;
  longitude: number;
};

type Address = {
  street: string;
  area: string;
  city: string;
  zipCode: number;
};

enum BookingTypeEnum {
  ASAP = "asap",
  Schedule = "schedule",
}

enum BookingStatusEnum {
  Scheduled = "scheduled",
  Confirmed = "confirmed",
  Started = "started",
  Completed = "completed",
  Paid = "paid",
  Canceled = "canceled",
}

enum SitterStatusEnum {
  OnTheWay = "on-the-way",
  RunningLate = "running-late",
  Arrived = "arrived",
}

type StatusWithActor = {
  status: BookingStatusEnum;
  date: Timestamp;
  canceledBy?: string;
  completedBy?: string;
};

type SimpleStatus = {
  status: SitterStatusEnum;
  date: Timestamp;
};

export type BookingsType = {
  postedBy?: string;
  type?: BookingTypeEnum;
  createdAt?: Timestamp;
  cancellationPolicy?: string;
  fromDate?: Timestamp;
  toDate?: Timestamp;
  location?: Coordinates;
  address?: Address;
  sitterPreferences?: string[];
  notes?: string;
  children?: string[];
  currentStatus?: StatusWithActor;
  statusHistory?: StatusWithActor[];
  appointedSitter?: string;
  sitterStatus?: SimpleStatus;
  sitterStatusHistory?: SimpleStatus[];
  // Helper
  bookingId?: string;
  bookingPayment?: BookingPayment;
  parentName?: string;
  sitterName?: string;
  childrenName?: string[];
  reportTicket?: ReportTicketType[];
  userRatings?: UserRatings[];
};

//  Booking payments
export type BookingPayment = {
  bookingId?: string;
  parentId?: string;
  sitterId?: string;
  amount?: number;
  tip?: number;
  createdAt?: Timestamp;
  // Helper
  bookingPaymentId?: string;
};

// User Ratings
export type UserRatings = {
  createdBy?: string;
  ratedUser?: string;
  isRecommended?: boolean;
  review?: string;
  createdAt?: Timestamp;
  bookingId?: string;
  // Helper
  userRatingsId?: string;
  userName?: string;
  ratedUserName?: string;
};

// Report Ticket
type ReportTicketStatus = {
  status: "open" | "resolved";
  date: Timestamp;
};

export type ReportTicketType = {
  createdBy?: string;
  reportedUser?: string;
  createdAt?: Timestamp;
  text?: string;
  bookingId?: string;
  internalNotes?: string;
  currentStatus?: ReportTicketStatus;
  statusHistory?: ReportTicketStatus[];
  // Helper
  ticketId?: string;
  reportee?: UserType;
  reporter?: UserType;
  id?: string;
  booking?: BookingsType;
};

// Coordinates
export type CoordinatesType = {
  createdAt: Timestamp;
  createdBy: string;
  latitude: string;
  longitude: string;
  // Helper
  id?: string;
};

// Sitter Applications
// Enum for interview status
enum InterviewStatus {
  Pending = "pending",
  Conducted = "conducted",
  Canceled = "canceled",
  Rescheduled = "rescheduled",
}

// Interface for the status history objects
interface StatusHistory {
  status: InterviewStatus;
  date: Date;
}

// Interface for the babysitter-interviews entity
export type BabysitterInterview = {
  userId?: string;
  dateAndTime?: Timestamp;
  currentStatus?: StatusHistory;
  statusHistory?: StatusHistory[];
  // Helper
  id?: string;
};

// Enum for status
export type PayoutStatus = "requested" | "approved" | "paid";

export interface PayoutCurrentStatus {
  status: PayoutStatus;
  date: Date;
  approvedBy?: string;
}

export interface PayoutStatusHistoryItem {
  status: PayoutStatus;
  date: Date;
  approvedBy?: string;
}

export interface PayoutDataTypes {
  userId: string;
  amount: number;
  currentStatus: PayoutCurrentStatus;
  statusHistory: PayoutStatusHistoryItem[];
  createdAt: Date;
}

export interface Payout extends PayoutDataTypes {
  id?: string;
}
