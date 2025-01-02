type FirebaseErrorCode =
  | "auth/invalid-email"
  | "auth/user-disabled"
  | "auth/user-not-found"
  | "auth/wrong-password"
  | "auth/too-many-requests"
  | "auth/email-already-in-use"
  | "auth/operation-not-allowed"
  | "auth/weak-password"
  | "auth/invalid-api-key"
  | "auth/network-request-failed"
  | "auth/requires-recent-login"
  | "auth/account-exists-with-different-credential"
  | "auth/credential-already-in-use"
  | "auth/missing-android-pkg-name"
  | "auth/missing-continue-uri"
  | "auth/invalid-continue-uri"
  | "auth/missing-iframe-start"
  | "auth/invalid-iframe-ancestor"
  | "auth/illegal-redirect-uri"
  | "auth/redirect-cancelled-by-user"
  | "auth/popup-blocked"
  | "auth/popup-closed-by-user"
  | "auth/unauthorized-continue-uri"
  | "auth/missing-phone-number"
  | "auth/invalid-phone-number"
  | "auth/quota-exceeded"
  | "auth/failed-contacting-server"
  | "auth/invalid-user-token"
  | "auth/user-token-expired"
  | "auth/null-user"
  | "auth/app-deleted"
  | "auth/internal-error";

// This function takes a Firebase error code and returns an appropriate message.
export const handleFirebaseError = (errorCode: string): string => {
  const errorMessages: Record<FirebaseErrorCode, string> = {
    "auth/invalid-email": "Invalid email address format.",
    "auth/user-disabled": "This user account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/too-many-requests": "Too many requests. Try again later.",
    "auth/email-already-in-use": "The email address is already in use by another account.",
    "auth/operation-not-allowed": "This operation is not allowed. Please contact support.",
    "auth/weak-password": "The password is too weak. Please choose a stronger one.",
    "auth/invalid-api-key": "The API key is invalid.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    "auth/requires-recent-login": "This operation requires recent login. Please log in again.",
    "auth/account-exists-with-different-credential":
      "An account already exists with this email address, but it is linked to a different sign-in provider.",
    "auth/credential-already-in-use": "This credential is already linked to an existing account.",
    "auth/missing-android-pkg-name":
      "Android package name is missing. Please include it in the request.",
    "auth/missing-continue-uri": "A continuation URL is required for the authentication flow.",
    "auth/invalid-continue-uri": "The continuation URL provided is invalid.",
    "auth/missing-iframe-start": "The IFrame start element is missing in the authentication flow.",
    "auth/invalid-iframe-ancestor": "The IFrame ancestor is invalid for authentication.",
    "auth/illegal-redirect-uri": "The redirect URI is illegal.",
    "auth/redirect-cancelled-by-user": "The redirect was cancelled by the user.",
    "auth/popup-blocked": "Popup window was blocked. Please enable popups.",
    "auth/popup-closed-by-user": "The popup was closed before completing the authentication.",
    "auth/unauthorized-continue-uri": "The continuation URL is not authorized.",
    "auth/missing-phone-number": "Phone number is missing in the request.",
    "auth/invalid-phone-number": "The phone number is invalid.",
    "auth/quota-exceeded": "Quota for Firebase authentication has been exceeded.",
    "auth/failed-contacting-server": "Failed to contact the Firebase server. Please try again.",
    "auth/invalid-user-token": "The user token is invalid.",
    "auth/user-token-expired": "The user token has expired.",
    "auth/null-user": "The user is null. Please log in again.",
    "auth/app-deleted": "The app has been deleted.",
    "auth/internal-error": "An internal error occurred. Please try again later.",
  };

  // The error code might not be in our predefined list, so we ensure we return a default message
  return errorMessages[errorCode as FirebaseErrorCode] || "Something went wrong.";
};
