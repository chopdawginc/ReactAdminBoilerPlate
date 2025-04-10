export const FIREBASE_ERROR = {
  INVALID_EMAIL: "auth/invalid-email",
  INVALID_CREDENTIAL: "auth/invalid-credential",
  USER_DISABLED: "auth/user-disabled",
  OTP_CODE_EXPIRED: "auth/code-expired",
  USER_NOT_EXIST: "auth/user-not-found",
  TOKEN_EXPIRES: "auth/id-token-expired",
  INVALID_PASSWORD: "auth/wrong-password",
  EMAIL_EXIST: "auth/email-already-exists",
  INVALID_PHONE: "auth/invalid-phone-number",
  SOMETHING_WENT_WRONG: "auth/something_wrong",
  NETWORK_FAILED: "auth/network-request-failed",
  AUTH_TO_MANY_REQUEST: "auth/too-many-requests",
  EMAIL_ALREADY_USED: "auth/email-already-in-use",
  INVALID_VERIFICATION_CODE: "auth/invalid-verification-code",
};

// Custom errors
interface ErrorType {
  code: string;
  message: string;
}

export const ERRORS: { [key: string]: ErrorType } = {
  ADMIN_NOT_FOUND: {
    code: "admin-not-found",
    message: "Admin not found!",
  },
  UNKNOWN_ERROR: {
    code: "unknown-error",
    message: "An unknown error occurred",
  },
};
