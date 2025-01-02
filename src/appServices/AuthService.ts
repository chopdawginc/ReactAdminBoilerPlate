// authService.ts
import { initializeApp, FirebaseError } from "firebase/app";
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
  signInWithCredential,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const functions = getFunctions(app);

export const firebaseError = FirebaseError;

// Auth services
export class AuthService {
  private auth: Auth;

  constructor() {
    this.auth = getAuth(app);
  }

  // Register with email and password
  async register(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Login with email and password
  async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Logout
  async logout(): Promise<void> {
    return await signOut(this.auth);
  }

  // Send password reset email
  async resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(this.auth, email);
  }

  // Send email verification
  async sendEmailVerification(): Promise<void> {
    if (this.auth.currentUser) {
      return await sendEmailVerification(this.auth.currentUser);
    }
    throw new Error("No user is currently signed in");
  }

  // Social login with Google
  async loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  // Social login with Facebook
  async loginWithFacebook(): Promise<UserCredential> {
    const provider = new FacebookAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  // Phone number authentication
  async phoneNumberAuth(
    phoneNumber: string,
    appVerifier: RecaptchaVerifier
  ): Promise<UserCredential> {
    // const confirmationResult = await signInWithPhoneNumber(this.auth, phoneNumber, appVerifier);

    // const userVerificationCode = window.prompt(
    //   "Please enter the verification code sent to your phone:"
    // );
    // if (userVerificationCode) {
    //  return await confirmationResult.confirm(userVerificationCode);
    // } else {
    //   throw new Error("Verification code is required");
    // }

    //OR

    const provider = new PhoneAuthProvider(this.auth);
    const verificationId = await provider.verifyPhoneNumber(phoneNumber, appVerifier);
    const verificationCode = window.prompt(
      "Please enter the verification code that was sent to your mobile device."
    );
    if (verificationCode) {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

      return await signInWithCredential(this.auth, credential);
    }
    throw new Error("Verification code is required");
  }
}
