import { FIREBASE_ERROR } from 'constant';

export const FIREBASE_ERROR_MESSAGES = {
   [FIREBASE_ERROR.INVALID_EMAIL]: "The email you entered doesn't exist",
   [FIREBASE_ERROR.USER_DISABLED]: 'This account has been disabled. Please contact support',
   [FIREBASE_ERROR.OTP_CODE_EXPIRED]: 'The OTP code has expired. Please request a new one',
   [FIREBASE_ERROR.USER_NOT_EXIST]:
      "This account doesn't exist. Enter a different account or create a new one",
   [FIREBASE_ERROR.TOKEN_EXPIRES]: 'Your login session has expired. Please log in again',
   [FIREBASE_ERROR.INVALID_PASSWORD]: 'The password you provided is incorrect. Try again',
   [FIREBASE_ERROR.EMAIL_EXIST]: 'This email is already associated with an existing account',
   [FIREBASE_ERROR.INVALID_PHONE]: 'Invalid phone number. Please enter a valid one',
   [FIREBASE_ERROR.SOMETHING_WENT_WRONG]: 'Something went wrong. Please try again',
   [FIREBASE_ERROR.NETWORK_FAILED]: 'Network request failed',
   [FIREBASE_ERROR.AUTH_TO_MANY_REQUEST]:
      'We are sorry, but you have sent too many requests. Please try again later',
   [FIREBASE_ERROR.EMAIL_ALREADY_USED]: 'This email is already in use',
   [FIREBASE_ERROR.INVALID_VERIFICATION_CODE]: 'Invalid verification code. Please try again',
   [FIREBASE_ERROR.INVALID_CREDENTIAL]: 'Invalid credential, Please provide valid credentails',
};

export const throwFirebaseException = (code: string) => {
   return FIREBASE_ERROR_MESSAGES[code] || code;
};
